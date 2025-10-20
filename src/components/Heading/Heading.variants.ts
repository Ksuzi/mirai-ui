import { cva, type VariantProps } from 'class-variance-authority';

export const headingVariants = cva(['font-semibold', 'leading-tight', 'tracking-tight'], {
	variants: {
		size: {
			xs: ['text-xs', 'leading-4'],
			sm: ['text-sm', 'leading-5'],
			md: ['text-base', 'leading-6'],
			lg: ['text-lg', 'leading-7'],
			xl: ['text-xl', 'leading-7'],
			'2xl': ['text-2xl', 'leading-8'],
			'3xl': ['text-3xl', 'leading-9'],
			'4xl': ['text-4xl', 'leading-10'],
			'5xl': ['text-5xl', 'leading-none'],
			'6xl': ['text-6xl', 'leading-none'],
			'7xl': ['text-7xl', 'leading-none'],
		},
		colorPalette: {
			gray: ['text-gray-900'],
			red: ['text-red-600'],
			orange: ['text-orange-600'],
			yellow: ['text-yellow-600'],
			green: ['text-green-600'],
			teal: ['text-teal-600'],
			blue: ['text-blue-600'],
			cyan: ['text-cyan-600'],
			purple: ['text-purple-600'],
			pink: ['text-pink-600'],
		},
	},
	defaultVariants: {
		size: 'xl',
		colorPalette: 'gray',
	},
});

export type HeadingVariantProps = VariantProps<typeof headingVariants>;
