// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button.component';

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
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
		<div className="flex flex-wrap gap-4">
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="destructive">Destructive</Button>
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
		<div className="flex gap-4">
			<Button variant="outline" size="sm">
				Small Outline
			</Button>
			<Button variant="ghost" loading>
				Ghost Loading
			</Button>
		</div>
	),
};
