import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';

import {
	extractButtonProps,
	getButtonClassName,
	getButtonContent,
	getLeftIcon,
} from './Button.utils';
import { type ButtonProps, type ButtonRef } from './Button.types';

export const Button = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
	const {
		asChild,
		loading,
		loadingText,
		showSpinner,
		leftIcon,
		rightIcon,
		loadingIcon,
		className,
		children,
		disabled,
		variant,
		size,
		restProps,
	} = extractButtonProps(props);

	const Comp = asChild ? Slot : 'button';

	const content = getButtonContent(children, loading ?? false, loadingText);

	const leftIconElement = getLeftIcon(leftIcon, loading ?? false, loadingIcon, showSpinner);

	const buttonClassName = getButtonClassName(variant, size, className);

	if (asChild) {
		return (
			<Comp
				ref={ref}
				data-slot="button"
				className={buttonClassName}
				disabled={disabled}
				aria-disabled={disabled}
				{...restProps}
			>
				<span className="inline-flex items-center justify-center gap-2">
					{leftIconElement && (
						<span className="flex items-center justify-center">{leftIconElement}</span>
					)}

					{content && <span className="flex-1">{content}</span>}

					{rightIcon && !loading && (
						<span className="flex items-center justify-center">{rightIcon}</span>
					)}
				</span>
			</Comp>
		);
	}

	return (
		<Comp
			ref={ref}
			data-slot="button"
			className={buttonClassName}
			disabled={disabled}
			aria-disabled={disabled}
			{...restProps}
		>
			{leftIconElement && (
				<span className="flex items-center justify-center">{leftIconElement}</span>
			)}

			{content && <span className="flex-1">{content}</span>}

			{rightIcon && !loading && (
				<span className="flex items-center justify-center">{rightIcon}</span>
			)}
		</Comp>
	);
});

Button.displayName = 'Button';
