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
		'focus:ring-offset-2',
		'transition-all',
		'duration-200',
		'disabled:opacity-50',
		'disabled:cursor-not-allowed',
	],
	{
		variants: {
			variant: {
				primary: ['bg-blue-600', 'hover:bg-blue-700', 'focus:ring-blue-500', 'text-white'],
				secondary: ['bg-gray-600', 'hover:bg-gray-700', 'focus:ring-gray-500', 'text-white'],
				outline: [
					'border-2',
					'border-blue-600',
					'text-blue-600',
					'hover:bg-blue-600',
					'hover:text-white',
					'focus:ring-blue-500',
				],
				ghost: ['text-blue-600', 'hover:bg-blue-50', 'focus:ring-blue-500'],
				destructive: ['bg-red-600', 'hover:bg-red-700', 'focus:ring-red-500', 'text-white'],
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
		],

		defaultVariants: {
			variant: 'primary',
			size: 'md',
			fullWidth: false,
			loading: false,
		},
	}
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
