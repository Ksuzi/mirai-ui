import { describe, expect, test } from 'vitest';

import { render } from '@mirai-ui/test';

import { Spinner } from './Spinner.component';

describe('Spinner', () => {
	describe('Rendering', () => {
		test('renders spinner', () => {
			const { container } = render(<Spinner />);
			const svg = container.querySelector('svg');
			expect(svg).toBeInTheDocument();
		});

		test('has aria-label attribute', () => {
			const { container } = render(<Spinner />);
			const svg = container.querySelector('svg');
			expect(svg).toHaveAttribute('aria-label', 'Loading...');
		});

		test('has role attribute', () => {
			const { container } = render(<Spinner />);
			const svg = container.querySelector('svg');
			expect(svg).toHaveAttribute('role', 'status');
		});

		test('is accessible to screen readers', () => {
			const { container } = render(<Spinner />);
			const svg = container.querySelector('svg');
			expect(svg).not.toHaveAttribute('aria-hidden', 'true');
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to svg element', () => {
			const ref = { current: null as SVGSVGElement | null };
			render(<Spinner ref={ref} />);
			expect(ref.current).toBeInstanceOf(SVGSVGElement);
		});
	});
});
