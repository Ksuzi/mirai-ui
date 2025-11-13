import { cva, type VariantProps } from 'class-variance-authority';

export const radioIconVariants = cva(
	[
		'absolute',
		'inset-0',
		'flex',
		'items-center',
		'justify-center',
		'pointer-events-none',
		'transition-transform',
		'duration-200',
	],
	{
		variants: {
			size: {
				sm: ['text-[0.5rem]'],
				md: ['text-[0.625rem]'],
				lg: ['text-[0.75rem]'],
				xl: ['text-[0.875rem]'],
			},
		},
		defaultVariants: { size: 'md' },
	}
);

export const radioIconDotVariants = cva(['rounded-full', 'bg-white', 'transition-all', 'duration-200', 'ease-in-out'], {
	variants: {
		size: {
			sm: ['w-1.5', 'h-1.5'],
			md: ['w-2', 'h-2'],
			lg: ['w-2.5', 'h-2.5'],
			xl: ['w-3', 'h-3'],
		},
		checked: {
			true: ['scale-100', 'opacity-100'],
			false: ['scale-0', 'opacity-0'],
		},
	},
	defaultVariants: { size: 'md', checked: false },
});

export type RadioIconVariantProps = VariantProps<typeof radioIconVariants>;
