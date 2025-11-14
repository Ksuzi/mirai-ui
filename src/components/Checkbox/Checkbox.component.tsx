import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { checkboxUtils } from './Checkbox.utils';
import { checkboxVariants } from './Checkbox.variants';
import { CheckboxIcon } from './CheckboxIcon';

import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ size = 'md', colorScheme, className, onChange, ...props }, ref) => {
		const [checked, setChecked] = React.useState(props.defaultChecked ?? false);
		const isControlled = props.checked !== undefined;
		const checkboxChecked = isControlled ? props.checked : checked;

		const handleChange = React.useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				if (!isControlled) {
					setChecked(e.target.checked);
				}
				onChange?.(e);
			},
			[isControlled, onChange]
		);

		const wrapperSizeClasses = checkboxUtils.getCheckboxWrapperClasses(size);

		return (
			<div className={`relative inline-flex items-center justify-center ${wrapperSizeClasses}`}>
				<input
					ref={ref}
					type="checkbox"
					className={mergeClassNames(checkboxVariants({ size, colorScheme: colorScheme ?? 'primary' }), className)}
					{...props}
					checked={checkboxChecked}
					onChange={handleChange}
				/>
				<CheckboxIcon size={size} checked={checkboxChecked ?? false} />
			</div>
		);
	}
);

Checkbox.displayName = 'Checkbox';
