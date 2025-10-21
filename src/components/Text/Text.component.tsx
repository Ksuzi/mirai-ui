import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { textVariants } from './Text.variants';

import type { TextProps } from './Text.types';

export const Text = React.forwardRef<
	HTMLParagraphElement | HTMLSpanElement | HTMLDivElement | HTMLLabelElement,
	TextProps
>(({ textStyle, fontWeight, truncate, lineClamp, colorPalette, className, children, as = 'p', ...props }, ref) => {
	const Component = as as React.ElementType;

	return (
		<Component
			ref={ref}
			className={mergeClassNames(textVariants({ textStyle, fontWeight, truncate, lineClamp, colorPalette }), className)}
			{...props}
		>
			{children}
		</Component>
	);
});

Text.displayName = 'Text';
