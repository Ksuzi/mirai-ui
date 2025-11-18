import React from 'react';

import type { SelectContextValue } from './Select.types';

export const SelectContext = React.createContext<SelectContextValue | null>(null);

export const useSelectContext = (): SelectContextValue => {
	const context = React.useContext(SelectContext);

	if (!context) {
		throw new Error('Select compound components must be used within Select');
	}

	return context;
};
