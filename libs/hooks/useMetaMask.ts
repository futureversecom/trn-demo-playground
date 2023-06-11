/* eslint-disable @typescript-eslint/ban-ts-comment */
import { initializeConnector, useWeb3React, Web3ReactHooks } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useCallback, useEffect, useState } from "react";

import { RootNetwork } from "../constants";

export const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>(
	(actions) =>
		new MetaMask({
			actions,
			options: {
				mustBeMetaMask: true,
			},
		})
);

const storage = createJSONStorage(() => sessionStorage);

export const metaMaskConnectors = [metaMask, metaMaskHooks] as [MetaMask, Web3ReactHooks];

const storedAccountAtom = atomWithStorage<string | undefined>(
	"metamask_account",
	undefined,
	storage as any
);

export const useMetaMask = () => {
	const wallet = useWeb3React();
	const provider = wallet?.provider;
	const currentChainId = metaMaskHooks.useChainId();
	const [isConnecting, setIsConnecting] = useState(true);
	const [storedAccount, setStoredAccount] = useAtom(storedAccountAtom);

	const connectWallet = useCallback(async () => {
		await metaMask
			.activate({
				chainName: RootNetwork!.ChainName,
				chainId: RootNetwork!.ChainId.InDec,
				nativeCurrency: {
					name: "XRP",
					decimals: 18,
					symbol: "XRP",
				},
				rpcUrls: [RootNetwork!.ApiUrl.InRpc],
				blockExplorerUrls: [RootNetwork!.ExplorerUrl],
			})
			.then(() => setIsConnecting(false))
			.catch((error) => {
				console.error("Unable to connect to MetaMask.", error);
			});
	}, []);

	const disconnectWallet = useCallback(async () => {
		setStoredAccount(undefined);
		if (window.ethereum) window.ethereum.isMetaMask = false;

		if (metaMask?.deactivate) await metaMask.deactivate();
		// @ts-ignore:
		if (metaMask?.actions?.resetState) metaMask.actions.resetState();
	}, [setStoredAccount]);

	// Update stored account
	useEffect(() => {
		if (!wallet?.account || wallet?.account === storedAccount) return;
		setStoredAccount(wallet?.account);
	}, [storedAccount, setStoredAccount, wallet?.account]);

	useEffect(() => {
		if (
			!window?.ethereum?.isMetaMask ||
			!storedAccount ||
			wallet?.isActive ||
			typeof window?.ethereum?.isMetaMask === "undefined"
		)
			return;

		metaMask.connectEagerly().then(() => setIsConnecting(false));
	}, [wallet?.isActive, storedAccount]);

	// Update connecting state on account change
	useEffect(() => {
		if (!wallet?.account) return;

		setIsConnecting(false);
	}, [wallet?.account]);

	return {
		wallet,
		connectWallet,
		disconnectWallet,
		isConnecting,
		provider,
		currentChainId,
		storedAccount,
	};
};
