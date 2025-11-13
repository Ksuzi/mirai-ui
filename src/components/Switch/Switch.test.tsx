import { describe, expect, test, vi } from 'vitest';

import { render, screen, userEvent } from '@mirai-ui/test';

import { Field } from '../Field';

import { Switch } from './Switch.component';

describe('Switch', () => {
	describe('Rendering', () => {
		test('renders switch', () => {
			render(<Switch />);
			const switchElement = screen.getByRole('checkbox');
			expect(switchElement).toBeInTheDocument();
			expect(switchElement.closest('label')).toHaveAttribute('role', 'switch');
		});

		test('applies custom className to track', () => {
			render(<Switch className="custom-class" />);
			const label = screen.getByRole('checkbox').closest('label');
			const track = label?.querySelector('span:not(.sr-only)');
			expect(track).toHaveClass('custom-class');
		});

		test('renders with default unchecked state', () => {
			render(<Switch />);
			expect(screen.getByRole('checkbox')).not.toBeChecked();
		});
	});

	describe('Controlled vs Uncontrolled', () => {
		test('works as uncontrolled component with defaultChecked', async () => {
			const user = userEvent.setup();
			render(<Switch defaultChecked={false} />);
			const switchElement = screen.getByRole('checkbox');

			expect(switchElement).not.toBeChecked();

			await user.click(switchElement);
			expect(switchElement).toBeChecked();

			await user.click(switchElement);
			expect(switchElement).not.toBeChecked();
		});

		test('works as controlled component', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();
			const { rerender } = render(<Switch checked={false} onChange={handleChange} />);
			const switchElement = screen.getByRole('checkbox');

			expect(switchElement).not.toBeChecked();

			await user.click(switchElement);
			expect(handleChange).toHaveBeenCalledTimes(1);
			// State doesn't change until parent updates the prop
			expect(switchElement).not.toBeChecked();

			// Simulate parent updating the checked prop
			rerender(<Switch checked onChange={handleChange} />);
			expect(switchElement).toBeChecked();
		});

		test('calls onChange handler in both controlled and uncontrolled mode', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();

			// Uncontrolled
			const { rerender } = render(<Switch onChange={handleChange} />);
			await user.click(screen.getByRole('checkbox'));
			expect(handleChange).toHaveBeenCalledTimes(1);

			handleChange.mockClear();

			// Controlled
			rerender(<Switch checked={false} onChange={handleChange} />);
			await user.click(screen.getByRole('checkbox'));
			expect(handleChange).toHaveBeenCalledTimes(1);
		});
	});

	describe('Interaction', () => {
		test('can be toggled on and off', async () => {
			const user = userEvent.setup();
			render(<Switch />);
			const switchElement = screen.getByRole('checkbox');

			expect(switchElement).not.toBeChecked();

			await user.click(switchElement);
			expect(switchElement).toBeChecked();

			await user.click(switchElement);
			expect(switchElement).not.toBeChecked();
		});

		test('can be toggled with Space key', async () => {
			const user = userEvent.setup();
			render(<Switch />);
			const switchElement = screen.getByRole('checkbox');

			switchElement.focus();
			expect(switchElement).not.toBeChecked();

			await user.keyboard(' ');
			expect(switchElement).toBeChecked();

			await user.keyboard(' ');
			expect(switchElement).not.toBeChecked();
		});
	});

	describe('States', () => {
		test('can be disabled', () => {
			render(<Switch disabled />);
			expect(screen.getByRole('checkbox')).toBeDisabled();
		});

		test('cannot be clicked when disabled', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();
			render(<Switch disabled onChange={handleChange} />);
			const switchElement = screen.getByRole('checkbox');

			await user.click(switchElement);
			expect(handleChange).not.toHaveBeenCalled();
		});

		test('starts checked when defaultChecked is true', () => {
			render(<Switch defaultChecked />);
			expect(screen.getByRole('checkbox')).toBeChecked();
		});

		test('is disabled when loading', () => {
			render(<Switch loading />);
			expect(screen.getByRole('checkbox')).toBeDisabled();
		});

		test('cannot be clicked when loading', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();
			render(<Switch loading onChange={handleChange} />);
			const switchElement = screen.getByRole('checkbox');

			await user.click(switchElement);
			expect(handleChange).not.toHaveBeenCalled();
		});
	});

	describe('Accessibility', () => {
		test('has proper role="switch" on label', () => {
			render(<Switch />);
			const label = screen.getByRole('checkbox').closest('label');
			expect(label).toHaveAttribute('role', 'switch');
		});

		test('sets aria-checked based on checked state', () => {
			const { rerender } = render(<Switch defaultChecked={false} />);
			const label = screen.getByRole('checkbox').closest('label');

			expect(label).toHaveAttribute('aria-checked', 'false');

			rerender(<Switch checked />);
			expect(label).toHaveAttribute('aria-checked', 'true');
		});

		test('sets aria-disabled when disabled', () => {
			render(<Switch disabled />);
			const label = screen.getByRole('checkbox').closest('label');
			expect(label).toHaveAttribute('aria-disabled', 'true');
		});

		test('sets aria-busy when loading', () => {
			render(<Switch loading />);
			expect(screen.getByRole('checkbox')).toHaveAttribute('aria-busy', 'true');
		});

		test('supports aria-label for switches without visible labels', () => {
			render(<Switch aria-label="Toggle notifications" />);
			const switchElement = screen.getByLabelText('Toggle notifications');
			expect(switchElement).toBeInTheDocument();
		});
	});

	describe('Variants', () => {
		test('renders different sizes', () => {
			const { rerender } = render(<Switch size="sm" />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();

			rerender(<Switch size="md" />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();

			rerender(<Switch size="lg" />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();

			rerender(<Switch size="xl" />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();
		});

		test('renders different color schemes', () => {
			const { rerender } = render(<Switch colorScheme="primary" defaultChecked />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();

			rerender(<Switch colorScheme="secondary" defaultChecked />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();

			rerender(<Switch colorScheme="success" defaultChecked />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();
		});
	});

	describe('Loading State', () => {
		test('displays spinner when loading', () => {
			const { container } = render(<Switch loading />);
			// Spinner uses an SVG with specific class or role
			const spinner = container.querySelector('svg');
			expect(spinner).toBeInTheDocument();
		});

		test('disables interaction when loading', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();
			render(<Switch loading onChange={handleChange} />);
			const switchElement = screen.getByRole('checkbox');

			expect(switchElement).toBeDisabled();
			await user.click(switchElement);
			expect(handleChange).not.toHaveBeenCalled();
		});

		test('renders loading spinner for different sizes', () => {
			const { container, rerender } = render(<Switch size="sm" loading />);
			expect(container.querySelector('svg')).toBeInTheDocument();

			rerender(<Switch size="md" loading />);
			expect(container.querySelector('svg')).toBeInTheDocument();

			rerender(<Switch size="lg" loading />);
			expect(container.querySelector('svg')).toBeInTheDocument();

			rerender(<Switch size="xl" loading />);
			expect(container.querySelector('svg')).toBeInTheDocument();
		});
	});

	describe('With Field Component', () => {
		test('works with Field for labels', () => {
			render(
				<Field>
					<div className="flex items-center justify-between">
						<Field.Label>Enable notifications</Field.Label>
						<Field.Control>
							<Switch />
						</Field.Control>
					</div>
				</Field>
			);

			expect(screen.getByLabelText('Enable notifications')).toBeInTheDocument();
		});

		test('works with Field for helper text', () => {
			render(
				<Field helperText="Receive email notifications">
					<div className="flex items-center justify-between">
						<Field.Label>Enable notifications</Field.Label>
						<Field.Control>
							<Switch />
						</Field.Control>
					</div>
					<Field.Message />
				</Field>
			);

			expect(screen.getByText('Receive email notifications')).toBeInTheDocument();
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to input element', () => {
			const ref = { current: null as HTMLInputElement | null };
			render(<Switch ref={ref} />);
			expect(ref.current).toBeInstanceOf(HTMLInputElement);
			expect(ref.current?.type).toBe('checkbox');
		});
	});
});
