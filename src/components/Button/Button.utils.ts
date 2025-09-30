import * as React from 'react';
import { cn } from '@mirai-ui/utils';
import { buttonVariants } from './Button.variants';
import { type ButtonProps } from './Button.types';

/**
 * Extracts button-specific props from ButtonProps
 */
export function extractButtonProps(props: ButtonProps) {
	const {
		asChild,
		loading,
		loadingText,
		showSpinner = true,
		leftIcon,
		rightIcon,
		loadingIcon,
		className,
		children,
		disabled,
		variant,
		size,
		...restProps
	} = props;

	return {
		asChild,
		loading,
		loadingText,
		showSpinner,
		leftIcon,
		rightIcon,
		loadingIcon,
		className,
		children,
		disabled: disabled || loading,
		variant,
		size,
		restProps,
	};
}

/**
 * Generates className for button with proper merging
 */
export function getButtonClassName(
	variant: ButtonProps['variant'],
	size: ButtonProps['size'],
	className?: string
) {
	return cn(buttonVariants({ variant, size }), className);
}

/**
 * Determines if button should show loading state
 */
export function shouldShowLoading(loading?: boolean, disabled?: boolean) {
	return Boolean(loading && !disabled);
}

/**
 * Gets the appropriate content to display in button
 */
export function getButtonContent(
	children: React.ReactNode,
	loading?: boolean,
	loadingText?: string
) {
	if (loading) {
		return loadingText || 'Loading...';
	}
	return children;
}

/**
 * Gets the appropriate left icon to display
 */
export function getLeftIcon(
	leftIcon: React.ReactNode,
	loading?: boolean,
	loadingIcon?: React.ReactNode,
	showSpinner: boolean = true
) {
	if (loading && showSpinner) {
		return loadingIcon || React.createElement(DefaultSpinner);
	}
	return leftIcon;
}

/**
 * Default spinner component for loading state
 */
function DefaultSpinner() {
	return React.createElement(
		'svg',
		{
			className: 'animate-spin h-4 w-4',
			xmlns: 'http://www.w3.org/2000/svg',
			fill: 'none',
			viewBox: '0 0 24 24',
		},
		[
			React.createElement('circle', {
				key: 'circle',
				className: 'opacity-25',
				cx: '12',
				cy: '12',
				r: '10',
				stroke: 'currentColor',
				strokeWidth: '4',
			}),
			React.createElement('path', {
				key: 'path',
				className: 'opacity-75',
				fill: 'currentColor',
				d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z',
			}),
		]
	);
}
