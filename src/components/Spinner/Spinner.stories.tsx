import { Spinner } from './Spinner.component';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Spinner> = {
	title: 'Components/Spinner',
	component: Spinner,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Loading spinner component with multiple sizes and color schemes. Use to indicate loading or processing states.',
			},
		},
	},
	args: {
		size: 'md',
		colorScheme: 'primary',
	},
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg', 'xl'],
		},
		colorScheme: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'muted', 'base'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Basic spinner with default size and color. Use the controls below to experiment with different props.',
			},
		},
	},
};

export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-6">
			<div className="text-center">
				<Spinner size="sm" />
				<p className="text-xs text-muted-600 mt-2">Small</p>
			</div>
			<div className="text-center">
				<Spinner size="md" />
				<p className="text-xs text-muted-600 mt-2">Medium</p>
			</div>
			<div className="text-center">
				<Spinner size="lg" />
				<p className="text-xs text-muted-600 mt-2">Large</p>
			</div>
			<div className="text-center">
				<Spinner size="xl" />
				<p className="text-xs text-muted-600 mt-2">Extra Large</p>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Available spinner sizes from small to extra large. Choose based on context: sm for inline use, md for buttons, lg/xl for full-page loading.',
			},
		},
	},
};

export const ColorSchemes: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-4">
			<Spinner colorScheme="primary" />
			<Spinner colorScheme="secondary" />
			<Spinner colorScheme="success" />
			<Spinner colorScheme="warning" />
			<Spinner colorScheme="error" />
			<Spinner colorScheme="info" />
			<Spinner colorScheme="muted" />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Multiple color schemes to match different contexts and states in your application.',
			},
		},
	},
};

export const InheritColor: Story = {
	render: () => (
		<div className="flex items-center gap-4 text-primary-600">
			<Spinner />
			<span>Spinner inherits text color from parent</span>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'When no colorScheme is specified, spinner inherits the text color from its parent element.',
			},
		},
	},
};
