import React from 'react';

import { useDevWarning } from '@mirai-ui/hooks';
import { mergeClassNames } from '@mirai-ui/utils';

import { checkboxUtils } from './Checkbox.utils';
import { checkboxVariants } from './Checkbox.variants';
import { CheckboxIcon } from './CheckboxIcon';

import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ size = 'md', colorScheme, className, onChange, defaultChecked, ...props }, ref) => {
		const [checked, setChecked] = React.useState(defaultChecked ?? false);
		const isControlled = props.checked !== undefined;
		const checkboxChecked: boolean = isControlled ? (props.checked ?? false) : checked;

		useDevWarning(
			Boolean(isControlled && defaultChecked !== undefined),
			'Checkbox: Component is controlled (has `checked` prop) but also has `defaultChecked`. `defaultChecked` will be ignored. Use either `checked` (controlled) or `defaultChecked` (uncontrolled), not both.'
		);

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
			<div className={mergeClassNames('relative inline-flex items-center justify-center', wrapperSizeClasses)}>
				<input
					ref={ref}
					type="checkbox"
					className={mergeClassNames(checkboxVariants({ size, colorScheme: colorScheme ?? 'primary' }), className)}
					{...props}
					checked={checkboxChecked}
					onChange={handleChange}
					defaultChecked={isControlled ? undefined : defaultChecked}
				/>
				<CheckboxIcon size={size} checked={checkboxChecked} />
			</div>
		);
	}
);

Checkbox.displayName = 'Checkbox';
