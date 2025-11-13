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

/**
 * Context value shared between Select compound components
 */
export type SelectContextValue = {
	/**
	 * The currently selected value
	 */
	value?: string;

	/**
	 * Callback fired when selection changes
	 */
	onChange?: (value: string) => void;

	/**
	 * Whether the dropdown is open
	 */
	isOpen: boolean;

	/**
	 * Function to toggle dropdown open state
	 */
	setIsOpen: (open: boolean) => void;

	/**
	 * Index of the highlighted option (for keyboard navigation)
	 */
	highlightedIndex: number;

	/**
	 * Function to set highlighted index
	 */
	setHighlightedIndex: (index: number) => void;

	/**
	 * Reference to the trigger button
	 */
	triggerRef: React.RefObject<HTMLButtonElement | null>;

	/**
	 * Reference to the dropdown content
	 */
	contentRef: React.RefObject<HTMLDivElement | null>;

	/**
	 * Variant of the select
	 */
	variant: 'default' | 'outlined' | 'filled' | 'borderless' | 'underlined' | null;

	/**
	 * State of the select
	 */
	state: 'default' | 'error' | 'success' | 'warning' | null;

	/**
	 * Size of the select
	 */
	size: 'sm' | 'md' | 'lg' | 'xl' | null;

	/**
	 * Whether the select is disabled
	 */
	disabled: boolean;

	/**
	 * Whether the select should take full width
	 */
	fullWidth: boolean | null;

	/**
	 * Array of options (for hybrid props-based mode)
	 */
	options: SelectOption[];

	/**
	 * Function to handle option selection
	 */
	handleSelect: (value: string) => void;
};
