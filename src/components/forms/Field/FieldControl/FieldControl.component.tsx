import React from 'react';

import { useFieldContext } from '../Field.context';
import { fieldUtils } from '../Field.utils';

import type { FieldControlInjectedProps, FieldControlProps } from './FieldControl.types';

export const FieldControl = React.memo(
	React.forwardRef<HTMLDivElement, FieldControlProps>(({ className, children, ...props }, ref) => {
		const { id, size, state, required, disabled, error, helperText } = useFieldContext();

		const displayMessage = fieldUtils.getDisplayMessage(error, helperText);
		const messageId = fieldUtils.getFieldMessageId(id);
		const ariaDescribedBy = displayMessage ? messageId : undefined;
		// aria-errormessage should only be set when there's an error (WCAG 4.1.2)
		const ariaErrorMessage = state === 'error' && error ? messageId : undefined;
		const ariaProps = fieldUtils.getFieldAriaProps(state, required, ariaDescribedBy, ariaErrorMessage);

		const injectedProps: FieldControlInjectedProps = {
			id,
			size,
			state,
			required,
			disabled,
			...ariaProps,
		};

		const control = React.cloneElement(children, injectedProps as Record<string, unknown>);

		return (
			<div ref={ref} className={className} {...props}>
				{control}
			</div>
		);
	})
);

FieldControl.displayName = 'FieldControl';
