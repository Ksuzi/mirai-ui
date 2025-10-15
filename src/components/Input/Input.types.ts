import type { InputVariantProps } from './Input.variants';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
	InputVariantProps & {
		label?: string;
		helperText?: string;
		error?: string;
		leftIcon?: React.ReactNode;
		rightIcon?: React.ReactNode;
		['aria-label']?: string;
	};
