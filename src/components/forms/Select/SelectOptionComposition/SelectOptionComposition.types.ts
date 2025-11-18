export type SelectOptionCompositionProps = React.HTMLAttributes<HTMLDivElement> & {
	/**
	 * The value of this option
	 */
	value: string;

	/**
	 * Whether this option is disabled
	 */
	disabled?: boolean;

	/**
	 * Custom content for the option
	 */
	children: React.ReactNode;
};
