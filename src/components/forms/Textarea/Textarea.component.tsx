import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { textareaVariants } from './Textarea.variants';

import type { TextareaProps } from './Textarea.types';

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{ variant = 'default', state = 'default', size = 'md', resize = 'vertical', fullWidth = true, className, ...props },
		ref
	) => {
		return (
			<textarea
				ref={ref}
				className={mergeClassNames(
					textareaVariants({
						variant,
						state,
						size,
						resize,
						fullWidth,
					}),
					className
				)}
				{...props}
			/>
		);
	}
);

Textarea.displayName = 'Textarea';
