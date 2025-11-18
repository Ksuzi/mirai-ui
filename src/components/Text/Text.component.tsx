import React from 'react';

import { useDevWarning } from '@mirai-ui/hooks';
import { mergeClassNames } from '@mirai-ui/utils';

import { textVariants } from './Text.variants';

import type { TextProps } from './Text.types';

export const Text = React.forwardRef<
	HTMLParagraphElement | HTMLSpanElement | HTMLDivElement | HTMLLabelElement,
	TextProps
>(
	(
		{ variant, colorScheme, size, fontWeight, truncate, lineClamp, align, className, children, as = 'p', ...props },
		ref
	) => {
		useDevWarning(
			Boolean(truncate && lineClamp !== undefined),
			'Text: `truncate` and `lineClamp` should not be used together. `lineClamp` will take precedence.'
		);

		const Component = as as React.ElementType;
		const variantClasses = textVariants({
			variant,
			colorScheme,
			size,
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
	}
);

Text.displayName = 'Text';
