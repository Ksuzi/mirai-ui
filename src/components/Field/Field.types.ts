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

export type FieldLabelProps = {
	/**
	 * Content of the label
	 */
	children?: React.ReactNode;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

export type FieldControlProps = {
	/**
	 * The form control element (Input, Select, Textarea, etc.)
	 */
	children: React.ReactElement;
} & React.HTMLAttributes<HTMLDivElement>;

export type FieldMessageProps = {
	/**
	 * Content of the message (overrides root error/helperText)
	 */
	children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export type FieldContextValue = {
	id: string;
	size: FieldSize;
	state: FieldState;
	required: boolean;
	disabled: boolean;
	error?: string;
	helperText?: string;
};
