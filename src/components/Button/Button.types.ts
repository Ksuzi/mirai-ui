import type { ButtonVariantProps, IconSize } from './Button.variants';

export type ButtonProps = {
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	iconSize?: IconSize;
	['aria-label']?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
	ButtonVariantProps;
