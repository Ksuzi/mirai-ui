import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { headingVariants } from './Heading.variants';

import type { HeadingProps } from './Heading.types';

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
	({ variant, colorScheme, className, children, as = 'h2', ...props }, ref) => {
		const Component = as;
		const variantClasses = headingVariants({ variant, colorScheme });

		// Warn in development about accessibility issues
		React.useEffect(() => {
			if (process.env.NODE_ENV === 'production') {
				return;
			}

			const isEmpty = !children || (typeof children === 'string' && children.trim() === '');
			if (isEmpty) {
				console.warn(
					'Heading: Headings should not be empty. Empty headings are not accessible to screen reader users.'
				);
			}

			// Warn if semantic level (as) doesn't match visual variant
			// This can confuse screen reader users when visual hierarchy doesn't match semantic hierarchy
			const headingLevels = { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 };
			const semanticLevel = headingLevels[as];
			const visualLevel = variant && variant !== 'display' ? headingLevels[variant] : undefined;

			if (visualLevel && semanticLevel !== visualLevel) {
				console.warn(
					`Heading: Semantic level (as="${as}") doesn't match visual variant (variant="${variant}"). ` +
						`This can confuse screen reader users. Consider matching the semantic level to the visual style for better accessibility.`
				);
			}
		}, [children, as, variant]);

		return (
			<Component ref={ref} className={mergeClassNames(variantClasses, className)} {...props}>
				{children}
			</Component>
		);
	}
);

Heading.displayName = 'Heading';
