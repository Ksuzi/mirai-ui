import type { SelectVariantProps } from './Select.variants';

export type SelectOption = {
	/**
	 * The value of the option
	 */
	value: string;

	/**
	 * The display label for the option
	 */
	label: string;

	/**
	 * Whether the option is disabled
	 */
	disabled?: boolean;
};

export type SelectProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'> &
	SelectVariantProps & {
		/**
		 * Icon displayed on the left side
		 */
		leftIcon?: React.ReactNode;

		/**
		 * Placeholder text when no option is selected
		 */
		placeholder?: string;

		/**
		 * Array of options to display in the dropdown
		 */
		options?: SelectOption[];

		/**
		 * The currently selected value
		 */
		value?: string;

		/**
		 * Callback fired when selection changes
		 */
		onChange?: (value: string) => void;

		/**
		 * Aria label for accessibility
		 */
		['aria-label']?: string;
	};
