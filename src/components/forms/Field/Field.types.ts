import type { FieldRootVariantProps } from './Field.variants';

export type FieldSize = 'sm' | 'md' | 'lg' | 'xl';
export type FieldState = 'default' | 'error' | 'success' | 'warning';

export type FieldRootProps = {
	/**
	 * Unique identifier for the field
	 */
	id?: string;
	/**
	 * Size of the field and its children
	 */
	size?: FieldSize;
	/**
	 * State of the field (error, success, warning)
	 */
	state?: FieldState;
	/**
	 * Whether the field is required
	 */
	required?: boolean;
	/**
	 * Whether the field is disabled
	 */
	disabled?: boolean;
	/**
	 * Error message to display
	 */
	error?: string;
	/**
	 * Helper text to display
	 */
	helperText?: string;
} & React.HTMLAttributes<HTMLDivElement> &
	FieldRootVariantProps;

export type FieldContextValue = {
	id: string;
	size: FieldSize;
	state: FieldState;
	required: boolean;
	disabled: boolean;
	error?: string;
	helperText?: string;
};
