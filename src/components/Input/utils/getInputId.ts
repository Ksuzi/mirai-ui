/**
 * Generates a unique ID for input element if not provided
 *
 * @param customId - Custom ID provided by user
 * @returns Custom ID or generated unique ID
 *
 * @example
 * getInputId('my-custom-id')
 * // returns 'my-custom-id'
 *
 * @example
 * getInputId()
 * // returns 'input-abc123def'
 */
export const getInputId = (customId?: string): string => {
	return customId ?? `input-${Math.random().toString(36).substring(2, 11)}`;
};
