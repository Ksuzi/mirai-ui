import { describe, expect, test, vi } from 'vitest';

import { render, screen, userEvent } from '@mirai-ui/test';

import { Field } from '../Field';

import { Checkbox } from './Checkbox.component';

describe('Checkbox', () => {
	describe('Rendering', () => {
		test('renders checkbox', () => {
			render(<Checkbox />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();
		});

		test('applies custom className to checkbox', () => {
			render(<Checkbox className="custom-class" data-testid="checkbox" />);
			const checkbox = screen.getByRole('checkbox');
			expect(checkbox).toHaveClass('custom-class');
		});
	});

	describe('Controlled vs Uncontrolled', () => {
		test('works as uncontrolled component with defaultChecked', async () => {
			const user = userEvent.setup();
			render(<Checkbox defaultChecked={false} />);
			const checkbox = screen.getByRole('checkbox');

			expect(checkbox).not.toBeChecked();

			await user.click(checkbox);
			expect(checkbox).toBeChecked();

			await user.click(checkbox);
			expect(checkbox).not.toBeChecked();
		});

		test('works as controlled component', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();
			const { rerender } = render(<Checkbox checked={false} onChange={handleChange} />);
			const checkbox = screen.getByRole('checkbox');

			expect(checkbox).not.toBeChecked();

			await user.click(checkbox);
			expect(handleChange).toHaveBeenCalledTimes(1);
			// State doesn't change until parent updates the prop
			expect(checkbox).not.toBeChecked();

			// Simulate parent updating the checked prop
			rerender(<Checkbox checked onChange={handleChange} />);
			expect(checkbox).toBeChecked();
		});

		test('calls onChange handler in both controlled and uncontrolled mode', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();

			// Uncontrolled
			const { rerender } = render(<Checkbox onChange={handleChange} />);
			await user.click(screen.getByRole('checkbox'));
			expect(handleChange).toHaveBeenCalledTimes(1);

			handleChange.mockClear();

			// Controlled
			rerender(<Checkbox checked={false} onChange={handleChange} />);
			await user.click(screen.getByRole('checkbox'));
			expect(handleChange).toHaveBeenCalledTimes(1);
		});
	});

	describe('Interaction', () => {
		test('can be checked and unchecked', async () => {
			const user = userEvent.setup();
			render(<Checkbox />);
			const checkbox = screen.getByRole('checkbox');

			expect(checkbox).not.toBeChecked();

			await user.click(checkbox);
			expect(checkbox).toBeChecked();

			await user.click(checkbox);
			expect(checkbox).not.toBeChecked();
		});

		test('can be toggled with Space key', async () => {
			const user = userEvent.setup();
			render(<Checkbox />);
			const checkbox = screen.getByRole('checkbox');

			checkbox.focus();
			expect(checkbox).not.toBeChecked();

			await user.keyboard(' ');
			expect(checkbox).toBeChecked();

			await user.keyboard(' ');
			expect(checkbox).not.toBeChecked();
		});
	});

	describe('States', () => {
		test('can be disabled', () => {
			render(<Checkbox disabled />);
			expect(screen.getByRole('checkbox')).toBeDisabled();
		});

		test('cannot be clicked when disabled', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();
			render(<Checkbox disabled onChange={handleChange} />);
			const checkbox = screen.getByRole('checkbox');

			await user.click(checkbox);
			expect(handleChange).not.toHaveBeenCalled();
		});

		test('starts checked when defaultChecked is true', () => {
			render(<Checkbox defaultChecked />);
			expect(screen.getByRole('checkbox')).toBeChecked();
		});
	});

	describe('Accessibility', () => {
		test('supports aria-label for checkboxes without visible labels', () => {
			render(<Checkbox aria-label="Accept terms" />);
			const checkbox = screen.getByLabelText('Accept terms');
			expect(checkbox).toBeInTheDocument();
		});

		test('checkbox icon is hidden from screen readers', () => {
			const { container } = render(<Checkbox defaultChecked />);
			const icon = container.querySelector('svg');
			expect(icon).toHaveAttribute('aria-hidden', 'true');
		});
	});

	describe('Variants', () => {
		test('renders different sizes', () => {
			const { rerender } = render(<Checkbox size="sm" />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();

			rerender(<Checkbox size="md" />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();

			rerender(<Checkbox size="lg" />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();
		});

		test('renders different colors', () => {
			const { rerender } = render(<Checkbox colorScheme="primary" />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();

			rerender(<Checkbox colorScheme="secondary" />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();
		});
	});

	describe('With Field Component', () => {
		test('works with Field for labels', () => {
			render(
				<Field>
					<div className="flex items-center gap-2">
						<Field.Control>
							<Checkbox />
						</Field.Control>
						<Field.Label className="mb-0">Accept terms</Field.Label>
					</div>
				</Field>
			);

			expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
		});

		test('works with Field for error messages', () => {
			render(
				<Field error="You must accept the terms">
					<div className="flex items-center gap-2">
						<Field.Control>
							<Checkbox />
						</Field.Control>
						<Field.Label className="mb-0">Accept terms</Field.Label>
					</div>
					<Field.Message />
				</Field>
			);

			expect(screen.getByRole('alert')).toHaveTextContent('You must accept the terms');
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to input element', () => {
			const ref = { current: null as HTMLInputElement | null };
			render(<Checkbox ref={ref} />);
			expect(ref.current).toBeInstanceOf(HTMLInputElement);
			expect(ref.current?.type).toBe('checkbox');
		});
	});
});
