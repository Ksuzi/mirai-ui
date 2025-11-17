import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { Spinner } from '../Spinner';

import { buttonVariants, iconSizes } from './Button.variants';

import type { ButtonProps } from './Button.types';
import type { IconSize } from './Button.variants';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant,
			colorScheme,
			size = 'md',
			fullWidth,
			loading = false,
			leftIcon,
			rightIcon,
			iconSize,
			children,
			className,
			disabled,
			type,
			'aria-label': ariaLabel,
			onClick,
			...props
		},
		ref
	) => {
		const effectiveIconSize = iconSize ?? size;
		const iconSizeClass = iconSizes[effectiveIconSize as IconSize];

		React.useEffect(() => {
			if (process.env.NODE_ENV !== 'production') {
				const isIconOnly = !children && (leftIcon ?? rightIcon);
				if (isIconOnly && !ariaLabel && !props['aria-labelledby']) {
					console.warn(
						'Button: Icon-only buttons must have an accessible label. Provide an `aria-label` or `aria-labelledby` prop.'
					);
				}
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		const handleKeyDown = React.useCallback(
			(event: React.KeyboardEvent<HTMLButtonElement>) => {
				if (event.key === ' ') {
					event.preventDefault();
					if (!disabled && !loading && onClick) {
						onClick(event as unknown as React.MouseEvent<HTMLButtonElement>);
					}
				}
			},
			[disabled, loading, onClick]
		);

		return (
			<button
				ref={ref}
				className={mergeClassNames(
					buttonVariants({
						variant,
						colorScheme,
						size,
						fullWidth,
						loading,
					}),
					className
				)}
				type={type ?? 'button'}
				disabled={Boolean(disabled ?? loading)}
				aria-disabled={Boolean(disabled ?? loading)}
				aria-busy={Boolean(loading)}
				aria-label={ariaLabel}
				onClick={onClick}
				onKeyDown={handleKeyDown}
				{...props}
			>
				{loading && <Spinner size={effectiveIconSize as IconSize} />}

				{leftIcon && !loading && (
					<span className={mergeClassNames('flex items-center', iconSizeClass)} aria-hidden="true">
						{leftIcon}
					</span>
				)}

				{children}

				{rightIcon && (
					<span className={mergeClassNames('flex items-center', iconSizeClass)} aria-hidden="true">
						{rightIcon}
					</span>
				)}
			</button>
		);
	}
);

Button.displayName = 'Button';
