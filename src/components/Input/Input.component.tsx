import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { inputVariants, labelVariants, helperTextVariants } from './Input.variants';
import { inputUtils } from './utils';

import type { InputProps } from './Input.types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			variant = 'default',
			state,
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
		const inputId = inputUtils.getInputId(id);
		const messageId = `${inputId}-message`;

		const effectiveState = inputUtils.getInputState({ state, error });
		const displayMessage = inputUtils.getInputMessage({ error, helperText });
		const ariaDescribedBy = inputUtils.getAriaDescribedBy(inputId, Boolean(displayMessage));

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
							<span className="text-muted-400">{leftIcon}</span>
						</div>
					)}

					<input
						ref={ref}
						id={inputId}
						className={mergeClassNames(
							inputVariants({
								variant,
								state: effectiveState,
								size,
								fullWidth,
							}),
							leftIcon && 'pl-10',
							rightIcon && 'pr-10',
							className
						)}
						required={required}
						aria-required={required ? true : undefined}
						aria-invalid={effectiveState === 'error'}
						aria-describedby={ariaDescribedBy}
						{...props}
					/>

					{rightIcon && (
						<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
							<span className="text-muted-400">{rightIcon}</span>
						</div>
					)}
				</div>

				{displayMessage && (
					<p
						id={messageId}
						className={mergeClassNames(
							helperTextVariants({
								size,
								state: effectiveState,
							})
						)}
						role={effectiveState === 'error' ? 'alert' : undefined}
						aria-live={effectiveState === 'error' ? 'polite' : undefined}
					>
						{displayMessage}
					</p>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';
