import ERC20 from "@openzeppelin/contracts/build/contracts/ERC20.json";
import { Contract, utils as ethers } from "ethers";
import { type FC, useCallback, useEffect, useMemo, useState } from "react";

import { Assets } from "@/libs/constants";
import { useEvmFeeProxy, useMetaMask, useRootApi } from "@/libs/hooks";
import { sendRootTx, signRootTx } from "@/libs/utils";

import { Button, Input, JSONViewer } from "./";

interface EvmData {
	input?: string;
	gasLimit?: string;
}

export const EvmFeeProxy: FC = () => {
	const rootApi = useRootApi();
	const { wallet } = useMetaMask();

	const [error, setError] = useState<string>();
	const [result, setResult] = useState<Record<string, unknown>>();
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
				setIsSubmitting(false);

				const feeProxyEvent = tx.findEvent(result, "feeProxy", "CallWithFeePreferences");
				const {
					data: [who, maxPayment, paymentAsset],
				} = feeProxyEvent?.toJSON() as { data: [string, number, string] };

				const evmLogEvent = tx.findEvent(result, "evm", "Log");
				const {
					data: [log],
				} = evmLogEvent?.toJSON() as { data: [Record<string, unknown>] };

				setResult({
					"FeeProxy.CallWithFeePreferences": {
						who,
						maxPayment,
						paymentAsset,
					},
					"EVM.Log": log,
				});
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
		<div className="space-y-6 py-10 w-1/2">
			<div className="mx-auto">
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
					disabled={!wallet?.account || isSubmitting}
				>
					Submit
				</Button>
			</div>

			{(error || result) && <div className="w-[80%] border border-gray-300 mx-auto" />}

			{error && (
				<div className="space-y-4 text-center">
					<h2 className="font-medium">Error submitting extrinsic</h2>
					<p className="text-sm p-4">{error}</p>
				</div>
			)}

			{result && (
				<div className="space-y-4">
					<h2 className="font-medium text-center">Success Events</h2>
					<div className="p-4 border border-gray-200 rounded-md w-2/3 mx-auto ">
						<JSONViewer data={result} />
					</div>
				</div>
			)}
		</div>
	);
};

function useEvmData(amount: string, destination: string) {
	const { provider } = useMetaMask();

	const erc20Contract = useMemo(() => {
		if (!provider) return undefined;

		return new Contract(Assets.SYLO.address, ERC20.abi, provider.getSigner());
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
}
