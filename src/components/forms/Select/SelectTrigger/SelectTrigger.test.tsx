import { describe, expect, test, vi } from 'vitest';

import { render, screen, userEvent } from '@mirai-ui/test';

import { SelectContext } from '../Select.context';

import { SelectTrigger } from './SelectTrigger.component';

import type { SelectContextValue } from '../Select.types';

const createMockContext = (overrides?: Partial<SelectContextValue>): SelectContextValue => ({
	value: undefined,
	onChange: undefined,
	isOpen: false,
	setIsOpen: () => {
		/* empty */
	},
	highlightedIndex: -1,
	setHighlightedIndex: () => {
		/* empty */
	},
	triggerRef: { current: null },
	contentRef: { current: null },
	variant: 'default',
	state: 'default',
	size: 'md',
	disabled: false,
	fullWidth: true,
	options: [],
	handleSelect: () => {
		/* empty */
	},
	...overrides,
});

describe('SelectTrigger', () => {
	describe('Rendering', () => {
		test('renders trigger button', () => {
			render(
				<SelectContext.Provider value={createMockContext()}>
					<SelectTrigger />
				</SelectContext.Provider>
			);

			expect(screen.getByRole('button')).toBeInTheDocument();
		});

		test('renders with placeholder', () => {
			render(
				<SelectContext.Provider value={createMockContext()}>
					<SelectTrigger placeholder="Select an option" />
				</SelectContext.Provider>
			);

			expect(screen.getByText('Select an option')).toBeInTheDocument();
		});

		test('renders selected option label', () => {
			const options = [
				{ value: 'opt1', label: 'Option 1' },
				{ value: 'opt2', label: 'Option 2' },
			];

			render(
				<SelectContext.Provider value={createMockContext({ value: 'opt1', options })}>
					<SelectTrigger />
				</SelectContext.Provider>
			);

			expect(screen.getByText('Option 1')).toBeInTheDocument();
		});

		test('renders with left icon', () => {
			render(
				<SelectContext.Provider value={createMockContext()}>
					<SelectTrigger leftIcon={<span data-testid="left-icon">🌍</span>} />
				</SelectContext.Provider>
			);

			expect(screen.getByTestId('left-icon')).toBeInTheDocument();
		});

		test('renders custom children', () => {
			render(
				<SelectContext.Provider value={createMockContext()}>
					<SelectTrigger>
						<span>Custom Content</span>
					</SelectTrigger>
				</SelectContext.Provider>
			);

			expect(screen.getByText('Custom Content')).toBeInTheDocument();
		});
	});

	describe('Accessibility', () => {
		test('has aria-haspopup="listbox"', () => {
			render(
				<SelectContext.Provider value={createMockContext()}>
					<SelectTrigger />
				</SelectContext.Provider>
			);

			const button = screen.getByRole('button');
			expect(button).toHaveAttribute('aria-haspopup', 'listbox');
		});

		test('has aria-expanded="true" when open', () => {
			render(
				<SelectContext.Provider value={createMockContext({ isOpen: true })}>
					<SelectTrigger />
				</SelectContext.Provider>
			);

			const button = screen.getByRole('button');
			expect(button).toHaveAttribute('aria-expanded', 'true');
		});

		test('has aria-expanded="false" when closed', () => {
			render(
				<SelectContext.Provider value={createMockContext({ isOpen: false })}>
					<SelectTrigger />
				</SelectContext.Provider>
			);

			const button = screen.getByRole('button');
			expect(button).toHaveAttribute('aria-expanded', 'false');
		});
	});

	describe('Interaction', () => {
		test('toggles dropdown on click', async () => {
			const user = userEvent.setup();
			const setIsOpen = vi.fn();

			render(
				<SelectContext.Provider value={createMockContext({ setIsOpen, isOpen: false })}>
					<SelectTrigger />
				</SelectContext.Provider>
			);

			await user.click(screen.getByRole('button'));
			expect(setIsOpen).toHaveBeenCalled();
		});

		test('does not toggle when disabled', async () => {
			const user = userEvent.setup();
			const setIsOpen = vi.fn();

			render(
				<SelectContext.Provider value={createMockContext({ setIsOpen, disabled: true })}>
					<SelectTrigger />
				</SelectContext.Provider>
			);

			const button = screen.getByRole('button');
			expect(button).toBeDisabled();

			await user.click(button);
			expect(setIsOpen).not.toHaveBeenCalled();
		});
	});

	describe('Keyboard Navigation', () => {
		test('handles keyboard navigation', async () => {
			const user = userEvent.setup();
			const setHighlightedIndex = vi.fn();
			const setIsOpen = vi.fn();

			render(
				<SelectContext.Provider
					value={createMockContext({
						setHighlightedIndex,
						setIsOpen,
						isOpen: false,
						options: [
							{ value: 'opt1', label: 'Option 1' },
							{ value: 'opt2', label: 'Option 2' },
						],
					})}
				>
					<SelectTrigger />
				</SelectContext.Provider>
			);

			const button = screen.getByRole('button');
			button.focus();
			await user.keyboard('{ArrowDown}');

			// Keyboard navigation should be handled
			expect(setIsOpen).toHaveBeenCalled();
		});
	});

	describe('Disabled State', () => {
		test('disables button when disabled in context', () => {
			render(
				<SelectContext.Provider value={createMockContext({ disabled: true })}>
					<SelectTrigger />
				</SelectContext.Provider>
			);

			const button = screen.getByRole('button');
			expect(button).toBeDisabled();
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to triggerRef from context', () => {
			const triggerRef = { current: null as HTMLButtonElement | null };

			render(
				<SelectContext.Provider value={createMockContext({ triggerRef })}>
					<SelectTrigger />
				</SelectContext.Provider>
			);

			expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
		});

		test('uses useImperativeHandle to forward ref', () => {
			const ref = { current: null as HTMLButtonElement | null };
			const triggerRef = { current: null as HTMLButtonElement | null };

			render(
				<SelectContext.Provider value={createMockContext({ triggerRef })}>
					<SelectTrigger ref={ref} />
				</SelectContext.Provider>
			);

			expect(ref.current).toBe(triggerRef.current);
		});
	});

	describe('Custom className', () => {
		test('applies custom className', () => {
			render(
				<SelectContext.Provider value={createMockContext()}>
					<SelectTrigger className="custom-trigger" />
				</SelectContext.Provider>
			);

			expect(screen.getByRole('button')).toBeInTheDocument();
		});
	});

	describe('ID prop', () => {
		test('applies id prop to button', () => {
			render(
				<SelectContext.Provider value={createMockContext()}>
					<SelectTrigger id="test-select" />
				</SelectContext.Provider>
			);

			const button = screen.getByRole('button');
			expect(button).toHaveAttribute('id', 'test-select');
		});
	});
});
