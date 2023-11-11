/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					10: "#1b3a4b",
					20: "#144552",
					30: "#0b525b",
					40: "#065a60",
					50: "#006466",
				},
				secondary: {
					10: "#212f45",
					20: "#272640",
					30: "#312244",
					40: "#3e1f47",
					50: "#4d194d",
				},
			},
		},
	},
	plugins: [],
};
