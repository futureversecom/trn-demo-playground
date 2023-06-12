"use client";

import { EvmFeeProxy } from "./";

export default function Main() {
	return (
		<div className="h-full ml-14 mt-14 mb-10 md:ml-64">
			<div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
				<EvmFeeProxy />
			</div>
		</div>
	);
}
