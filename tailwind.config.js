/* eslint-disable @typescript-eslint/no-var-requires */

const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["app/**/*.{js,ts,jsx,tsx}", "libs/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-gilroy)", ...fontFamily.sans],
			},
			colors: {
				"blue": "#6366F1",
				"off-white": "#D0D0D1",
			},
		},
	},
	daisyui: {
		themes: [
			{
				trn: {
					"primary": "#6366F1",

					"secondary": "#D926A9",

					"accent": "#1FB2A6",

					"neutral": "#191D24",

					"base-100": "#1C1C1C",

					"info": "#3ABFF8",

					"success": "#36D399",

					"warning": "#FBBD23",

					"error": "#F87272",

					"--animation-btn": "0s",
				},
			},
		],
	},
	plugins: [require("daisyui")],
};
