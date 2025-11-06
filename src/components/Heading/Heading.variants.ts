import { cva, type VariantProps } from 'class-variance-authority';

export const headingVariants = cva([], {
	variants: {
		variant: {
			display: ['typo-display'],
			h1: ['typo-h1'],
			h2: ['typo-h2'],
			h3: ['typo-h3'],
			h4: ['typo-h4'],
			h5: ['typo-h5'],
			h6: ['typo-h6'],
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
		},
	},
	defaultVariants: {
		variant: 'h2',
		colorScheme: 'default',
	},
});

export type HeadingVariantProps = VariantProps<typeof headingVariants>;
