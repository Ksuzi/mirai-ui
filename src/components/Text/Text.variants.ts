import { cva, type VariantProps } from 'class-variance-authority';

export const textVariants = cva(['text-gray-900'], {
	variants: {
		textStyle: {
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
		fontWeight: {
			light: ['font-light'],
			normal: ['font-normal'],
			medium: ['font-medium'],
			semibold: ['font-semibold'],
			bold: ['font-bold'],
		},
		truncate: {
			true: ['truncate'],
		},
		lineClamp: {
			1: ['line-clamp-1'],
			2: ['line-clamp-2'],
			3: ['line-clamp-3'],
			4: ['line-clamp-4'],
			5: ['line-clamp-5'],
			6: ['line-clamp-6'],
		},
		colorPalette: {
			gray: ['text-gray-800'],
			red: ['text-red-600'],
			orange: ['text-orange-600'],
			yellow: ['text-yellow-600'],
			green: ['text-green-600'],
			teal: ['text-teal-600'],
			blue: ['text-blue-600'],
			cyan: ['text-cyan-600'],
			purple: ['text-purple-600'],
			pink: ['text-pink-600'],
			muted: ['text-gray-600'],
		},
	},
	defaultVariants: {
		textStyle: 'md',
		fontWeight: 'normal',
		colorPalette: 'gray',
	},
});

export type TextVariantProps = VariantProps<typeof textVariants>;
