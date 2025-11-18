import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { FieldContext } from './Field.context';
import { fieldRootVariants } from './Field.variants';
import { FieldControl } from './FieldControl';
import { FieldLabel } from './FieldLabel';
import { FieldMessage } from './FieldMessage';

import type { FieldRootProps, FieldContextValue } from './Field.types';

const FieldRoot = React.forwardRef<HTMLDivElement, FieldRootProps>(
	(
		{
			id,
			size = 'md',
			state = 'default',
			required = false,
			disabled = false,
			error,
			helperText,
			fullWidth,
			className,
			children,
			...props
		},
		ref
	) => {
		const generatedId = React.useId();
		const fieldId = id ?? `field-${generatedId}`;
		const effectiveState = error ? 'error' : state;

		const contextValue: FieldContextValue = React.useMemo(
			() => ({
				id: fieldId,
				size,
				state: effectiveState,
				required,
				disabled,
				error,
				helperText,
			}),
			[fieldId, size, effectiveState, required, disabled, error, helperText]
		);

		return (
			<FieldContext.Provider value={contextValue}>
				<div ref={ref} className={mergeClassNames(fieldRootVariants({ fullWidth }), className)} {...props}>
					{children}
				</div>
			</FieldContext.Provider>
		);
	}
);

FieldRoot.displayName = 'FieldRoot';

export const Field = Object.assign(FieldRoot, {
	Label: FieldLabel,
	Control: FieldControl,
	Message: FieldMessage,
});
