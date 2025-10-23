import { cva, type VariantProps } from 'class-variance-authority';

export const headingVariants = cva([], {
	variants: {
		// SEMANTIC VARIANTS (use design tokens)
		variant: {
			display: [
				'text-[length:var(--font-size-display)]',
				'font-[number:var(--font-weight-display)]',
				'leading-[var(--line-height-display)]',
				'tracking-[var(--letter-spacing-display)]',
			],
			h1: [
				'text-[length:var(--font-size-h1)]',
				'font-[number:var(--font-weight-h1)]',
				'leading-[var(--line-height-h1)]',
				'tracking-[var(--letter-spacing-h1)]',
			],
			h2: [
				'text-[length:var(--font-size-h2)]',
				'font-[number:var(--font-weight-h2)]',
				'leading-[var(--line-height-h2)]',
				'tracking-[var(--letter-spacing-h2)]',
			],
			h3: [
				'text-[length:var(--font-size-h3)]',
				'font-[number:var(--font-weight-h3)]',
				'leading-[var(--line-height-h3)]',
				'tracking-[var(--letter-spacing-h3)]',
			],
			h4: [
				'text-[length:var(--font-size-h4)]',
				'font-[number:var(--font-weight-h4)]',
				'leading-[var(--line-height-h4)]',
				'tracking-[var(--letter-spacing-h4)]',
			],
			h5: [
				'text-[length:var(--font-size-h5)]',
				'font-[number:var(--font-weight-h5)]',
				'leading-[var(--line-height-h5)]',
				'tracking-[var(--letter-spacing-h5)]',
			],
			h6: [
				'text-[length:var(--font-size-h6)]',
				'font-[number:var(--font-weight-h6)]',
				'leading-[var(--line-height-h6)]',
				'tracking-[var(--letter-spacing-h6)]',
			],
		},

		colorScheme: {
			default: ['text-foreground'],
			muted: ['text-foreground-muted'],
			primary: ['text-primary-600'],
			secondary: ['text-secondary-600'],
			success: ['text-success-600'],
			warning: ['text-warning-600'],
			error: ['text-error-600'],
			info: ['text-info-600'],
			accent: ['text-accent-600'],
		},
	},
	defaultVariants: {
		variant: 'h2',
		colorScheme: 'default',
	},
});

export type HeadingVariantProps = VariantProps<typeof headingVariants>;
