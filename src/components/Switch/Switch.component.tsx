import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { Spinner } from '../Spinner';

import { switchUtils } from './Switch.utils';
import { switchThumbVariants, switchTrackVariants } from './Switch.variants';

import type { SwitchProps } from './Switch.types';

export const Switch = React.memo(
	React.forwardRef<HTMLInputElement, SwitchProps>(
		(
			{
				size = 'md',
				colorScheme = 'primary',
				loading = false,
				className,
				checked,
				defaultChecked,
				disabled,
				onChange,
				...props
			},
			ref
		) => {
			const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
			const isControlled = checked !== undefined;
			const isChecked = isControlled ? checked : internalChecked;

			const handleChange = React.useCallback(
				(e: React.ChangeEvent<HTMLInputElement>) => {
					if (!isControlled) {
						setInternalChecked(e.target.checked);
					}
					onChange?.(e);
				},
				[isControlled, onChange]
			);

			const isDisabled = disabled ?? loading;
			const spinnerSize = switchUtils.getSpinnerSize(size);

			return (
				<label
					className={mergeClassNames('inline-flex items-center', isDisabled ? 'cursor-not-allowed' : 'cursor-pointer')}
					role="switch"
					aria-checked={isChecked}
					aria-disabled={isDisabled}
				>
					<input
						ref={ref}
						type="checkbox"
						className="sr-only"
						checked={isChecked}
						disabled={isDisabled}
						onChange={handleChange}
						aria-busy={loading}
						{...props}
					/>
					<span
						className={mergeClassNames(
							switchTrackVariants({
								size,
								colorScheme,
								checked: isChecked,
								loading,
								disabled: isDisabled,
							}),
							className
						)}
					>
						<span className={switchThumbVariants({ size, checked: isChecked })}>
							{loading && <Spinner size={spinnerSize} />}
						</span>
					</span>
				</label>
			);
		}
	)
);

Switch.displayName = 'Switch';
