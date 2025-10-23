import { cva, type VariantProps } from 'class-variance-authority';

export const textVariants = cva([], {
	variants: {
		// SEMANTIC TEXT STYLES (use design tokens)
		variant: {
			'body-lg': [
				'text-[length:var(--font-size-body-lg)]',
				'font-[number:var(--font-weight-body-lg)]',
				'leading-[var(--line-height-body-lg)]',
			],
			body: [
				'text-[length:var(--font-size-body)]',
				'font-[number:var(--font-weight-body)]',
				'leading-[var(--line-height-body)]',
			],
			'body-sm': [
				'text-[length:var(--font-size-body-sm)]',
				'font-[number:var(--font-weight-body-sm)]',
				'leading-[var(--line-height-body-sm)]',
			],
			caption: [
				'text-[length:var(--font-size-caption)]',
				'font-[number:var(--font-weight-caption)]',
				'leading-[var(--line-height-caption)]',
			],
			overline: [
				'text-[length:var(--font-size-overline)]',
				'font-[number:var(--font-weight-overline)]',
				'leading-[var(--line-height-overline)]',
				'tracking-[var(--letter-spacing-overline)]',
				'uppercase',
			],
			label: [
				'text-[length:var(--font-size-label)]',
				'font-[number:var(--font-weight-label)]',
				'leading-[var(--line-height-label)]',
			],
			button: [
				'text-[length:var(--font-size-button)]',
				'font-[number:var(--font-weight-button)]',
				'leading-[var(--line-height-button)]',
			],
			code: [
				'text-[length:var(--font-size-code)]',
				'font-[number:var(--font-weight-code)]',
				'leading-[var(--line-height-code)]',
				'font-mono',
			],
			link: ['font-[number:var(--font-weight-link)]', 'underline', 'underline-offset-2', 'hover:no-underline'],
		},

		// SEMANTIC COLORS (Use design system tokens)
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
			disabled: ['text-disabled-foreground'],
		},

		// FONT WEIGHT (Utility - can override variant defaults)
		fontWeight: {
			light: ['font-light'],
			normal: ['font-normal'],
			medium: ['font-medium'],
			semibold: ['font-semibold'],
			bold: ['font-bold'],
		},

		// TEXT UTILITIES (Not semantic - helper utilities)
		truncate: {
			true: ['truncate'],
		},

		lineClamp: {
			1: ['line-clamp-1'],
			2: ['line-clamp-2'],
			3: ['line-clamp-3'],
			4: ['line-clamp-4'],
			5: ['line-clamp-5'],
			6: ['line-clamp-6'],
		},

		// TEXT ALIGNMENT (Utility)
		align: {
			left: ['text-left'],
			center: ['text-center'],
			right: ['text-right'],
			justify: ['text-justify'],
		},
	},
	defaultVariants: {
		variant: 'body',
		colorScheme: 'default',
	},
});

export type TextVariantProps = VariantProps<typeof textVariants>;
