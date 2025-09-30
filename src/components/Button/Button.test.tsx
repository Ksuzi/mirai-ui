import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../src/components/ui/button';

describe('Button Component', () => {
	describe('Rendering', () => {
		it('renders with default props', () => {
			render(<Button>Click me</Button>);
			const button = screen.getByRole('button', { name: 'Click me' });
			expect(button).toBeInTheDocument();
			expect(button).toHaveClass('bg-primary', 'text-primary-foreground');
		});

		it('renders with custom className', () => {
			render(<Button className="custom-class">Click me</Button>);
			const button = screen.getByRole('button');
			expect(button).toHaveClass('custom-class');
		});

		it('renders as child element when asChild is true', () => {
			render(
				<Button asChild>
					<a href="/test">Link Button</a>
				</Button>
			);
			const link = screen.getByRole('link', { name: 'Link Button' });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', '/test');
		});
	});

	describe('Variants', () => {
		it('applies default variant styles', () => {
			render(<Button>Default</Button>);
			const button = screen.getByRole('button');
			expect(button).toHaveClass('bg-primary', 'text-primary-foreground');
		});

		it('applies destructive variant styles', () => {
			render(<Button variant="destructive">Delete</Button>);
			const button = screen.getByRole('button');
			expect(button).toHaveClass('bg-destructive', 'text-destructive-foreground');
		});

		it('applies outline variant styles', () => {
			render(<Button variant="outline">Outline</Button>);
			const button = screen.getByRole('button');
			expect(button).toHaveClass('border', 'bg-background');
		});

		it('applies secondary variant styles', () => {
			render(<Button variant="secondary">Secondary</Button>);
			const button = screen.getByRole('button');
			expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground');
		});

		it('applies ghost variant styles', () => {
			render(<Button variant="ghost">Ghost</Button>);
			const button = screen.getByRole('button');
			expect(button).toHaveClass('hover:bg-accent');
		});

		it('applies link variant styles', () => {
			render(<Button variant="link">Link</Button>);
			const button = screen.getByRole('button');
			expect(button).toHaveClass('text-primary', 'underline-offset-4');
		});
	});

	describe('Sizes', () => {
		it('applies default size styles', () => {
			render(<Button>Default Size</Button>);
			const button = screen.getByRole('button');
			expect(button).toHaveClass('h-9', 'px-4', 'py-2');
		});

		it('applies small size styles', () => {
			render(<Button size="sm">Small</Button>);
			const button = screen.getByRole('button');
			expect(button).toHaveClass('h-8', 'px-3', 'text-xs');
		});

		it('applies large size styles', () => {
			render(<Button size="lg">Large</Button>);
			const button = screen.getByRole('button');
			expect(button).toHaveClass('h-10', 'px-6', 'text-base');
		});

		it('applies icon size styles', () => {
			render(<Button size="icon">🚀</Button>);
			const button = screen.getByRole('button');
			expect(button).toHaveClass('size-9', 'p-0');
		});
	});

	describe('Loading State', () => {
		it('shows loading text when loading is true', () => {
			render(
				<Button loading loadingText="Saving...">
					Save
				</Button>
			);
			expect(screen.getByText('Saving...')).toBeInTheDocument();
			expect(screen.queryByText('Save')).not.toBeInTheDocument();
		});

		it('shows default loading text when no loadingText provided', () => {
			render(<Button loading>Save</Button>);
			expect(screen.getByText('Loading...')).toBeInTheDocument();
		});

		it('is disabled when loading', () => {
			render(<Button loading>Save</Button>);
			const button = screen.getByRole('button');
			expect(button).toBeDisabled();
			expect(button).toHaveAttribute('aria-disabled', 'true');
		});

		it('shows spinner when loading and showSpinner is true', () => {
			render(
				<Button loading showSpinner>
					Save
				</Button>
			);
			const spinner = screen.getByRole('button').querySelector('svg');
			expect(spinner).toBeInTheDocument();
			expect(spinner).toHaveClass('animate-spin');
		});

		it('does not show spinner when showSpinner is false', () => {
			render(
				<Button loading showSpinner={false}>
					Save
				</Button>
			);
			const spinner = screen.getByRole('button').querySelector('svg');
			expect(spinner).not.toBeInTheDocument();
		});
	});

	describe('Icons', () => {
		it('renders left icon', () => {
			render(<Button leftIcon={<span data-testid="left-icon">←</span>}>Back</Button>);
			expect(screen.getByTestId('left-icon')).toBeInTheDocument();
		});

		it('renders right icon', () => {
			render(<Button rightIcon={<span data-testid="right-icon">→</span>}>Next</Button>);
			expect(screen.getByTestId('right-icon')).toBeInTheDocument();
		});

		it('does not show right icon when loading', () => {
			render(
				<Button loading rightIcon={<span data-testid="right-icon">→</span>}>
					Save
				</Button>
			);
			expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
		});

		it('shows loading icon instead of left icon when loading', () => {
			render(
				<Button
					loading
					leftIcon={<span data-testid="left-icon">←</span>}
					loadingIcon={<span data-testid="loading-icon">⟳</span>}
				>
					Save
				</Button>
			);
			expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
			expect(screen.getByTestId('loading-icon')).toBeInTheDocument();
		});
	});

	describe('Interactions', () => {
		it('handles click events', () => {
			const handleClick = vi.fn();
			render(<Button onClick={handleClick}>Click me</Button>);

			fireEvent.click(screen.getByRole('button'));
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it('does not call onClick when disabled', () => {
			const handleClick = vi.fn();
			render(
				<Button onClick={handleClick} disabled>
					Click me
				</Button>
			);

			fireEvent.click(screen.getByRole('button'));
			expect(handleClick).not.toHaveBeenCalled();
		});

		it('does not call onClick when loading', () => {
			const handleClick = vi.fn();
			render(
				<Button onClick={handleClick} loading>
					Click me
				</Button>
			);

			fireEvent.click(screen.getByRole('button'));
			expect(handleClick).not.toHaveBeenCalled();
		});
	});

	describe('Accessibility', () => {
		it('supports aria-label', () => {
			render(<Button aria-label="Close dialog">×</Button>);
			const button = screen.getByRole('button', { name: 'Close dialog' });
			expect(button).toBeInTheDocument();
		});

		it('supports aria-describedby', () => {
			render(
				<>
					<Button aria-describedby="help-text">Submit</Button>
					<div id="help-text">This will submit the form</div>
				</>
			);
			const button = screen.getByRole('button');
			expect(button).toHaveAttribute('aria-describedby', 'help-text');
		});

		it('supports aria-pressed for toggle buttons', () => {
			render(<Button aria-pressed="true">Toggle</Button>);
			const button = screen.getByRole('button');
			expect(button).toHaveAttribute('aria-pressed', 'true');
		});

		it('supports aria-expanded for expandable buttons', () => {
			render(<Button aria-expanded="false">Menu</Button>);
			const button = screen.getByRole('button');
			expect(button).toHaveAttribute('aria-expanded', 'false');
		});
	});

	describe('Ref forwarding', () => {
		it('forwards ref correctly', () => {
			const ref = vi.fn();
			render(<Button ref={ref}>Click me</Button>);
			expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
		});
	});
});
