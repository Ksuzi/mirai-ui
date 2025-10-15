import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
	[
		'block',
		'w-full',
		'rounded',
		'border',
		'font-medium',
		'focus:outline-none',
		'focus-visible:outline-none',
		'transition-all',
		'duration-200',
		'disabled:opacity-50',
		'disabled:cursor-not-allowed',
		'placeholder:text-gray-400',
	],
	{
		variants: {
			variant: {
				default: ['border-gray-300', 'bg-white', 'text-gray-900', 'focus:border-primary-500', 'focus:ring-primary-500'],
				outlined: [
					'border-2',
					'border-gray-300',
					'bg-transparent',
					'text-gray-900',
					'focus:border-primary-500',
					'focus:ring-primary-500',
				],
				filled: ['border-0', 'bg-gray-100', 'text-gray-900', 'focus:bg-gray-50', 'focus:ring-primary-500'],
				borderless: ['border-0', 'bg-transparent', 'text-gray-900', 'focus:ring-primary-500', 'focus:ring-offset-0'],
				underlined: [
					'border-0',
					'border-b-2',
					'border-gray-300',
					'bg-transparent',
					'text-gray-900',
					'rounded-none',
					'focus:border-primary-500',
					'focus:ring-0',
					'focus:ring-offset-0',
				],
				error: ['border-error-300', 'bg-white', 'text-gray-900', 'focus:border-error-500', 'focus:ring-error-500'],
				success: [
					'border-success-300',
					'bg-white',
					'text-gray-900',
					'focus:border-success-500',
					'focus:ring-success-500',
				],
				warning: [
					'border-warning-300',
					'bg-white',
					'text-gray-900',
					'focus:border-warning-500',
					'focus:ring-warning-500',
				],
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
		},

		compoundVariants: [
			{
				variant: 'error',
				size: 'sm',
				class: 'border-2',
			},
			{
				variant: 'success',
				size: 'sm',
				class: 'border-2',
			},
			{
				variant: 'warning',
				size: 'sm',
				class: 'border-2',
			},
			// Error state overrides for new variants
			{
				variant: 'outlined',
				class: 'border-2',
			},
			{
				variant: 'filled',
				class: 'border border-transparent',
			},
			{
				variant: 'borderless',
				class: 'border-b border-transparent',
			},
			{
				variant: 'underlined',
				class: 'border-b-2',
			},
		],

		defaultVariants: {
			variant: 'default',
			size: 'md',
			fullWidth: true,
		},
	}
);

export const labelVariants = cva(['block', 'font-medium', 'text-gray-700'], {
	variants: {
		size: {
			sm: ['text-sm', 'mb-1'],
			md: ['text-base', 'mb-1.5'],
			lg: ['text-lg', 'mb-2'],
			xl: ['text-xl', 'mb-2.5'],
		},
		required: {
			true: "after:content-['*'] after:ml-0.5 after:text-error-500",
			false: '',
		},
	},
	defaultVariants: {
		size: 'md',
		required: false,
	},
});

export const helperTextVariants = cva(['text-gray-600'], {
	variants: {
		size: {
			sm: ['text-xs', 'mt-1'],
			md: ['text-sm', 'mt-1.5'],
			lg: ['text-base', 'mt-2'],
			xl: ['text-lg', 'mt-2.5'],
		},
		variant: {
			default: 'text-gray-600',
			error: 'text-error-600',
			success: 'text-success-600',
			warning: 'text-warning-600',
		},
	},
	defaultVariants: {
		size: 'md',
		variant: 'default',
	},
});

export type InputVariantProps = VariantProps<typeof inputVariants>;
export type LabelVariantProps = VariantProps<typeof labelVariants>;
export type HelperTextVariantProps = VariantProps<typeof helperTextVariants>;
