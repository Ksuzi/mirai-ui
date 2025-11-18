import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { useSelectContext } from '../Select.context';
import { selectDropdownVariants } from '../Select.variants';

import type { SelectContentProps } from './SelectContent.types';
import type { SelectContextValue } from '../Select.types';

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
	({ className, children, ...props }, ref) => {
		const context: SelectContextValue = useSelectContext();
		const { isOpen, size, contentRef } = context;

		React.useImperativeHandle(ref, () => contentRef.current!);

		if (!isOpen) {
			return null;
		}

		return (
			<div
				ref={contentRef}
				className={mergeClassNames(selectDropdownVariants({ size }), className)}
				role="listbox"
				{...props}
			>
				{children}
			</div>
		);
	}
);

SelectContent.displayName = 'SelectContent';
