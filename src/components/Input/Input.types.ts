import type { InputVariantProps } from './Input.variants';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
	Omit<InputVariantProps, 'state'> & {
		/**
		 * Label text for the input
		 */
		label?: string;

		/**
		 * Helper text shown below the input
		 */
		helperText?: string;

		/**
		 * Error message (enables error state and overrides helperText)
		 */
		error?: string;

		/**
		 * Visual state (non-error). Use for success/warning styles only.
		 */
		state?: 'success' | 'warning';

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
