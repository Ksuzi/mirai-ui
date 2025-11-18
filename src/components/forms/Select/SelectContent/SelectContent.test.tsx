import { describe, expect, test } from 'vitest';

import { render, screen } from '@mirai-ui/test';

import { SelectContext } from '../Select.context';

import { SelectContent } from './SelectContent.component';

import type { SelectContextValue } from '../Select.types';

const mockContextValue: SelectContextValue = {
	value: undefined,
	onChange: undefined,
	isOpen: true,
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
};

describe('SelectContent', () => {
	describe('Rendering', () => {
		test('renders content when isOpen is true', () => {
			render(
				<SelectContext.Provider value={{ ...mockContextValue, isOpen: true }}>
					<SelectContent>
						<div>Option 1</div>
						<div>Option 2</div>
					</SelectContent>
				</SelectContext.Provider>
			);

			expect(screen.getByRole('listbox')).toBeInTheDocument();
			expect(screen.getByText('Option 1')).toBeInTheDocument();
			expect(screen.getByText('Option 2')).toBeInTheDocument();
		});

		test('does not render when isOpen is false', () => {
			render(
				<SelectContext.Provider value={{ ...mockContextValue, isOpen: false }}>
					<SelectContent>
						<div>Option 1</div>
					</SelectContent>
				</SelectContext.Provider>
			);

			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});

		test('renders with role="listbox"', () => {
			render(
				<SelectContext.Provider value={{ ...mockContextValue, isOpen: true }}>
					<SelectContent>
						<div>Option</div>
					</SelectContent>
				</SelectContext.Provider>
			);

			expect(screen.getByRole('listbox')).toBeInTheDocument();
		});
	});

	describe('Ref Forwarding', () => {
		test('forwards ref to contentRef from context', () => {
			const contentRef = { current: null as HTMLDivElement | null };
			render(
				<SelectContext.Provider value={{ ...mockContextValue, isOpen: true, contentRef }}>
					<SelectContent>
						<div>Option</div>
					</SelectContent>
				</SelectContext.Provider>
			);

			expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
		});

		test('uses useImperativeHandle to forward ref', () => {
			const ref = { current: null as HTMLDivElement | null };
			const contentRef = { current: null as HTMLDivElement | null };

			render(
				<SelectContext.Provider value={{ ...mockContextValue, isOpen: true, contentRef }}>
					<SelectContent ref={ref}>
						<div>Option</div>
					</SelectContent>
				</SelectContext.Provider>
			);

			expect(ref.current).toBe(contentRef.current);
		});
	});

	describe('Custom className', () => {
		test('applies custom className', () => {
			render(
				<SelectContext.Provider value={{ ...mockContextValue, isOpen: true }}>
					<SelectContent className="custom-content">
						<div>Option</div>
					</SelectContent>
				</SelectContext.Provider>
			);

			expect(screen.getByRole('listbox')).toBeInTheDocument();
		});
	});
});
