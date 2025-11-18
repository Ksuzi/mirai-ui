import React from 'react';

import { describe, expect, test } from 'vitest';

import { headingUtils } from './Heading.utils';

describe('headingUtils', () => {
	describe('validateContent', () => {
		test('returns true for non-empty string', () => {
			expect(headingUtils.validateContent('Hello World')).toBe(true);
			expect(headingUtils.validateContent('Text')).toBe(true);
		});

		test('returns false for empty string', () => {
			expect(headingUtils.validateContent('')).toBe(false);
			expect(headingUtils.validateContent('   ')).toBe(false);
		});

		test('returns true for number', () => {
			expect(headingUtils.validateContent(0)).toBe(true);
			expect(headingUtils.validateContent(123)).toBe(true);
		});

		test('returns false for null or undefined', () => {
			expect(headingUtils.validateContent(null)).toBe(false);
			expect(headingUtils.validateContent(undefined)).toBe(false);
		});

		test('returns true for array with valid content', () => {
			expect(headingUtils.validateContent(['Hello', 'World'])).toBe(true);
			expect(headingUtils.validateContent(['', 'Valid'])).toBe(true);
		});

		test('returns false for array with only empty content', () => {
			expect(headingUtils.validateContent(['', '   '])).toBe(false);
			expect(headingUtils.validateContent([])).toBe(false);
		});

		test('returns true for React element with content', () => {
			const element = React.createElement('span', {}, 'Hello');
			expect(headingUtils.validateContent(element)).toBe(true);
		});

		test('returns false for React element without content', () => {
			const element = React.createElement('span', {}, '');
			expect(headingUtils.validateContent(element)).toBe(false);
		});

		test('handles nested React elements', () => {
			const nested = React.createElement('span', {}, React.createElement('strong', {}, 'Text'));
			expect(headingUtils.validateContent(nested)).toBe(true);
		});

		test('handles mixed content', () => {
			expect(headingUtils.validateContent(['Hello', 123, React.createElement('span', {}, 'World')])).toBe(true);
		});
	});

	describe('validateSemanticMatch', () => {
		test('returns true when as and variant match', () => {
			expect(headingUtils.validateSemanticMatch('h1', 'h1')).toBe(true);
			expect(headingUtils.validateSemanticMatch('h2', 'h2')).toBe(true);
			expect(headingUtils.validateSemanticMatch('h6', 'h6')).toBe(true);
		});

		test('returns false when as and variant do not match', () => {
			expect(headingUtils.validateSemanticMatch('h1', 'h2')).toBe(false);
			expect(headingUtils.validateSemanticMatch('h3', 'h1')).toBe(false);
			expect(headingUtils.validateSemanticMatch('h6', 'h1')).toBe(false);
		});

		test('returns true for display variant (no semantic level)', () => {
			expect(headingUtils.validateSemanticMatch('h1', 'display')).toBe(true);
			expect(headingUtils.validateSemanticMatch('h2', 'display')).toBe(true);
			expect(headingUtils.validateSemanticMatch('h6', 'display')).toBe(true);
		});

		test('returns true when variant is undefined', () => {
			expect(headingUtils.validateSemanticMatch('h1', undefined)).toBe(true);
			expect(headingUtils.validateSemanticMatch('h2', undefined)).toBe(true);
		});

		test('returns true when variant is empty string', () => {
			expect(headingUtils.validateSemanticMatch('h1', '')).toBe(true);
		});
	});
});
