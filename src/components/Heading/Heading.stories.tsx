import { Heading } from './Heading.component';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Heading> = {
	title: 'Components/Heading',
	component: Heading,
	tags: ['autodocs'],
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
};

export const WithCustomStyles: Story = {
	args: {
		children: 'Custom Styled Heading',
		variant: 'h2',
		colorScheme: 'accent',
		className: 'underline',
	},
};
