import { describe, expect, test } from 'vitest';

import { render } from '@mirai-ui/test';

import { SelectIcon } from './SelectIcon.component';

describe('SelectIcon', () => {
	test('renders with correct structure and classes', () => {
		const { container } = render(<SelectIcon isOpen={false} />);
		const svg = container.querySelector('svg');

		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute('aria-hidden', 'true');
		expect(svg).toHaveClass('w-5', 'h-5', 'text-muted-400', 'transition-transform');
	});

	test('toggles rotation based on isOpen prop', () => {
		const { container, rerender } = render(<SelectIcon isOpen={false} />);
		const svg = container.querySelector('svg');

		expect(svg).not.toHaveClass('rotate-180');

		rerender(<SelectIcon isOpen />);
		expect(svg).toHaveClass('rotate-180');

		rerender(<SelectIcon isOpen={false} />);
		expect(svg).not.toHaveClass('rotate-180');
	});
});
