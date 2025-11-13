import { describe, expect, test, vi } from 'vitest';

import { render, screen, userEvent } from '@mirai-ui/test';

import { Field } from '../Field';

import { Select } from './Select.component';

const basicOptions = [
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2' },
	{ value: 'option3', label: 'Option 3' },
];

describe('Select', () => {
	describe('Rendering', () => {
		test('renders select button', () => {
			render(<Select options={basicOptions} />);
			expect(screen.getByRole('button')).toBeInTheDocument();
		});

		test('renders with placeholder', () => {
			render(<Select placeholder="Select an option" options={basicOptions} />);
			expect(screen.getByText('Select an option')).toBeInTheDocument();
		});

		test('renders with left icon', () => {
			render(<Select leftIcon={<span data-testid="left-icon">🌍</span>} options={basicOptions} />);
			expect(screen.getByTestId('left-icon')).toBeInTheDocument();
		});

		test('does not show dropdown by default', () => {
			render(<Select options={basicOptions} />);
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});

		test('shows empty state when no options', async () => {
			const user = userEvent.setup();
			render(<Select options={[]} />);
			const button = screen.getByRole('button');
			await user.click(button);
			expect(screen.getByText('No options available')).toBeInTheDocument();
		});
	});

	describe('Variants', () => {
		test('renders different select styles', () => {
			const { rerender } = render(<Select variant="default" options={basicOptions} />);
			expect(screen.getByRole('button')).toBeInTheDocument();

			rerender(<Select variant="outlined" options={basicOptions} />);
			expect(screen.getByRole('button')).toBeInTheDocument();

			rerender(<Select variant="filled" options={basicOptions} />);
			expect(screen.getByRole('button')).toBeInTheDocument();

			rerender(<Select variant="borderless" options={basicOptions} />);
			expect(screen.getByRole('button')).toBeInTheDocument();

			rerender(<Select variant="underlined" options={basicOptions} />);
			expect(screen.getByRole('button')).toBeInTheDocument();
		});

		test('applies different sizes', () => {
			const { rerender } = render(<Select size="sm" options={basicOptions} data-testid="select" />);
			expect(screen.getByTestId('select')).toBeInTheDocument();

			rerender(<Select size="md" options={basicOptions} data-testid="select" />);
			expect(screen.getByTestId('select')).toBeInTheDocument();

			rerender(<Select size="lg" options={basicOptions} data-testid="select" />);
			expect(screen.getByTestId('select')).toBeInTheDocument();
		});

		test('applies custom className', () => {
			render(<Select className="custom-class" options={basicOptions} />);
			expect(screen.getByRole('button')).toHaveClass('custom-class');
		});
	});

	describe('Dropdown Interaction', () => {
		test('opens dropdown on click', async () => {
			const user = userEvent.setup();
			render(<Select options={basicOptions} />);

			const button = screen.getByRole('button');
			await user.click(button);

			expect(screen.getByRole('listbox')).toBeInTheDocument();
			expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
			expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
			expect(screen.getByRole('option', { name: 'Option 3' })).toBeInTheDocument();
		});

		test('closes dropdown on second click', async () => {
			const user = userEvent.setup();
			render(<Select options={basicOptions} />);

			const button = screen.getByRole('button');
			await user.click(button);
			expect(screen.getByRole('listbox')).toBeInTheDocument();

			await user.click(button);
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});

		test('selects option on click', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();
			render(<Select options={basicOptions} onChange={handleChange} />);

			await user.click(screen.getByRole('button'));
			await user.click(screen.getByRole('option', { name: 'Option 2' }));

			expect(handleChange).toHaveBeenCalledWith('option2');
			expect(screen.getByText('Option 2')).toBeInTheDocument();
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});

		test('does not select disabled option', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();
			const optionsWithDisabled = [
				{ value: 'option1', label: 'Option 1' },
				{ value: 'option2', label: 'Option 2', disabled: true },
				{ value: 'option3', label: 'Option 3' },
			];

			render(<Select options={optionsWithDisabled} onChange={handleChange} />);

			await user.click(screen.getByRole('button'));
			await user.click(screen.getByRole('option', { name: 'Option 2' }));

			expect(handleChange).not.toHaveBeenCalled();
			expect(screen.getByRole('listbox')).toBeInTheDocument();
		});
	});

	describe('Keyboard Navigation', () => {
		test('opens dropdown with Enter key', async () => {
			const user = userEvent.setup();
			render(<Select options={basicOptions} />);

			const button = screen.getByRole('button');
			button.focus();
			await user.keyboard('{Enter}');

			expect(screen.getByRole('listbox')).toBeInTheDocument();
		});

		test('opens dropdown with Space key', async () => {
			const user = userEvent.setup();
			render(<Select options={basicOptions} />);

			const button = screen.getByRole('button');
			button.focus();
			await user.keyboard(' ');

			expect(screen.getByRole('listbox')).toBeInTheDocument();
		});

		test('closes dropdown with Escape key', async () => {
			const user = userEvent.setup();
			render(<Select options={basicOptions} />);

			const button = screen.getByRole('button');
			await user.click(button);
			expect(screen.getByRole('listbox')).toBeInTheDocument();

			await user.keyboard('{Escape}');
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});

		test('navigates options with ArrowDown', async () => {
			const user = userEvent.setup();
			render(<Select options={basicOptions} />);

			const button = screen.getByRole('button');
			button.focus();
			await user.keyboard('{ArrowDown}');

			expect(screen.getByRole('listbox')).toBeInTheDocument();
		});

		test('selects highlighted option with Enter', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();
			render(<Select options={basicOptions} onChange={handleChange} />);

			const button = screen.getByRole('button');
			button.focus();
			await user.keyboard('{ArrowDown}');
			await user.keyboard('{Enter}');

			expect(handleChange).toHaveBeenCalledWith('option1');
		});
	});

	describe('States', () => {
		test('disables select when disabled prop is true', () => {
			render(<Select disabled options={basicOptions} />);
			expect(screen.getByRole('button')).toBeDisabled();
		});

		test('does not open dropdown when disabled', async () => {
			const user = userEvent.setup();
			render(<Select disabled options={basicOptions} />);

			await user.click(screen.getByRole('button'));
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});

		test('sets aria-expanded based on open state', async () => {
			const user = userEvent.setup();
			render(<Select options={basicOptions} />);

			const button = screen.getByRole('button');
			expect(button).toHaveAttribute('aria-expanded', 'false');

			await user.click(button);
			expect(button).toHaveAttribute('aria-expanded', 'true');
		});
	});

	describe('Controlled Component', () => {
		test('displays selected value from prop', () => {
			render(<Select options={basicOptions} value="option2" />);
			expect(screen.getByText('Option 2')).toBeInTheDocument();
		});

		test('updates when value prop changes', () => {
			const { rerender } = render(<Select options={basicOptions} value="option1" />);
			expect(screen.getByText('Option 1')).toBeInTheDocument();

			rerender(<Select options={basicOptions} value="option3" />);
			expect(screen.getByText('Option 3')).toBeInTheDocument();
		});
	});

	describe('With Field Component', () => {
		test('works with Field for labels', () => {
			render(
				<Field>
					<Field.Label>Country</Field.Label>
					<Field.Control>
						<Select options={basicOptions} />
					</Field.Control>
				</Field>
			);

			expect(screen.getByLabelText('Country')).toBeInTheDocument();
		});

		test('works with Field for error messages', () => {
			render(
				<Field error="Please select a country">
					<Field.Label>Country</Field.Label>
					<Field.Control>
						<Select options={basicOptions} />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			expect(screen.getByRole('alert')).toHaveTextContent('Please select a country');
		});

		test('works with Field for helper text', () => {
			render(
				<Field helperText="Choose your country of residence">
					<Field.Label>Country</Field.Label>
					<Field.Control>
						<Select options={basicOptions} />
					</Field.Control>
					<Field.Message />
				</Field>
			);

			expect(screen.getByText('Choose your country of residence')).toBeInTheDocument();
		});
	});

	describe('Accessibility', () => {
		test('has proper role attributes', () => {
			render(<Select options={basicOptions} />);
			const button = screen.getByRole('button');
			expect(button).toHaveAttribute('aria-haspopup', 'listbox');
		});

		test('supports aria-label', () => {
			render(<Select aria-label="Select country" options={basicOptions} />);
			expect(screen.getByLabelText('Select country')).toBeInTheDocument();
		});

		test('sets aria-selected on selected option', async () => {
			const user = userEvent.setup();
			render(<Select options={basicOptions} value="option2" />);

			await user.click(screen.getByRole('button'));
			const option = screen.getByRole('option', { name: 'Option 2' });
			expect(option).toHaveAttribute('aria-selected', 'true');
		});

		test('sets aria-disabled on disabled option', async () => {
			const user = userEvent.setup();
			const optionsWithDisabled = [
				{ value: 'option1', label: 'Option 1' },
				{ value: 'option2', label: 'Option 2', disabled: true },
			];

			render(<Select options={optionsWithDisabled} />);
			await user.click(screen.getByRole('button'));

			const option = screen.getByRole('option', { name: 'Option 2' });
			expect(option).toHaveAttribute('aria-disabled', 'true');
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to button element', () => {
			const ref = { current: null as HTMLButtonElement | null };
			render(<Select ref={ref} options={basicOptions} />);
			expect(ref.current).toBeInstanceOf(HTMLButtonElement);
		});
	});
});
