import type { CheckboxVariantProps, CheckboxLabelVariantProps } from './Checkbox.variants';

export type CheckboxColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted';

export type CheckboxProps = {
    label?: string;
    /** Additional CSS classes for the wrapper div */
    wrapperClassName?: string;
    /**
     * Deprecated: use colorScheme instead. Will be mapped internally for BC.
     */
    color?: 'base' | 'primary' | 'secondary';
    /** Semantic color scheme */
    colorScheme?: CheckboxColorScheme;
    ['aria-label']?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
    Omit<CheckboxVariantProps, 'colorScheme'> & { colorScheme?: CheckboxColorScheme };

export type CheckboxRootProps = {
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export type CheckboxInputProps = {
    className?: string;
    /**
     * Deprecated: use colorScheme instead.
     */
    color?: 'base' | 'primary' | 'secondary';
    /** Semantic color scheme */
    colorScheme?: CheckboxColorScheme;
    ['aria-label']?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
    Omit<CheckboxVariantProps, 'colorScheme'> & { colorScheme?: CheckboxColorScheme };

export type CheckboxLabelProps = {
	className?: string;
} & React.LabelHTMLAttributes<HTMLLabelElement> &
	Pick<CheckboxLabelVariantProps, 'size' | 'disabled'>;
