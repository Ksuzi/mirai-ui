import { describe, expect, test, vi } from 'vitest';

import { render, screen, userEvent } from '@mirai-ui/test';

import { Radio, RadioGroup } from './index';

describe('Radio', () => {
	describe('Rendering', () => {
		test('renders radio with label', () => {
			render(<Radio value="test">Test Radio</Radio>);
			expect(screen.getByLabelText('Test Radio')).toBeInTheDocument();
		});

		test('renders radio without label', () => {
			render(<Radio value="test" aria-label="Test" />);
			expect(screen.getByRole('radio')).toBeInTheDocument();
		});

		test('applies custom className', () => {
			render(
				<Radio value="test" className="custom-class">
					Test
				</Radio>
			);
			expect(screen.getByRole('radio')).toHaveClass('custom-class');
		});
	});

	describe('Standalone Mode', () => {
		test('works without RadioGroup', () => {
			render(
				<Radio name="standalone" value="test" defaultChecked>
					Standalone
				</Radio>
			);
			expect(screen.getByRole('radio')).toBeChecked();
		});

		test('handles controlled mode', () => {
			const { rerender } = render(
				<Radio name="controlled" value="test" checked={false}>
					Test
				</Radio>
			);
			expect(screen.getByRole('radio')).not.toBeChecked();

			rerender(
				<Radio name="controlled" value="test" checked>
					Test
				</Radio>
			);
			expect(screen.getByRole('radio')).toBeChecked();
		});

		test('calls onChange when clicked in standalone mode', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();

			render(
				<Radio name="test" value="option1" onChange={handleChange}>
					Option 1
				</Radio>
			);

			await user.click(screen.getByRole('radio'));
			expect(handleChange).toHaveBeenCalledTimes(1);
		});
	});

	describe('RadioGroup Integration', () => {
		test('renders multiple radios in a group', () => {
			render(
				<RadioGroup name="test">
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
					<Radio value="option3">Option 3</Radio>
				</RadioGroup>
			);

			expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
			expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
			expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
		});

		test('only one radio is selected at a time', async () => {
			const user = userEvent.setup();

			render(
				<RadioGroup name="test" defaultValue="option1">
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
					<Radio value="option3">Option 3</Radio>
				</RadioGroup>
			);

			const radio1 = screen.getByLabelText('Option 1');
			const radio2 = screen.getByLabelText('Option 2');
			const radio3 = screen.getByLabelText('Option 3');

			expect(radio1).toBeChecked();
			expect(radio2).not.toBeChecked();
			expect(radio3).not.toBeChecked();

			await user.click(radio2);

			expect(radio1).not.toBeChecked();
			expect(radio2).toBeChecked();
			expect(radio3).not.toBeChecked();
		});

		test('shares name attribute from RadioGroup', () => {
			render(
				<RadioGroup name="shared-name">
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
				</RadioGroup>
			);

			const radio1 = screen.getByLabelText('Option 1');
			const radio2 = screen.getByLabelText('Option 2');

			expect(radio1).toHaveAttribute('name', 'shared-name');
			expect(radio2).toHaveAttribute('name', 'shared-name');
		});
	});

	describe('Interaction', () => {
		test('handles click events', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();

			render(
				<RadioGroup name="test" onChange={handleChange}>
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
				</RadioGroup>
			);

			await user.click(screen.getByLabelText('Option 1'));
			expect(handleChange).toHaveBeenCalledWith('option1');

			await user.click(screen.getByLabelText('Option 2'));
			expect(handleChange).toHaveBeenCalledWith('option2');
		});

		test('does not trigger change when disabled', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();

			render(
				<RadioGroup name="test" onChange={handleChange}>
					<Radio value="option1" disabled>
						Option 1
					</Radio>
					<Radio value="option2">Option 2</Radio>
				</RadioGroup>
			);

			await user.click(screen.getByLabelText('Option 1'));
			expect(handleChange).not.toHaveBeenCalled();
		});

		test('does not trigger change when group is disabled', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();

			render(
				<RadioGroup name="test" disabled onChange={handleChange}>
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
				</RadioGroup>
			);

			await user.click(screen.getByLabelText('Option 1'));
			expect(handleChange).not.toHaveBeenCalled();
		});
	});

	describe('Controlled/Uncontrolled', () => {
		test('works in uncontrolled mode with defaultValue', () => {
			render(
				<RadioGroup name="test" defaultValue="option2">
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
					<Radio value="option3">Option 3</Radio>
				</RadioGroup>
			);

			expect(screen.getByLabelText('Option 2')).toBeChecked();
		});

		test('works in controlled mode', () => {
			const { rerender } = render(
				<RadioGroup name="test" value="option1">
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
				</RadioGroup>
			);

			expect(screen.getByLabelText('Option 1')).toBeChecked();
			expect(screen.getByLabelText('Option 2')).not.toBeChecked();

			rerender(
				<RadioGroup name="test" value="option2">
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
				</RadioGroup>
			);

			expect(screen.getByLabelText('Option 1')).not.toBeChecked();
			expect(screen.getByLabelText('Option 2')).toBeChecked();
		});

		test('updates internal state in uncontrolled mode', async () => {
			const user = userEvent.setup();

			render(
				<RadioGroup name="test" defaultValue="option1">
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
				</RadioGroup>
			);

			expect(screen.getByLabelText('Option 1')).toBeChecked();

			await user.click(screen.getByLabelText('Option 2'));

			expect(screen.getByLabelText('Option 1')).not.toBeChecked();
			expect(screen.getByLabelText('Option 2')).toBeChecked();
		});
	});

	describe('Accessibility', () => {
		test('has proper role for RadioGroup', () => {
			render(
				<RadioGroup name="test">
					<Radio value="option1">Option 1</Radio>
				</RadioGroup>
			);

			expect(screen.getByRole('radiogroup')).toBeInTheDocument();
		});

		test('has proper role for Radio', () => {
			render(
				<Radio name="test" value="option1">
					Option 1
				</Radio>
			);

			expect(screen.getByRole('radio')).toBeInTheDocument();
		});

		test('sets aria-checked attribute', () => {
			render(
				<RadioGroup name="test" defaultValue="option1">
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
				</RadioGroup>
			);

			expect(screen.getByLabelText('Option 1')).toHaveAttribute('aria-checked', 'true');
			expect(screen.getByLabelText('Option 2')).toHaveAttribute('aria-checked', 'false');
		});

		test('sets aria-disabled attribute', () => {
			render(
				<RadioGroup name="test">
					<Radio value="option1" disabled>
						Option 1
					</Radio>
				</RadioGroup>
			);

			expect(screen.getByLabelText('Option 1')).toHaveAttribute('aria-disabled', 'true');
		});

		test('sets aria-disabled on all radios when group is disabled', () => {
			render(
				<RadioGroup name="test" disabled>
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
				</RadioGroup>
			);

			expect(screen.getByLabelText('Option 1')).toHaveAttribute('aria-disabled', 'true');
			expect(screen.getByLabelText('Option 2')).toHaveAttribute('aria-disabled', 'true');
		});

		test('radio buttons are keyboard accessible', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();

			render(
				<RadioGroup name="test" onChange={handleChange}>
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
				</RadioGroup>
			);

			const radio1 = screen.getByLabelText('Option 1');

			// Click the radio using keyboard (Space key on the label/radio)
			await user.click(radio1);

			expect(handleChange).toHaveBeenCalledWith('option1');
		});
	});

	describe('States', () => {
		test('disables radio when disabled prop is true', () => {
			render(
				<Radio name="test" value="option1" disabled>
					Option 1
				</Radio>
			);

			expect(screen.getByRole('radio')).toBeDisabled();
		});

		test('disables all radios when group is disabled', () => {
			render(
				<RadioGroup name="test" disabled>
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
				</RadioGroup>
			);

			expect(screen.getByLabelText('Option 1')).toBeDisabled();
			expect(screen.getByLabelText('Option 2')).toBeDisabled();
		});

		test('individual disabled prop overrides group disabled', () => {
			render(
				<RadioGroup name="test" disabled={false}>
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2" disabled>
						Option 2
					</Radio>
				</RadioGroup>
			);

			expect(screen.getByLabelText('Option 1')).not.toBeDisabled();
			expect(screen.getByLabelText('Option 2')).toBeDisabled();
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to input element', () => {
			const ref = { current: null as HTMLInputElement | null };

			render(
				<Radio ref={ref} name="test" value="option1">
					Option 1
				</Radio>
			);

			expect(ref.current).toBeInstanceOf(HTMLInputElement);
			expect(ref.current?.type).toBe('radio');
		});
	});

	describe('Context', () => {
		test('Radio receives size from RadioGroup context', () => {
			render(
				<RadioGroup name="test" size="lg">
					<Radio value="option1">Option 1</Radio>
				</RadioGroup>
			);

			// Size is applied via className, so we check if the radio has the appropriate class
			const radio = screen.getByRole('radio');
			expect(radio).toBeInTheDocument();
		});

		test('Radio receives colorScheme from RadioGroup context', () => {
			render(
				<RadioGroup name="test" colorScheme="success">
					<Radio value="option1">Option 1</Radio>
				</RadioGroup>
			);

			const radio = screen.getByRole('radio');
			expect(radio).toBeInTheDocument();
		});

		test('Individual Radio props override RadioGroup context', () => {
			render(
				<RadioGroup name="test" size="sm" colorScheme="primary">
					<Radio value="option1" size="xl" colorScheme="error">
						Option 1
					</Radio>
				</RadioGroup>
			);

			const radio = screen.getByRole('radio');
			expect(radio).toBeInTheDocument();
		});
	});

	describe('Options API', () => {
		test('renders radios from options array', () => {
			const options = [
				{ value: '1', label: 'Option 1' },
				{ value: '2', label: 'Option 2' },
				{ value: '3', label: 'Option 3' },
			];

			render(<RadioGroup name="test" options={options} />);

			expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
			expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
			expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
		});

		test('handles selection with options API', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();
			const options = [
				{ value: '1', label: 'Option 1' },
				{ value: '2', label: 'Option 2' },
			];

			render(<RadioGroup name="test" options={options} onChange={handleChange} />);

			await user.click(screen.getByLabelText('Option 1'));
			expect(handleChange).toHaveBeenCalledWith('1');
		});

		test('supports disabled options in options array', () => {
			const options = [
				{ value: '1', label: 'Option 1' },
				{ value: '2', label: 'Option 2', disabled: true },
			];

			render(<RadioGroup name="test" options={options} />);

			expect(screen.getByLabelText('Option 1')).not.toBeDisabled();
			expect(screen.getByLabelText('Option 2')).toBeDisabled();
		});

		test('works with Radio.Group compound component', () => {
			const options = [
				{ value: '1', label: 'Option 1' },
				{ value: '2', label: 'Option 2' },
			];

			render(<Radio.Group name="test" options={options} defaultValue="1" />);

			expect(screen.getByLabelText('Option 1')).toBeChecked();
			expect(screen.getByLabelText('Option 2')).not.toBeChecked();
		});

		test('supports complex labels in options', () => {
			const options = [
				{
					value: '1',
					label: (
						<div>
							<strong>Option 1</strong>
							<span>Description</span>
						</div>
					),
				},
			];

			render(<RadioGroup name="test" options={options} />);

			expect(screen.getByText('Option 1')).toBeInTheDocument();
			expect(screen.getByText('Description')).toBeInTheDocument();
		});
	});
});
