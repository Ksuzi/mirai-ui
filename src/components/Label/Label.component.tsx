import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { labelVariants } from './Label.variants';

import type { LabelProps } from './Label.types';

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
	({ htmlFor, required, size, disabled, className, children, ...props }, ref) => {
		return (
			<label
				ref={ref}
				htmlFor={htmlFor}
				className={mergeClassNames(labelVariants({ size, disabled }), className)}
				{...props}
			>
				{children}
				{required && (
					<span className="text-error-600 ml-0.5" aria-label="required">
						*
					</span>
				)}
			</label>
		);
	}
);

Label.displayName = 'Label';
