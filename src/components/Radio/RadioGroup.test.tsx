import { describe, expect, test, vi } from 'vitest';

import { render, screen, userEvent } from '@mirai-ui/test';

import { Radio } from './Radio.component';
import { RadioGroup } from './RadioGroup.component';

describe('RadioGroup', () => {
	describe('Rendering', () => {
		test('renders radio group with children', () => {
			render(
				<RadioGroup name="test">
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
				</RadioGroup>
			);

			expect(screen.getByRole('radiogroup')).toBeInTheDocument();
			expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
			expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
		});

		test('renders with options prop', () => {
			const options = [
				{ value: 'opt1', label: 'Option 1' },
				{ value: 'opt2', label: 'Option 2' },
			];

			render(<RadioGroup name="test" options={options} />);

			expect(screen.getByRole('radiogroup')).toBeInTheDocument();
			expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
			expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
		});

		test('applies custom className', () => {
			render(
				<RadioGroup name="test" className="custom-group">
					<Radio value="option1">Option 1</Radio>
				</RadioGroup>
			);

			const group = screen.getByRole('radiogroup');
			expect(group).toBeInTheDocument();
		});
	});

	describe('Controlled Mode', () => {
		test('handles controlled value', () => {
			const { rerender } = render(
				<RadioGroup name="test" value="option1">
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
				</RadioGroup>
			);

			expect(screen.getByLabelText('Option 1')).toBeChecked();

			rerender(
				<RadioGroup name="test" value="option2">
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
				</RadioGroup>
			);

			expect(screen.getByLabelText('Option 2')).toBeChecked();
			expect(screen.getByLabelText('Option 1')).not.toBeChecked();
		});

		test('calls onChange when value changes', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();

			render(
				<RadioGroup name="test" value="option1" onChange={handleChange}>
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
				</RadioGroup>
			);

			await user.click(screen.getByLabelText('Option 2'));
			expect(handleChange).toHaveBeenCalledWith('option2');
		});
	});

	describe('Uncontrolled Mode', () => {
		test('handles default value', () => {
			render(
				<RadioGroup name="test" defaultValue="option2">
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
				</RadioGroup>
			);

			expect(screen.getByLabelText('Option 2')).toBeChecked();
		});

		test('allows selection change', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();

			render(
				<RadioGroup name="test" defaultValue="option1" onChange={handleChange}>
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
				</RadioGroup>
			);

			await user.click(screen.getByLabelText('Option 2'));
			expect(handleChange).toHaveBeenCalledWith('option2');
			expect(screen.getByLabelText('Option 2')).toBeChecked();
		});
	});

	describe('Single Selection', () => {
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
	});

	describe('Disabled State', () => {
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
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to group div', () => {
			const ref = { current: null as HTMLDivElement | null };
			render(
				<RadioGroup name="test" ref={ref}>
					<Radio value="option1">Option 1</Radio>
				</RadioGroup>
			);

			expect(ref.current).toBeInstanceOf(HTMLDivElement);
		});
	});

	describe('Options with disabled', () => {
		test('renders disabled options', () => {
			const options = [
				{ value: 'opt1', label: 'Option 1' },
				{ value: 'opt2', label: 'Option 2', disabled: true },
			];

			render(<RadioGroup name="test" options={options} />);

			expect(screen.getByLabelText('Option 1')).not.toBeDisabled();
			expect(screen.getByLabelText('Option 2')).toBeDisabled();
		});
	});
});
