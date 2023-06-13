import type { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
}

export const Input: FC<InputProps> = ({ id, label, onChange, ...props }) => {
	return (
		<div className="mt-2 max-w-xl text-sm text-gray-500 mx-auto">
			<div>
				<label htmlFor={id} className="block text-sm font-medium text-white">
					{label}
				</label>
				<div className="mt-1">
					<input
						onChange={
							onChange ??
							(() => {
								/* no-op */
							})
						}
						className="block w-full appearance-none rounded-sm border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						{...props}
					/>
				</div>
			</div>
		</div>
	);
};
