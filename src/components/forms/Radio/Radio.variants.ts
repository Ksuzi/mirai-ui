import { cva, type VariantProps } from 'class-variance-authority';

export const radioVariants = cva(
	[
		'relative',
		'inline-flex',
		'items-center',
		'justify-center',
		'border-2',
		'rounded-full',
		'transition-all',
		'duration-200',
		'focus:outline-none',
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

export type RadioVariantProps = VariantProps<typeof radioVariants>;
