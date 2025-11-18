import type { FieldSize, FieldState } from '../Field.types';

export type FieldControlProps = {
	/**
	 * The form control element (Input, Select, Textarea, etc.)
	 */
	children: React.ReactElement;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Props that are passed to the cloned form control element
 */
export type FieldControlInjectedProps = {
	id?: string;
	size?: FieldSize;
	state?: FieldState;
	required?: boolean;
	disabled?: boolean;
	'aria-invalid'?: boolean;
	'aria-describedby'?: string;
	'aria-required'?: boolean;
	'aria-errormessage'?: string;
};
