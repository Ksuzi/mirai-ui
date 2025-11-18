import { checkboxWrapperSizeClasses } from './Checkbox.variants';

const getCheckboxWrapperClasses = (size: 'sm' | 'md' | 'lg' | 'xl' | null | undefined): string => {
	if (!size || !(size in checkboxWrapperSizeClasses)) {
		return 'min-w-6 min-h-6 p-0.5';
	}
	return checkboxWrapperSizeClasses[size];
};

export const checkboxUtils = {
	/**
	 * Get wrapper classes for checkbox based on size
	 * Ensures minimum 24x24px touch target (WCAG 2.2 - 2.5.8) while keeping visual size small
	 * @param size - The size of the checkbox
	 * @returns The wrapper classes string
	 */
	getCheckboxWrapperClasses,
};
