import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import { Input } from '@mirai-ui/components';

describe('Input Component', () => {
	describe('Rendering', () => {
		test('renders input element', () => {
			render(<Input />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();
		});

		test('renders with label', () => {
			render(<Input label="Email" />);
			expect(screen.getByLabelText('Email')).toBeInTheDocument();
		});

		test('renders with helper text', () => {
			render(<Input helperText="Enter your email address" />);
			expect(screen.getByText('Enter your email address')).toBeInTheDocument();
		});

		test('renders with error message', () => {
			render(<Input error="Email is required" />);
			const errorMessage = screen.getByRole('alert');
			expect(errorMessage).toHaveTextContent('Email is required');
		});
	});

	describe('Accessibility', () => {
		test('associates label with input', () => {
			render(<Input label="Username" id="username-input" />);
			const input = screen.getByLabelText('Username');
			expect(input).toHaveAttribute('id', 'username-input');
		});

		test('marks input as required when required prop is true', () => {
			render(<Input label="Email" required />);
			expect(screen.getByLabelText(/Email/)).toBeRequired();
		});

		test('sets aria-invalid when error is present', () => {
			render(<Input error="Invalid input" />);
			expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
		});

		test('error message has proper ARIA attributes', () => {
			render(<Input error="Invalid email" />);
			const errorMessage = screen.getByRole('alert');
			expect(errorMessage).toHaveAttribute('aria-live', 'polite');
		});
	});

	describe('Interaction', () => {
		test('handles user input', () => {
			render(<Input />);
			const input = screen.getByRole('textbox');
			fireEvent.change(input, { target: { value: 'test@example.com' } });
			expect(input).toHaveValue('test@example.com');
		});

		test('calls onChange handler', () => {
			const handleChange = vi.fn();
			render(<Input onChange={handleChange} />);
			const input = screen.getByRole('textbox');

			fireEvent.change(input, { target: { value: 'test' } });

			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		test('calls onFocus handler', () => {
			const handleFocus = vi.fn();
			render(<Input onFocus={handleFocus} />);
			const input = screen.getByRole('textbox');

			fireEvent.focus(input);

			expect(handleFocus).toHaveBeenCalledTimes(1);
		});
	});

	describe('Variants', () => {
		test('applies different sizes', () => {
			const { rerender } = render(<Input size="sm" data-testid="input" />);
			expect(screen.getByTestId('input')).toBeInTheDocument();

			rerender(<Input size="lg" data-testid="input" />);
			expect(screen.getByTestId('input')).toBeInTheDocument();
		});

		test('applies custom className', () => {
			render(<Input className="custom-class" data-testid="input" />);
			const input = screen.getByTestId('input');
			expect(input).toHaveClass('custom-class');
		});
	});

	describe('Ref forwarding', () => {
		test('forwards ref to input element', () => {
			const ref = { current: null as HTMLInputElement | null };
			render(<Input ref={ref} />);
			expect(ref.current).toBeInstanceOf(HTMLInputElement);
		});
	});
});
