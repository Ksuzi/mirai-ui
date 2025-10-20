import type { HeadingVariantProps } from './Heading.variants';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, HeadingVariantProps {
	/**
	 * The underlying element to render.
	 * @default 'h2'
	 */
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
