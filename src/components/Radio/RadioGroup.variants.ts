import { cva, type VariantProps } from 'class-variance-authority';

export const radioGroupVariants = cva(['flex'], {
	variants: {
		orientation: {
			vertical: ['flex-col', 'gap-2'],
			horizontal: ['flex-row', 'gap-4', 'flex-wrap'],
		},
		fullWidth: {
			true: 'w-full',
			false: 'w-auto',
		},
	},
	defaultVariants: { orientation: 'vertical', fullWidth: false },
});

export type RadioGroupVariantProps = VariantProps<typeof radioGroupVariants>;
