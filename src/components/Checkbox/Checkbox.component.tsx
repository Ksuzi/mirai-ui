import React from 'react';
import { mergeClassNames } from '@mirai-ui/utils';
import { checkboxVariants, checkboxLabelVariants } from './Checkbox.variants';
import type { CheckboxProps, CheckboxRootProps, CheckboxInputProps, CheckboxLabelProps } from './Checkbox.types';

export const CheckboxRoot = React.forwardRef<HTMLDivElement, CheckboxRootProps>(({ className, ...props }, ref) => (
	<div ref={ref} className={mergeClassNames('inline-flex items-center', className)} {...props} />
));

export const CheckboxInput = React.forwardRef<HTMLInputElement, CheckboxInputProps>(
	({ variant, size, className, ...props }, ref) => (
		<input
			ref={ref}
			type="checkbox"
			className={mergeClassNames(checkboxVariants({ variant, size }), className)}
			{...props}
		/>
	)
);

export const CheckboxLabel = React.forwardRef<HTMLLabelElement, CheckboxLabelProps>(
	({ size, disabled, className, ...props }, ref) => (
		<label ref={ref} className={mergeClassNames(checkboxLabelVariants({ size, disabled }), className)} {...props} />
	)
);

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ variant, size, className, wrapperClassName, label, disabled, id, ...props }, ref) => {
		const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

		if (label) {
			return (
				<CheckboxRoot className={wrapperClassName}>
					<CheckboxInput
						ref={ref}
						id={checkboxId}
						variant={variant}
						size={size}
						disabled={disabled}
						className={className}
						{...props}
					/>
					<CheckboxLabel htmlFor={checkboxId} size={size} disabled={disabled}>
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
					variant={variant}
					size={size}
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
