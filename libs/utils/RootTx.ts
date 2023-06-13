import Emittery from "emittery";

import type { Result } from "@/libs/types";

export class RootTx extends Emittery {
	hash?: string;
	blockHash?: string;
	extrinsicId?: string;

	constructor() {
		super();
		this.emit("txCreated");
	}

	setHash(hash: string) {
		const shouldEmit = this.hash !== hash;
		this.hash = hash;
		if (shouldEmit) this.emit("txHashed", hash);
	}

	setExtrinsicId(result: Result, blockHash: string) {
		const { txIndex, blockNumber } = result;

		const height = blockNumber.toString().padStart(10, "0");
		const index = txIndex?.toString().padStart(6, "0");
		const hash = blockHash.slice(2, 7);

		const extrinsicId = `${height}-${index}-${hash}`;

		const shouldEmit = this.extrinsicId !== extrinsicId;
		this.extrinsicId = extrinsicId;
		if (shouldEmit) this.emit("txExtrinsicId", result);
	}

	setResult(result: Result) {
		const { status, dispatchError } = result;

		if (status.isInBlock) return this.setExtrinsicId(result, status.asInBlock.toString());

		if (status.isFinalized && !dispatchError) return this.emit("txSucceeded", result);

		if (status.isFinalized && dispatchError) return this.emit("txFailed", result);
	}

	setCancel() {
		this.emit("txCancelled");
	}

	decodeError(result: Result) {
		const { dispatchError } = result;
		if (!dispatchError?.isModule) return null;
		const { index, error } = dispatchError.asModule.toJSON();
		const errorMeta = dispatchError.registry.findMetaError(
			new Uint8Array([index, error] as unknown as ArrayBufferLike)
		);
		return errorMeta?.section && errorMeta?.method
			? `${errorMeta.section}.${errorMeta.method}`
			: `I${index}E${error}`;
	}

	findEvent(result: Result, eventSection: string, eventMethod: string) {
		const { events: records } = result;
		const record = records.find((record) => {
			const event = record.event;
			return event?.section === eventSection && event?.method === eventMethod;
		});

		return record?.event;
	}

	findEvents(result: Result, eventSection: string, eventMethod: string) {
		const { events: records } = result;
		return records
			.filter((record) => {
				const event = record.event;
				return event?.section === eventSection && event?.method === eventMethod;
			})
			.map((record) => record?.event);
	}

	getHashLink() {
		return `extrinsic/${this?.extrinsicId}`;
	}
}
