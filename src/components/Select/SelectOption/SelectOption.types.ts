import type { SelectOptionVariantProps } from './SelectOption.variants';
import type { SelectOption as SelectOptionData } from '../Select.types';

export type SelectOptionProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> &
	SelectOptionVariantProps & {
		/**
		 * The option data
		 */
		option: SelectOptionData;

		/**
		 * Whether this option is currently selected
		 */
		isSelected: boolean;

		/**
		 * Whether this option is currently highlighted (keyboard navigation)
		 */
		isHighlighted: boolean;

		/**
		 * Index of this option in the list
		 */
		index: number;

		/**
		 * Callback when option is selected
		 */
		onSelect: (option: SelectOptionData) => void;

		/**
		 * Callback when option is highlighted (mouse enter)
		 */
		onHighlight: (index: number) => void;
	};
