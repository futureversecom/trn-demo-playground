import type { Web3Provider } from "@ethersproject/providers";
import type { SubmittableExtrinsic } from "@polkadot/api/types";
import type { Web3ContextType } from "@web3-react/core";

export type Extrinsic = SubmittableExtrinsic<"promise", AnyApi>;

export type Wallet = Web3ContextType<Web3Provider>;

export interface Asset {
	assetId: number;
	address: string;
	decimals: number;
}

export type HexString = `0x${string}`;

export interface IconProps {
	iconClassName?: string;
}

interface RequestArguments {
	readonly method: string;
	readonly params?: readonly unknown[] | object;
}

export interface Provider {
	request(args: RequestArguments): Promise<unknown>;
}

export interface ApiError {
	index: number;
	error: HexString;
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyApi = any;
