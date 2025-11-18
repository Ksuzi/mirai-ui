import { renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { useDevWarning } from './useDevWarning';

describe('useDevWarning', () => {
	test('warns once when condition becomes true', () => {
		const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
			/* empty */
		});

		const { rerender } = renderHook(
			({ condition }) => {
				useDevWarning(condition, 'Test warning message');
			},
			{ initialProps: { condition: false } }
		);

		expect(consoleSpy).not.toHaveBeenCalled();

		rerender({ condition: true });
		expect(consoleSpy).toHaveBeenCalledTimes(1);
		expect(consoleSpy).toHaveBeenCalledWith('Test warning message');

		rerender({ condition: true });
		expect(consoleSpy).toHaveBeenCalledTimes(1);

		consoleSpy.mockRestore();
	});

	test('resets warning flag when condition becomes false', () => {
		const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
			/* empty */
		});

		const { rerender } = renderHook(
			({ condition }) => {
				useDevWarning(condition, 'Test warning message');
			},
			{ initialProps: { condition: true } }
		);

		expect(consoleSpy).toHaveBeenCalledTimes(1);

		rerender({ condition: false });
		expect(consoleSpy).toHaveBeenCalledTimes(1);

		rerender({ condition: true });
		expect(consoleSpy).toHaveBeenCalledTimes(2);

		consoleSpy.mockRestore();
	});

	test('does not warn in production mode', () => {
		const originalEnv = process.env.NODE_ENV;
		process.env.NODE_ENV = 'production';

		const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
			/* empty */
		});

		renderHook(() => {
			useDevWarning(true, 'Test warning message');
		});

		expect(consoleSpy).not.toHaveBeenCalled();

		process.env.NODE_ENV = originalEnv;
		consoleSpy.mockRestore();
	});
});
