import type { TextVariantProps } from './Text.variants';

type BaseTextProps = {
	/**
	 * The underlying element to render.
	 * @default 'p'
	 */
	as?: 'p' | 'span' | 'div' | 'label';
} & TextVariantProps;

export type TextProps = BaseTextProps &
	(
		| React.HTMLAttributes<HTMLParagraphElement>
		| React.HTMLAttributes<HTMLSpanElement>
		| React.HTMLAttributes<HTMLDivElement>
		| React.LabelHTMLAttributes<HTMLLabelElement>
	);
