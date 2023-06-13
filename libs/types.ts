import type { Web3Provider } from "@ethersproject/providers";
import type { SubmittableExtrinsic } from "@polkadot/api/types";
import type { ISubmittableResult } from "@polkadot/types/types";
import type { Web3ContextType } from "@web3-react/core";

export type Demo = "EvmFeeProxy";

export type Extrinsic = SubmittableExtrinsic<"promise", ISubmittableResult>;

export type Wallet = Web3ContextType<Web3Provider>;

export interface Asset {
	assetId: number;
	address: string;
	decimals: number;
}

export type HexString = `0x${string}`;

export interface ApiError {
	index: number;
	error: HexString;
}
