import type { SelectOption } from './Select.types';

/**
 * Checks if an option is disabled
 */
export const isOptionDisabled = (option: SelectOption): boolean => {
	return option.disabled ?? false;
};

/**
 * Gets the selected option from the options array
 */
export const getSelectedOption = (options: SelectOption[], value?: string): SelectOption | undefined => {
	return options.find((opt) => opt.value === value);
};

/**
 * Gets the display text for the select button
 */
export const getDisplayText = (selectedOption: SelectOption | undefined, placeholder: string): string => {
	return selectedOption?.label ?? placeholder;
};
