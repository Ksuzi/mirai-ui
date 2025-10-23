import { describe, expect, test, vi } from 'vitest';

import { render, screen, userEvent } from '@mirai-ui/test';

import { Button } from './Button.component';

describe('Button', () => {
	describe('Rendering', () => {
		test('renders button with text', () => {
			render(<Button>Click me</Button>);
			expect(screen.getByRole('button')).toHaveTextContent('Click me');
		});

		test('renders with left icon', () => {
			render(<Button leftIcon={<span data-testid="left-icon">←</span>}>With Icon</Button>);
			expect(screen.getByTestId('left-icon')).toBeInTheDocument();
			expect(screen.getByText('With Icon')).toBeInTheDocument();
		});

		test('renders with right icon', () => {
			render(<Button rightIcon={<span data-testid="right-icon">→</span>}>With Icon</Button>);
			expect(screen.getByTestId('right-icon')).toBeInTheDocument();
		});

		test('hides left icon when loading', () => {
			render(
				<Button loading leftIcon={<span data-testid="left-icon">←</span>}>
					Loading
				</Button>
			);
			expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
		});

		test('shows loading spinner when loading', () => {
			render(<Button loading>Loading</Button>);
			expect(screen.getByLabelText('Loading')).toBeInTheDocument();
		});

		test('applies custom className', () => {
			render(<Button className="custom-class">Button</Button>);
			expect(screen.getByRole('button')).toHaveClass('custom-class');
		});
	});

	describe('Interaction', () => {
		test('handles click events', async () => {
			const user = userEvent.setup();
			const handleClick = vi.fn();
			render(<Button onClick={handleClick}>Click me</Button>);

			await user.click(screen.getByRole('button'));
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		test('does not call onClick when disabled', async () => {
			const user = userEvent.setup();
			const handleClick = vi.fn();
			render(
				<Button disabled onClick={handleClick}>
					Disabled
				</Button>
			);

			await user.click(screen.getByRole('button'));
			expect(handleClick).not.toHaveBeenCalled();
		});

		test('does not call onClick when loading', async () => {
			const user = userEvent.setup();
			const handleClick = vi.fn();
			render(
				<Button loading onClick={handleClick}>
					Loading
				</Button>
			);

			await user.click(screen.getByRole('button'));
			expect(handleClick).not.toHaveBeenCalled();
		});
	});

	describe('Keyboard Navigation', () => {
		test('handles Enter key press', async () => {
			const user = userEvent.setup();
			const handleClick = vi.fn();
			render(<Button onClick={handleClick}>Press Enter</Button>);

			const button = screen.getByRole('button');
			button.focus();
			await user.keyboard('{Enter}');

			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		test('handles Space key press', async () => {
			const user = userEvent.setup();
			const handleClick = vi.fn();
			render(<Button onClick={handleClick}>Press Space</Button>);

			const button = screen.getByRole('button');
			button.focus();
			await user.keyboard(' ');

			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		test('does not handle keyboard events when disabled', async () => {
			const user = userEvent.setup();
			const handleClick = vi.fn();
			render(
				<Button disabled onClick={handleClick}>
					Disabled
				</Button>
			);

			const button = screen.getByRole('button');
			button.focus();
			await user.keyboard('{Enter}');
			await user.keyboard(' ');

			expect(handleClick).not.toHaveBeenCalled();
		});
	});

	describe('States', () => {
		test('disables button when disabled prop is true', () => {
			render(<Button disabled>Disabled</Button>);
			expect(screen.getByRole('button')).toBeDisabled();
		});

		test('disables button when loading', () => {
			render(<Button loading>Loading</Button>);
			expect(screen.getByRole('button')).toBeDisabled();
		});

		test('sets aria-disabled when disabled', () => {
			render(<Button disabled>Disabled</Button>);
			expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
		});

		test('sets aria-busy when loading', () => {
			render(<Button loading>Loading</Button>);
			expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
		});
	});

	describe('Variants', () => {
		test('renders different sizes', () => {
			const { rerender } = render(<Button size="sm">Small</Button>);
			expect(screen.getByRole('button')).toBeInTheDocument();

			rerender(<Button size="md">Medium</Button>);
			expect(screen.getByRole('button')).toBeInTheDocument();

			rerender(<Button size="lg">Large</Button>);
			expect(screen.getByRole('button')).toBeInTheDocument();
		});

		test('renders full width', () => {
			render(<Button fullWidth>Full Width</Button>);
			expect(screen.getByRole('button')).toBeInTheDocument();
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to button element', () => {
			const ref = { current: null as HTMLButtonElement | null };
			render(<Button ref={ref}>Button</Button>);
			expect(ref.current).toBeInstanceOf(HTMLButtonElement);
		});
	});
});
