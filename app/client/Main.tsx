import { useDemo } from "@/libs/hooks";

import { EvmFeeProxy } from "./";

export default function Main() {
	const [currentDemo] = useDemo();

	switch (currentDemo) {
		case "EvmFeeProxy":
			return <EvmFeeProxy />;
	}
}
