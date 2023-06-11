import { PropsWithChildren } from "react";

import { Gilroy } from "../libs/assets/fonts";
import "../styles/globals.css";
import { Providers } from "./client";

export const metadata = {
	title: "The Root Network Demo Playground",
	description: "The Root Network Demo Playground",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" data-theme="trn" className={Gilroy.className}>
			<head>
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
			</head>
			<body className="text-white bg-black h-screen w-screen">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
