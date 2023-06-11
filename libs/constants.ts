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
