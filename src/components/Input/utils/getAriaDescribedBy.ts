/**
 * Generates ARIA describedby ID if message exists
 *
 * @param inputId - The input element ID
 * @param hasMessage - Whether there is a message to display
 * @returns ARIA describedby ID or undefined
 *
 * @example
 * getAriaDescribedBy('email-input', true)
 * // returns 'email-input-message'
 *
 * @example
 * getAriaDescribedBy('email-input', false)
 * // returns undefined
 */
export const getAriaDescribedBy = (inputId: string, hasMessage: boolean): string | undefined => {
	return hasMessage ? `${inputId}-message` : undefined;
};
