import { describe, expect, test, vi } from 'vitest';

import { render, screen, userEvent } from '@mirai-ui/test';

import { Checkbox, CheckboxRoot, CheckboxInput, CheckboxLabel } from './Checkbox.component';

describe('Checkbox', () => {
	describe('Rendering', () => {
		test('renders checkbox', () => {
			render(<Checkbox />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();
		});

		test('renders with label', () => {
			render(<Checkbox label="Accept terms" />);
			expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
		});

		test('renders without label', () => {
			render(<Checkbox />);
			const checkbox = screen.getByRole('checkbox');
			expect(checkbox).toBeInTheDocument();
			expect(checkbox.parentElement?.querySelector('label')).not.toBeInTheDocument();
		});

		test('applies custom className to checkbox', () => {
			render(<Checkbox className="custom-class" data-testid="checkbox" />);
			const checkbox = screen.getByRole('checkbox');
			expect(checkbox).toHaveClass('custom-class');
		});

		test('applies custom className to wrapper', () => {
			const { container } = render(<Checkbox wrapperClassName="wrapper-class" />);
			const wrapper = container.querySelector('.wrapper-class');
			expect(wrapper).toBeInTheDocument();
			expect(wrapper).toHaveClass('wrapper-class');
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

		test('clicking label toggles checkbox', async () => {
			const user = userEvent.setup();
			render(<Checkbox label="Click me" />);
			const checkbox = screen.getByRole('checkbox');
			const label = screen.getByText('Click me');

			expect(checkbox).not.toBeChecked();

			await user.click(label);
			expect(checkbox).toBeChecked();
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
		test('associates label with checkbox via htmlFor', () => {
			render(<Checkbox label="Terms and conditions" id="terms-checkbox" />);
			const checkbox = screen.getByLabelText('Terms and conditions');
			expect(checkbox).toHaveAttribute('id', 'terms-checkbox');
		});

		test('generates unique id when not provided', () => {
			render(
				<>
					<Checkbox label="Checkbox 1" />
					<Checkbox label="Checkbox 2" />
				</>
			);

			const checkbox1 = screen.getByLabelText('Checkbox 1');
			const checkbox2 = screen.getByLabelText('Checkbox 2');

			expect(checkbox1.id).toBeTruthy();
			expect(checkbox2.id).toBeTruthy();
			expect(checkbox1.id).not.toBe(checkbox2.id);
		});

		test('label has appropriate disabled styling', () => {
			render(<Checkbox label="Disabled checkbox" disabled />);
			const label = screen.getByText('Disabled checkbox');
			expect(label).toBeInTheDocument();
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
			const { rerender } = render(<Checkbox color="primary" />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();

			rerender(<Checkbox color="secondary" />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();
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

	describe('Composite Components', () => {
		test('CheckboxRoot renders wrapper div', () => {
			const { container } = render(<CheckboxRoot>Content</CheckboxRoot>);
			expect(container.firstChild).toBeInTheDocument();
		});

		test('CheckboxInput renders checkbox input', () => {
			render(<CheckboxInput />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();
		});

		test('CheckboxLabel renders label element', () => {
			render(<CheckboxLabel>Label text</CheckboxLabel>);
			expect(screen.getByText('Label text')).toBeInTheDocument();
		});

		test('can compose custom checkbox with sub-components', () => {
			render(
				<CheckboxRoot>
					<CheckboxInput id="custom-checkbox" />
					<CheckboxLabel htmlFor="custom-checkbox">Custom Label</CheckboxLabel>
				</CheckboxRoot>
			);

			const checkbox = screen.getByRole('checkbox');
			const label = screen.getByText('Custom Label');

			expect(checkbox).toBeInTheDocument();
			expect(label).toBeInTheDocument();
			expect(checkbox).toHaveAttribute('id', 'custom-checkbox');
		});
	});
});
