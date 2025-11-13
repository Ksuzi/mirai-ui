import React from 'react';

import { Text } from '../../Text';
import { useFieldContext } from '../Field.context';
import { getDisplayMessage, getFieldMessageId } from '../Field.utils';

import type { FieldMessageProps } from './FieldMessage.types';

export const FieldMessage = React.forwardRef<HTMLDivElement, FieldMessageProps>(
	({ className, children, ...props }, ref) => {
		const { id, size, state, error, helperText } = useFieldContext();

		const displayMessage = getDisplayMessage(error, helperText, children);
		const messageId = getFieldMessageId(id);

		if (!displayMessage) {
			return null;
		}

		return (
			<div ref={ref} className={className} {...props}>
				<Text
					id={messageId}
					variant="helper-text"
					size={size}
					colorScheme={state}
					role={state === 'error' ? 'alert' : undefined}
					aria-live={state === 'error' ? 'polite' : undefined}
				>
					{displayMessage}
				</Text>
			</div>
		);
	}
);

FieldMessage.displayName = 'FieldMessage';
