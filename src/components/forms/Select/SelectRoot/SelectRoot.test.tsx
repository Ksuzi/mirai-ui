import { describe, expect, test, vi } from 'vitest';

import { render, screen, userEvent } from '@mirai-ui/test';

import { SelectContent } from '../SelectContent/SelectContent.component';
import { SelectOptionComposition } from '../SelectOptionComposition/SelectOptionComposition.component';
import { SelectTrigger } from '../SelectTrigger/SelectTrigger.component';

import { SelectRoot } from './SelectRoot.component';

const basicOptions = [
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2' },
	{ value: 'option3', label: 'Option 3' },
];

describe('SelectRoot', () => {
	describe('Rendering - Props Mode', () => {
		test('renders select with options', () => {
			render(<SelectRoot options={basicOptions} />);

			expect(screen.getByRole('button')).toBeInTheDocument();
		});

		test('renders with placeholder', () => {
			render(<SelectRoot options={basicOptions} placeholder="Choose option" />);

			expect(screen.getByText('Choose option')).toBeInTheDocument();
		});

		test('renders with left icon', () => {
			render(<SelectRoot options={basicOptions} leftIcon={<span data-testid="icon">🌍</span>} />);

			expect(screen.getByTestId('icon')).toBeInTheDocument();
		});

		test('shows empty state when no options', async () => {
			const user = userEvent.setup();
			render(<SelectRoot options={[]} />);

			await user.click(screen.getByRole('button'));
			expect(screen.getByText('No options available')).toBeInTheDocument();
		});
	});

	describe('Rendering - Composition Mode', () => {
		test('renders children in composition mode', () => {
			render(
				<SelectRoot>
					<SelectTrigger>Custom Trigger</SelectTrigger>
					<SelectContent>
						<SelectOptionComposition value="opt1">Option 1</SelectOptionComposition>
					</SelectContent>
				</SelectRoot>
			);

			expect(screen.getByText('Custom Trigger')).toBeInTheDocument();
		});
	});

	describe('Controlled Mode', () => {
		test('handles controlled value', () => {
			const { rerender } = render(<SelectRoot options={basicOptions} value="option1" />);

			expect(screen.getByText('Option 1')).toBeInTheDocument();

			rerender(<SelectRoot options={basicOptions} value="option2" />);

			expect(screen.getByText('Option 2')).toBeInTheDocument();
		});

		test('calls onChange when option is selected', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();

			render(<SelectRoot options={basicOptions} onChange={handleChange} />);

			await user.click(screen.getByRole('button'));
			await user.click(screen.getByText('Option 1'));

			expect(handleChange).toHaveBeenCalledWith('option1');
		});
	});

	describe('Uncontrolled Mode', () => {
		test('starts with placeholder when no value provided', () => {
			render(<SelectRoot options={basicOptions} />);

			expect(screen.getByText('Select an option...')).toBeInTheDocument();
		});

		test('allows selection change', async () => {
			const user = userEvent.setup();
			const handleChange = vi.fn();

			render(<SelectRoot options={basicOptions} onChange={handleChange} />);

			await user.click(screen.getByRole('button'));
			await user.click(screen.getByText('Option 2'));

			expect(handleChange).toHaveBeenCalledWith('option2');
			expect(screen.getByText('Option 2')).toBeInTheDocument();
		});
	});

	describe('Dropdown Interaction', () => {
		test('opens dropdown on trigger click', async () => {
			const user = userEvent.setup();
			render(<SelectRoot options={basicOptions} />);

			await user.click(screen.getByRole('button'));

			expect(screen.getByRole('listbox')).toBeInTheDocument();
			expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
		});

		test('closes dropdown after selection', async () => {
			const user = userEvent.setup();
			render(<SelectRoot options={basicOptions} />);

			await user.click(screen.getByRole('button'));
			await user.click(screen.getByText('Option 1'));

			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});

		test('closes dropdown on outside click', async () => {
			const user = userEvent.setup();
			render(
				<div>
					<SelectRoot options={basicOptions} />
					<div>Outside</div>
				</div>
			);

			await user.click(screen.getByRole('button'));
			expect(screen.getByRole('listbox')).toBeInTheDocument();

			await user.click(screen.getByText('Outside'));
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});
	});

	describe('Disabled State', () => {
		test('disables trigger when disabled', () => {
			render(<SelectRoot options={basicOptions} disabled />);

			expect(screen.getByRole('button')).toBeDisabled();
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to wrapper div', () => {
			const ref = { current: null as HTMLDivElement | null };
			render(<SelectRoot options={basicOptions} ref={ref} />);

			expect(ref.current).toBeInstanceOf(HTMLDivElement);
		});
	});

	describe('Custom className', () => {
		test('applies custom className in props mode', () => {
			const { container } = render(<SelectRoot options={basicOptions} className="custom-select" />);

			const wrapper = container.querySelector('.custom-select');
			expect(wrapper).toBeInTheDocument();
		});

		test('applies custom className in composition mode', () => {
			const { container } = render(
				<SelectRoot className="custom-select">
					<SelectTrigger>Trigger</SelectTrigger>
				</SelectRoot>
			);

			const wrapper = container.querySelector('.custom-select');
			expect(wrapper).toBeInTheDocument();
		});
	});

	describe('ID prop', () => {
		test('passes id to trigger in props mode', () => {
			render(<SelectRoot options={basicOptions} id="test-select" />);

			const button = screen.getByRole('button');
			expect(button).toHaveAttribute('id', 'test-select');
		});
	});
});
