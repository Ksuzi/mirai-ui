import { cva, type VariantProps } from 'class-variance-authority';

export const checkboxVariants = cva(
	[
		'inline-flex',
		'items-center',
		'justify-center',
		'border-2',
		'rounded',
		'transition-colors',
		'focus:outline-none',
		'cursor-pointer',
		'disabled:cursor-not-allowed',
		'disabled:opacity-50',
	],
	{
		variants: {
			size: {
				sm: ['w-4', 'h-4', 'text-xs'],
				md: ['w-5', 'h-5', 'text-sm'],
				lg: ['w-6', 'h-6', 'text-base'],
				xl: ['w-7', 'h-7', 'text-lg'],
			},
		},
		defaultVariants: { size: 'md' },
	}
);

export const checkboxLabelVariants = cva(['select-none', 'cursor-pointer'], {
	variants: {
		size: {
			sm: ['text-sm', 'ml-2'],
			md: ['text-base', 'ml-2'],
			lg: ['text-lg', 'ml-3'],
			xl: ['text-xl', 'ml-3'],
		},
		disabled: {
			true: ['cursor-not-allowed', 'opacity-50'],
			false: [],
		},
	},
	defaultVariants: { size: 'md', disabled: false },
});

export type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;
export type CheckboxLabelVariantProps = VariantProps<typeof checkboxLabelVariants>;
