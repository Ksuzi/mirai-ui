import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { Text } from '../Text';

import { fieldRootVariants } from './Field.variants';
import { FieldContext, useFieldContext } from './Fireld.context';

import type {
	FieldRootProps,
	FieldLabelProps,
	FieldControlProps,
	FieldMessageProps,
	FieldContextValue,
} from './Field.types';

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
				className={mergeClassNames(required && "after:content-['*'] after:ml-0.5 after:text-error-500", className)}
				{...props}
			>
				{children}
			</Text>
		);
	}
);

export const FieldControl = React.forwardRef<HTMLDivElement, FieldControlProps>(
	({ className, children, ...props }, ref) => {
		const { id, size, state, required, disabled, error, helperText } = useFieldContext();

		const messageId = `${id}-message`;
		const displayMessage = error ?? helperText;
		const ariaDescribedBy = displayMessage ? messageId : undefined;

		const control = React.cloneElement(
			children,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			{
				id,
				size,
				state,
				required,
				disabled,
				'aria-invalid': state === 'error',
				'aria-describedby': ariaDescribedBy,
				'aria-required': required ? true : undefined,
			} as any
		);

		return (
			<div ref={ref} className={className} {...props}>
				{control}
			</div>
		);
	}
);

export const FieldMessage = React.forwardRef<HTMLDivElement, FieldMessageProps>(
	({ className, children, ...props }, ref) => {
		const { id, size, state, error, helperText } = useFieldContext();

		const displayMessage = children ?? error ?? helperText;
		const messageId = `${id}-message`;

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

export const Field = Object.assign(FieldRoot, {
	Label: FieldLabel,
	Control: FieldControl,
	Message: FieldMessage,
});

FieldRoot.displayName = 'FieldRoot';
FieldLabel.displayName = 'FieldLabel';
FieldControl.displayName = 'FieldControl';
FieldMessage.displayName = 'FieldMessage';
