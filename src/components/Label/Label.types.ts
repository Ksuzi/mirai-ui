import type { LabelVariantProps } from './Label.variants';

export type LabelProps = {
	/** The ID of the form element this label is associated with */
	htmlFor?: string;
	/** Whether the associated field is required */
	required?: boolean;
	/** Label content */
	children: React.ReactNode;
} & Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> &
	LabelVariantProps;
