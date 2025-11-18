import type { TextVariantProps } from './Text.variants';

type TextElement = 'p' | 'span' | 'div' | 'label';

type ElementProps<T extends TextElement> = T extends 'label'
	? React.LabelHTMLAttributes<HTMLLabelElement>
	: T extends 'span'
		? React.HTMLAttributes<HTMLSpanElement>
		: T extends 'div'
			? React.HTMLAttributes<HTMLDivElement>
			: React.HTMLAttributes<HTMLParagraphElement>;

type TextPropsWithElement<T extends TextElement> = {
	/**
	 * The underlying element to render.
	 * @default 'p'
	 */
	as?: T;
} & TextVariantProps &
	Omit<ElementProps<T>, 'as'>;

export type TextProps =
	| TextPropsWithElement<'p'>
	| TextPropsWithElement<'span'>
	| TextPropsWithElement<'div'>
	| TextPropsWithElement<'label'>;
