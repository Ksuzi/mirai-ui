import { cva, type VariantProps } from 'class-variance-authority';

export const fieldRootVariants = cva(['w-full'], {
	variants: {
		fullWidth: {
			true: 'w-full',
			false: 'w-auto',
		},
	},
	defaultVariants: {
		fullWidth: true,
	},
});

export type FieldRootVariantProps = VariantProps<typeof fieldRootVariants>;
