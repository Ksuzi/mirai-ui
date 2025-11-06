import React from 'react';

import type { FieldContextValue } from './Field.types';

export const FieldContext = React.createContext<FieldContextValue | null>(null);

export const useFieldContext = (): FieldContextValue => {
	const context = React.useContext(FieldContext);

	if (!context) {
		throw new Error('Field compound components must be used within Field.Root');
	}

	return context;
};
