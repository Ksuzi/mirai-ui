import { cva, type VariantProps } from 'class-variance-authority';

export const textVariants = cva([], {
	variants: {
		variant: {
			'body-lg': ['typo-body-lg'],
			body: ['typo-body'],
			'body-sm': ['typo-body-sm'],
			caption: ['typo-caption'],
			overline: ['typo-overline'],
			code: ['typo-code'],
			label: ['block', 'font-medium'],
			'helper-text': [],
		},

		colorScheme: {
			default: ['text-foreground'],
			muted: ['text-foreground-muted'],
			primary: ['text-primary-600'],
			secondary: ['text-secondary-600'],
			success: ['text-success-600'],
			warning: ['text-warning-600'],
			error: ['text-error-600'],
			info: ['text-info-600'],
			accent: ['text-accent-600'],
			disabled: ['text-disabled-foreground'],
		},

		size: {
			sm: [],
			md: [],
			lg: [],
			xl: [],
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

		align: {
			left: ['text-left'],
			center: ['text-center'],
			right: ['text-right'],
			justify: ['text-justify'],
		},
	},
	compoundVariants: [
		{ variant: 'label', size: 'sm', class: 'text-sm mb-1' },
		{ variant: 'label', size: 'md', class: 'text-base mb-1.5' },
		{ variant: 'label', size: 'lg', class: 'text-lg mb-2' },
		{ variant: 'label', size: 'xl', class: 'text-xl mb-2.5' },

		{ variant: 'helper-text', size: 'sm', class: 'text-xs mt-1' },
		{ variant: 'helper-text', size: 'md', class: 'text-sm mt-1.5' },
		{ variant: 'helper-text', size: 'lg', class: 'text-base mt-2' },
		{ variant: 'helper-text', size: 'xl', class: 'text-lg mt-2.5' },

		{ variant: 'helper-text', colorScheme: 'default', class: 'text-foreground-muted' },
	],
	defaultVariants: {
		variant: 'body',
		colorScheme: 'default',
	},
});

export type TextVariantProps = VariantProps<typeof textVariants>;
