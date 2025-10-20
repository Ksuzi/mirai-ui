import type { TextVariantProps } from './Text.variants';

export interface TextProps extends React.HTMLAttributes<HTMLElement>, TextVariantProps {
	/**
	 * The underlying element to render.
	 * @default 'p'
	 */
	as?: 'p' | 'span' | 'div' | 'label';
}
