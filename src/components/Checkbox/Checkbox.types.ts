import type { CheckboxVariantProps, CheckboxLabelVariantProps } from './Checkbox.variants';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, CheckboxVariantProps {
	label?: string;
	/** Additional CSS classes for the wrapper div */
	wrapperClassName?: string;
	color?: 'base' | 'primary' | 'secondary';
}

export interface CheckboxRootProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

export interface CheckboxInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		CheckboxVariantProps {
	className?: string;
	color?: 'base' | 'primary' | 'secondary';
}

export interface CheckboxLabelProps
	extends React.LabelHTMLAttributes<HTMLLabelElement>,
		Pick<CheckboxLabelVariantProps, 'size' | 'disabled'> {
	className?: string;
}
