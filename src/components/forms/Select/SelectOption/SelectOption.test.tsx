import { describe, expect, test, vi } from 'vitest';

import { render, screen, userEvent } from '@mirai-ui/test';

import { SelectOption } from './SelectOption.component';

import type { SelectOption as SelectOptionData } from '../Select.types';

describe('SelectOption', () => {
	const mockOption: SelectOptionData = {
		value: 'option1',
		label: 'Option 1',
	};

	const mockDisabledOption: SelectOptionData = {
		value: 'option2',
		label: 'Option 2',
		disabled: true,
	};

	const defaultProps = {
		option: mockOption,
		isSelected: false,
		isHighlighted: false,
		index: 0,
		onSelect: vi.fn(),
		onHighlight: vi.fn(),
	};

	describe('Rendering', () => {
		test('renders option with correct attributes', () => {
			render(<SelectOption {...defaultProps} />);
			const option = screen.getByRole('option');

			expect(screen.getByText('Option 1')).toBeInTheDocument();
			expect(option).toHaveAttribute('tabIndex', '-1');
			expect(option).toHaveAttribute('aria-selected', 'false');
		});

		test('applies custom className', () => {
			render(<SelectOption {...defaultProps} className="custom-class" />);
			expect(screen.getByRole('option')).toHaveClass('custom-class');
		});
	});

	describe('Selection States', () => {
		test('applies selected state and styles', () => {
			render(<SelectOption {...defaultProps} isSelected />);
			const option = screen.getByRole('option');

			expect(option).toHaveAttribute('aria-selected', 'true');
			expect(option).toHaveClass('bg-primary-50', 'text-primary-700', 'font-medium');
		});

		test('applies highlighted styles', () => {
			render(<SelectOption {...defaultProps} isHighlighted />);
			expect(screen.getByRole('option')).toHaveClass('bg-muted-100');
		});

		test('applies compound variant styles when both selected and highlighted', () => {
			render(<SelectOption {...defaultProps} isSelected isHighlighted />);
			expect(screen.getByRole('option')).toHaveClass('bg-primary-100');
		});
	});

	describe('Disabled State', () => {
		test('applies disabled state and styles', () => {
			render(<SelectOption {...defaultProps} option={mockDisabledOption} />);
			const option = screen.getByRole('option');

			expect(option).toHaveAttribute('aria-disabled', 'true');
			expect(option).toHaveClass('opacity-50', 'cursor-not-allowed');
		});

		test('blocks all interactions when disabled', async () => {
			const user = userEvent.setup();
			const onSelect = vi.fn();
			const onHighlight = vi.fn();

			render(
				<SelectOption {...defaultProps} option={mockDisabledOption} onSelect={onSelect} onHighlight={onHighlight} />
			);

			const option = screen.getByRole('option');

			await user.hover(option);
			await user.click(option);
			option.focus();
			await user.keyboard('{Enter}');
			await user.keyboard(' ');

			expect(onHighlight).not.toHaveBeenCalled();
			expect(onSelect).not.toHaveBeenCalled();
		});
	});

	describe('Click Interaction', () => {
		test('calls onSelect when clicked', async () => {
			const user = userEvent.setup();
			const onSelect = vi.fn();
			render(<SelectOption {...defaultProps} onSelect={onSelect} />);

			await user.click(screen.getByRole('option'));

			expect(onSelect).toHaveBeenCalledTimes(1);
			expect(onSelect).toHaveBeenCalledWith(mockOption);
		});
	});

	describe('Keyboard Interaction', () => {
		test('calls onSelect when Enter or Space is pressed', async () => {
			const user = userEvent.setup();
			const onSelect = vi.fn();
			render(<SelectOption {...defaultProps} onSelect={onSelect} />);

			const option = screen.getByRole('option');
			option.focus();
			await user.keyboard('{Enter}');

			expect(onSelect).toHaveBeenCalledWith(mockOption);

			await user.keyboard(' ');
			expect(onSelect).toHaveBeenCalledTimes(2);
		});

		test('ignores other keys', async () => {
			const user = userEvent.setup();
			const onSelect = vi.fn();
			render(<SelectOption {...defaultProps} onSelect={onSelect} />);

			const option = screen.getByRole('option');
			option.focus();
			await user.keyboard('a');
			await user.keyboard('{Escape}');
			await user.keyboard('{ArrowDown}');

			expect(onSelect).not.toHaveBeenCalled();
		});
	});

	describe('Mouse Interaction', () => {
		test('calls onHighlight with correct index on hover', async () => {
			const user = userEvent.setup();
			const onHighlight = vi.fn();
			render(<SelectOption {...defaultProps} index={3} onHighlight={onHighlight} />);

			await user.hover(screen.getByRole('option'));

			expect(onHighlight).toHaveBeenCalledTimes(1);
			expect(onHighlight).toHaveBeenCalledWith(3);
		});
	});
});
