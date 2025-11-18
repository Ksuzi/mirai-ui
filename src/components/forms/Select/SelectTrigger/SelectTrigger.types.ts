export type SelectTriggerProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
	/**
	 * Placeholder text when no option is selected
	 */
	placeholder?: string;

	/**
	 * Icon displayed on the left side
	 */
	leftIcon?: React.ReactNode;

	/**
	 * Custom content (overrides default value display)
	 */
	children?: React.ReactNode;

	/**
	 * ID for the trigger button (for label association)
	 */
	id?: string;
};
