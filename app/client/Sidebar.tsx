import type { FC } from "react";

import { Demos } from "@/libs/constants";
import { useDemo } from "@/libs/hooks";

export const Sidebar: FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setDemo] = useDemo();

	return (
		<div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
			<div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
				<ul className="flex flex-col py-4 space-y-1">
					<li className="px-5 hidden md:block">
						<div className="flex flex-row items-center h-8">
							<div className="text-sm font-light tracking-wide text-gray-400 uppercase">Demos</div>
						</div>
					</li>
					{Demos.map((demo) => (
						<li key={demo} onClick={() => setDemo(demo)}>
							<a
								href="#"
								className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
							>
								<span className="inline-flex justify-center items-center ml-4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</span>
								<span className="ml-2 text-sm tracking-wide truncate">{demo}</span>
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
