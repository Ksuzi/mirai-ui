import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { Text } from '../../Text';
import { useFieldContext } from '../Field.context';
import { getRequiredIndicatorClass } from '../Field.utils';

import type { FieldLabelProps } from './FieldLabel.types';

export const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
	({ className, children, ...props }, ref) => {
		const { id, size, required } = useFieldContext();

		return (
			<Text
				ref={ref}
				as="label"
				htmlFor={id}
				variant="label"
				size={size}
				className={mergeClassNames(getRequiredIndicatorClass(required), className)}
				{...props}
			>
				{children}
			</Text>
		);
	}
);

FieldLabel.displayName = 'FieldLabel';
