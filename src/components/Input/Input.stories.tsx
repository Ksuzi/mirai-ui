import { Field } from '../Field';

import { Input } from './Input.component';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Input> = {
	title: 'Components/Input',
	component: Input,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'outlined', 'filled', 'borderless', 'underlined'],
		},
		state: {
			control: 'select',
			options: ['default', 'error', 'success', 'warning'],
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'xl'],
		},
		fullWidth: {
			control: 'boolean',
		},
		disabled: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
	args: {
		placeholder: 'Enter your text...',
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="space-y-4">
			<Input variant="default" placeholder="Default variant" />
			<Input variant="outlined" placeholder="Outlined variant" />
			<Input variant="filled" placeholder="Filled variant" />
			<Input variant="borderless" placeholder="Borderless variant" />
			<Input variant="underlined" placeholder="Underlined variant" />
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="space-y-4">
			<Input size="sm" placeholder="Small" />
			<Input size="md" placeholder="Medium" />
			<Input size="lg" placeholder="Large" />
			<Input size="xl" placeholder="Extra Large" />
		</div>
	),
};

export const States: Story = {
	render: () => (
		<div className="space-y-4">
			<Input state="default" placeholder="Default state" />
			<Input state="error" placeholder="Error state" />
			<Input state="success" placeholder="Success state" />
			<Input state="warning" placeholder="Warning state" />
		</div>
	),
};

export const WithIcons: Story = {
	render: () => (
		<div className="space-y-4">
			<Input leftIcon={<span>@</span>} placeholder="Email" />
			<Input rightIcon={<span>✓</span>} placeholder="Username" />
			<Input leftIcon={<span>🔍</span>} rightIcon={<span>⌘K</span>} placeholder="Search" />
		</div>
	),
};

export const Disabled: Story = {
	args: {
		disabled: true,
		placeholder: 'Disabled input',
		value: 'Disabled value',
	},
};

export const FullWidthToggle: Story = {
	render: () => (
		<div className="space-y-4">
			<div>
				<h3 className="text-lg font-medium mb-2">Full Width (default)</h3>
				<Input placeholder="Full width input" fullWidth />
			</div>
			<div>
				<h3 className="text-lg font-medium mb-2">Auto Width</h3>
				<Input placeholder="Auto width input" fullWidth={false} />
			</div>
		</div>
	),
};

export const WithFieldComponent: Story = {
	render: () => (
		<div className="space-y-6 max-w-md">
			<h3 className="text-lg font-medium">Using Input with Field Component</h3>
			<p className="text-sm text-muted-600 mb-4">
				For forms with labels and helper text, use the Field component as shown below.
			</p>

			<Field required>
				<Field.Label>Full Name</Field.Label>
				<Field.Control>
					<Input placeholder="John Doe" />
				</Field.Control>
				<Field.Message />
			</Field>

			<Field required error="Please enter a valid email address">
				<Field.Label>Email</Field.Label>
				<Field.Control>
					<Input type="email" placeholder="john@example.com" leftIcon={<span>@</span>} />
				</Field.Control>
				<Field.Message />
			</Field>

			<Field helperText="Choose a strong password" size="lg">
				<Field.Label>Password</Field.Label>
				<Field.Control>
					<Input type="password" placeholder="Enter password" />
				</Field.Control>
				<Field.Message />
			</Field>

			<Field disabled helperText="This feature is coming soon">
				<Field.Label>Phone Number</Field.Label>
				<Field.Control>
					<Input placeholder="+1 (555) 000-0000" />
				</Field.Control>
				<Field.Message />
			</Field>
		</div>
	),
};
