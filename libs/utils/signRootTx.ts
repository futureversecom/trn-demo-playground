import type { ApiPromise } from "@polkadot/api";
import type { GenericSignerPayload } from "@polkadot/types/extrinsic/SignerPayload";
import type { Header, Index } from "@polkadot/types/interfaces";
import { objectSpread } from "@polkadot/util";
import { blake2AsHex } from "@polkadot/util-crypto";
import type { Provider } from "@web3-react/types";

import type { Extrinsic } from "@/libs/types";

interface SigningInfo {
	header: Header | null;
	mortalLength: number;
	nonce: Index;
}

export const signRootTx = async (
	rootApi: ApiPromise,
	address: string,
	ethProvider: Provider,
	unsignedTx: Extrinsic
) => {
	const signingInfo = await rootApi.derive.tx.signingInfo(address);

	const eraOptions = makeEraOptions(rootApi, signingInfo);

	const payload = rootApi.registry.createTypeUnsafe("SignerPayload", [
		objectSpread({}, eraOptions, {
			address,
			blockNumber: signingInfo.header ? signingInfo.header.number : 0,
			method: unsignedTx.method,
			version: unsignedTx.version,
		}),
	]) as GenericSignerPayload;
	const { data } = payload.toRaw();
	const hashed = data.length > (256 + 1) * 2 ? blake2AsHex(data) : data;
	const ethPayload = blake2AsHex(hashed);

	const signature = (await ethProvider.request({
		method: "personal_sign",
		params: [ethPayload, address],
	})) as `0x${string}`;

	unsignedTx.addSignature(address, signature, payload.toPayload());

	return unsignedTx;
};

const makeEraOptions = (rootApi: ApiPromise, signingInfo: SigningInfo) => {
	const { header, mortalLength, nonce } = signingInfo;

	return makeSignOptions(rootApi, {
		blockHash: header?.hash,
		era: rootApi.registry.createTypeUnsafe("ExtrinsicEra", [
			{
				current: header?.number,
				period: mortalLength,
			},
		]),
		nonce,
	});
};

const makeSignOptions = (rootApi: ApiPromise, extras: Record<string, unknown>) => {
	return objectSpread(
		{
			blockHash: rootApi.genesisHash,
			genesisHash: rootApi.genesisHash,
		},
		extras,
		{
			runtimeVersion: rootApi.runtimeVersion,
			signedExtensions: rootApi.registry.signedExtensions,
			version: rootApi.extrinsicVersion,
		}
	);
};
