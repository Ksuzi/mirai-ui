import type { ButtonVariantProps } from './Button.variants';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}
