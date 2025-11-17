import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { inputVariants } from './Input.variants';

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
			'aria-invalid': ariaInvalidProp,
			'aria-required': ariaRequiredProp,
			...props
		},
		ref
	) => {
		const ariaInvalid = ariaInvalidProp ?? (state === 'error' ? true : undefined);
		const ariaRequired = ariaRequiredProp ?? (required ? true : undefined);

		return (
			<div className="relative">
				{leftIcon && (
					<div
						className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
						aria-hidden="true"
						role="presentation"
						data-slot="input-left-icon"
					>
						<span className="text-muted-400" aria-hidden="true">
							{leftIcon}
						</span>
					</div>
				)}

				<input
					ref={ref}
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
					{...props}
				/>

				{rightIcon && (
					<div
						className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
						aria-hidden="true"
						role="presentation"
						data-slot="input-right-icon"
					>
						<span className="text-muted-400" aria-hidden="true">
							{rightIcon}
						</span>
					</div>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';
