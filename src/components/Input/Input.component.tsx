import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { inputVariants } from './Input.variants';

import type { InputProps } from './Input.types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{ variant = 'default', state = 'default', size = 'md', fullWidth = true, leftIcon, rightIcon, className, ...props },
		ref
	) => {
		return (
			<div className="relative">
				{leftIcon && (
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<span className="text-muted-400">{leftIcon}</span>
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
					{...props}
				/>

				{rightIcon && (
					<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
						<span className="text-muted-400">{rightIcon}</span>
					</div>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';
