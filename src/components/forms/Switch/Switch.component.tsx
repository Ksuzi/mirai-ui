import React from 'react';

import { mergeClassNames } from '@mirai-ui/utils';

import { Spinner } from '../../feedback/Spinner';

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
				id,
				'aria-label': ariaLabel,
				'aria-labelledby': ariaLabelledBy,
				'aria-describedby': ariaDescribedBy,
				...props
			},
			ref
		) => {
			const generatedId = React.useId();
			const inputId = id ?? `switch-${generatedId}`;

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
					className={mergeClassNames(
						'inline-flex items-center gap-2',
						isDisabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
					)}
					htmlFor={inputId}
				>
					<input
						ref={ref}
						id={inputId}
						type="checkbox"
						className="sr-only"
						role="switch"
						checked={isChecked}
						disabled={isDisabled}
						onChange={handleChange}
						aria-busy={loading || undefined}
						aria-checked={isChecked}
						aria-disabled={isDisabled}
						aria-label={ariaLabel}
						aria-labelledby={ariaLabel ? undefined : ariaLabelledBy}
						aria-describedby={ariaDescribedBy}
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
						aria-hidden="true"
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
