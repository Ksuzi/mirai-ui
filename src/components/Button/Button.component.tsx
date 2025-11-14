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
			...props
		},
		ref
	) => {
		const { onClick, type, ...restProps } = props;
		const effectiveIconSize = iconSize ?? size;
		const iconSizeClass = iconSizes[effectiveIconSize as IconSize];

		const handleKeyDown = React.useCallback(
			(event: React.KeyboardEvent<HTMLButtonElement>) => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					if (!disabled && !loading && onClick) {
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
						onClick(syntheticEvent);
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
				onClick={onClick}
				onKeyDown={handleKeyDown}
				{...restProps}
			>
				{loading && <Spinner size={effectiveIconSize as IconSize} />}

				{leftIcon && !loading && (
					<span className={mergeClassNames('flex items-center', iconSizeClass)}>{leftIcon}</span>
				)}

				{children}

				{rightIcon && <span className={mergeClassNames('flex items-center', iconSizeClass)}>{rightIcon}</span>}
			</button>
		);
	}
);

Button.displayName = 'Button';
