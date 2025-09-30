import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

export type ButtonSize = 'sm' | 'default' | 'lg' | 'icon';

export interface ButtonLoadingState {
	/** Whether the button is in loading state */
	loading?: boolean;
	/** Text to show when loading (defaults to "Loading...") */
	loadingText?: string;
	/** Whether to show spinner when loading */
	showSpinner?: boolean;
}

export interface ButtonIcons {
	/** Icon to display on the left side */
	leftIcon?: React.ReactNode;
	/** Icon to display on the right side */
	rightIcon?: React.ReactNode;
	/** Icon to display when loading (overrides leftIcon when loading) */
	loadingIcon?: React.ReactNode;
}

export interface ButtonProps
	extends Omit<React.ComponentProps<'button'>, 'disabled'>,
		ButtonLoadingState,
		ButtonIcons {
	/** Whether to render as a different element using Radix Slot */
	asChild?: boolean;
	/** Whether the button is disabled (includes loading state) */
	disabled?: boolean;
	/** Additional CSS classes */
	className?: string;
	/** Button content */
	children?: React.ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
}

export type ButtonRef = React.ElementRef<'button'>;

export type ButtonComponent = React.ForwardRefExoticComponent<
	ButtonProps & React.RefAttributes<ButtonRef>
>;
