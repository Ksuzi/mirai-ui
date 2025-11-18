import { describe, expect, test } from 'vitest';

import { render, screen } from '@mirai-ui/test';

import { InputIcon } from './InputIcon.component';

describe('InputIcon', () => {
	describe('Rendering', () => {
		test('renders icon content', () => {
			render(
				<InputIcon position="left">
					<span data-testid="icon">@</span>
				</InputIcon>
			);
			expect(screen.getByTestId('icon')).toBeInTheDocument();
		});

		test('renders left positioned icon', () => {
			const { container } = render(
				<InputIcon position="left">
					<span>@</span>
				</InputIcon>
			);
			const iconWrapper = container.firstChild as HTMLElement;
			expect(iconWrapper).toHaveClass('left-0', 'pl-3');
			expect(iconWrapper).toHaveAttribute('data-slot', 'input-left-icon');
		});

		test('renders right positioned icon', () => {
			const { container } = render(
				<InputIcon position="right">
					<span>✓</span>
				</InputIcon>
			);
			const iconWrapper = container.firstChild as HTMLElement;
			expect(iconWrapper).toHaveClass('right-0', 'pr-3');
			expect(iconWrapper).toHaveAttribute('data-slot', 'input-right-icon');
		});

		test('applies accessibility attributes', () => {
			const { container } = render(
				<InputIcon position="left">
					<span>@</span>
				</InputIcon>
			);
			const iconWrapper = container.firstChild as HTMLElement;
			expect(iconWrapper).toHaveAttribute('aria-hidden', 'true');
			expect(iconWrapper).toHaveAttribute('role', 'presentation');
		});

		test('applies custom className', () => {
			const { container } = render(
				<InputIcon position="left" className="custom-class">
					<span>@</span>
				</InputIcon>
			);
			const iconWrapper = container.firstChild as HTMLElement;
			expect(iconWrapper).toHaveClass('custom-class');
		});

		test('forwards ref correctly', () => {
			const ref = { current: null as HTMLDivElement | null };
			render(
				<InputIcon position="left" ref={ref}>
					<span>@</span>
				</InputIcon>
			);
			expect(ref.current).toBeInstanceOf(HTMLDivElement);
		});
	});
});
