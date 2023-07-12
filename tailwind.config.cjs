/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'dark': '#050505',
				'dark-1': '#121212',
				'dark-2': '#242424',
				'light': '#F6F6F6',
				'light-1': '#9A9A9A',
				'primary': '#2667FF',
				'primary-dark': '#3B28CC',
				'secondary': '#FFC700',
				'secondary-dark': '#F2A000',
				'tertiary': '#4CC700',
				'tertiary-dark': '#0C9B00',
			},
			fontFamily: {
				'sans': ['JetBrains Mono', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
