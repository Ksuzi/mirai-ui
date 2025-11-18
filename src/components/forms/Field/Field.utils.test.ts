import { describe, expect, test } from 'vitest';

import { fieldUtils } from './Field.utils';

import type { FieldState } from './Field.types';

describe('Field Utils', () => {
	describe('getFieldMessageId', () => {
		test('returns correctly formatted message ID', () => {
			expect(fieldUtils.getFieldMessageId('username')).toBe('username-message');
		});

		test('handles field IDs with special characters', () => {
			expect(fieldUtils.getFieldMessageId('user-name-123')).toBe('user-name-123-message');
		});

		test('handles empty string', () => {
			expect(fieldUtils.getFieldMessageId('')).toBe('-message');
		});

		test('handles field IDs with underscores', () => {
			expect(fieldUtils.getFieldMessageId('user_name')).toBe('user_name-message');
		});
	});

	describe('getDisplayMessage', () => {
		test('returns children when provided', () => {
			expect(fieldUtils.getDisplayMessage('error', 'helper', 'children')).toBe('children');
		});

		test('returns error when children not provided', () => {
			expect(fieldUtils.getDisplayMessage('error', 'helper', undefined)).toBe('error');
		});

		test('returns helperText when children and error not provided', () => {
			expect(fieldUtils.getDisplayMessage(undefined, 'helper', undefined)).toBe('helper');
		});

		test('returns undefined when nothing provided', () => {
			expect(fieldUtils.getDisplayMessage(undefined, undefined, undefined)).toBeUndefined();
		});

		test('prioritizes children over error', () => {
			expect(fieldUtils.getDisplayMessage('error message', 'helper', 'custom message')).toBe('custom message');
		});

		test('prioritizes error over helperText', () => {
			expect(fieldUtils.getDisplayMessage('error message', 'helper text', undefined)).toBe('error message');
		});

		test('handles empty strings', () => {
			expect(fieldUtils.getDisplayMessage('', '', '')).toBe('');
		});

		test('handles complex ReactNode as children', () => {
			const reactNode = { type: 'span', props: { children: 'test' } } as React.ReactNode;
			expect(fieldUtils.getDisplayMessage('error', 'helper', reactNode)).toBe(reactNode);
		});

		test('returns helperText when error is empty string', () => {
			expect(fieldUtils.getDisplayMessage('', 'helper text', undefined)).toBe('');
		});
	});

	describe('getFieldAriaProps', () => {
		test('returns aria-invalid true when state is error', () => {
			const props = fieldUtils.getFieldAriaProps('error', false, undefined);
			expect(props['aria-invalid']).toBe(true);
		});

		test('returns aria-invalid undefined when state is not error', () => {
			const states: FieldState[] = ['default', 'success', 'warning'];
			states.forEach((state) => {
				const props = fieldUtils.getFieldAriaProps(state, false, undefined);
				expect(props['aria-invalid']).toBeUndefined();
			});
		});

		test('returns aria-required true when required is true', () => {
			const props = fieldUtils.getFieldAriaProps('default', true, undefined);
			expect(props['aria-required']).toBe(true);
		});

		test('returns aria-required undefined when required is false', () => {
			const props = fieldUtils.getFieldAriaProps('default', false, undefined);
			expect(props['aria-required']).toBeUndefined();
		});

		test('returns aria-describedby when provided', () => {
			const props = fieldUtils.getFieldAriaProps('default', false, 'message-id');
			expect(props['aria-describedby']).toBe('message-id');
		});

		test('returns aria-describedby undefined when not provided', () => {
			const props = fieldUtils.getFieldAriaProps('default', false, undefined);
			expect(props['aria-describedby']).toBeUndefined();
		});

		test('returns aria-errormessage when provided for error state', () => {
			const props = fieldUtils.getFieldAriaProps('error', false, undefined, 'error-message-id');
			expect(props['aria-errormessage']).toBe('error-message-id');
		});

		test('returns aria-errormessage undefined when not provided', () => {
			const props = fieldUtils.getFieldAriaProps('error', false, undefined);
			expect(props['aria-errormessage']).toBeUndefined();
		});

		test('returns all props correctly when all conditions met', () => {
			const props = fieldUtils.getFieldAriaProps('error', true, 'field-123-message', 'field-123-message');
			expect(props).toEqual({
				'aria-invalid': true,
				'aria-required': true,
				'aria-describedby': 'field-123-message',
				'aria-errormessage': 'field-123-message',
			});
		});

		test('handles success state correctly', () => {
			const props = fieldUtils.getFieldAriaProps('success', false, 'success-message');
			expect(props).toEqual({
				'aria-invalid': undefined,
				'aria-required': undefined,
				'aria-describedby': 'success-message',
				'aria-errormessage': undefined,
			});
		});

		test('handles warning state correctly', () => {
			const props = fieldUtils.getFieldAriaProps('warning', true, 'warning-message');
			expect(props).toEqual({
				'aria-invalid': undefined,
				'aria-required': true,
				'aria-describedby': 'warning-message',
				'aria-errormessage': undefined,
			});
		});
	});

	describe('getRequiredIndicatorClass', () => {
		test('returns CSS class when required is true', () => {
			const className = fieldUtils.getRequiredIndicatorClass(true);
			expect(className).toBe("after:content-['*'] after:ml-0.5 after:text-error-500");
		});

		test('returns undefined when required is false', () => {
			const className = fieldUtils.getRequiredIndicatorClass(false);
			expect(className).toBeUndefined();
		});

		test('is truthy when required', () => {
			expect(fieldUtils.getRequiredIndicatorClass(true)).toBeTruthy();
		});

		test('is falsy when not required', () => {
			expect(fieldUtils.getRequiredIndicatorClass(false)).toBeFalsy();
		});
	});
});
