import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { radioIconDotVariants, radioIconVariants } from './RadioIcon.variants';

import type { RadioIconProps } from './RadioIcon.types';

export const RadioIcon: React.FC<RadioIconProps> = ({ size = 'md', checked }) => {
	return (
		<span className={mergeClassNames(radioIconVariants({ size }))}>
			<span className={mergeClassNames(radioIconDotVariants({ size, checked }))} />
		</span>
	);
};

RadioIcon.displayName = 'RadioIcon';
