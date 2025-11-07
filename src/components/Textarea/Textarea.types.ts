import type { TextareaVariantProps } from './Textarea.variants';

export type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> &
	TextareaVariantProps & {
		/**
		 * Aria label for accessibility
		 */
		['aria-label']?: string;
	};
