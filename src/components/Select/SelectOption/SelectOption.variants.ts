import { cva, type VariantProps } from 'class-variance-authority';

export const selectOptionVariants = cva(['px-4', 'py-2', 'cursor-pointer', 'transition-colors', 'duration-150'], {
	variants: {
		selected: {
			true: 'bg-primary-50 text-primary-700 font-medium',
			false: 'text-foreground',
		},
		highlighted: {
			true: 'bg-muted-100',
			false: '',
		},
		disabled: {
			true: 'opacity-50 cursor-not-allowed',
			false: 'hover:bg-muted-50',
		},
	},
	compoundVariants: [
		{
			selected: true,
			highlighted: true,
			class: 'bg-primary-100',
		},
	],
	defaultVariants: {
		selected: false,
		highlighted: false,
		disabled: false,
	},
});

export type SelectOptionVariantProps = VariantProps<typeof selectOptionVariants>;
