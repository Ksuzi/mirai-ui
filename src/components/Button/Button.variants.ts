import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
	[
		'inline-flex',
		'items-center',
		'justify-center',
		'rounded',
		'font-medium',
		'focus:outline-none',
		'focus:ring-2',
		'hover:cursor-pointer',
		'focus:ring-offset-2',
		'focus-visible:outline-none',
		'focus-visible:ring-2',
		'focus-visible:ring-offset-2',
		'transition-all',
		'duration-200',
		'disabled:opacity-50',
		'disabled:cursor-not-allowed',
	],
	{
		variants: {
			variant: {
				primary: ['bg-primary-600', 'hover:bg-primary-500', 'focus:ring-primary-500', 'text-white'],
				secondary: ['bg-secondary-600', 'hover:bg-secondary-500', 'focus:ring-secondary-500', 'text-white'],
				outline: [
					'border-2',
					'border-primary-600',
					'text-primary-600',
					'hover:bg-primary-500',
					'hover:text-white',
					'focus:ring-primary-500',
				],
				ghost: ['text-primary-600', 'hover:bg-primary-50', 'focus:ring-primary-500'],
				link: ['text-primary-600', 'hover:text-primary-700', 'underline', 'bg-transparent'],
				success: ['bg-success-600', 'hover:bg-success-500', 'focus:ring-success-500', 'text-white'],
				warning: ['bg-warning-600', 'hover:bg-warning-500', 'focus:ring-warning-500', 'text-white'],
				error: ['bg-error-600', 'hover:bg-error-500', 'focus:ring-error-500', 'text-white'],
			},

			size: {
				sm: ['px-3', 'py-1.5', 'text-sm'],
				md: ['px-4', 'py-2', 'text-base'],
				lg: ['px-6', 'py-3', 'text-lg'],
				xl: ['px-8', 'py-4', 'text-xl'],
			},

			fullWidth: {
				true: 'w-full',
				false: 'w-auto',
			},

			loading: {
				true: 'cursor-wait',
				false: '',
			},
		},

		compoundVariants: [
			{
				variant: 'outline',
				size: 'sm',
				class: 'border',
			},
			{
				variant: 'ghost',
				loading: true,
				class: 'bg-gray-100',
			},
			{
				variant: 'outline',
				loading: true,
				class: 'border-gray-300',
			},
			{
				variant: 'error',
				loading: true,
				class: 'bg-error-400',
			},
		],

		defaultVariants: {
			variant: 'primary',
			size: 'md',
			fullWidth: false,
			loading: false,
		},
	}
);

export const iconSizes = {
	sm: 'h-3 w-3',
	md: 'h-4 w-4',
	lg: 'h-5 w-5',
	xl: 'h-6 w-6',
} as const;

export const iconSpacing = {
	left: {
		sm: 'mr-1.5',
		md: 'mr-2',
		lg: 'mr-2.5',
		xl: 'mr-3',
	},
	right: {
		sm: 'ml-1.5',
		md: 'ml-2',
		lg: 'ml-2.5',
		xl: 'ml-3',
	},
} as const;

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export type IconSize = keyof typeof iconSizes;
