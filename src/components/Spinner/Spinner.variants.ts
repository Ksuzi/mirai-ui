import { cva, type VariantProps } from 'class-variance-authority';

export const spinnerVariants = cva(['animate-spin'], {
	variants: {
		size: {
			sm: ['h-3', 'w-3'],
			md: ['h-4', 'w-4'],
			lg: ['h-5', 'w-5'],
			xl: ['h-6', 'w-6'],
		},
		colorScheme: {
			primary: ['text-primary-600'],
			secondary: ['text-secondary-600'],
			success: ['text-success-600'],
			warning: ['text-warning-600'],
			error: ['text-error-600'],
			info: ['text-info-600'],
			muted: ['text-muted-600'],
			base: ['text-current'],
		},
	},
	defaultVariants: {
		size: 'md',
		colorScheme: 'base',
	},
});

export type SpinnerVariantProps = VariantProps<typeof spinnerVariants>;
