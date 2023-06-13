import type { Web3Provider } from "@ethersproject/providers";
import type { SubmittableExtrinsic } from "@polkadot/api/types";
import type { u32 } from "@polkadot/types/primitive";
import type { ISubmittableResult } from "@polkadot/types/types";
import type { Web3ContextType } from "@web3-react/core";

export type Demo = "EvmFeeProxy";

export interface Result extends ISubmittableResult {
	blockNumber: u32;
}

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
