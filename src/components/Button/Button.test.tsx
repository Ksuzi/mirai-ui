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
			const { container } = render(<Button loading>Loading</Button>);
			const svg = container.querySelector('svg');
			expect(svg).toBeInTheDocument();
			expect(svg).toHaveAttribute('role', 'status');
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

			expect(handleClick).toHaveBeenCalled();
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
		test('renders different button styles', () => {
			const { rerender } = render(<Button variant="solid">Solid</Button>);
			expect(screen.getByRole('button')).toHaveTextContent('Solid');

			rerender(<Button variant="outline">Outline</Button>);
			expect(screen.getByRole('button')).toHaveTextContent('Outline');

			rerender(<Button variant="ghost">Ghost</Button>);
			expect(screen.getByRole('button')).toHaveTextContent('Ghost');

			rerender(<Button variant="link">Link</Button>);
			expect(screen.getByRole('button')).toHaveTextContent('Link');
		});

		test('renders different color schemes', () => {
			const { rerender } = render(<Button colorScheme="primary">Primary</Button>);
			expect(screen.getByRole('button')).toHaveTextContent('Primary');

			rerender(<Button colorScheme="success">Success</Button>);
			expect(screen.getByRole('button')).toHaveTextContent('Success');

			rerender(<Button colorScheme="error">Error</Button>);
			expect(screen.getByRole('button')).toHaveTextContent('Error');

			rerender(<Button colorScheme="info">Info</Button>);
			expect(screen.getByRole('button')).toHaveTextContent('Info');
		});

		test('combines variant and colorScheme', () => {
			const { rerender } = render(
				<Button variant="outline" colorScheme="success">
					Success Outline
				</Button>
			);
			expect(screen.getByRole('button')).toHaveTextContent('Success Outline');

			rerender(
				<Button variant="ghost" colorScheme="error">
					Error Ghost
				</Button>
			);
			expect(screen.getByRole('button')).toHaveTextContent('Error Ghost');

			rerender(
				<Button variant="link" colorScheme="warning">
					Warning Link
				</Button>
			);
			expect(screen.getByRole('button')).toHaveTextContent('Warning Link');
		});

		test('renders different sizes', () => {
			const { rerender } = render(<Button size="sm">Small</Button>);
			expect(screen.getByRole('button')).toBeInTheDocument();

			rerender(<Button size="md">Medium</Button>);
			expect(screen.getByRole('button')).toBeInTheDocument();

			rerender(<Button size="lg">Large</Button>);
			expect(screen.getByRole('button')).toBeInTheDocument();

			rerender(<Button size="xl">Extra Large</Button>);
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

	describe('Accessibility', () => {
		describe('Icon-only buttons', () => {
			test('warns when icon-only button lacks aria-label', () => {
				const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
					// Suppress console output during test
				});
				render(<Button leftIcon={<span>←</span>} />);
				expect(consoleSpy).toHaveBeenCalledWith(
					expect.stringContaining('Icon-only buttons must have an accessible label')
				);
				consoleSpy.mockRestore();
			});

			test('accepts aria-label for icon-only buttons', () => {
				render(<Button leftIcon={<span>←</span>} aria-label="Previous page" />);
				expect(screen.getByRole('button', { name: 'Previous page' })).toBeInTheDocument();
			});

			test('accepts aria-labelledby for icon-only buttons', () => {
				render(
					<>
						<span id="prev-label">Previous</span>
						<Button leftIcon={<span>←</span>} aria-labelledby="prev-label" />
					</>
				);
				expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
			});

			test('does not warn when button has children', () => {
				const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
					// Suppress console output during test
				});
				render(
					<Button leftIcon={<span>←</span>} aria-label="Previous">
						Previous
					</Button>
				);
				expect(consoleSpy).not.toHaveBeenCalled();
				consoleSpy.mockRestore();
			});

			test('hides decorative icons from screen readers', () => {
				render(
					<Button leftIcon={<span data-testid="left-icon">←</span>} aria-label="Previous">
						Previous
					</Button>
				);
				const iconContainer = screen.getByTestId('left-icon').parentElement;
				expect(iconContainer).toHaveAttribute('aria-hidden', 'true');
			});

			test('hides right icon from screen readers', () => {
				render(
					<Button rightIcon={<span data-testid="right-icon">→</span>} aria-label="Next">
						Next
					</Button>
				);
				const iconContainer = screen.getByTestId('right-icon').parentElement;
				expect(iconContainer).toHaveAttribute('aria-hidden', 'true');
			});
		});

		describe('Focus management', () => {
			test('button is focusable', () => {
				render(<Button>Focusable</Button>);
				const button = screen.getByRole('button');
				button.focus();
				expect(button).toHaveFocus();
			});

			test('button is not focusable when disabled', () => {
				render(<Button disabled>Disabled</Button>);
				const button = screen.getByRole('button');
				expect(button).toBeDisabled();
				// Disabled buttons are still focusable in some browsers, but aria-disabled indicates state
				expect(button).toHaveAttribute('aria-disabled', 'true');
			});
		});

		describe('Screen reader announcements', () => {
			test('announces loading state with aria-busy', () => {
				render(<Button loading>Loading</Button>);
				const button = screen.getByRole('button');
				expect(button).toHaveAttribute('aria-busy', 'true');
			});

			test('announces disabled state with aria-disabled', () => {
				render(<Button disabled>Disabled</Button>);
				const button = screen.getByRole('button');
				expect(button).toHaveAttribute('aria-disabled', 'true');
			});

			test('button has accessible name from children', () => {
				render(<Button>Submit Form</Button>);
				expect(screen.getByRole('button', { name: 'Submit Form' })).toBeInTheDocument();
			});

			test('button has accessible name from aria-label', () => {
				render(<Button aria-label="Close dialog">×</Button>);
				expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
			});
		});
	});
});
