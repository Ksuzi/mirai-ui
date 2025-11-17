import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import type { SelectIconProps } from './SelectIcon.types';

export const SelectIcon: React.FC<SelectIconProps> = React.memo(({ isOpen }) => (
	<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
		<svg
			className={mergeClassNames('w-5 h-5 text-muted-400 transition-transform duration-200', isOpen && 'rotate-180')}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
		>
			<path
				fillRule="evenodd"
				d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
				clipRule="evenodd"
			/>
		</svg>
	</div>
));

SelectIcon.displayName = 'SelectIcon';
