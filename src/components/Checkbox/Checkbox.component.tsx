import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { Text } from '../Text';

import { checkboxVariants } from './Checkbox.variants';
import { CheckboxIcon } from './CheckboxIcon';

import type { CheckboxProps, CheckboxRootProps, CheckboxInputProps, CheckboxLabelProps } from './Checkbox.types';

export const CheckboxRoot = React.forwardRef<HTMLDivElement, CheckboxRootProps>(({ className, ...props }, ref) => (
	<div ref={ref} className={mergeClassNames('inline-flex items-center', className)} {...props} />
));

export const CheckboxInput = React.forwardRef<HTMLInputElement, CheckboxInputProps>(
	({ size, colorScheme, className, ...props }, ref) => {
		const [checked, setChecked] = React.useState(props.defaultChecked ?? false);
		const isControlled = props.checked !== undefined;
		const checkboxChecked = isControlled ? props.checked : checked;

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (!isControlled) {
				setChecked(e.target.checked);
			}
			props.onChange?.(e);
		};

		const checkboxCheckedBoolean = Boolean(checkboxChecked);

		return (
			<div className="relative inline-flex">
				<input
					ref={ref}
					type="checkbox"
					className={mergeClassNames(checkboxVariants({ size, colorScheme }), className)}
					{...props}
					checked={checkboxChecked}
					onChange={handleChange}
					aria-checked={checkboxCheckedBoolean}
					aria-disabled={props.disabled ? true : undefined}
				/>
				<CheckboxIcon size={size ?? 'md'} checked={checkboxCheckedBoolean} />
			</div>
		);
	}
);

export const CheckboxLabel = React.forwardRef<HTMLLabelElement, CheckboxLabelProps>(
	({ size = 'md', disabled = false, className, children, ...props }, ref) => {
		const sizeClass = size === 'lg' || size === 'xl' ? 'ml-3' : 'ml-2';

		return (
			<Text
				ref={ref}
				as="label"
				className={mergeClassNames(
					'select-none cursor-pointer',
					sizeClass,
					disabled === true && 'cursor-not-allowed opacity-50',
					className
				)}
				colorScheme={disabled === true ? 'disabled' : 'default'}
				{...props}
			>
				{children}
			</Text>
		);
	}
);

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ size = 'md', colorScheme, className, wrapperClassName, label, disabled, id, ...props }, ref) => {
		const checkboxId = id ?? `checkbox-${Math.random().toString(36).substring(2, 9)}`;

		if (label) {
			return (
				<CheckboxRoot className={wrapperClassName}>
					<CheckboxInput
						ref={ref}
						id={checkboxId}
						size={size}
						colorScheme={colorScheme}
						disabled={disabled}
						className={className}
						{...props}
					/>
					<CheckboxLabel htmlFor={checkboxId} size={size ?? 'md'} disabled={disabled ?? false}>
						{label}
					</CheckboxLabel>
				</CheckboxRoot>
			);
		}

		return (
			<CheckboxRoot className={wrapperClassName}>
				<CheckboxInput
					ref={ref}
					id={checkboxId}
					size={size}
					colorScheme={colorScheme}
					disabled={disabled}
					className={className}
					{...props}
				/>
			</CheckboxRoot>
		);
	}
);

Checkbox.displayName = 'Checkbox';
CheckboxRoot.displayName = 'CheckboxRoot';
CheckboxInput.displayName = 'CheckboxInput';
CheckboxLabel.displayName = 'CheckboxLabel';
