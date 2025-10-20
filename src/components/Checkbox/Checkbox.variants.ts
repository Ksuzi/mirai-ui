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
		'focus:outline-none',
		'cursor-pointer',
		'disabled:cursor-not-allowed',
		'disabled:opacity-50',
		'appearance-none',
		'bg-white',
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
			color: {
				base: ['border-blue-400', 'checked:bg-blue-500', 'hover:border-blue-300'],
				primary: ['border-primary-400', 'checked:bg-primary-500', 'hover:border-primary-300'],
				secondary: ['border-gray-400', 'checked:bg-gray-500', 'hover:border-gray-300'],
			},
		},
		defaultVariants: { size: 'md', color: 'base' },
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
