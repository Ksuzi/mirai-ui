import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { useSelectContext } from '../Select.context';
import { useKeyboardNavigation } from '../Select.hooks';
import { selectUtils } from '../Select.utils';
import { selectVariants } from '../Select.variants';
import { SelectIcon } from '../SelectIcon';

import type { SelectTriggerProps } from './SelectTrigger.types';
import type { SelectContextValue } from '../Select.types';

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
	({ placeholder = 'Select an option...', leftIcon, className, children, id, ...props }, ref) => {
		const context: SelectContextValue = useSelectContext();
		const { isOpen, setIsOpen, value, variant, state, size, fullWidth, disabled, triggerRef, options } = context;

		React.useImperativeHandle(ref, () => triggerRef.current!);

		const handleClose = React.useCallback((): void => {
			setIsOpen(false);
			context.setHighlightedIndex(-1);
			triggerRef.current?.focus();
		}, [setIsOpen, context, triggerRef]);

		const handleSelectHighlighted = React.useCallback((): void => {
			if (context.highlightedIndex >= 0 && context.highlightedIndex < options.length) {
				context.handleSelect(options[context.highlightedIndex].value);
			}
		}, [context, options]);

		const { handleKeyDown } = useKeyboardNavigation({
			isOpen,
			highlightedIndex: context.highlightedIndex,
			optionsLength: options.length,
			onToggleOpen: setIsOpen,
			onHighlightChange: context.setHighlightedIndex,
			onSelect: handleSelectHighlighted,
			onClose: handleClose,
			disabled,
		});

		const selectedOption = selectUtils.getSelectedOption(options, value);
		const displayText = selectUtils.getDisplayText(selectedOption, placeholder);

		return (
			<button
				ref={triggerRef}
				type="button"
				id={id}
				className={mergeClassNames(
					selectVariants({
						variant,
						state,
						size,
						fullWidth,
					}),
					leftIcon && 'pl-10',
					'pr-10',
					'text-left',
					className
				)}
				onClick={() => !disabled && setIsOpen(!isOpen)}
				onKeyDown={handleKeyDown}
				disabled={disabled}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				{...props}
			>
				{leftIcon && (
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<span className="text-muted-400">{leftIcon}</span>
					</div>
				)}

				{children ?? <span className={mergeClassNames(!selectedOption && 'text-muted-400')}>{displayText}</span>}

				<SelectIcon isOpen={isOpen} />
			</button>
		);
	}
);

SelectTrigger.displayName = 'SelectTrigger';
