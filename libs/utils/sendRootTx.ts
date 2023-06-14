import type { Extrinsic, Result } from "@/libs/types";

import { RootTx } from "./";

export const sendRootTx = async (extrinsic: Extrinsic) => {
	const tx = new RootTx();

	extrinsic
		.send((result) => {
			const { txHash } = result;
			console.info("Transaction", txHash.toString());
			tx.setHash(txHash.toString());
			tx.setResult(result as Result);
		})
		.catch((error) => {
			throw error;
		});

	return tx;
};
