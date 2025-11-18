import React from 'react';

export const headingUtils = {
	/**
	 * Validates heading content is not empty
	 * @param children - React children to validate
	 * @returns true if content is valid (not empty), false otherwise
	 */
	validateContent: (children: React.ReactNode): boolean => {
		if (typeof children === 'string') {
			return children.trim().length > 0;
		}
		if (typeof children === 'number') {
			return true;
		}
		if (Array.isArray(children)) {
			return (children as React.ReactNode[]).some((child) => headingUtils.validateContent(child));
		}
		if (React.isValidElement(children)) {
			const element = children as React.ReactElement<{ children?: React.ReactNode }>;
			return headingUtils.validateContent(element.props.children);
		}
		return false;
	},

	/**
	 * Checks if semantic level matches visual variant
	 * @param as - The semantic HTML element (h1-h6)
	 * @param variant - The visual variant
	 * @returns true if they match or variant is 'display', false otherwise
	 */
	validateSemanticMatch: (as: string, variant?: string | null): boolean => {
		if (!variant || variant === 'display') {
			return true; // Display variant has no semantic level
		}
		return as === variant;
	},
};
