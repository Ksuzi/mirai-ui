import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { selectUtils } from '../Select.utils';

import { selectOptionVariants } from './SelectOption.variants';

import type { SelectOptionProps } from './SelectOption.types';

export const SelectOption: React.FC<SelectOptionProps> = React.memo(
	({ option, isSelected, isHighlighted, index, onSelect, onHighlight, className, ...props }) => {
		const disabled = selectUtils.isOptionDisabled(option);

		const handleClick = (): void => {
			if (!disabled) {
				onSelect(option);
			}
		};

		const handleKeyDown = (e: React.KeyboardEvent): void => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				if (!disabled) {
					onSelect(option);
				}
			}
		};

		const handleMouseEnter = (): void => {
			if (!disabled) {
				onHighlight(index);
			}
		};

		return (
			<div
				className={mergeClassNames(
					selectOptionVariants({
						selected: isSelected,
						highlighted: isHighlighted,
						disabled,
					}),
					className
				)}
				role="option"
				aria-selected={isSelected}
				aria-disabled={disabled}
				tabIndex={-1}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				onMouseEnter={handleMouseEnter}
				{...props}
			>
				{option.label}
			</div>
		);
	}
);

SelectOption.displayName = 'SelectOption';
