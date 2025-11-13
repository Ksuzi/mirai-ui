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
	 * Checks if an option is disabled
	 */
	isOptionDisabled,

	/**
	 * Gets the selected option from the options array
	 */
	getSelectedOption,

	/**
	 * Gets the display text for the select button
	 */
	getDisplayText,
};
