import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { useClickOutside, useKeyboardNavigation } from './Select.hooks';
import { selectUtils } from './Select.utils';
import { selectVariants, selectDropdownVariants } from './Select.variants';
import { SelectIcon } from './SelectIcon';
import { SelectOption as SelectOptionComponent } from './SelectOption';

import type { SelectProps, SelectOption } from './Select.types';

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
	(
		{
			variant = 'default',
			state = 'default',
			size = 'md',
			fullWidth = true,
			leftIcon,
			placeholder = 'Select an option...',
			className,
			options = [],
			value,
			onChange,
			disabled = false,
			...props
		},
		ref
	) => {
		const [isOpen, setIsOpen] = React.useState(false);
		const [selectedValue, setSelectedValue] = React.useState<string | undefined>(value);
		const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);
		const dropdownRef = React.useRef<HTMLDivElement>(null);
		const buttonRef = React.useRef<HTMLButtonElement>(null);

		React.useImperativeHandle(ref, () => buttonRef.current!);

		React.useEffect(() => {
			setSelectedValue(value);
		}, [value]);

		useClickOutside([dropdownRef, buttonRef], () => setIsOpen(false), isOpen);

		const handleSelect = React.useCallback(
			(option: SelectOption): void => {
				if (selectUtils.isOptionDisabled(option)) return;

				setSelectedValue(option.value);
				setIsOpen(false);
				setHighlightedIndex(-1);
				buttonRef.current?.focus();

				onChange?.(option.value);
			},
			[onChange]
		);

		const handleClose = React.useCallback((): void => {
			setIsOpen(false);
			setHighlightedIndex(-1);
			buttonRef.current?.focus();
		}, []);

		const handleSelectHighlighted = React.useCallback((): void => {
			if (highlightedIndex >= 0 && highlightedIndex < options.length) {
				handleSelect(options[highlightedIndex]);
			}
		}, [highlightedIndex, options, handleSelect]);

		const { handleKeyDown } = useKeyboardNavigation({
			isOpen,
			highlightedIndex,
			optionsLength: options.length,
			onToggleOpen: setIsOpen,
			onHighlightChange: setHighlightedIndex,
			onSelect: handleSelectHighlighted,
			onClose: handleClose,
			disabled,
		});

		const selectedOption = selectUtils.getSelectedOption(options, selectedValue);
		const displayText = selectUtils.getDisplayText(selectedOption, placeholder);

		return (
			<div className={mergeClassNames('relative', fullWidth ? 'w-full' : 'w-auto')}>
				<button
					ref={buttonRef}
					type="button"
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

					<span className={mergeClassNames(!selectedOption && 'text-muted-400')}>{displayText}</span>

					<SelectIcon isOpen={isOpen} />
				</button>

				{isOpen && (
					<div ref={dropdownRef} className={selectDropdownVariants({ size })} role="listbox" aria-label="Options">
						{options.length === 0 ? (
							<div className="px-4 py-2 text-sm text-muted-400">No options available</div>
						) : (
							options.map((option: SelectOption, index: number) => (
								<SelectOptionComponent
									key={option.value}
									option={option}
									isSelected={option.value === selectedValue}
									isHighlighted={index === highlightedIndex}
									index={index}
									onSelect={handleSelect}
									onHighlight={setHighlightedIndex}
								/>
							))
						)}
					</div>
				)}
			</div>
		);
	}
);

Select.displayName = 'Select';
