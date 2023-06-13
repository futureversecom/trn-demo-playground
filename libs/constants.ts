import { getAssetPrecompileAddress } from "@/libs/utils";

import type { Asset, Demo } from "./types";

export const Demos: Array<Demo> = ["EvmFeeProxy"];

export const RootNetwork = {
	porcini: {
		ChainName: "Porcini",
		ChainId: {
			InDec: 7672,
			InHex: `0x${Number(7672).toString(16)}`,
		},
		ApiUrl: {
			InRpc: "https://porcini.rootnet.app/",
			InWebSocket: "wss://porcini.rootnet.app/ws",
		},
		LinkedEthChain: "goerli",
		LinkedXrpChain: "testnet",
		ExplorerUrl: "https://explorer.rootnet.cloud",
		GraphQlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "",
	},

	mainnet: {
		ChainName: "ROOT",
		ChainId: {
			InDec: 7668,
			InHex: `0x${Number(7668).toString(16)}`,
		},
		ApiUrl: {
			InRpc: "https://porcini.rootnet.live/",
			InWebSocket: "wss://root.rootnet.live/ws",
		},
		LinkedEthChain: "homestead",
		LinkedXrpChain: "livenet",
		ExplorerUrl: "https://explorer.rootnet.live",
		GraphQlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "",
	},
}[process.env.NEXT_PUBLIC_ROOT_NETWORK ?? "porcini"];

export const Assets: Record<string, Asset> = {
	XRP: {
		assetId: 2,
		address: getAssetPrecompileAddress(2),
		decimals: 6,
	},
	ROOT: {
		assetId: 1,
		address: getAssetPrecompileAddress(1),
		decimals: 6,
	},
	ASTO: {
		assetId: 17508,
		address: getAssetPrecompileAddress(17508),
		decimals: 18,
	},
	SYLO: {
		assetId: 3172,
		address: getAssetPrecompileAddress(3172),
		decimals: 18,
	},
};
