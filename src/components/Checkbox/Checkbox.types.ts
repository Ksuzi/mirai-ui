import type { CheckboxVariantProps, CheckboxLabelVariantProps } from './Checkbox.variants';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, CheckboxVariantProps {
	label?: string;
	/** Additional CSS classes for the wrapper div */
	wrapperClassName?: string;
}

export interface CheckboxRootProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

export interface CheckboxInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		CheckboxVariantProps {
	className?: string;
}

export interface CheckboxLabelProps
	extends React.LabelHTMLAttributes<HTMLLabelElement>,
		Pick<CheckboxLabelVariantProps, 'size' | 'disabled'> {
	className?: string;
}
