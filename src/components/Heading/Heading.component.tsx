import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { headingVariants } from './Heading.variants';

import type { HeadingProps } from './Heading.types';

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
	({ variant, colorScheme, className, children, as = 'h2', ...props }, ref) => {
		const Component = as;
		const variantClasses = headingVariants({ variant, colorScheme });

		return (
			<Component ref={ref} className={mergeClassNames(variantClasses, className)} {...props}>
				{children}
			</Component>
		);
	}
);

Heading.displayName = 'Heading';
