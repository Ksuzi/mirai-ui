import { describe, expect, test } from 'vitest';

import { selectUtils } from './Select.utils';

import type { SelectOption } from './Select.types';

describe('Select Utils', () => {
	describe('isOptionDisabled', () => {
		test('returns false when disabled property is not set', () => {
			const option: SelectOption = { value: 'test', label: 'Test' };
			expect(selectUtils.isOptionDisabled(option)).toBe(false);
		});

		test('returns true when disabled is explicitly true', () => {
			const option: SelectOption = { value: 'test', label: 'Test', disabled: true };
			expect(selectUtils.isOptionDisabled(option)).toBe(true);
		});

		test('returns false when disabled is explicitly false', () => {
			const option: SelectOption = { value: 'test', label: 'Test', disabled: false };
			expect(selectUtils.isOptionDisabled(option)).toBe(false);
		});

		test('returns false when disabled is undefined', () => {
			const option: SelectOption = { value: 'test', label: 'Test', disabled: undefined };
			expect(selectUtils.isOptionDisabled(option)).toBe(false);
		});
	});

	describe('getSelectedOption', () => {
		const options: SelectOption[] = [
			{ value: 'option1', label: 'Option 1' },
			{ value: 'option2', label: 'Option 2' },
			{ value: 'option3', label: 'Option 3', disabled: true },
		];

		test('returns undefined when value is not provided', () => {
			expect(selectUtils.getSelectedOption(options)).toBeUndefined();
		});

		test('returns undefined when value is undefined', () => {
			expect(selectUtils.getSelectedOption(options, undefined)).toBeUndefined();
		});

		test('returns the correct option when value matches', () => {
			const result = selectUtils.getSelectedOption(options, 'option2');
			expect(result).toEqual({ value: 'option2', label: 'Option 2' });
		});

		test('returns disabled option if value matches', () => {
			const result = selectUtils.getSelectedOption(options, 'option3');
			expect(result).toEqual({ value: 'option3', label: 'Option 3', disabled: true });
		});

		test('returns undefined when value does not match any option', () => {
			expect(selectUtils.getSelectedOption(options, 'nonexistent')).toBeUndefined();
		});

		test('returns undefined for empty options array', () => {
			expect(selectUtils.getSelectedOption([], 'option1')).toBeUndefined();
		});

		test('handles options with special characters', () => {
			const specialOptions: SelectOption[] = [
				{ value: 'option-with-dash', label: 'Option With Dash' },
				{ value: 'option_with_underscore', label: 'Option With Underscore' },
			];
			const result = selectUtils.getSelectedOption(specialOptions, 'option_with_underscore');
			expect(result).toEqual({ value: 'option_with_underscore', label: 'Option With Underscore' });
		});
	});

	describe('getDisplayText', () => {
		test('returns placeholder when selectedOption is undefined', () => {
			expect(selectUtils.getDisplayText(undefined, 'Select an option')).toBe('Select an option');
		});

		test('returns option label when selectedOption is provided', () => {
			const option: SelectOption = { value: 'test', label: 'Test Label' };
			expect(selectUtils.getDisplayText(option, 'Select an option')).toBe('Test Label');
		});

		test('returns placeholder when option is null', () => {
			expect(selectUtils.getDisplayText(null as unknown as SelectOption, 'Choose one')).toBe('Choose one');
		});

		test('handles empty string label', () => {
			const option: SelectOption = { value: 'test', label: '' };
			expect(selectUtils.getDisplayText(option, 'Select')).toBe('');
		});

		test('handles empty string placeholder', () => {
			expect(selectUtils.getDisplayText(undefined, '')).toBe('');
		});

		test('prioritizes option label over placeholder', () => {
			const option: SelectOption = { value: 'important', label: 'Important Option' };
			expect(selectUtils.getDisplayText(option, 'Placeholder')).toBe('Important Option');
		});

		test('handles long labels', () => {
			const option: SelectOption = {
				value: 'long',
				label: 'This is a very long label that should still work correctly',
			};
			expect(selectUtils.getDisplayText(option, 'Short')).toBe(
				'This is a very long label that should still work correctly'
			);
		});

		test('handles special characters in labels', () => {
			const option: SelectOption = { value: 'special', label: 'Label with & special <characters>' };
			expect(selectUtils.getDisplayText(option, 'Placeholder')).toBe('Label with & special <characters>');
		});
	});
});
