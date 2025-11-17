import type { SelectOption } from './Select.types';

const isOptionDisabled = (option: SelectOption): boolean => {
	return option.disabled ?? false;
};

const getSelectedOption = (options: SelectOption[], value?: string): SelectOption | undefined => {
	return options.find((opt) => opt.value === value);
};

const getDisplayText = (selectedOption: SelectOption | undefined, placeholder: string): string => {
	return selectedOption?.label ?? placeholder;
};

export const selectUtils = {
	/**
	 * Checks if a select option is disabled
	 */
	isOptionDisabled,

	/**
	 * Gets the selected option from options array by value
	 */
	getSelectedOption,

	/**
	 * Gets display text for select button
	 * Shows option label or placeholder
	 */
	getDisplayText,
};
