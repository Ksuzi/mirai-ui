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

		test('returns success when success is present', () => {
			expect(inputUtils.getInputState({ success: 'Success message' })).toBe('success');
		});

		test('returns warning when warning is present', () => {
			expect(inputUtils.getInputState({ warning: 'Warning message' })).toBe('warning');
		});

		test('respects priority: state > error', () => {
			expect(
				inputUtils.getInputState({
					state: 'success',
					error: 'Error',
				})
			).toBe('success');
		});

		test('respects priority: error > success', () => {
			expect(
				inputUtils.getInputState({
					error: 'Error',
					success: 'Success',
				})
			).toBe('error');
		});

		test('respects priority: success > warning', () => {
			expect(
				inputUtils.getInputState({
					success: 'Success',
					warning: 'Warning',
				})
			).toBe('success');
		});

		test('explicit state overrides all messages', () => {
			expect(
				inputUtils.getInputState({
					state: 'default',
					error: 'Error',
					success: 'Success',
					warning: 'Warning',
				})
			).toBe('default');
		});
	});

	describe('getInputMessage', () => {
		test('returns undefined when no messages provided', () => {
			expect(inputUtils.getInputMessage({})).toBeUndefined();
		});

		test('returns error message when error is present', () => {
			expect(inputUtils.getInputMessage({ error: 'Error!' })).toBe('Error!');
		});

		test('returns success message when success is present', () => {
			expect(inputUtils.getInputMessage({ success: 'Success!' })).toBe('Success!');
		});

		test('returns warning message when warning is present', () => {
			expect(inputUtils.getInputMessage({ warning: 'Warning!' })).toBe('Warning!');
		});

		test('returns helper text when no status messages', () => {
			expect(inputUtils.getInputMessage({ helperText: 'Helper text' })).toBe('Helper text');
		});

		test('respects priority: error > success', () => {
			expect(
				inputUtils.getInputMessage({
					error: 'Error',
					success: 'Success',
				})
			).toBe('Error');
		});

		test('respects priority: error > success > warning', () => {
			expect(
				inputUtils.getInputMessage({
					error: 'Error',
					success: 'Success',
					warning: 'Warning',
				})
			).toBe('Error');
		});

		test('respects priority: success > warning > helperText', () => {
			expect(
				inputUtils.getInputMessage({
					success: 'Success',
					warning: 'Warning',
					helperText: 'Helper',
				})
			).toBe('Success');
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
