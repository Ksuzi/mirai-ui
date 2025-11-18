import { cva, type VariantProps } from 'class-variance-authority';

export const switchTrackVariants = cva(
	[
		'relative',
		'inline-flex',
		'items-center',
		'shrink-0',
		'rounded-full',
		'transition-all',
		'duration-200',
		'cursor-pointer',
		'bg-muted-300',
	],
	{
		variants: {
			size: {
				sm: ['w-8', 'h-4'],
				md: ['w-11', 'h-6'],
				lg: ['w-14', 'h-7'],
				xl: ['w-16', 'h-8'],
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
			checked: {
				true: '',
				false: '',
			},
			loading: {
				true: 'opacity-70',
				false: '',
			},
			disabled: {
				true: 'cursor-not-allowed opacity-50',
				false: '',
			},
		},
		compoundVariants: [
			{ checked: true, colorScheme: 'primary', class: 'bg-primary-600' },
			{ checked: true, colorScheme: 'secondary', class: 'bg-secondary-600' },
			{ checked: true, colorScheme: 'success', class: 'bg-success-600' },
			{ checked: true, colorScheme: 'warning', class: 'bg-warning-600' },
			{ checked: true, colorScheme: 'error', class: 'bg-error-600' },
			{ checked: true, colorScheme: 'info', class: 'bg-info-600' },
			{ checked: true, colorScheme: 'muted', class: 'bg-muted-600' },
		],
		defaultVariants: {
			size: 'md',
			colorScheme: 'primary',
			checked: false,
			loading: false,
			disabled: false,
		},
	}
);

export const switchThumbVariants = cva(
	[
		'absolute',
		'left-0.5',
		'rounded-full',
		'bg-white',
		'transition-transform',
		'duration-200',
		'shadow-md',
		'flex',
		'items-center',
		'justify-center',
	],
	{
		variants: {
			size: {
				sm: ['w-3', 'h-3'],
				md: ['w-5', 'h-5'],
				lg: ['w-6', 'h-6'],
				xl: ['w-7', 'h-7'],
			},
			checked: {
				true: '',
				false: '',
			},
		},
		compoundVariants: [
			{ size: 'sm', checked: true, class: 'translate-x-4' },
			{ size: 'md', checked: true, class: 'translate-x-5' },
			{ size: 'lg', checked: true, class: 'translate-x-7' },
			{ size: 'xl', checked: true, class: 'translate-x-8' },
		],
		defaultVariants: {
			size: 'md',
			checked: false,
		},
	}
);

export type SwitchTrackVariantProps = VariantProps<typeof switchTrackVariants>;
export type SwitchThumbVariantProps = VariantProps<typeof switchThumbVariants>;
export type SwitchVariantProps = Pick<SwitchTrackVariantProps, 'size' | 'colorScheme'>;
