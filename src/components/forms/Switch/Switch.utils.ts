import type { SpinnerVariantProps } from '@mirai-ui/components/feedback/Spinner/Spinner.variants';

import type { SwitchVariantProps } from './Switch.variants';

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
