/**
 * Gets the display message based on props priority
 *
 * Priority order:
 * 1. Error message (highest priority)
 * 2. Success message
 * 3. Warning message
 * 4. Helper text (fallback)
 *
 * @param params - Message parameters
 * @returns The message to display, or undefined if none
 *
 * @example
 * getInputMessage({ error: 'Error!', helperText: 'Help' })
 * // returns 'Error!'
 *
 * @example
 * getInputMessage({ helperText: 'Enter your email' })
 * // returns 'Enter your email'
 */
export const getInputMessage = (params: {
	error?: string;
	success?: string;
	warning?: string;
	helperText?: string;
}): string | undefined => {
	const { error, success, warning, helperText } = params;
	return error ?? success ?? warning ?? helperText;
};
