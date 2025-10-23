import type { InputVariantProps } from './Input.variants';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
	InputVariantProps & {
		/**
		 * Label text for the input
		 */
		label?: string;

		/**
		 * Helper text shown below the input
		 */
		helperText?: string;

		/**
		 * Error message (takes priority over success/warning/helperText)
		 */
		error?: string;

		/**
		 * Success message
		 */
		success?: string;

		/**
		 * Warning message
		 */
		warning?: string;

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
