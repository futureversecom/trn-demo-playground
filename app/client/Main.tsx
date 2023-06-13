import type { FC } from "react";

import { useDemo } from "@/libs/hooks";

import { EvmFeeProxy } from "./";

export const Main: FC = () => {
	const [currentDemo] = useDemo();

	switch (currentDemo) {
		case "EvmFeeProxy":
			return <EvmFeeProxy />;
	}
};
