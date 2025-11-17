import { Text } from '../Text';

import { Heading } from './Heading.component';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Heading> = {
	title: 'Components/Heading',
	component: Heading,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Semantic heading component with multiple levels and color schemes. Use for page titles, section headings, and content hierarchy.',
			},
		},
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		},
		colorScheme: {
			control: 'select',
			options: ['default', 'muted', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'accent'],
		},
		as: {
			control: 'select',
			options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
	args: {
		children: 'The quick brown fox jumps over the lazy dog',
	},
	parameters: {
		docs: {
			description: {
				story: 'Basic heading with default styling. Use the controls below to experiment with different variants.',
			},
		},
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="space-y-4">
			<Heading variant="display">Display Heading</Heading>
			<Heading variant="h1">H1 Heading</Heading>
			<Heading variant="h2">H2 Heading</Heading>
			<Heading variant="h3">H3 Heading</Heading>
			<Heading variant="h4">H4 Heading</Heading>
			<Heading variant="h5">H5 Heading</Heading>
			<Heading variant="h6">H6 Heading</Heading>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'All heading levels from display (largest) to h6 (smallest). Use display for hero sections, h1 for page titles.',
			},
		},
	},
};

export const ColorSchemes: Story = {
	render: () => (
		<div className="space-y-4">
			<Heading colorScheme="default">Default Heading</Heading>
			<Heading colorScheme="muted">Muted Heading</Heading>
			<Heading colorScheme="primary">Primary Heading</Heading>
			<Heading colorScheme="secondary">Secondary Heading</Heading>
			<Heading colorScheme="success">Success Heading</Heading>
			<Heading colorScheme="warning">Warning Heading</Heading>
			<Heading colorScheme="error">Error Heading</Heading>
			<Heading colorScheme="info">Info Heading</Heading>
			<Heading colorScheme="accent">Accent Heading</Heading>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Semantic color schemes for different contexts and emphasis.',
			},
		},
	},
};

export const SemanticElements: Story = {
	render: () => (
		<div className="space-y-4">
			<Heading as="h1" variant="h1">
				Level 1 Heading
			</Heading>
			<Heading as="h2" variant="h2">
				Level 2 Heading
			</Heading>
			<Heading as="h3" variant="h3">
				Level 3 Heading
			</Heading>
			<Heading as="h4" variant="h4">
				Level 4 Heading
			</Heading>
			<Heading as="h5" variant="h5">
				Level 5 Heading
			</Heading>
			<Heading as="h6" variant="h6">
				Level 6 Heading
			</Heading>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Proper semantic HTML with matching visual styles. Use the `as` prop to control the HTML element.',
			},
		},
	},
};

export const WithCustomStyles: Story = {
	args: {
		children: 'Custom Styled Heading',
		variant: 'h2',
		colorScheme: 'accent',
		className: 'underline',
	},
	parameters: {
		docs: {
			description: {
				story: 'Extend headings with custom classes for additional styling.',
			},
		},
	},
};

export const TypographyHierarchy: Story = {
	render: () => (
		<div className="space-y-8 max-w-3xl">
			<div>
				<Heading variant="display">Building Design Systems</Heading>
				<Text variant="body-lg" colorScheme="muted" className="mt-3">
					A comprehensive guide to creating consistent and scalable component libraries
				</Text>
			</div>

			<div>
				<Heading variant="h2">Getting Started</Heading>
				<Text className="mt-2">
					Design systems help teams build consistent, accessible user interfaces at scale. They provide a shared
					language between designers and developers.
				</Text>
			</div>

			<div>
				<Heading variant="h3">Installation</Heading>
				<Text className="mt-2">Install the package using your preferred package manager:</Text>
				<Text variant="code" className="mt-2">
					npm install @mirai-ui/react
				</Text>
			</div>

			<div>
				<Heading variant="h4">Basic Configuration</Heading>
				<Text className="mt-2">Configure your design tokens in the configuration file.</Text>
				<Text variant="helper-text" colorScheme="muted" className="mt-1">
					Note: Configuration is optional for default setup
				</Text>
			</div>

			<div>
				<Heading variant="h5">Advanced Options</Heading>
				<Text variant="body-sm" className="mt-1">
					Customize theme tokens, color schemes, and component variants to match your brand.
				</Text>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Example showing proper typographic hierarchy in a document structure using Heading and Text components together.',
			},
		},
	},
};
