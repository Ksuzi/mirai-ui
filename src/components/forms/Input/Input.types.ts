import type { InputVariantProps } from './Input.variants';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
	InputVariantProps & {
		/**
		 * Icon displayed on the left side
		 */
		leftIcon?: React.ReactNode;

		/**
		 * Icon displayed on the right side
		 */
		rightIcon?: React.ReactNode;

		/**
		 * Aria label for accessibility
		 */
		['aria-label']?: string;
	};
