/**
 * Determines the effective input state based on props priority
 *
 * Priority order:
 * 1. Explicit state prop (highest priority)
 * 2. Error message
 * 3. Success message
 * 4. Warning message
 * 5. Default (fallback)
 *
 * @param params - State determination parameters
 * @returns The effective input state
 *
 * @example
 * getInputState({ error: 'Invalid email' })
 * // returns 'error'
 *
 * @example
 * getInputState({ state: 'success', error: 'Some error' })
 * // returns 'success' (explicit state takes priority)
 */

export type InputStateType = 'default' | 'error' | 'success' | 'warning';

export const getInputState = (params: {
	state?: InputStateType | null;
	error?: string;
	success?: string;
	warning?: string;
}): InputStateType => {
	const { state, error, success, warning } = params;

	if (state) return state;
	if (error) return 'error';
	if (success) return 'success';
	if (warning) return 'warning';
	return 'default';
};
