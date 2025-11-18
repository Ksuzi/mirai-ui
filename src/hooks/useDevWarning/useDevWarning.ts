import { useRef } from 'react';

/**
 * Custom hook to show development-only warnings that don't spam the console.
 * Warns once when a condition becomes true, and resets when it becomes false.
 *
 * @param condition - Boolean condition that triggers the warning when true
 * @param message - Warning message to display
 *
 * @example
 * ```tsx
 * useDevWarning(
 *   truncate && lineClamp !== undefined,
 *   'Text: `truncate` and `lineClamp` should not be used together.'
 * );
 * ```
 */
export function useDevWarning(condition: boolean, message: string): void {
	const hasWarnedRef = useRef(false);

	if (process.env.NODE_ENV !== 'production') {
		if (condition && !hasWarnedRef.current) {
			console.warn(message);
			hasWarnedRef.current = true;
		} else if (!condition) {
			// Reset warning flag if condition becomes false, so we warn again if it becomes true
			hasWarnedRef.current = false;
		}
	}
}
