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
	defaultVariants: {
		variant: 'body',
		colorScheme: 'default',
	},
});

export type TextVariantProps = VariantProps<typeof textVariants>;
