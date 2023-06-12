import ERC20 from "@openzeppelin/contracts/build/contracts/ERC20.json";
import { Contract, utils as ethers } from "ethers";
import { parse } from "path";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Assets } from "@/libs/constants";
import { useEvmFeeProxy, useMetaMask, useRootApi } from "@/libs/hooks";
import { sendRootTx, signRootTx } from "@/libs/utils";

import { Button, Input } from "./";

interface EvmData {
	input?: string;
	gasLimit?: string;
}

export const EvmFeeProxy = () => {
	const rootApi = useRootApi();
	const { wallet } = useMetaMask();

	const [error, setError] = useState<string>();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [amount, setAmount] = useState<string>("1");
	const [destination, setDestination] = useState<string>(
		"0x000000000000000000000000000000000000dEaD"
	);
	const { input, gasLimit } = useEvmData(amount, destination);

	const evmFeeProxyExtrinsic = useEvmFeeProxy({
		input,
		gasLimit,
		asset: Assets.SYLO,
	});

	const submitExtrinsic = useCallback(async () => {
		if (!rootApi || !evmFeeProxyExtrinsic || !wallet?.account || !wallet?.connector?.provider)
			return;

		try {
			setError(undefined);
			setIsSubmitting(true);

			const signedExtrinsic = await signRootTx(
				rootApi,
				wallet.account,
				wallet.connector.provider,
				evmFeeProxyExtrinsic
			);

			const tx = await sendRootTx(signedExtrinsic);

			tx.on("txSucceeded", (result) => {
				console.log("success", result);
				setIsSubmitting(false);
			});

			tx.on("txFailed", (result) => {
				setIsSubmitting(false);
				setError(tx.decodeError(result) ?? "unknown");
			});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setIsSubmitting(false);
			if (err?.message?.includes("User denied message signature")) return;

			setError(err?.message ?? err);
		}
	}, [rootApi, evmFeeProxyExtrinsic, wallet]);

	return (
		<div className="space-y-6">
			<div className="max-w-xl mx-auto">
				<Input id="asset" label="Asset" value="SYLO" />

				<Input
					id="amount"
					label="Amount"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
				<Input
					id="destination"
					label="Destination"
					value={destination}
					onChange={(e) => setDestination(e.target.value)}
				/>
			</div>

			<div className="flex justify-center">
				<Button
					variant="small"
					isLoading={isSubmitting}
					onClick={submitExtrinsic}
					disabled={!wallet?.account}
				>
					Submit
				</Button>
			</div>

			{error && <div className="w-[98%] border border-gray-300 mx-auto" />}

			{error && (
				<div className="space-y-4 pt-6 text-center">
					<h2 className="font-medium">Error submitting extrinsic</h2>
					<p className="text-sm p-4">{error}</p>
				</div>
			)}
		</div>
	);
};

const useEvmData = (amount: string, destination: string) => {
	const { provider } = useMetaMask();

	const erc20Contract = useMemo(() => {
		if (!provider) return undefined;

		return new Contract(Assets.SYLO.address, ERC20.abi, provider?.getSigner() ?? provider);
	}, [provider]);

	const [{ input, gasLimit }, setEvmData] = useState<EvmData>({});

	const fetchEvmData = useCallback(async () => {
		if (!erc20Contract) return;

		const value = ethers.parseEther(amount);

		setEvmData({
			input: erc20Contract.interface.encodeFunctionData("transfer", [destination, value]),
			gasLimit: (await erc20Contract.estimateGas.transfer(destination, value)).toString(),
		});
	}, [erc20Contract, amount, destination]);

	useEffect(() => {
		void fetchEvmData();
	}, [fetchEvmData]);

	return { input, gasLimit };
};
