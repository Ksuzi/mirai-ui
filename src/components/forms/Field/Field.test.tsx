import { describe, expect, test, vi } from 'vitest';

import { render, screen, userEvent } from '@mirai-ui/test';

import { Input } from '../Input/Input.component';

import { Field } from './Field.component';

describe('Field', () => {
	describe('Rendering', () => {
		test('renders field with label and input', () => {
			render(
				<Field>
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
				</Field>
			);

			expect(screen.getByLabelText('Email')).toBeInTheDocument();
		});

		test('renders with helper text', () => {
			render(
				<Field helperText="Enter your email">
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			expect(screen.getByText('Enter your email')).toBeInTheDocument();
		});

		test('renders with error message', () => {
			render(
				<Field error="Email is required">
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			const errorMessage = screen.getByRole('alert');
			expect(errorMessage).toHaveTextContent('Email is required');
		});

		test('error message overrides helper text', () => {
			render(
				<Field error="Email is required" helperText="Enter your email">
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			expect(screen.getByRole('alert')).toHaveTextContent('Email is required');
			expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
		});

		test('renders custom message content', () => {
			render(
				<Field>
					<Field.Label>Password</Field.Label>
					<Field.Control>
						<Input type="password" />
					</Field.Control>
					<Field.Message>
						<span>Custom message content</span>
					</Field.Message>
				</Field>
			);

			expect(screen.getByText('Custom message content')).toBeInTheDocument();
		});

		test('does not render message when no message is provided', () => {
			const { container } = render(
				<Field>
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			const messages = container.querySelectorAll('[role="alert"]');
			expect(messages.length).toBe(0);
		});
	});

	describe('Accessibility', () => {
		test('associates label with input', () => {
			render(
				<Field id="email-field">
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
				</Field>
			);

			const input = screen.getByLabelText('Email');
			expect(input).toHaveAttribute('id', 'email-field');
		});

		test('generates unique id when not provided', () => {
			render(
				<>
					<Field>
						<Field.Label>Field 1</Field.Label>
						<Field.Control>
							<Input />
						</Field.Control>
					</Field>
					<Field>
						<Field.Label>Field 2</Field.Label>
						<Field.Control>
							<Input />
						</Field.Control>
					</Field>
				</>
			);

			const input1 = screen.getByLabelText('Field 1');
			const input2 = screen.getByLabelText('Field 2');

			expect(input1.id).toBeTruthy();
			expect(input2.id).toBeTruthy();
			expect(input1.id).not.toBe(input2.id);
		});

		test('marks input as required', () => {
			render(
				<Field required>
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
				</Field>
			);

			const input = screen.getByLabelText(/Email/);
			expect(input).toBeRequired();
			expect(input).toHaveAttribute('aria-required', 'true');
		});

		test('sets aria-invalid on error', () => {
			render(
				<Field error="Invalid email">
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			const input = screen.getByLabelText('Email');
			expect(input).toHaveAttribute('aria-invalid', 'true');
		});

		test('associates message with input via aria-describedby', () => {
			render(
				<Field id="email-field" helperText="Enter your email">
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			const input = screen.getByLabelText('Email');
			const messageId = input.getAttribute('aria-describedby');

			expect(messageId).toBeTruthy();
			expect(screen.getByText('Enter your email')).toHaveAttribute('id', messageId);
		});

		test('error message has proper ARIA attributes', () => {
			render(
				<Field error="Email is required">
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			const errorMessage = screen.getByRole('alert');
			// role="alert" implies aria-live="assertive", so we don't set it explicitly
			expect(errorMessage).not.toHaveAttribute('aria-live', 'polite');
			expect(errorMessage).not.toHaveAttribute('aria-live', 'assertive');
		});

		test('helper text has role="status" with aria-live="polite"', () => {
			render(
				<Field helperText="Enter your email address">
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			const helperText = screen.getByRole('status');
			expect(helperText).toHaveAttribute('aria-live', 'polite');
			expect(helperText).toHaveTextContent('Enter your email address');
		});

		test('sets aria-errormessage on input when error is present', () => {
			render(
				<Field id="email-field" error="Email is required">
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			const input = screen.getByLabelText('Email');
			expect(input).toHaveAttribute('aria-errormessage', 'email-field-message');
			expect(input).toHaveAttribute('aria-invalid', 'true');
		});

		test('does not set aria-errormessage when no error', () => {
			render(
				<Field id="email-field" helperText="Enter your email">
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			const input = screen.getByLabelText('Email');
			expect(input).not.toHaveAttribute('aria-errormessage');
			expect(input).not.toHaveAttribute('aria-invalid');
		});
	});

	describe('States', () => {
		test('applies disabled state to input', () => {
			render(
				<Field disabled>
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
				</Field>
			);

			expect(screen.getByLabelText('Email')).toBeDisabled();
		});

		test('applies error state', () => {
			render(
				<Field state="error" error="Invalid input">
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
			expect(screen.getByRole('alert')).toBeInTheDocument();
		});

		test('applies success state', () => {
			render(
				<Field state="success" helperText="Looks good!">
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			expect(screen.getByText('Looks good!')).toBeInTheDocument();
		});

		test('applies warning state', () => {
			render(
				<Field state="warning" helperText="Please verify">
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			expect(screen.getByText('Please verify')).toBeInTheDocument();
		});
	});

	describe('Variants', () => {
		test('applies different sizes', () => {
			const { rerender } = render(
				<Field size="sm">
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
				</Field>
			);

			expect(screen.getByLabelText('Email')).toBeInTheDocument();

			rerender(
				<Field size="lg">
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
				</Field>
			);

			expect(screen.getByLabelText('Email')).toBeInTheDocument();
		});

		test('applies fullWidth by default', () => {
			const { container } = render(
				<Field>
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
				</Field>
			);

			const wrapper = container.querySelector('.w-full');
			expect(wrapper).toBeInTheDocument();
		});
	});

	describe('Interaction', () => {
		test('input receives focus and user can type', async () => {
			const user = userEvent.setup();

			render(
				<Field>
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
				</Field>
			);

			const input = screen.getByLabelText('Email');
			await user.type(input, 'test@example.com');

			expect(input).toHaveValue('test@example.com');
		});

		test('calls onChange handler on input', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();

			render(
				<Field>
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input onChange={handleChange} />
					</Field.Control>
				</Field>
			);

			const input = screen.getByLabelText('Email');
			await user.type(input, 'test');

			expect(handleChange).toHaveBeenCalled();
		});
	});

	describe('Context', () => {
		test('throws error when compound components used outside Field.Root', () => {
			// Suppress console.error for this test
			const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {
				// Intentionally empty to suppress React error boundary logs
			});

			expect(() => {
				render(<Field.Label>Orphan Label</Field.Label>);
			}).toThrow('Field compound components must be used within Field.Root');

			consoleError.mockRestore();
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to root element', () => {
			const ref = { current: null as HTMLDivElement | null };

			render(
				<Field ref={ref}>
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
				</Field>
			);

			expect(ref.current).toBeInstanceOf(HTMLDivElement);
		});
	});
});
