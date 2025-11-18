import { describe, expect, test } from 'vitest';

import { render, screen } from '@mirai-ui/test';

import { Input } from '../../Input/Input.component';
import { Field } from '../Field.component';
import { FieldMessage } from '../FieldMessage/FieldMessage.component';

import { FieldControl } from './FieldControl.component';

describe('FieldControl', () => {
	describe('Rendering', () => {
		test('renders child control', () => {
			render(
				<Field>
					<FieldControl>
						<Input data-testid="test-input" />
					</FieldControl>
				</Field>
			);

			expect(screen.getByTestId('test-input')).toBeInTheDocument();
		});

		test('passes id from context to child', () => {
			render(
				<Field id="test-field">
					<FieldControl>
						<Input />
					</FieldControl>
				</Field>
			);

			const input = screen.getByRole('textbox');
			expect(input).toHaveAttribute('id', 'test-field');
		});
	});

	describe('Accessibility', () => {
		test('sets aria-describedby to message id when helper text exists', () => {
			render(
				<Field id="test-field" helperText="Helper text">
					<FieldControl>
						<Input />
					</FieldControl>
					<FieldMessage />
				</Field>
			);

			const input = screen.getByRole('textbox');
			expect(input).toHaveAttribute('aria-describedby', 'test-field-message');
		});

		test('sets aria-errormessage to message id when error exists', () => {
			render(
				<Field id="test-field" error="Error message">
					<FieldControl>
						<Input />
					</FieldControl>
					<FieldMessage />
				</Field>
			);

			const input = screen.getByRole('textbox');
			expect(input).toHaveAttribute('aria-errormessage', 'test-field-message');
		});

		test('sets aria-invalid when error exists', () => {
			render(
				<Field error="Error message">
					<FieldControl>
						<Input />
					</FieldControl>
				</Field>
			);

			const input = screen.getByRole('textbox');
			expect(input).toHaveAttribute('aria-invalid', 'true');
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to wrapper div', () => {
			const ref = { current: null as HTMLDivElement | null };
			render(
				<Field>
					<FieldControl ref={ref}>
						<Input />
					</FieldControl>
				</Field>
			);

			expect(ref.current).toBeInstanceOf(HTMLDivElement);
		});
	});

	describe('Custom className', () => {
		test('applies custom className', () => {
			const { container } = render(
				<Field>
					<FieldControl className="custom-class">
						<Input />
					</FieldControl>
				</Field>
			);

			const wrapper = container.querySelector('.custom-class');
			expect(wrapper).toBeInTheDocument();
		});
	});
});
