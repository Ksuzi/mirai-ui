import type { CheckboxVariantProps } from './Checkbox.variants';

export type CheckboxColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted';

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
	Omit<CheckboxVariantProps, 'colorScheme'> & {
		/** Semantic color scheme */
		colorScheme?: CheckboxColorScheme;
	};
