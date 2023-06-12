import { utils as ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Assets } from "@/libs/constants";
import type { Asset, Extrinsic } from "@/libs/types";

import { useMetaMask, useRootApi } from "./";

interface EvmFeeProxyProps {
	asset: Asset;
	input?: string;
	gasLimit?: string;
}

export function useEvmFeeProxy(props: EvmFeeProxyProps) {
	const { asset } = props;
	const rootApi = useRootApi();
	const evmCall = useEvmCall(props);
	const maxPayment = useMaxPayment(asset?.assetId);

	return useMemo(() => {
		if (!rootApi || !maxPayment || !evmCall || !asset) return null;

		return rootApi.tx.feeProxy.callWithFeePreferences(
			asset.assetId,
			maxPayment,
			rootApi.createType("Call", evmCall)
		);
	}, [rootApi, maxPayment, evmCall, asset]);
}

function useMaxPayment(assetId?: number) {
	const rootApi = useRootApi();

	const [maxPayment, setMaxPayment] = useState<string>();

	const fetchMaxPayment = useCallback(async () => {
		if (!rootApi || !assetId) return;

		const {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			Ok: [_, assetAmount],
		} = (
			await // eslint-disable-next-line @typescript-eslint/no-explicit-any
			(rootApi.rpc as any).dex.getAmountsOut(
				ethers.parseUnits("2", Assets.XRP.decimals).toString(),
				[Assets.XRP.assetId, assetId]
			)
		).toJSON();

		setMaxPayment(assetAmount.toString());
	}, [rootApi, assetId]);

	useEffect(() => {
		void fetchMaxPayment();
	}, [fetchMaxPayment]);

	return maxPayment;
}

function useEvmCall({ asset, input, gasLimit }: EvmFeeProxyProps) {
	const rootApi = useRootApi();
	const { wallet, provider } = useMetaMask();

	const [evmCall, setEvmCall] = useState<Extrinsic>();

	const getEvmCall = useCallback(async () => {
		if (!rootApi || !wallet?.account || !provider) return;

		const nonce = await provider.getTransactionCount(wallet.account);
		const { lastBaseFeePerGas, maxPriorityFeePerGas } = await provider.getFeeData();

		setEvmCall(
			rootApi.tx.evm.call(
				wallet.account, // sender
				asset.address, // target
				input,
				0, // value
				gasLimit, // gasLimit,
				lastBaseFeePerGas!.toString(), // maxFeePerGas
				maxPriorityFeePerGas!.toString(),
				nonce,
				[] // accessList
			)
		);
	}, [rootApi, input, asset, gasLimit, wallet, provider]);

	useEffect(() => {
		void getEvmCall();
	}, [getEvmCall]);

	return evmCall;
}
