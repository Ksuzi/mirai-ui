import React from 'react';
import { mergeClassNames } from '@mirai-ui/utils';
import { buttonVariants } from './Button.variants';
import type { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ variant, size, fullWidth, loading = false, leftIcon, rightIcon, children, className, disabled, ...props },
		ref
	) => {
		return (
			<button
				ref={ref}
				className={mergeClassNames(
					buttonVariants({
						variant,
						size,
						fullWidth,
						loading,
					}),
					className
				)}
				disabled={Boolean(disabled || loading)}
				{...props}
			>
				{loading && (
					<svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				)}

				{/* Ліва іконка */}
				{leftIcon && !loading && <span className="mr-2">{leftIcon}</span>}

				{/* Контент */}
				{children}

				{/* Права іконка */}
				{rightIcon && <span className="ml-2">{rightIcon}</span>}
			</button>
		);
	}
);

Button.displayName = 'Button';
