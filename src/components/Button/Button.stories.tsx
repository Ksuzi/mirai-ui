// src/components/Button/Button.stories.tsx
import { Button } from './Button.component';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['solid', 'outline', 'ghost', 'link'],
		},
		colorScheme: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'muted'],
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg', 'xl'],
		},
		fullWidth: {
			control: { type: 'boolean' },
		},
		loading: {
			control: { type: 'boolean' },
		},
	},
};
export default meta;

type Story = StoryObj<typeof Button>;

export const AllVariants: Story = {
	render: () => (
		<div className="space-y-6">
			<div>
				<h3 className="text-sm font-medium mb-3 text-muted-700">Solid Buttons</h3>
				<div className="flex flex-wrap gap-3">
					<Button variant="solid" colorScheme="primary">
						Primary
					</Button>
					<Button variant="solid" colorScheme="secondary">
						Secondary
					</Button>
					<Button variant="solid" colorScheme="success">
						Success
					</Button>
					<Button variant="solid" colorScheme="warning">
						Warning
					</Button>
					<Button variant="solid" colorScheme="error">
						Error
					</Button>
					<Button variant="solid" colorScheme="info">
						Info
					</Button>
					<Button variant="solid" colorScheme="muted">
						Muted
					</Button>
				</div>
			</div>

			<div>
				<h3 className="text-sm font-medium mb-3 text-muted-700">Outline Buttons</h3>
				<div className="flex flex-wrap gap-3">
					<Button variant="outline" colorScheme="primary">
						Primary
					</Button>
					<Button variant="outline" colorScheme="success">
						Success
					</Button>
					<Button variant="outline" colorScheme="error">
						Error
					</Button>
					<Button variant="outline" colorScheme="info">
						Info
					</Button>
				</div>
			</div>

			<div>
				<h3 className="text-sm font-medium mb-3 text-muted-700">Ghost Buttons</h3>
				<div className="flex flex-wrap gap-3">
					<Button variant="ghost" colorScheme="primary">
						Primary
					</Button>
					<Button variant="ghost" colorScheme="success">
						Success
					</Button>
					<Button variant="ghost" colorScheme="error">
						Error
					</Button>
					<Button variant="ghost" colorScheme="muted">
						Muted
					</Button>
				</div>
			</div>

			<div>
				<h3 className="text-sm font-medium mb-3 text-muted-700">Link Buttons</h3>
				<div className="flex flex-wrap gap-3">
					<Button variant="link" colorScheme="primary">
						Primary Link
					</Button>
					<Button variant="link" colorScheme="error">
						Delete Link
					</Button>
					<Button variant="link" colorScheme="muted">
						Muted Link
					</Button>
				</div>
			</div>
		</div>
	),
};

export const AllSizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
			<Button size="xl">Extra Large</Button>
		</div>
	),
};

export const WithIcons: Story = {
	render: () => (
		<div className="flex gap-4">
			<Button leftIcon="📁">Download</Button>
			<Button rightIcon="→">Next</Button>
			<Button leftIcon="❤️" rightIcon="🚀">
				Love & Launch
			</Button>
		</div>
	),
};

export const LoadingStates: Story = {
	render: () => (
		<div className="flex gap-4">
			<Button loading>Loading</Button>
			<Button loading variant="outline">
				Processing
			</Button>
			<Button loading variant="ghost">
				Saving
			</Button>
		</div>
	),
};

export const FullWidth: Story = {
	render: () => (
		<div className="w-full max-w-md">
			<Button fullWidth>Full Width Button</Button>
		</div>
	),
};

export const CompoundVariants: Story = {
	render: () => (
		<div className="space-y-4">
			<div className="flex flex-wrap gap-3">
				<Button variant="outline" colorScheme="success" size="sm">
					Small Success Outline
				</Button>
				<Button variant="ghost" colorScheme="error" loading>
					Error Ghost Loading
				</Button>
				<Button variant="link" colorScheme="warning">
					Warning Link
				</Button>
			</div>
		</div>
	),
};

export const RealWorldExamples: Story = {
	render: () => (
		<div className="space-y-8">
			{/* Form Actions */}
			<div>
				<h3 className="text-sm font-medium mb-3 text-muted-700">Form Actions</h3>
				<div className="flex gap-2">
					<Button variant="solid" colorScheme="primary">
						Save Changes
					</Button>
					<Button variant="ghost" colorScheme="muted">
						Cancel
					</Button>
					<Button variant="outline" colorScheme="error">
						Delete
					</Button>
				</div>
			</div>

			{/* Alert Actions */}
			<div>
				<h3 className="text-sm font-medium mb-3 text-muted-700">Alert Actions</h3>
				<div className="space-y-3">
					<div className="bg-success-50 border border-success-200 p-3 rounded flex items-center justify-between">
						<span className="text-success-700">Success! Changes saved.</span>
						<Button variant="ghost" colorScheme="success" size="sm">
							View Details
						</Button>
					</div>
					<div className="bg-error-50 border border-error-200 p-3 rounded flex items-center justify-between">
						<span className="text-error-700">Error occurred!</span>
						<Button variant="outline" colorScheme="error" size="sm">
							Retry
						</Button>
					</div>
					<div className="bg-info-50 border border-info-200 p-3 rounded flex items-center justify-between">
						<span className="text-info-700">New features available</span>
						<Button variant="link" colorScheme="info" size="sm">
							Learn More →
						</Button>
					</div>
				</div>
			</div>
		</div>
	),
};
