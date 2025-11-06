import { Spinner } from './Spinner.component';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Spinner> = {
	title: 'Components/Spinner',
	component: Spinner,
	tags: ['autodocs'],
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
			options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'muted', ' base'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div>
			<div className="flex items-center gap-4">
				<Spinner size="sm" />
				<Spinner size="md" />
				<Spinner size="lg" />
				<Spinner size="xl" />
			</div>
			<div className="flex items-center gap-4">
				<Spinner size="sm" colorScheme="primary" />
				<Spinner size="md" colorScheme="primary" />
				<Spinner size="lg" colorScheme="primary" />
				<Spinner size="xl" colorScheme="primary" />
			</div>
			<div className="flex items-center gap-4">
				<Spinner size="sm" colorScheme="secondary" />
				<Spinner size="md" colorScheme="secondary" />
				<Spinner size="lg" colorScheme="secondary" />
				<Spinner size="xl" colorScheme="secondary" />
			</div>
			<div className="flex items-center gap-4">
				<Spinner size="sm" colorScheme="success" />
				<Spinner size="md" colorScheme="success" />
				<Spinner size="lg" colorScheme="success" />
				<Spinner size="xl" colorScheme="success" />
			</div>
			<div className="flex items-center gap-4">
				<Spinner size="sm" colorScheme="warning" />
				<Spinner size="md" colorScheme="warning" />
				<Spinner size="lg" colorScheme="warning" />
				<Spinner size="xl" colorScheme="warning" />
			</div>
			<div className="flex items-center gap-4">
				<Spinner size="sm" colorScheme="error" />
				<Spinner size="md" colorScheme="error" />
				<Spinner size="lg" colorScheme="error" />
				<Spinner size="xl" colorScheme="error" />
			</div>
			<div className="flex items-center gap-4">
				<Spinner size="sm" colorScheme="info" />
				<Spinner size="md" colorScheme="info" />
				<Spinner size="lg" colorScheme="info" />
				<Spinner size="xl" colorScheme="info" />
			</div>
			<div className="flex items-center gap-4">
				<Spinner size="sm" colorScheme="muted" />
				<Spinner size="md" colorScheme="muted" />
				<Spinner size="lg" colorScheme="muted" />
				<Spinner size="xl" colorScheme="muted" />
			</div>
		</div>
	),
};

export const ColorSchemes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Spinner colorScheme="primary" />
			<Spinner colorScheme="secondary" />
			<Spinner colorScheme="success" />
			<Spinner colorScheme="warning" />
			<Spinner colorScheme="error" />
			<Spinner colorScheme="info" />
			<Spinner colorScheme="muted" />
		</div>
	),
};

export const InheritColor: Story = {
	render: () => (
		<div className="flex items-center gap-4 text-primary-600">
			<Spinner />
			<span>Spinner inherits text color from parent</span>
		</div>
	),
};
