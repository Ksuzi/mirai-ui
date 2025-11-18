import React from 'react';

import type { RadioColorScheme } from './Radio.types';
import type { RadioVariantProps } from './Radio.variants';

export type RadioContextValue = {
	name: string;
	value?: string;
	onChange?: (value: string) => void;
	size?: RadioVariantProps['size'];
	colorScheme?: RadioColorScheme;
	disabled?: boolean;
};

export const RadioContext = React.createContext<RadioContextValue | undefined>(undefined);

export const useRadioContext = (): RadioContextValue | undefined => {
	return React.useContext(RadioContext);
};
