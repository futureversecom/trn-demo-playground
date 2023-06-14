import type { FC } from "react";

import { EvmFeeProxy } from "@/libs/demos";
import { useDemo } from "@/libs/hooks";

export const Main: FC = () => {
	const [currentDemo] = useDemo();

	switch (currentDemo) {
		case "EvmFeeProxy":
			return <EvmFeeProxy />;
	}
};
