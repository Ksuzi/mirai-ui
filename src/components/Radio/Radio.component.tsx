import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { useRadioContext } from './Radio.context';
import { radioVariants } from './Radio.variants';
import { RadioGroup } from './RadioGroup.component';
import { RadioIcon } from './RadioIcon';

import type { RadioProps } from './Radio.types';

const RadioComponent = React.forwardRef<HTMLInputElement, RadioProps>(
	({ size, colorScheme, className, value, checked, defaultChecked, onChange, disabled, children, ...props }, ref) => {
		const context = useRadioContext();

		const isInGroup = context !== undefined;

		const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);

		const effectiveSize = size ?? context?.size ?? 'md';
		const effectiveColorScheme = colorScheme ?? context?.colorScheme ?? 'primary';
		const effectiveDisabled = disabled ?? context?.disabled ?? false;
		const effectiveName = isInGroup ? context.name : props.name;

		const isChecked = isInGroup ? context.value === value : (checked ?? internalChecked);

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (isInGroup) {
				context.onChange?.(value);
			} else {
				if (checked === undefined) {
					setInternalChecked(e.target.checked);
				}
				onChange?.(e);
			}
		};

		return (
			<label
				className={mergeClassNames(
					'inline-flex items-center gap-2',
					effectiveDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
				)}
			>
				<div className="relative inline-flex">
					<input
						ref={ref}
						type="radio"
						name={effectiveName}
						value={value}
						checked={isChecked}
						disabled={effectiveDisabled}
						onChange={handleChange}
						className={mergeClassNames(
							radioVariants({ size: effectiveSize, colorScheme: effectiveColorScheme }),
							className
						)}
						aria-checked={isChecked}
						aria-disabled={effectiveDisabled}
						{...props}
					/>
					<RadioIcon size={effectiveSize} checked={isChecked} />
				</div>
				{children && (
					<span
						className={mergeClassNames(
							'typo-body',
							effectiveDisabled ? 'text-foreground-muted opacity-50' : 'text-foreground'
						)}
					>
						{children}
					</span>
				)}
			</label>
		);
	}
);

RadioComponent.displayName = 'Radio';

export const Radio = Object.assign(RadioComponent, {
	Group: RadioGroup,
});
