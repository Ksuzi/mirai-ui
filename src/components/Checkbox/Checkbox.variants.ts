import { cva, type VariantProps } from 'class-variance-authority';

export const checkboxVariants = cva(
	[
		'relative',
		'inline-flex',
		'items-center',
		'justify-center',
		'border-2',
		'rounded',
		'transition-all',
		'duration-200',
		'motion-reduce:transition-none',
		'focus:outline-none',
		'focus-visible:outline-none',
		'focus-visible:ring-2',
		'focus-visible:ring-ring',
		'focus-visible:ring-offset-2',
		'cursor-pointer',
		'disabled:cursor-not-allowed',
		'disabled:opacity-50',
		'appearance-none',
		'bg-input',
		'border-input-border',
		'checked:border-transparent',
	],
	{
		variants: {
			size: {
				sm: ['w-4', 'h-4'],
				md: ['w-5', 'h-5'],
				lg: ['w-6', 'h-6'],
				xl: ['w-7', 'h-7'],
			},
			colorScheme: {
				primary: ['hover:border-primary-300', 'checked:bg-primary-600'],
				secondary: ['hover:border-secondary-300', 'checked:bg-secondary-600'],
				success: ['hover:border-success-300', 'checked:bg-success-600'],
				warning: ['hover:border-warning-300', 'checked:bg-warning-600'],
				error: ['hover:border-error-300', 'checked:bg-error-600'],
				info: ['hover:border-info-300', 'checked:bg-info-600'],
				muted: ['hover:border-muted-300', 'checked:bg-muted-600'],
			},
		},
		defaultVariants: { size: 'md', colorScheme: 'primary' },
	}
);

export type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;

/**
 * Wrapper size classes for accessibility - ensures minimum 24x24px touch target (WCAG 2.2 - 2.5.8)
 * while keeping visual size small
 */
export const checkboxWrapperSizeClasses: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
	sm: 'min-w-6 min-h-6 p-1',
	md: 'min-w-6 min-h-6 p-0.5',
	lg: 'min-w-6 min-h-6',
	xl: 'min-w-7 min-h-7',
} as const;
