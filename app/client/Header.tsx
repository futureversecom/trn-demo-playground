import type { FC } from "react";

import { useIsMounted, useMetaMask } from "@/libs/hooks";

import { ConnectWallet } from "./";

export const Header: FC = () => {
	const { wallet } = useMetaMask();
	const isMounted = useIsMounted();

	return (
		<div className="fixed w-full flex items-center justify-between h-14 text-white z-10">
			<div className="flex items-center justify-start pl-6 w-14 md:w-80 h-14 bg-blue-900 dark:bg-gray-900 border-none">
				<span className="hidden md:block whitespace-nowrap font-bold text-base">
					TRN Demo Playground
				</span>
			</div>
			<div className="flex w-full justify-between items-center h-14 bg-blue-900 dark:bg-gray-900 header-right">
				<div className="flex items-center w-full max-w-xl p-2" />
				<ul className="flex items-center">
					<li>
						{wallet?.account && wallet?.isActive && (
							<div className="text-sm">
								{wallet.account.slice(0, 6).concat("...").concat(wallet.account.slice(-4))}
							</div>
						)}
					</li>
					{isMounted ? (
						<li>
							<div className="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700" />
						</li>
					) : (
						<span className="loading loading-spinner loading-xs" />
					)}
					<li>
						<div className="flex items-center mr-4 hover:text-blue-100">
							<ConnectWallet />
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};
