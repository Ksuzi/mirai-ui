import React from 'react';

import { useFieldContext } from '../Field.context';
import { getDisplayMessage, getFieldMessageId, getFieldAriaProps } from '../Field.utils';

import type { FieldControlProps } from './FieldControl.types';

export const FieldControl = React.forwardRef<HTMLDivElement, FieldControlProps>(
	({ className, children, ...props }, ref) => {
		const { id, size, state, required, disabled, error, helperText } = useFieldContext();

		const displayMessage = getDisplayMessage(error, helperText);
		const messageId = getFieldMessageId(id);
		const ariaDescribedBy = displayMessage ? messageId : undefined;
		const ariaProps = getFieldAriaProps(state, required, ariaDescribedBy);

		const control = React.cloneElement(
			children,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			{
				id,
				size,
				state,
				required,
				disabled,
				...ariaProps,
			} as any
		);

		return (
			<div ref={ref} className={className} {...props}>
				{control}
			</div>
		);
	}
);

FieldControl.displayName = 'FieldControl';
