import { cva, type VariantProps } from 'class-variance-authority';

export const labelVariants = cva(['block', 'font-medium', 'text-foreground'], {
	variants: {
		size: {
			sm: ['text-sm', 'mb-1'],
			md: ['text-base', 'mb-1.5'],
			lg: ['text-lg', 'mb-2'],
			xl: ['text-xl', 'mb-2.5'],
		},
		disabled: {
			true: ['text-disabled-foreground', 'cursor-not-allowed'],
			false: [],
		},
	},
	defaultVariants: {
		size: 'md',
		disabled: false,
	},
});

export type LabelVariantProps = VariantProps<typeof labelVariants>;
