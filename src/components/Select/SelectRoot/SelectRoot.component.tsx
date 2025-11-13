import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { SelectContext } from '../Select.context';
import { useClickOutside } from '../Select.hooks';
import { SelectContent } from '../SelectContent';
import { SelectOption as SelectOptionLegacy } from '../SelectOption';
import { SelectTrigger } from '../SelectTrigger';

import type { SelectRootProps } from './SelectRoot.types';
import type { SelectOption as SelectOptionType } from '../Select.types';

export const SelectRoot = React.forwardRef<HTMLDivElement, SelectRootProps>(
	(
		{
			variant = 'default',
			state = 'default',
			size = 'md',
			fullWidth = true,
			value,
			onChange,
			options = [],
			placeholder = 'Select an option...',
			leftIcon,
			disabled = false,
			className,
			children,
			...props
		},
		ref
	) => {
		const [isOpen, setIsOpen] = React.useState(false);
		const [selectedValue, setSelectedValue] = React.useState<string | undefined>(value);
		const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);
		const triggerRef = React.useRef<HTMLButtonElement>(null);
		const contentRef = React.useRef<HTMLDivElement>(null);

		React.useEffect(() => {
			setSelectedValue(value);
		}, [value]);

		useClickOutside([contentRef, triggerRef], () => setIsOpen(false), isOpen);

		const handleSelect = React.useCallback(
			(optionValue: string): void => {
				setSelectedValue(optionValue);
				setIsOpen(false);
				setHighlightedIndex(-1);
				triggerRef.current?.focus();
				onChange?.(optionValue);
			},
			[onChange]
		);

		const contextValue = React.useMemo(
			() => ({
				value: selectedValue,
				onChange,
				isOpen,
				setIsOpen,
				highlightedIndex,
				setHighlightedIndex,
				triggerRef,
				contentRef,
				variant,
				state,
				size,
				disabled,
				fullWidth,
				options,
				handleSelect,
			}),
			[
				selectedValue,
				onChange,
				isOpen,
				highlightedIndex,
				variant,
				state,
				size,
				disabled,
				fullWidth,
				options,
				handleSelect,
			]
		);

		// Props-based mode
		if (options && !children) {
			return (
				<SelectContext.Provider value={contextValue}>
					<div ref={ref} className={mergeClassNames('relative', fullWidth ? 'w-full' : 'w-auto')} {...props}>
						<SelectTrigger placeholder={placeholder} leftIcon={leftIcon} className={className} id={props.id} />
						<SelectContent>
							{options.length === 0 ? (
								<div className="px-4 py-2 text-sm text-muted-400">No options available</div>
							) : (
								options.map((option: SelectOptionType, index: number) => (
									<SelectOptionLegacy
										key={option.value}
										option={option}
										isSelected={option.value === selectedValue}
										isHighlighted={index === highlightedIndex}
										index={index}
										onSelect={(opt) => handleSelect(opt.value)}
										onHighlight={setHighlightedIndex}
									/>
								))
							)}
						</SelectContent>
					</div>
				</SelectContext.Provider>
			);
		}

		// Composition mode: Render children
		return (
			<SelectContext.Provider value={contextValue}>
				<div ref={ref} className={mergeClassNames('relative', fullWidth ? 'w-full' : 'w-auto', className)} {...props}>
					{children}
				</div>
			</SelectContext.Provider>
		);
	}
);

SelectRoot.displayName = 'SelectRoot';
