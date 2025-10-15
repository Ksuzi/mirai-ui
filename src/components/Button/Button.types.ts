import type { ButtonVariantProps, IconSize } from './Button.variants';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	iconSize?: IconSize;
	['aria-label']?: string;
}
