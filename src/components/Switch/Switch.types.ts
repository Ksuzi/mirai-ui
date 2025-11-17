import type { SwitchVariantProps } from './Switch.variants';

export type SwitchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'children'> &
	SwitchVariantProps & {
		/**
		 * Whether the switch is in a loading state
		 * When true, the switch is disabled and shows a spinner
		 */
		loading?: boolean;

		/**
		 * Controlled checked state
		 */
		checked?: boolean;

		/**
		 * Uncontrolled default checked state
		 */
		defaultChecked?: boolean;
	};
