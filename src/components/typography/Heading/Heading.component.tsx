import React from 'react';

import { useDevWarning } from '@mirai-ui/hooks';
import { mergeClassNames } from '@mirai-ui/utils';

import { headingUtils } from './Heading.utils';
import { headingVariants } from './Heading.variants';

import type { HeadingProps } from './Heading.types';

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
	({ variant, colorScheme, className, children, as = 'h2', ...props }, ref) => {
		useDevWarning(
			!headingUtils.validateContent(children),
			'Heading: Headings should not be empty. Empty headings are not accessible to screen readers.'
		);

		useDevWarning(
			!headingUtils.validateSemanticMatch(as, variant),
			`Heading: Semantic level (as="${as}") doesn't match visual variant (variant="${variant}"). ` +
				'This can confuse screen readers. Consider matching them for better accessibility.'
		);

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
