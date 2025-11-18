import { describe, expect, test } from 'vitest';

import { render, screen } from '@mirai-ui/test';

import { Field } from '../Field.component';

import { FieldLabel } from './FieldLabel.component';

describe('FieldLabel', () => {
	describe('Rendering', () => {
		test('renders label text', () => {
			render(
				<Field>
					<FieldLabel>Email Address</FieldLabel>
				</Field>
			);

			expect(screen.getByText('Email Address')).toBeInTheDocument();
		});

		test('renders as label element', () => {
			render(
				<Field>
					<FieldLabel>Email</FieldLabel>
				</Field>
			);

			const label = screen.getByText('Email');
			expect(label.tagName).toBe('LABEL');
		});

		test('sets htmlFor from context id', () => {
			render(
				<Field id="test-field">
					<FieldLabel>Email</FieldLabel>
				</Field>
			);

			const label = screen.getByText('Email');
			expect(label).toHaveAttribute('for', 'test-field');
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to label element', () => {
			const ref = { current: null as HTMLLabelElement | null };
			render(
				<Field>
					<FieldLabel ref={ref}>Email</FieldLabel>
				</Field>
			);

			expect(ref.current).toBeInstanceOf(HTMLLabelElement);
		});
	});

	describe('Custom className', () => {
		test('applies custom className', () => {
			render(
				<Field>
					<FieldLabel className="custom-label">Email</FieldLabel>
				</Field>
			);

			const label = screen.getByText('Email');
			expect(label).toBeInTheDocument();
		});
	});
});
