/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary-color': '#B5A1E5',
				'on-primary-color': '#100E17',
				'background-color': '#131214',
				'on-background-color': '#EAE6F2',
				'surface-color': '#1D1C1F',
				'on-surface-color': '#DDDAE5',
				'on-surface-variant-color': '#7b7980',
				'on-surface-variant-2-color': '#B9B6BF',
				'outline-color': '#3E3D40',
				'aqi-1-color': '#89E589', /* Air Quality Index */
				'on-aqi-1-color': '#1F331F',
				'aqi-2-color': '#E5DD89',
				'on-aqi-2-color': '#33311F',
				'aqi-3-color': '#E5C089',
				'on-aqi-3-color': '#332B1F',
				'aqi-4-color': '#E58989',
				'on-aqi-4-color': '#331F1F',
				'aqi-5-color': '#E589B7',
				'on-aqi-5-color': '#331F29',
				'white': 'hsl(0, 0%, 100%)',
				'white-alpha-4': 'hsla(0, 0%, 100%, 0.04)',
				'white-alpha-8': 'hsla(0, 0%, 100%, 0.08)',
				'black-alpha-10': 'hsla(0, 0%, 0%, 0.1)',
			},
			backgroundImage: {
				'gradient': 'linear-gradient(180deg, hsla(270, 5%, 7%, 0) 0%, hsla(270, 5%, 7%, 0.8) 65%,	hsla(270, 5%, 7%) 100%)',
			},
			fontSize: {
			'heading': '5.6rem',
			'heading2': '3.2rem',
			'heading3': '4rem',
			'h1': '2rem',
			'h2': '1.8rem',
			'h3': '1.6rem',
			'h4': '1.4rem',
			'h5': '1.2rem',
			'h6': '1rem',
			'body': '2.2rem',
			'body2': '2rem',
			'body3': '1.6rem',
			'label': '1.4rem',
			'label2': '1.2rem',
			},
			fontWeight:{
				regular: '400',
				medium: '500',
				semiBold: '600',
				bold: '700',
				black: '900',
			},
			keyframes:{
				loading: {
					'0%': '{ transform: translateY(-50%) rotate(0) }',
					'100%': '{ transform: translateY(-50%) rotate(1turn) }'
				}
			},
			animation: {
				'charging': 'loading 1s linear infinite'
			},
		}
	},
}
	plugins: []
