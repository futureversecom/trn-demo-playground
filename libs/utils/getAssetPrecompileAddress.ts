import { utils as ethers } from "ethers";

export const getAssetPrecompileAddress = (assetId: number) => {
	const assetIdHex = assetId.toString(16).padStart(8, "0");

	return ethers.getAddress(`0xCCCCCCCC${assetIdHex.toUpperCase()}000000000000000000000000`);
};
