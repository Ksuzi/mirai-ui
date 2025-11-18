import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import type { InputIconProps } from './InputIcon.types';

export const InputIcon = React.forwardRef<HTMLDivElement, InputIconProps>(
	({ position, children, className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={mergeClassNames(
					'absolute inset-y-0 flex items-center pointer-events-none',
					position === 'left' ? 'left-0 pl-3' : 'right-0 pr-3',
					className
				)}
				aria-hidden="true"
				role="presentation"
				data-slot={`input-${position}-icon`}
				{...props}
			>
				<span className="text-muted-400" aria-hidden="true">
					{children}
				</span>
			</div>
		);
	}
);

InputIcon.displayName = 'InputIcon';
