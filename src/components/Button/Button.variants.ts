import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
	[
		'inline-flex',
		'items-center',
		'justify-center',
		'cursor-pointer',
		'rounded-md',
		'font-medium',
		'transition-all',
		'duration-300',
		'focus:outline-none',
		'focus-visible:outline-none',
		'focus-visible:ring-2',
		'focus-visible:ring-ring',
		'focus-visible:ring-offset-2',
		'disabled:opacity-50',
		'disabled:cursor-not-allowed',
		'disabled:pointer-events-none',
	],
	{
		variants: {
			variant: {
				solid: ['shadow-sm', 'hover:shadow'],
				outline: ['border-1', 'bg-transparent', 'shadow-sm'],
				ghost: ['shadow-none', 'hover:shadow-xs'],
				link: ['bg-transparent', 'shadow-none', 'underline-offset-4', 'hover:underline', 'px-0'],
			},

			colorScheme: {
				primary: [],
				secondary: [],
				success: [],
				warning: [],
				error: [],
				info: [],
				muted: [],
			},

			size: {
				sm: ['px-3', 'py-1.5', 'text-sm', 'gap-1.5'],
				md: ['px-4', 'py-2', 'text-base', 'gap-1.5'],
				lg: ['px-6', 'py-3', 'text-lg', 'gap-2'],
				xl: ['px-8', 'py-4', 'text-xl', 'gap-2.5'],
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
				variant: 'solid',
				colorScheme: 'primary',
				class: 'bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white',
			},
			{
				variant: 'solid',
				colorScheme: 'secondary',
				class: 'bg-secondary-600 hover:bg-secondary-500 active:bg-secondary-700 text-white',
			},
			{
				variant: 'solid',
				colorScheme: 'success',
				class: 'bg-success-600 hover:bg-success-500 active:bg-success-700 text-white',
			},
			{
				variant: 'solid',
				colorScheme: 'warning',
				class: 'bg-warning-600 hover:bg-warning-500 active:bg-warning-700 text-white',
			},
			{
				variant: 'solid',
				colorScheme: 'error',
				class: 'bg-error-600 hover:bg-error-500 active:bg-error-700 text-white',
			},
			{
				variant: 'solid',
				colorScheme: 'info',
				class: 'bg-info-600 hover:bg-info-500 active:bg-info-700 text-white',
			},
			{
				variant: 'solid',
				colorScheme: 'muted',
				class: 'bg-muted-200 hover:bg-muted-300 active:bg-muted-400 text-muted-700',
			},

			// ========== OUTLINE + COLORS ==========
			{
				variant: 'outline',
				colorScheme: 'primary',
				class:
					'border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white active:bg-primary-700 active:text-white',
			},
			{
				variant: 'outline',
				colorScheme: 'secondary',
				class:
					'border-secondary-600 text-secondary-600 hover:bg-secondary-600 hover:text-white active:bg-secondary-700 active:text-white',
			},
			{
				variant: 'outline',
				colorScheme: 'success',
				class:
					'border-success-600 text-success-600 hover:bg-success-600 hover:text-white active:bg-success-700 active:text-white',
			},
			{
				variant: 'outline',
				colorScheme: 'warning',
				class:
					'border-warning-600 text-warning-600 hover:bg-warning-600 hover:text-white active:bg-warning-700 active:text-white',
			},
			{
				variant: 'outline',
				colorScheme: 'error',
				class:
					'border-error-600 text-error-600 hover:bg-error-600 hover:text-white active:bg-error-700 active:text-white',
			},
			{
				variant: 'outline',
				colorScheme: 'info',
				class: 'border-info-600 text-info-600 hover:bg-info-600 hover:text-white active:bg-info-700 active:text-white',
			},
			{
				variant: 'outline',
				colorScheme: 'muted',
				class: 'border-border text-muted-700 hover:bg-muted-600 hover:text-white active:bg-muted-700 active:text-white',
			},

			// ========== GHOST + COLORS ==========
			{
				variant: 'ghost',
				colorScheme: 'primary',
				class: 'text-primary-600 hover:bg-primary-50 active:bg-primary-100 ',
			},
			{
				variant: 'ghost',
				colorScheme: 'secondary',
				class: 'text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100',
			},
			{
				variant: 'ghost',
				colorScheme: 'success',
				class: 'text-success-600 hover:bg-success-50 active:bg-success-100',
			},
			{
				variant: 'ghost',
				colorScheme: 'warning',
				class: 'text-warning-600 hover:bg-warning-50 active:bg-warning-100',
			},
			{
				variant: 'ghost',
				colorScheme: 'error',
				class: 'text-error-600 hover:bg-error-50 active:bg-error-100',
			},
			{
				variant: 'ghost',
				colorScheme: 'info',
				class: 'text-info-600 hover:bg-info-50 active:bg-info-100',
			},
			{
				variant: 'ghost',
				colorScheme: 'muted',
				class: 'text-muted-700 hover:bg-muted-100 active:bg-muted-200',
			},

			// ========== LINK + COLORS ==========
			{
				variant: 'link',
				colorScheme: 'primary',
				class: 'text-primary-600 hover:text-primary-500 active:text-primary-700',
			},
			{
				variant: 'link',
				colorScheme: 'secondary',
				class: 'text-secondary-600 hover:text-secondary-500 active:text-secondary-700',
			},
			{
				variant: 'link',
				colorScheme: 'success',
				class: 'text-success-600 hover:text-success-500 active:text-success-700',
			},
			{
				variant: 'link',
				colorScheme: 'warning',
				class: 'text-warning-600 hover:text-warning-500 active:text-warning-700',
			},
			{
				variant: 'link',
				colorScheme: 'error',
				class: 'text-error-600 hover:text-error-500 active:text-error-700',
			},
			{
				variant: 'link',
				colorScheme: 'info',
				class: 'text-info-600 hover:text-info-500 active:text-info-700',
			},
			{
				variant: 'link',
				colorScheme: 'muted',
				class: 'text-muted-600 hover:text-muted-500 active:text-muted-700',
			},

			// ========== LOADING STATES ==========
			{
				variant: 'solid',
				loading: true,
				class: 'opacity-70',
			},
			{
				variant: 'outline',
				loading: true,
				class: 'border-border',
			},
			{
				variant: 'ghost',
				loading: true,
				class: 'bg-muted-100',
			},
		],

		defaultVariants: {
			variant: 'solid',
			colorScheme: 'primary',
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

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export type IconSize = keyof typeof iconSizes;
