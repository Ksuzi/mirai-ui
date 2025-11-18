import { describe, expect, test } from 'vitest';

import { render } from '@mirai-ui/test';

import { RadioIcon } from './RadioIcon.component';

describe('RadioIcon', () => {
	describe('Rendering', () => {
		test('renders radio icon container', () => {
			const { container } = render(<RadioIcon checked={false} />);
			const icon = container.querySelector('span');
			expect(icon).toBeInTheDocument();
		});

		test('renders dot element', () => {
			const { container } = render(<RadioIcon checked={false} />);
			const dots = container.querySelectorAll('span');
			expect(dots.length).toBeGreaterThan(0);
		});

		test('renders when checked', () => {
			const { container } = render(<RadioIcon checked />);
			const icon = container.querySelector('span');
			expect(icon).toBeInTheDocument();
		});

		test('renders when unchecked', () => {
			const { container } = render(<RadioIcon checked={false} />);
			const icon = container.querySelector('span');
			expect(icon).toBeInTheDocument();
		});
	});

	describe('Sizes', () => {
		test('applies default size class when size is not provided', () => {
			const { container } = render(<RadioIcon checked />);
			const icon = container.querySelector('span');
			expect(icon).toBeInTheDocument();
			// Check that default size classes are applied
			expect(icon?.className).toContain('text-[0.625rem]');
		});

		test('applies sm size class when size="sm"', () => {
			const { container } = render(<RadioIcon checked size="sm" />);
			const icon = container.querySelector('span');
			expect(icon).toBeInTheDocument();
			expect(icon?.className).toContain('text-[0.5rem]');
		});

		test('applies md size class when size="md"', () => {
			const { container } = render(<RadioIcon checked size="md" />);
			const icon = container.querySelector('span');
			expect(icon).toBeInTheDocument();
			expect(icon?.className).toContain('text-[0.625rem]');
		});

		test('applies lg size class when size="lg"', () => {
			const { container } = render(<RadioIcon checked size="lg" />);
			const icon = container.querySelector('span');
			expect(icon).toBeInTheDocument();
			expect(icon?.className).toContain('text-[0.75rem]');
		});

		test('applies xl size class when size="xl"', () => {
			const { container } = render(<RadioIcon checked size="xl" />);
			const icon = container.querySelector('span');
			expect(icon).toBeInTheDocument();
			expect(icon?.className).toContain('text-[0.875rem]');
		});
	});
});
