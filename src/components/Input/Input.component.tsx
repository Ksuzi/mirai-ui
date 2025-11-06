import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { Text } from '../Text';

import { inputVariants } from './Input.variants';
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
					<Text
						as="label"
						htmlFor={inputId}
						variant="label"
						size={size}
						className={required ? "after:content-['*'] after:ml-0.5 after:text-error-500" : undefined}
					>
						{label}
					</Text>
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
					<Text
						as="p"
						id={messageId}
						variant="helper-text"
						size={size}
						colorScheme={effectiveState}
						role={effectiveState === 'error' ? 'alert' : undefined}
						aria-live={effectiveState === 'error' ? 'polite' : undefined}
					>
						{displayMessage}
					</Text>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';
