/* eslint-disable @typescript-eslint/no-var-requires */

const config = require("tailwind.config.js");

module.exports = {
	plugins: {
		tailwindcss: { config },
		autoprefixer: {},
	},
};
