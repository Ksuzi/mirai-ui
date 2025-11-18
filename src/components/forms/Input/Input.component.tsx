import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { inputVariants } from './Input.variants';
import { InputIcon } from './InputIcon';

import type { InputProps } from './Input.types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			variant = 'default',
			state = 'default',
			size = 'md',
			fullWidth = true,
			leftIcon,
			rightIcon,
			className,
			required,
			disabled,
			id,
			'aria-invalid': ariaInvalidProp,
			'aria-required': ariaRequiredProp,
			'aria-describedby': ariaDescribedBy,
			'aria-errormessage': ariaErrorMessage,
			...props
		},
		ref
	) => {
		const generatedId = React.useId();
		const inputId = id ?? `input-${generatedId}`;

		const ariaInvalid = ariaInvalidProp ?? (state === 'error' ? true : undefined);
		const ariaRequired = ariaRequiredProp ?? (required ? true : undefined);

		return (
			<div className="relative">
				{leftIcon && <InputIcon position="left">{leftIcon}</InputIcon>}

				<input
					ref={ref}
					id={inputId}
					className={mergeClassNames(
						inputVariants({
							variant,
							state,
							size,
							fullWidth,
						}),
						Boolean(leftIcon) && 'pl-10',
						Boolean(rightIcon) && 'pr-10',
						className
					)}
					required={required}
					disabled={disabled}
					aria-invalid={ariaInvalid}
					aria-required={ariaRequired}
					aria-describedby={ariaDescribedBy}
					aria-errormessage={ariaErrorMessage}
					{...props}
				/>

				{rightIcon && <InputIcon position="right">{rightIcon}</InputIcon>}
			</div>
		);
	}
);

Input.displayName = 'Input';
