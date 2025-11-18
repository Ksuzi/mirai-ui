import { describe, expect, test } from 'vitest';

import { render } from '@mirai-ui/test';

import { CheckboxIcon } from './CheckboxIcon.component';
import { sizeMap } from './CheckboxIcon.variants';

describe('CheckboxIcon', () => {
	describe('Rendering', () => {
		test('renders nothing when checked is false', () => {
			const { container } = render(<CheckboxIcon checked={false} />);
			expect(container.firstChild).toBeNull();
		});

		test('renders svg when checked is true', () => {
			const { container } = render(<CheckboxIcon checked />);
			const svg = container.querySelector('svg');
			expect(svg).toBeInTheDocument();
		});

		test('has aria-hidden attribute', () => {
			const { container } = render(<CheckboxIcon checked />);
			const svg = container.querySelector('svg');
			expect(svg).toHaveAttribute('aria-hidden', 'true');
		});

		test('renders checkmark path', () => {
			const { container } = render(<CheckboxIcon checked />);
			const path = container.querySelector('path');
			expect(path).toBeInTheDocument();
		});
	});

	describe('Sizes', () => {
		test('applies default size class when size is not provided', () => {
			const { container } = render(<CheckboxIcon checked />);
			const svg = container.querySelector('svg');
			expect(svg).toBeInTheDocument();
			expect(svg).toHaveClass(sizeMap.md);
		});

		test('applies sm size class when size="sm"', () => {
			const { container } = render(<CheckboxIcon checked size="sm" />);
			const svg = container.querySelector('svg');
			expect(svg).toBeInTheDocument();
			expect(svg).toHaveClass(sizeMap.sm);
		});

		test('applies md size class when size="md"', () => {
			const { container } = render(<CheckboxIcon checked size="md" />);
			const svg = container.querySelector('svg');
			expect(svg).toBeInTheDocument();
			expect(svg).toHaveClass(sizeMap.md);
		});

		test('applies lg size class when size="lg"', () => {
			const { container } = render(<CheckboxIcon checked size="lg" />);
			const svg = container.querySelector('svg');
			expect(svg).toBeInTheDocument();
			expect(svg).toHaveClass(sizeMap.lg);
		});

		test('applies xl size class when size="xl"', () => {
			const { container } = render(<CheckboxIcon checked size="xl" />);
			const svg = container.querySelector('svg');
			expect(svg).toBeInTheDocument();
			expect(svg).toHaveClass(sizeMap.xl);
		});
	});
});
