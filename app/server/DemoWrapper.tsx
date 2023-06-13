import type { FC, PropsWithChildren } from "react";

export const DemoWrapper: FC<PropsWithChildren> = ({ children }) => (
	<div className="h-full ml-14 mt-14 mb-10 md:ml-64">
		<div className="flex justify-center">
			<div className="space-y-6 py-10 w-1/2">{children}</div>
		</div>
	</div>
);
