import React from 'react';

type ButtonProps = {
	variant?: 'primary' | 'secondary';
	children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles = 'px-4 py-2 rounded text-white font-medium focus:outline-none transition-colors';
const variants = {
	primary: 'bg-blue-600 hover:bg-blue-700',
	secondary: 'bg-gray-400 hover:bg-gray-500',
};

export const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	children = 'my button',
	className = '',
	...props
}) => {
	return (
		<button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
			{children}
		</button>
	);
};
