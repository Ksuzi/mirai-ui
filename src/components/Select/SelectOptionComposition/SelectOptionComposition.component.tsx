import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { useSelectContext } from '../Select.context';

import type { SelectOptionCompositionProps } from './SelectOptionComposition.types';
import type { SelectContextValue } from '../Select.types';

export const SelectOptionComposition = React.forwardRef<HTMLDivElement, SelectOptionCompositionProps>(
	({ value, disabled = false, className, children, onMouseEnter, onClick, onKeyDown, ...props }, ref) => {
		const context: SelectContextValue = useSelectContext();
		const { value: selectedValue, handleSelect } = context;
		const isSelected = value === selectedValue;

		const handleClick = React.useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!disabled) {
					handleSelect(value);
					onClick?.(e);
				}
			},
			[disabled, handleSelect, value, onClick]
		);

		const handleMouseEnter = React.useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!disabled) {
					onMouseEnter?.(e);
				}
			},
			[disabled, onMouseEnter]
		);

		const handleKeyDown = React.useCallback(
			(e: React.KeyboardEvent<HTMLDivElement>) => {
				if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
					e.preventDefault();
					handleSelect(value);
				}
				onKeyDown?.(e);
			},
			[disabled, handleSelect, value, onKeyDown]
		);

		return (
			<div
				ref={ref}
				role="option"
				tabIndex={disabled ? -1 : 0}
				aria-selected={isSelected}
				aria-disabled={disabled}
				className={mergeClassNames(
					'flex',
					'items-center',
					'px-4',
					'py-2',
					'cursor-pointer',
					'transition-colors',
					'duration-150',
					'text-foreground',
					!disabled && 'hover:bg-muted-100',
					disabled && 'opacity-50 cursor-not-allowed',
					isSelected && 'bg-primary-50 text-primary-700 font-medium',
					className
				)}
				onClick={handleClick}
				onMouseEnter={handleMouseEnter}
				onKeyDown={handleKeyDown}
				{...props}
			>
				{children}
			</div>
		);
	}
);

SelectOptionComposition.displayName = 'SelectOption';
