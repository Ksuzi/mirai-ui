import React from 'react';
import { mergeClassNames } from '@mirai-ui/utils';
import { headingVariants } from './Heading.variants';
import type { HeadingProps } from './Heading.types';

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
	({ size, colorPalette, className, children, as = 'h2', ...props }, ref) => {
		const Component = as;

		return (
			<Component ref={ref} className={mergeClassNames(headingVariants({ size, colorPalette }), className)} {...props}>
				{children}
			</Component>
		);
	}
);

Heading.displayName = 'Heading';
