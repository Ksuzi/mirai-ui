import type { HeadingVariantProps } from './Heading.variants';

export type HeadingProps = {
	/**
	 * The underlying element to render.
	 * @default 'h2'
	 */
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & React.HTMLAttributes<HTMLHeadingElement> &
	HeadingVariantProps;
