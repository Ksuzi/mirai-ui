import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { checkboxVariants } from './Checkbox.variants';
import { CheckboxIcon } from './CheckboxIcon';

import type { CheckboxProps } from './Checkbox.types';

/**
 * Checkbox - Базовий checkbox елемент
 * Для використання з label використовуйте Field компонент
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ size = 'md', colorScheme, className, color, ...props }, ref) => {
		const [checked, setChecked] = React.useState(props.defaultChecked ?? false);
		const isControlled = props.checked !== undefined;
		const checkboxChecked = isControlled ? props.checked : checked;

		// Backward compatibility: map deprecated color prop to colorScheme
		let effectiveColorScheme = colorScheme;
		effectiveColorScheme ??= color === 'primary' || color === 'secondary' ? color : undefined;
		effectiveColorScheme ??= 'primary';

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (!isControlled) {
				setChecked(e.target.checked);
			}
			props.onChange?.(e);
		};

		return (
			<div className="relative inline-flex">
				<input
					ref={ref}
					type="checkbox"
					className={mergeClassNames(checkboxVariants({ size, colorScheme: effectiveColorScheme }), className)}
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
