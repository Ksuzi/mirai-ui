export type InputIconProps = {
	/**
	 * Position of the icon (left or right)
	 */
	position: 'left' | 'right';

	/**
	 * Icon content to display
	 */
	children: React.ReactNode;

	/**
	 * Additional CSS classes
	 */
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
