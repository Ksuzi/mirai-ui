import { describe, expect, test } from 'vitest';

import { render, screen } from '@mirai-ui/test';

import { Field } from '../Field.component';

import { FieldMessage } from './FieldMessage.component';

describe('FieldMessage', () => {
	describe('Rendering', () => {
		test('renders helper text from context', () => {
			render(
				<Field helperText="Enter your email">
					<FieldMessage />
				</Field>
			);

			expect(screen.getByText('Enter your email')).toBeInTheDocument();
		});

		test('renders error message from context', () => {
			render(
				<Field error="Email is required">
					<FieldMessage />
				</Field>
			);

			const errorMessage = screen.getByRole('alert');
			expect(errorMessage).toHaveTextContent('Email is required');
		});

		test('error message overrides helper text', () => {
			render(
				<Field error="Email is required" helperText="Enter your email">
					<FieldMessage />
				</Field>
			);

			expect(screen.getByRole('alert')).toHaveTextContent('Email is required');
			expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
		});

		test('renders custom children content', () => {
			render(
				<Field>
					<FieldMessage>
						<span>Custom message</span>
					</FieldMessage>
				</Field>
			);

			expect(screen.getByText('Custom message')).toBeInTheDocument();
		});

		test('returns null when no message is provided', () => {
			const { container } = render(
				<Field>
					<FieldMessage />
				</Field>
			);

			// FieldMessage should return null when no error or helperText
			const messages = container.querySelectorAll('[role="alert"], [role="status"]');
			expect(messages.length).toBe(0);
		});
	});

	describe('Accessibility', () => {
		test('has role="alert" when error exists', () => {
			render(
				<Field error="Error message">
					<FieldMessage />
				</Field>
			);

			expect(screen.getByRole('alert')).toBeInTheDocument();
		});

		test('has role="status" when helper text exists', () => {
			render(
				<Field helperText="Helper text">
					<FieldMessage />
				</Field>
			);

			expect(screen.getByRole('status')).toBeInTheDocument();
		});

		test('has aria-live="polite" for helper text', () => {
			render(
				<Field helperText="Helper text">
					<FieldMessage />
				</Field>
			);

			const message = screen.getByRole('status');
			expect(message).toHaveAttribute('aria-live', 'polite');
		});

		test('does not have aria-live for error messages', () => {
			render(
				<Field error="Error message">
					<FieldMessage />
				</Field>
			);

			const message = screen.getByRole('alert');
			expect(message).not.toHaveAttribute('aria-live');
		});

		test('has id attribute matching field id pattern for aria-describedby', () => {
			render(
				<Field id="test-field" helperText="Helper text">
					<FieldMessage />
				</Field>
			);

			const message = screen.getByRole('status');
			expect(message).toHaveAttribute('id', 'test-field-message');
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to wrapper div', () => {
			const ref = { current: null as HTMLDivElement | null };
			render(
				<Field helperText="Helper text">
					<FieldMessage ref={ref} />
				</Field>
			);

			expect(ref.current).toBeInstanceOf(HTMLDivElement);
		});
	});

	describe('Custom className', () => {
		test('applies custom className', () => {
			render(
				<Field helperText="Helper text">
					<FieldMessage className="custom-message" />
				</Field>
			);

			const message = screen.getByText('Helper text');
			expect(message.closest('.custom-message')).toBeInTheDocument();
		});
	});
});
