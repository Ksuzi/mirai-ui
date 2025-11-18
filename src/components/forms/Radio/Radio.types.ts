import type { RadioVariantProps } from './Radio.variants';
import type { RadioGroupVariantProps } from './RadioGroup.variants';

export type RadioColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted';

export type RadioProps = {
	/** Radio value (required) */
	value: string;
	/** Semantic color scheme */
	colorScheme?: RadioColorScheme;
	/** Controlled checked state (for standalone use) */
	checked?: boolean;
	/** Default checked state for uncontrolled mode (for standalone use) */
	defaultChecked?: boolean;
	/** Change handler (for standalone use) */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	/** Radio label */
	children?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange' | 'defaultChecked'> &
	Omit<RadioVariantProps, 'colorScheme'>;

export type RadioOption = {
	/** Option value */
	value: string;
	/** Option label */
	label: React.ReactNode;
	/** Disable this specific option */
	disabled?: boolean;
};

export type RadioGroupProps = {
	/** Group name for radio buttons (required) */
	name: string;
	/** Controlled value */
	value?: string;
	/** Default value for uncontrolled mode */
	defaultValue?: string;
	/** Change handler receives selected value */
	onChange?: (value: string) => void;
	/** Size for all radios in group */
	size?: RadioVariantProps['size'];
	/** Color scheme for all radios in group */
	colorScheme?: RadioColorScheme;
	/** Disable all radios in group */
	disabled?: boolean;
	/** Radio options (alternative to children) */
	options?: RadioOption[];
	/** Radio buttons (alternative to options) */
	children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> &
	RadioGroupVariantProps;
