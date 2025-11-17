import { describe, expect, test, vi } from 'vitest';

import { render, screen, userEvent } from '@mirai-ui/test';

import { Field } from '../Field';

import { Input } from './Input.component';

describe('Input', () => {
	describe('Rendering', () => {
		test('renders input element', () => {
			render(<Input />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();
		});

		test('renders with placeholder', () => {
			render(<Input placeholder="Enter text" />);
			expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
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

	describe('Variants', () => {
		test('renders different input styles', () => {
			const { rerender } = render(<Input variant="default" placeholder="Default" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();

			rerender(<Input variant="outlined" placeholder="Outlined" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();

			rerender(<Input variant="filled" placeholder="Filled" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();

			rerender(<Input variant="borderless" placeholder="Borderless" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();

			rerender(<Input variant="underlined" placeholder="Underlined" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();
		});

		test('renders different states', () => {
			const { rerender } = render(<Input state="default" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();

			rerender(<Input state="error" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();

			rerender(<Input state="success" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();

			rerender(<Input state="warning" />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();
		});

		test('applies different sizes', () => {
			const { rerender } = render(<Input size="sm" data-testid="input" />);
			expect(screen.getByTestId('input')).toBeInTheDocument();

			rerender(<Input size="md" data-testid="input" />);
			expect(screen.getByTestId('input')).toBeInTheDocument();

			rerender(<Input size="lg" data-testid="input" />);
			expect(screen.getByTestId('input')).toBeInTheDocument();
		});

		test('applies custom className', () => {
			const { container } = render(<Input className="custom-class" data-testid="input" />);
			const inputWrapper = container.querySelector('.custom-class');
			expect(inputWrapper).toBeInTheDocument();
		});

		test('applies fullWidth by default', () => {
			const { container } = render(<Input />);
			const wrapper = container.querySelector('.relative');
			expect(wrapper?.parentElement).toBeInTheDocument();
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

	describe('Accessibility', () => {
		test('sets aria-invalid when state is error', () => {
			render(<Input state="error" />);
			expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
		});

		test('does not override consumer-provided aria-invalid', () => {
			render(<Input state="error" aria-invalid="false" />);
			expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
		});

		test('marks input as required when required prop is true', () => {
			render(<Input required />);
			const input = screen.getByRole('textbox');
			expect(input).toBeRequired();
			expect(input).toHaveAttribute('aria-required', 'true');
		});

		test('hides decorative icons from assistive technologies', () => {
			render(
				<Input leftIcon={<span data-testid="left-icon">@</span>} rightIcon={<span data-testid="right-icon">✓</span>} />
			);

			const leftWrapper = screen.getByTestId('left-icon').closest('[data-slot="input-left-icon"]');
			const rightWrapper = screen.getByTestId('right-icon').closest('[data-slot="input-right-icon"]');

			if (!(leftWrapper instanceof HTMLElement) || !(rightWrapper instanceof HTMLElement)) {
				throw new Error('Icon wrappers were not rendered as expected');
			}

			expect(leftWrapper).toHaveAttribute('aria-hidden', 'true');
			expect(rightWrapper).toHaveAttribute('aria-hidden', 'true');
		});
	});

	describe('With Field Component', () => {
		test('works with Field for labels', () => {
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

		test('works with Field for error messages', () => {
			render(
				<Field error="Email is required">
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			expect(screen.getByRole('alert')).toHaveTextContent('Email is required');
		});

		test('works with Field for helper text', () => {
			render(
				<Field helperText="Enter your email address">
					<Field.Label>Email</Field.Label>
					<Field.Control>
						<Input />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			expect(screen.getByText('Enter your email address')).toBeInTheDocument();
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
