import React from 'react';

import { Text } from '@mirai-ui/components/typography/Text';

import { useFieldContext } from '../Field.context';
import { fieldUtils } from '../Field.utils';

import type { FieldMessageProps } from './FieldMessage.types';

export const FieldMessage = React.memo(
	React.forwardRef<HTMLDivElement, FieldMessageProps>(({ className, children, ...props }, ref) => {
		const { id, size, state, error, helperText } = useFieldContext();

		const displayMessage = fieldUtils.getDisplayMessage(error, helperText, children);
		const messageId = fieldUtils.getFieldMessageId(id);

		if (!displayMessage) {
			return null;
		}

		const isError = state === 'error';
		const role = isError ? 'alert' : 'status';
		const ariaLive = isError ? undefined : 'polite';

		return (
			<div ref={ref} className={className} {...props}>
				<Text id={messageId} variant="helper-text" size={size} colorScheme={state} role={role} aria-live={ariaLive}>
					{displayMessage}
				</Text>
			</div>
		);
	})
);

FieldMessage.displayName = 'FieldMessage';
