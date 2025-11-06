/**
 * Determines the effective input state based on props priority
 *
 * Priority order:
 * 1. Error message (highest priority)
 * 2. Explicit state prop (success/warning)
 * 3. Default (fallback)
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

export const getInputState = (params: { state?: 'success' | 'warning' | null; error?: string }): InputStateType => {
	const { state, error } = params;

	if (error) return 'error';
	if (state === 'success' || state === 'warning') return state;
	return 'default';
};
