import { describe, expect, test } from 'vitest';

import { switchUtils } from './Switch.utils';

describe('Switch Utils', () => {
	describe('getSpinnerSize', () => {
		test('returns lg for xl switch size', () => {
			expect(switchUtils.getSpinnerSize('xl')).toBe('lg');
		});

		test('returns md for lg switch size', () => {
			expect(switchUtils.getSpinnerSize('lg')).toBe('md');
		});

		test('returns sm for md switch size', () => {
			expect(switchUtils.getSpinnerSize('md')).toBe('sm');
		});

		test('returns sm for sm switch size', () => {
			expect(switchUtils.getSpinnerSize('sm')).toBe('sm');
		});
	});
});
