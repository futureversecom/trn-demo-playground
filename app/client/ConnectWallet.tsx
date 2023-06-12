import { type FC, Fragment, useCallback } from "react";

import { useIsMounted, useMetaMask } from "@/libs/hooks";

import { Button } from "./";

const ConnectWallet: FC = () => {
	const isMounted = useIsMounted();
	const { wallet, connectWallet, disconnectWallet } = useMetaMask();

	const onButtonClick = useCallback(() => {
		if (!wallet?.isActive) {
			setTimeout(async () => {
				await connectWallet();
			}, 500);
		}
	}, [wallet?.isActive, connectWallet]);

	// Prevent React hydration error from wallet autoConnect
	if (!isMounted) return <Button buttonClassName="" isLoading />;

	return (
		<button className="whitespace-nowrap text-sm" onClick={onButtonClick}>
			{!wallet?.isActive ? (
				<Fragment>Connect Wallet</Fragment>
			) : (
				<Fragment>
					Connected.
					<span
						onClick={() => disconnectWallet()}
						className="text-blue cursor-pointer font-semibold hover:text-indigo-400 ml-2"
					>
						Logout?
					</span>
				</Fragment>
			)}
		</button>
	);
};

export default ConnectWallet;
