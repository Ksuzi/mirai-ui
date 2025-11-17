import React from 'react';

import { useEventListener } from '../../hooks';

/**
 * Hook to handle clicking outside of elements
 * Uses the shared useEventListener hook for proper event management
 */
export const useClickOutside = (
	refs: Array<React.RefObject<HTMLElement | null>>,
	handler: () => void,
	enabled = true
): void => {
	const handleClickOutside = React.useCallback(
		(event: MouseEvent): void => {
			if (!enabled) return;

			const isOutside = refs.every((ref) => ref.current && !ref.current.contains(event.target as Node));

			if (isOutside) {
				handler();
			}
		},
		[refs, handler, enabled]
	);

	useEventListener('mousedown', handleClickOutside, document);
};

type KeyboardNavigationConfig = {
	isOpen: boolean;
	highlightedIndex: number;
	optionsLength: number;
	onToggleOpen: (open: boolean) => void;
	onHighlightChange: (index: number) => void;
	onSelect: () => void;
	onClose: () => void;
	disabled: boolean;
};

/**
 * Hook to handle keyboard navigation for the select component
 */
export const useKeyboardNavigation = (config: KeyboardNavigationConfig) => {
	const { isOpen, highlightedIndex, optionsLength, onToggleOpen, onHighlightChange, onSelect, onClose, disabled } =
		config;

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent): void => {
			if (disabled) return;

			switch (e.key) {
				case 'Enter':
				case ' ':
					e.preventDefault();
					if (!isOpen) {
						onToggleOpen(true);
						onHighlightChange(0);
					} else if (highlightedIndex >= 0 && highlightedIndex < optionsLength) {
						onSelect();
					}
					break;

				case 'Escape':
					e.preventDefault();
					onClose();
					break;

				case 'ArrowDown':
					e.preventDefault();
					if (!isOpen) {
						onToggleOpen(true);
						onHighlightChange(0);
					} else {
						onHighlightChange(Math.min(highlightedIndex + 1, optionsLength - 1));
					}
					break;

				case 'ArrowUp':
					e.preventDefault();
					if (isOpen) {
						onHighlightChange(Math.max(highlightedIndex - 1, 0));
					}
					break;

				case 'Home':
					e.preventDefault();
					if (isOpen) {
						onHighlightChange(0);
					}
					break;

				case 'End':
					e.preventDefault();
					if (isOpen) {
						onHighlightChange(optionsLength - 1);
					}
					break;
			}
		},
		[disabled, isOpen, highlightedIndex, optionsLength, onToggleOpen, onHighlightChange, onSelect, onClose]
	);

	return { handleKeyDown };
};
