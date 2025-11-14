import type { CheckboxVariantProps } from './Checkbox.variants';

export type CheckboxColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted';

export type CheckboxProps = {
	/** Semantic color scheme */
	colorScheme?: CheckboxColorScheme;
	['aria-label']?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
	Omit<CheckboxVariantProps, 'colorScheme'> & { colorScheme?: CheckboxColorScheme };
