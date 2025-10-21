import type { TextVariantProps } from './Text.variants';

export type TextProps = {
	/**
	 * The underlying element to render.
	 * @default 'p'
	 */
	as?: 'p' | 'span' | 'div' | 'label';
} & React.HTMLAttributes<HTMLElement> &
	TextVariantProps;
