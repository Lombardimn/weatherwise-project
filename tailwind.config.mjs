/** @type {import('tailwindcss').Config} */
import animations from '@midudev/tailwind-animations'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary-color': 'var(--primary-color)',
				'on-primary-color': 'var(--on-primary-color)',
				'background-color': 'var(--background-color)',
				'on-background-color': 'var(--on-background-color)',
				'surface-color': 'var(--surface-color)',
				'on-surface-color': 'var(--on-surface-color)',
				'on-surface-variant-color': 'var(--on-surface-variant-color)',
				'on-surface-variant-2-color': 'var(--on-surface-variant-2-color)',
				'outline-color': 'var(--outline-color)',
				'aqi-1-color': 'var(--bg-aqi-1-color)', /* Air Quality Index */
				'on-aqi-1-color': 'var(--on-bg-aqi-1-color)',
				'aqi-2-color': 'var(--bg-aqi-2-color)',
				'on-aqi-2-color': 'var(--on-bg-aqi-2-color)',
				'aqi-3-color': 'var(--bg-aqi-3-color)',
				'on-aqi-3-color':  'var(--on-bg-aqi-3-color)',
				'aqi-4-color': 'var(--bg-aqi-4-color)',
				'on-aqi-4-color': 'var(--on-bg-aqi-4-color)',
				'aqi-5-color': 'var(--bg-aqi-5-color)',
				'on-aqi-5-color': 'var(--on-bg-aqi-5-color)',
				'white': 'var(--white)',
				'white-alpha-4': 'var(--white-alpha-4)',
				'white-alpha-8': 'var(--white-alpha-8)',
				'black-alpha-10': 'var(--black-alpha-10)',
			},
			boxShadow: {
				'shadow1': '0px 1px 3px hsla(0, 0%, 0%, 0.5)',
				'shadow2': '0px 3px 6px hsla(0, 0%, 0%, 0.4)',
			},
			backgroundImage: {
				'gradient': 'linear-gradient(180deg, hsla(270, 5%, 7%, 0) 0%, hsla(270, 5%, 7%, 0.8) 65%,	hsla(270, 5%, 7%) 100%)',
			},
			fontSize: {
			'heading': '5.6rem',
			'heading2': '3.2rem',
			'heading3': '4rem',
			'heading4': '3rem',
			'h1': '2rem',
			'h2': '1.8rem',
			'h3': '1.6rem',
			'h4': '1.4rem',
			'h5': '1.2rem',
			'h6': '1rem',
			'body': '2.2rem',
			'body2': '2rem',
			'body3': '1.6rem',
			'body4': '1.2rem',
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
			animation: {
				'loading': 'loading 1s linear infinite',
				'rotate': 'rotate 2s linear infinite',
				'ripple': 'ripple 250ms ease forwards',
			},
			keyframes:{
				'loading': {
					'0%': { transform: 'translateY(-50%) rotate(0)' },
					'100%': { transform: 'translateY(-50%) rotate(1turn)' },
				},
				'ripple': {
					'0%': { clipPath: 'circle(0% at 50% 50%)' },
					'100%': { clipPath: 'circle(100% at 50% 50%)' },
				}
			},
			clipPath: {
        circle: 'circle(4% at calc(100% - 102px) 5%)',
				circle2: 'circle(130% at 73% 5%)',
				circle3: 'circle(100% at 50% 50%)',
				circle4: 'circle(100% at calc(100% - 273px) 6%)',
      },
			flex: {
				'2': '1 1 100%'
			},
		}
	},
}
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/typography'),
		animations
	]
