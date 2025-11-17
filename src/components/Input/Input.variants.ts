import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
	[
		'block',
		'w-full',
		'rounded-md',
		'font-normal',
		'transition-all',
		'duration-200',
		'focus:outline-none',
		'focus-visible:outline-none',
		'disabled:opacity-50',
		'disabled:cursor-not-allowed',
		'disabled:bg-disabled',
		'disabled:text-disabled-foreground',
		'placeholder:text-muted-400',
	],
	{
		variants: {
			variant: {
				default: ['border', 'bg-input', 'shadow-xs'],
				outlined: ['border-1', 'bg-transparent', 'shadow-xs'],
				filled: ['border', 'border-transparent', 'shadow-xs'],
				borderless: ['border-0', 'bg-transparent', 'shadow-none'],
				underlined: ['border-0', 'border-b-2', 'bg-transparent', 'rounded-none', 'shadow-none', 'px-0'],
			},

			state: {
				default: [],
				error: [],
				success: [],
				warning: [],
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
				variant: 'default',
				state: 'default',
				class: 'border-input-border text-foreground focus:border-primary-500',
			},
			{
				variant: 'default',
				state: 'error',
				class: 'border-error-500 text-foreground focus:border-error-600',
			},
			{
				variant: 'default',
				state: 'success',
				class: 'border-success-500 text-foreground focus:border-success-600',
			},
			{
				variant: 'default',
				state: 'warning',
				class: 'border-warning-500 text-foreground focus:border-warning-600',
			},

			{
				variant: 'outlined',
				state: 'default',
				class: 'border-input-border text-foreground focus:border-primary-500',
			},
			{
				variant: 'outlined',
				state: 'error',
				class: 'border-error-500 text-foreground focus:border-error-600',
			},
			{
				variant: 'outlined',
				state: 'success',
				class: 'border-success-500 text-foreground focus:border-success-600',
			},
			{
				variant: 'outlined',
				state: 'warning',
				class: 'border-warning-500 text-foreground focus:border-warning-600',
			},

			{
				variant: 'filled',
				state: 'default',
				class: 'bg-muted-100 text-foreground hover:bg-muted-50 focus:bg-input',
			},
			{
				variant: 'filled',
				state: 'error',
				class: 'bg-error-50 text-foreground border-error-500 focus:bg-input',
			},
			{
				variant: 'filled',
				state: 'success',
				class: 'bg-success-50 text-foreground border-success-500 focus:bg-input',
			},
			{
				variant: 'filled',
				state: 'warning',
				class: 'bg-warning-50 text-foreground border-warning-500 focus:bg-input',
			},

			{
				variant: 'borderless',
				state: 'default',
				class: 'text-foreground',
			},
			{
				variant: 'borderless',
				state: 'error',
				class: 'text-error-600',
			},
			{
				variant: 'borderless',
				state: 'success',
				class: 'text-success-600',
			},
			{
				variant: 'borderless',
				state: 'warning',
				class: 'text-warning-600',
			},

			{
				variant: 'underlined',
				state: 'default',
				class: 'border-input-border text-foreground focus:border-primary-500',
			},
			{
				variant: 'underlined',
				state: 'error',
				class: 'border-error-500 text-foreground focus:border-error-600',
			},
			{
				variant: 'underlined',
				state: 'success',
				class: 'border-success-500 text-foreground focus:border-success-600',
			},
			{
				variant: 'underlined',
				state: 'warning',
				class: 'border-warning-500 text-foreground focus:border-warning-600',
			},
		],

		defaultVariants: {
			variant: 'default',
			state: 'default',
			size: 'md',
			fullWidth: true,
		},
	}
);

export type InputVariantProps = VariantProps<typeof inputVariants>;
