/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#5630FF",
				secondary: "#ECECEC",
				"deep-blue": "#00156A",
				"light-blue": "#F3F6F9",
				"pale-blue": "#B9C1D9",
				"royal-indigo": "#2B3674",
				"tranquil-blue": "#8897AD",
				"silver-cloud": "#F3F3F3",
				"grayish-blue": "#F3F6F9",
				"han-purple": "#5630FF",
				"vivid-blue": "#4318FF",
				textDark: "#464E5F",
				"dark-indigo": "#0C1421",
				"dark-slate-blue": "#313957",
				"vibrant-green": "#20DC49",
			},
		},
	},
	plugins: [],
};
