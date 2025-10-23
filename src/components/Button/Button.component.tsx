import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { buttonVariants, iconSizes, iconSpacing } from './Button.variants';

import type { ButtonProps } from './Button.types';
import type { IconSize } from './Button.variants';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant,
			size = 'md',
			fullWidth,
			loading = false,
			leftIcon,
			rightIcon,
			iconSize,
			children,
			className,
			disabled,
			...props
		},
		ref
	) => {
		const effectiveIconSize = iconSize ?? size;
		const iconSizeClass = iconSizes[effectiveIconSize as IconSize];

		const leftIconSpacing = iconSpacing.left[size as IconSize];
		const rightIconSpacing = iconSpacing.right[size as IconSize];

		const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				if (!disabled && !loading && props.onClick) {
					// Simulate a mouse event for keyboard activation
					const syntheticEvent = {
						...event,
						button: 0,
						buttons: 1,
						clientX: 0,
						clientY: 0,
						movementX: 0,
						movementY: 0,
						screenX: 0,
						screenY: 0,
						pageX: 0,
						pageY: 0,
						relatedTarget: null,
					} as unknown as React.MouseEvent<HTMLButtonElement>;
					props.onClick(syntheticEvent);
				}
			}
		};

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
				disabled={Boolean(disabled ?? loading)}
				aria-disabled={Boolean(disabled ?? loading)}
				aria-busy={Boolean(loading)}
				onKeyDown={handleKeyDown}
				{...props}
			>
				{loading && (
					<svg
						className={mergeClassNames('animate-spin', leftIconSpacing, iconSizeClass)}
						fill="none"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				)}

				{leftIcon && !loading && (
					<span className={mergeClassNames('flex items-center', leftIconSpacing, iconSizeClass)}>{leftIcon}</span>
				)}

				{children}

				{rightIcon && (
					<span className={mergeClassNames('flex items-center', rightIconSpacing, iconSizeClass)}>{rightIcon}</span>
				)}
			</button>
		);
	}
);

Button.displayName = 'Button';
