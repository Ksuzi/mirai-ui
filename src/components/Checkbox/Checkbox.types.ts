import type { CheckboxVariantProps, CheckboxLabelVariantProps } from './Checkbox.variants';

export type CheckboxProps = {
	label?: string;
	/** Additional CSS classes for the wrapper div */
	wrapperClassName?: string;
	color?: 'base' | 'primary' | 'secondary';
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
	CheckboxVariantProps;

export type CheckboxRootProps = {
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export type CheckboxInputProps = {
	className?: string;
	color?: 'base' | 'primary' | 'secondary';
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
	CheckboxVariantProps;

export type CheckboxLabelProps = {
	className?: string;
} & React.LabelHTMLAttributes<HTMLLabelElement> &
	Pick<CheckboxLabelVariantProps, 'size' | 'disabled'>;
