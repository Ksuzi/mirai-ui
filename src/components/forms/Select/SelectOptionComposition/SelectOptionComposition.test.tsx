import type { ReactElement } from 'react';

import { describe, expect, test, vi } from 'vitest';

import { render, screen, userEvent } from '@mirai-ui/test';

import { SelectContext } from '../Select.context';

import { SelectOptionComposition } from './SelectOptionComposition.component';

import type { SelectContextValue } from '../Select.types';

const createMockContext = (overrides?: Partial<SelectContextValue>): SelectContextValue => ({
	value: undefined,
	onChange: undefined,
	isOpen: true,
	setIsOpen: vi.fn(),
	highlightedIndex: -1,
	setHighlightedIndex: vi.fn(),
	triggerRef: { current: null },
	contentRef: { current: null },
	variant: 'default',
	state: 'default',
	size: 'md',
	disabled: false,
	fullWidth: true,
	options: [],
	handleSelect: vi.fn(),
	...overrides,
});

const renderWithContext = (
	ui: ReactElement,
	contextOverrides?: Partial<SelectContextValue>
): ReturnType<typeof render> => {
	return render(<SelectContext.Provider value={createMockContext(contextOverrides)}>{ui}</SelectContext.Provider>);
};

describe('SelectOptionComposition', () => {
	describe('Rendering', () => {
		test('renders option content', () => {
			renderWithContext(<SelectOptionComposition value="option1">Option 1</SelectOptionComposition>);

			expect(screen.getByText('Option 1')).toBeInTheDocument();
		});

		test('renders with role="option"', () => {
			renderWithContext(<SelectOptionComposition value="option1">Option 1</SelectOptionComposition>);

			expect(screen.getByRole('option')).toBeInTheDocument();
		});

		test('sets aria-selected when selected', () => {
			renderWithContext(<SelectOptionComposition value="option1">Option 1</SelectOptionComposition>, {
				value: 'option1',
			});

			const option = screen.getByRole('option');
			expect(option).toHaveAttribute('aria-selected', 'true');
		});

		test('sets aria-selected to false when not selected', () => {
			renderWithContext(<SelectOptionComposition value="option1">Option 1</SelectOptionComposition>, {
				value: 'option2',
			});

			const option = screen.getByRole('option');
			expect(option).toHaveAttribute('aria-selected', 'false');
		});
	});

	describe('Interaction', () => {
		test('calls handleSelect when clicked', async () => {
			const user = userEvent.setup();
			const handleSelect = vi.fn();

			renderWithContext(<SelectOptionComposition value="option1">Option 1</SelectOptionComposition>, {
				handleSelect,
			});

			await user.click(screen.getByRole('option'));
			expect(handleSelect).toHaveBeenCalledWith('option1');
		});

		test('does not call handleSelect when disabled', async () => {
			const user = userEvent.setup();
			const handleSelect = vi.fn();

			renderWithContext(
				<SelectOptionComposition value="option1" disabled>
					Option 1
				</SelectOptionComposition>,
				{ handleSelect }
			);

			await user.click(screen.getByRole('option'));
			expect(handleSelect).not.toHaveBeenCalled();
		});

		test('calls handleSelect on Enter key', async () => {
			const user = userEvent.setup();
			const handleSelect = vi.fn();

			renderWithContext(<SelectOptionComposition value="option1">Option 1</SelectOptionComposition>, {
				handleSelect,
			});

			const option = screen.getByRole('option');
			option.focus();
			await user.keyboard('{Enter}');

			expect(handleSelect).toHaveBeenCalledWith('option1');
		});

		test('calls handleSelect on Space key', async () => {
			const user = userEvent.setup();
			const handleSelect = vi.fn();

			renderWithContext(<SelectOptionComposition value="option1">Option 1</SelectOptionComposition>, {
				handleSelect,
			});

			const option = screen.getByRole('option');
			option.focus();
			await user.keyboard(' ');

			expect(handleSelect).toHaveBeenCalledWith('option1');
		});

		test('calls custom onClick handler', async () => {
			const user = userEvent.setup();
			const handleSelect = vi.fn();
			const onClick = vi.fn();

			renderWithContext(
				<SelectOptionComposition value="option1" onClick={onClick}>
					Option 1
				</SelectOptionComposition>,
				{ handleSelect }
			);

			await user.click(screen.getByRole('option'));
			expect(onClick).toHaveBeenCalledTimes(1);
		});

		test('calls custom onMouseEnter handler', async () => {
			const user = userEvent.setup();
			const onMouseEnter = vi.fn();

			renderWithContext(
				<SelectOptionComposition value="option1" onMouseEnter={onMouseEnter}>
					Option 1
				</SelectOptionComposition>
			);

			const option = screen.getByRole('option');
			await user.hover(option);

			expect(onMouseEnter).toHaveBeenCalledTimes(1);
		});
	});

	describe('Disabled State', () => {
		test('sets aria-disabled when disabled', () => {
			renderWithContext(
				<SelectOptionComposition value="option1" disabled>
					Option 1
				</SelectOptionComposition>
			);

			const option = screen.getByRole('option');
			expect(option).toHaveAttribute('aria-disabled', 'true');
		});

		test('sets tabIndex to -1 when disabled', () => {
			renderWithContext(
				<SelectOptionComposition value="option1" disabled>
					Option 1
				</SelectOptionComposition>
			);

			const option = screen.getByRole('option');
			expect(option).toHaveAttribute('tabIndex', '-1');
		});

		test('sets tabIndex to 0 when not disabled', () => {
			renderWithContext(<SelectOptionComposition value="option1">Option 1</SelectOptionComposition>);

			const option = screen.getByRole('option');
			expect(option).toHaveAttribute('tabIndex', '0');
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to div element', () => {
			const ref = { current: null as HTMLDivElement | null };

			renderWithContext(
				<SelectOptionComposition value="option1" ref={ref}>
					Option 1
				</SelectOptionComposition>
			);

			expect(ref.current).toBeInstanceOf(HTMLDivElement);
		});
	});

	describe('Custom className', () => {
		test('applies custom className', () => {
			renderWithContext(
				<SelectOptionComposition value="option1" className="custom-option">
					Option 1
				</SelectOptionComposition>
			);

			const option = screen.getByRole('option');
			expect(option).toHaveClass('custom-option');
		});
	});
});
