import type { SwitchVariantProps } from './Switch.variants';
import type { SpinnerVariantProps } from '../Spinner/Spinner.variants';

const getSpinnerSize = (size: SwitchVariantProps['size']): SpinnerVariantProps['size'] => {
	if (size === 'xl') return 'lg';
	if (size === 'lg') return 'md';
	return 'sm';
};

export const switchUtils = {
	/**
	 * Maps Switch size to appropriate Spinner size
	 */
	getSpinnerSize,
} as const;
