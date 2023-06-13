import { atom, useAtom } from "jotai";

type Demo = "EvmFeeProxy";
export const Demos: Array<Demo> = ["EvmFeeProxy"];

const demoAtom = atom<Demo>(Demos[0]);

export function useDemo() {
	return useAtom(demoAtom);
}
