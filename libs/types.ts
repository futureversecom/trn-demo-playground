// import type { ISubmittableResult, SubmittableExtrinsic } from "@polkadot/api/types";

export type HexString = `0x${string}`;

// export type Extrinsic = SubmittableExtrinsic<"promise", ISubmittableResult>;

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
