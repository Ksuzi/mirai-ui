import { describe, expect, test, vi } from 'vitest';

import { render, screen } from '@mirai-ui/test';

import { Label } from './Label.component';

describe('Label', () => {
	describe('Rendering', () => {
		test('renders label with text', () => {
			render(<Label>Email Address</Label>);
			expect(screen.getByText('Email Address')).toBeInTheDocument();
		});

		test('renders as label element', () => {
			render(<Label>Test Label</Label>);
			const label = screen.getByText('Test Label');
			expect(label.tagName).toBe('LABEL');
		});

		test('applies custom className', () => {
			render(<Label className="custom-class">Label</Label>);
			expect(screen.getByText('Label')).toHaveClass('custom-class');
		});

		test('renders children correctly', () => {
			render(
				<Label>
					<span>Custom</span> Label
				</Label>
			);
			expect(screen.getByText('Custom')).toBeInTheDocument();
			expect(screen.getByText(/Label/)).toBeInTheDocument();
		});
	});

	describe('htmlFor attribute', () => {
		test('sets htmlFor attribute', () => {
			render(<Label htmlFor="test-input">Label</Label>);
			const label = screen.getByText('Label');
			expect(label).toHaveAttribute('for', 'test-input');
		});

		test('works without htmlFor attribute', () => {
			render(<Label>Standalone Label</Label>);
			const label = screen.getByText('Standalone Label');
			expect(label).not.toHaveAttribute('for');
		});
	});

	describe('Required indicator', () => {
		test('shows asterisk when required is true', () => {
			render(<Label required>Required Field</Label>);
			const asterisk = screen.getByLabelText('required');
			expect(asterisk).toBeInTheDocument();
			expect(asterisk).toHaveTextContent('*');
		});

		test('does not show asterisk when required is false', () => {
			render(<Label required={false}>Optional Field</Label>);
			expect(screen.queryByLabelText('required')).not.toBeInTheDocument();
		});

		test('does not show asterisk by default', () => {
			render(<Label>Default Field</Label>);
			expect(screen.queryByLabelText('required')).not.toBeInTheDocument();
		});
	});

	describe('Sizes', () => {
		test('applies small size classes', () => {
			render(<Label size="sm">Small Label</Label>);
			expect(screen.getByText('Small Label')).toHaveClass('text-sm');
		});

		test('applies medium size classes (default)', () => {
			render(<Label size="md">Medium Label</Label>);
			expect(screen.getByText('Medium Label')).toHaveClass('text-base');
		});

		test('applies large size classes', () => {
			render(<Label size="lg">Large Label</Label>);
			expect(screen.getByText('Large Label')).toHaveClass('text-lg');
		});

		test('applies extra large size classes', () => {
			render(<Label size="xl">Extra Large Label</Label>);
			expect(screen.getByText('Extra Large Label')).toHaveClass('text-xl');
		});
	});

	describe('Disabled state', () => {
		test('applies disabled classes when disabled is true', () => {
			render(<Label disabled>Disabled Label</Label>);
			expect(screen.getByText('Disabled Label')).toHaveClass('text-disabled-foreground');
			expect(screen.getByText('Disabled Label')).toHaveClass('cursor-not-allowed');
		});

		test('does not apply disabled classes by default', () => {
			render(<Label>Normal Label</Label>);
			expect(screen.getByText('Normal Label')).not.toHaveClass('text-disabled-foreground');
		});
	});

	describe('Accessibility', () => {
		test('associates with form control via htmlFor', () => {
			const { container } = render(
				<div>
					<Label htmlFor="test-input">Email</Label>
					<input id="test-input" />
				</div>
			);

			const label = screen.getByText('Email');
			const input = container.querySelector('#test-input');

			expect(label).toHaveAttribute('for', 'test-input');
			expect(input).toHaveAttribute('id', 'test-input');
		});

		test('required indicator has aria-label', () => {
			render(<Label required>Required</Label>);
			const asterisk = screen.getByLabelText('required');
			expect(asterisk).toHaveAttribute('aria-label', 'required');
		});
	});

	describe('HTML attributes', () => {
		test('forwards additional HTML attributes', () => {
			render(
				<Label data-testid="custom-label" title="Label title">
					Label
				</Label>
			);
			const label = screen.getByTestId('custom-label');
			expect(label).toHaveAttribute('title', 'Label title');
		});

		test('supports onClick handler', () => {
			const handleClick = vi.fn();
			render(<Label onClick={handleClick}>Clickable Label</Label>);
			const label = screen.getByText('Clickable Label');
			label.click();
			expect(handleClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to label element', () => {
			const ref = { current: null as HTMLLabelElement | null };
			render(<Label ref={ref}>Label</Label>);
			expect(ref.current).toBeInstanceOf(HTMLLabelElement);
			expect(ref.current?.tagName).toBe('LABEL');
		});
	});

	describe('Base styles', () => {
		test('applies base label styles', () => {
			render(<Label>Label</Label>);
			const label = screen.getByText('Label');
			expect(label).toHaveClass('block');
			expect(label).toHaveClass('font-medium');
			expect(label).toHaveClass('text-foreground');
		});
	});
});
