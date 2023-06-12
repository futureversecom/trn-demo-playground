import { ApiPromise, WsProvider } from "@polkadot/api";
import { atom, useAtom } from "jotai";

import { RootNetwork } from "@/libs/constants";

const rootApiAtom = atom(async () => {
	const rootApi = await ApiPromise.create({
		provider: new WsProvider(RootNetwork!.ApiUrl.InWebSocket),
		types: {
			AccountId: "EthereumAccountId",
			AccountId20: "EthereumAccountId",
			AccountId32: "EthereumAccountId",
			Address: "AccountId",
		},
		rpc: {
			dex: {
				quote: {
					description:
						"Given some amount of an asset and pair reserves, returns an equivalent amount of the other asset",
					params: [
						{
							name: "amountA",
							type: "u128",
						},
						{
							name: "reserveA",
							type: "u128",
						},
						{
							name: "reserveB",
							type: "u128",
						},
					],
					type: "Json",
				},
				getAmountsOut: {
					description: "Given an array of AssetIds, return amounts out for an amount in",
					params: [
						{
							name: "amountIn",
							type: "Balance",
						},
						{
							name: "path",
							type: "Vec<AssetId>",
						},
					],
					type: "Json",
				},
				getAmountsIn: {
					description: "Given an array of AssetIds, return amounts in for an amount out",
					params: [
						{
							name: "amountOut",
							type: "Balance",
						},
						{
							name: "path",
							type: "Vec<AssetId>",
						},
					],
					type: "Json",
				},
			},
		},
	});

	await rootApi.isReady;

	return rootApi;
});

export const useRootApi = () => {
	const [rootApi] = useAtom(rootApiAtom);

	return rootApi;
};
