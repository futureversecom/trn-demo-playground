import clsx from "clsx";
import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	buttonClassName?: string;
	variant?: "small" | "large";
}

export const Button: FC<ButtonProps> = ({
	isLoading,
	buttonClassName,
	type = "button",
	variant = "large",
	children,
	...props
}) => {
	return (
		<button
			type={type}
			className={clsx(
				buttonClassName,
				"btn btn-outline rounded-sm focus:outline-none",
				{
					small: "w-[145px] px-[16px] py-[10px] mx-auto",
					large: "w-full",
				}[variant]
			)}
			{...props}
		>
			{isLoading && <span className="loading loading-spinner loading-xs"></span>}
			{children}
		</button>
	);
};
