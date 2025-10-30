import { describe, expect, test } from 'vitest';

import { inputUtils } from './index';

describe('Input Utils', () => {
	describe('getInputState', () => {
		test('returns default when no props provided', () => {
			expect(inputUtils.getInputState({})).toBe('default');
		});

		test('returns error when error is present', () => {
			expect(inputUtils.getInputState({ error: 'Error message' })).toBe('error');
		});

		test('returns success when state is success', () => {
			expect(inputUtils.getInputState({ state: 'success' })).toBe('success');
		});

		test('returns warning when state is warning', () => {
			expect(inputUtils.getInputState({ state: 'warning' })).toBe('warning');
		});

		test('respects priority: error > state', () => {
			expect(inputUtils.getInputState({ state: 'success', error: 'Error' })).toBe('error');
		});

		test('respects priority: error > state', () => {
			expect(inputUtils.getInputState({ error: 'Error', state: 'success' })).toBe('error');
		});
	});

	describe('getInputMessage', () => {
		test('returns undefined when no messages provided', () => {
			expect(inputUtils.getInputMessage({})).toBeUndefined();
		});

		test('returns error message when error is present', () => {
			expect(inputUtils.getInputMessage({ error: 'Error!' })).toBe('Error!');
		});

		test('returns helper text when no status messages', () => {
			expect(inputUtils.getInputMessage({ helperText: 'Helper text' })).toBe('Helper text');
		});

		test('respects priority: error > helperText', () => {
			expect(
				inputUtils.getInputMessage({
					error: 'Error',
					helperText: 'Helper',
				})
			).toBe('Error');
		});

		test('shows helperText when no status messages present', () => {
			expect(
				inputUtils.getInputMessage({
					helperText: 'This is a helper text',
				})
			).toBe('This is a helper text');
		});
	});

	describe('getInputId', () => {
		test('returns custom ID when provided', () => {
			expect(inputUtils.getInputId('my-custom-id')).toBe('my-custom-id');
		});

		test('generates unique ID when not provided', () => {
			const id1 = inputUtils.getInputId();
			const id2 = inputUtils.getInputId();

			expect(id1).toMatch(/^input-[a-z0-9]+$/);
			expect(id2).toMatch(/^input-[a-z0-9]+$/);
			expect(id1).not.toBe(id2);
		});

		test('returns undefined as generated ID', () => {
			const id = inputUtils.getInputId(undefined);
			expect(id).toMatch(/^input-[a-z0-9]+$/);
		});
	});

	describe('getAriaDescribedBy', () => {
		test('returns message ID when has message', () => {
			expect(inputUtils.getAriaDescribedBy('email-input', true)).toBe('email-input-message');
		});

		test('returns undefined when no message', () => {
			expect(inputUtils.getAriaDescribedBy('email-input', false)).toBeUndefined();
		});

		test('generates correct ID format', () => {
			const id = inputUtils.getAriaDescribedBy('test-123', true);
			expect(id).toBe('test-123-message');
		});
	});
});
