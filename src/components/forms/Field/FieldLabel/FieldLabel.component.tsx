import React from 'react';

import { Text } from '@mirai-ui/components/typography/Text';
import { mergeClassNames } from '@mirai-ui/utils';

import { useFieldContext } from '../Field.context';
import { fieldUtils } from '../Field.utils';

import type { FieldLabelProps } from './FieldLabel.types';

export const FieldLabel = React.memo(
	React.forwardRef<HTMLLabelElement, FieldLabelProps>(({ className, children, ...props }, ref) => {
		const { id, size, required } = useFieldContext();

		return (
			<Text
				ref={ref}
				as="label"
				htmlFor={id}
				variant="label"
				size={size}
				className={mergeClassNames(fieldUtils.getRequiredIndicatorClass(required), className)}
				{...props}
			>
				{children}
			</Text>
		);
	})
);

FieldLabel.displayName = 'FieldLabel';
