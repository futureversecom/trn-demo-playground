import { atom, useAtom } from "jotai";

import { Demos } from "@/libs/constants";
import type { Demo } from "@/libs/types";

const demoAtom = atom<Demo>(Demos[0]);

export function useDemo() {
	return useAtom(demoAtom);
}
