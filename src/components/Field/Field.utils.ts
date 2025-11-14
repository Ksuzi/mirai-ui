import type { FieldState } from './Field.types';

const getFieldMessageId = (fieldId: string): string => {
	return `${fieldId}-message`;
};

const getDisplayMessage = (error?: string, helperText?: string, children?: React.ReactNode): React.ReactNode => {
	return children ?? error ?? helperText;
};

const getFieldAriaProps = (
	state: FieldState,
	required: boolean,
	ariaDescribedBy?: string,
	ariaErrorMessage?: string
): {
	'aria-invalid'?: boolean;
	'aria-describedby'?: string;
	'aria-required'?: boolean;
	'aria-errormessage'?: string;
} => {
	return {
		'aria-invalid': state === 'error' || undefined,
		'aria-describedby': ariaDescribedBy,
		'aria-required': required || undefined,
		'aria-errormessage': ariaErrorMessage,
	};
};

const getRequiredIndicatorClass = (required: boolean): string | undefined => {
	return required ? "after:content-['*'] after:ml-0.5 after:text-error-500" : undefined;
};

export const fieldUtils = {
	/**
	 * Generates the message element ID for accessibility
	 */
	getFieldMessageId,
	/**
	 * Returns the display message for the field
	 */
	getDisplayMessage,
	/**
	 * Builds ARIA attributes for form controls
	 */
	getFieldAriaProps,
	/**
	 * Builds CSS class for required field indicator
	 */
	getRequiredIndicatorClass,
};
