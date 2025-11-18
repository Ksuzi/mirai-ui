import type { SelectVariantProps } from '../Select.variants';

export type SelectRootProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> &
	SelectVariantProps & {
		/**
		 * The currently selected value
		 */
		value?: string;

		/**
		 * Callback fired when selection changes
		 */
		onChange?: (value: string) => void;

		/**
		 * Array of options (for backward compatibility - props-based mode)
		 * If provided, Select will render internally without needing Trigger/Content/Option
		 */
		options?: Array<{ value: string; label: string; disabled?: boolean }>;

		/**
		 * Placeholder text when no option is selected (props-based mode)
		 */
		placeholder?: string;

		/**
		 * Icon displayed on the left side (props-based mode)
		 */
		leftIcon?: React.ReactNode;

		/**
		 * Whether the select is disabled
		 */
		disabled?: boolean;

		/**
		 * Children for composition mode
		 */
		children?: React.ReactNode;
	};
