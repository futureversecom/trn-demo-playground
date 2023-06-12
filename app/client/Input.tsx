import type { ChangeEvent, FC } from "react";

interface InputProps {
	id: string;
	label: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	placeholder?: string;
}

export const Input: FC<InputProps> = ({ label, id, value, onChange, disabled, placeholder }) => {
	return (
		<div className="mt-2 max-w-xl text-sm text-gray-500 mx-auto">
			<div>
				<label htmlFor={id} className="block text-sm font-medium text-white">
					{label}
				</label>
				<div className="mt-1">
					<input
						id={id}
						value={value}
						onChange={onChange}
						disabled={disabled}
						placeholder={placeholder}
						className="block w-full appearance-none rounded-sm border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					/>
				</div>
			</div>
		</div>
	);
};
