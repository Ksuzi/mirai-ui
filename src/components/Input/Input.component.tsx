import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { inputVariants, labelVariants, helperTextVariants } from './Input.variants';

import type { InputProps } from './Input.types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			variant = 'default',
			size = 'md',
			fullWidth = true,
			label,
			helperText,
			error,
			leftIcon,
			rightIcon,
			className,
			required,
			id,
			...props
		},
		ref
	) => {
		const inputId = id ?? `input-${Math.random().toString(36).substring(2, 11)}`;
		const helperTextId = `${inputId}-helper`;
		const errorId = `${inputId}-error`;

		const effectiveVariant = error ? 'error' : variant;
		const helperVariant = error ? 'error' : 'default';

		const displayHelperText = error ?? helperText;

		let ariaDescribedBy: string | undefined;
		if (displayHelperText) {
			ariaDescribedBy = error ? errorId : helperTextId;
		}

		return (
			<div className="w-full">
				{label && (
					<label
						htmlFor={inputId}
						className={mergeClassNames(
							labelVariants({
								size,
								required,
							})
						)}
					>
						{label}
					</label>
				)}

				<div className="relative">
					{leftIcon && (
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<span className="text-gray-400">{leftIcon}</span>
						</div>
					)}

					<input
						ref={ref}
						id={inputId}
						className={mergeClassNames(
							inputVariants({
								variant: effectiveVariant,
								size,
								fullWidth,
							}),
							leftIcon && 'pl-10',
							rightIcon && 'pr-10',
							className
						)}
						required={required}
						aria-invalid={Boolean(error)}
						aria-describedby={ariaDescribedBy}
						{...props}
					/>

					{rightIcon && (
						<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
							<span className="text-gray-400">{rightIcon}</span>
						</div>
					)}
				</div>

				{displayHelperText && (
					<p
						id={error ? errorId : helperTextId}
						className={mergeClassNames(
							helperTextVariants({
								size,
								variant: helperVariant,
							})
						)}
						role={error ? 'alert' : undefined}
						aria-live={error ? 'polite' : undefined}
					>
						{displayHelperText}
					</p>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';
