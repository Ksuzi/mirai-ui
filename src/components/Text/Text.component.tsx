import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { textVariants } from './Text.variants';

import type { TextProps } from './Text.types';

export const Text = React.forwardRef<
	HTMLParagraphElement | HTMLSpanElement | HTMLDivElement | HTMLLabelElement,
	TextProps
>(({ variant, colorScheme, fontWeight, truncate, lineClamp, align, className, children, as = 'p', ...props }, ref) => {
	const Component = as as React.ElementType;
	const variantClasses = textVariants({
		variant,
		colorScheme,
		fontWeight,
		truncate,
		lineClamp,
		align,
	});

	return (
		<Component ref={ref} className={mergeClassNames(variantClasses, className)} {...props}>
			{children}
		</Component>
	);
});

Text.displayName = 'Text';
