import { describe, expect, test, vi } from 'vitest';

import { render, screen, userEvent } from '@mirai-ui/test';

import { Input } from './Input.component';

describe('Input', () => {
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

		test('renders with left icon', () => {
			render(<Input leftIcon={<span data-testid="left-icon">@</span>} />);
			expect(screen.getByTestId('left-icon')).toBeInTheDocument();
		});

		test('renders with right icon', () => {
			render(<Input rightIcon={<span data-testid="right-icon">✓</span>} />);
			expect(screen.getByTestId('right-icon')).toBeInTheDocument();
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

		test('associates helper text with input via aria-describedby', () => {
			render(<Input helperText="Enter your email" id="email-input" />);
			const input = screen.getByRole('textbox');
			const helperTextId = input.getAttribute('aria-describedby');
			expect(helperTextId).toBeTruthy();
			expect(screen.getByText('Enter your email')).toHaveAttribute('id', helperTextId);
		});

		test('associates error with input via aria-describedby', () => {
			render(<Input error="Invalid email" id="email-input" />);
			const input = screen.getByRole('textbox');
			const errorId = input.getAttribute('aria-describedby');
			expect(errorId).toBeTruthy();
			expect(screen.getByRole('alert')).toHaveAttribute('id', errorId);
		});
	});

	describe('Interaction', () => {
		test('handles user input', async () => {
			const user = userEvent.setup();
			render(<Input />);
			const input = screen.getByRole('textbox');

			await user.type(input, 'test@example.com');
			expect(input).toHaveValue('test@example.com');
		});

		test('calls onChange handler', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();
			render(<Input onChange={handleChange} />);
			const input = screen.getByRole('textbox');

			await user.type(input, 'test');
			expect(handleChange).toHaveBeenCalled();
		});

		test('calls onFocus handler', async () => {
			const user = userEvent.setup();
			const handleFocus = vi.fn();
			render(<Input onFocus={handleFocus} />);
			const input = screen.getByRole('textbox');

			await user.click(input);
			expect(handleFocus).toHaveBeenCalledTimes(1);
		});

		test('calls onBlur handler', async () => {
			const user = userEvent.setup();
			const handleBlur = vi.fn();
			render(<Input onBlur={handleBlur} />);
			const input = screen.getByRole('textbox');

			await user.click(input);
			await user.tab();
			expect(handleBlur).toHaveBeenCalledTimes(1);
		});
	});

	describe('Variants', () => {
		test('applies different sizes', () => {
			const { rerender } = render(<Input size="sm" data-testid="input" />);
			expect(screen.getByTestId('input')).toBeInTheDocument();

			rerender(<Input size="md" data-testid="input" />);
			expect(screen.getByTestId('input')).toBeInTheDocument();

			rerender(<Input size="lg" data-testid="input" />);
			expect(screen.getByTestId('input')).toBeInTheDocument();
		});

		test('applies custom className', () => {
			render(<Input className="custom-class" data-testid="input" />);
			const input = screen.getByTestId('input');
			expect(input).toHaveClass('custom-class');
		});

		test('applies fullWidth by default', () => {
			const { container } = render(<Input />);
			const wrapper = container.querySelector('.w-full');
			expect(wrapper).toBeInTheDocument();
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to input element', () => {
			const ref = { current: null as HTMLInputElement | null };
			render(<Input ref={ref} />);
			expect(ref.current).toBeInstanceOf(HTMLInputElement);
		});
	});
});
