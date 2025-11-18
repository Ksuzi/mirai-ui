import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { Radio } from './Radio.component';
import { RadioContext } from './Radio.context';
import { radioGroupVariants } from './RadioGroup.variants';

import type { RadioContextValue } from './Radio.context';
import type { RadioGroupProps, RadioOption } from './Radio.types';

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
	(
		{
			name,
			value,
			defaultValue,
			onChange,
			size,
			colorScheme,
			disabled,
			orientation,
			fullWidth,
			className,
			options,
			children,
			...props
		},
		ref
	) => {
		const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);

		const isControlled = value !== undefined;
		const effectiveValue = isControlled ? value : internalValue;

		const handleChange = React.useCallback(
			(newValue: string) => {
				if (!isControlled) {
					setInternalValue(newValue);
				}
				onChange?.(newValue);
			},
			[isControlled, onChange]
		);

		const contextValue: RadioContextValue = React.useMemo(
			() => ({
				name,
				value: effectiveValue,
				onChange: handleChange,
				size,
				colorScheme,
				disabled,
			}),
			[name, effectiveValue, handleChange, size, colorScheme, disabled]
		);

		const content = React.useMemo((): React.ReactNode => {
			if (options) {
				return options.map((option: RadioOption) => (
					<Radio key={option.value} value={option.value} disabled={option.disabled}>
						{option.label}
					</Radio>
				));
			}
			return children;
		}, [options, children]);

		return (
			<RadioContext.Provider value={contextValue}>
				<div
					ref={ref}
					role="radiogroup"
					className={mergeClassNames(radioGroupVariants({ orientation, fullWidth }), className)}
					{...props}
				>
					{content}
				</div>
			</RadioContext.Provider>
		);
	}
);

RadioGroup.displayName = 'RadioGroup';
