import { Input } from '../Input/Input.component';

import { Field } from './Field.component';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Field> = {
	title: 'Components/Forms/Field',
	component: Field,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Form field wrapper component that provides labels, validation messages, and helper text. Use with Input, Checkbox, and other form controls.',
			},
		},
	},
	args: {
		size: 'md',
		state: 'default',
		required: false,
		disabled: false,
	},
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg', 'xl'],
		},
		state: {
			control: { type: 'select' },
			options: ['default', 'error', 'success', 'warning'],
		},
		required: {
			control: { type: 'boolean' },
		},
		disabled: {
			control: { type: 'boolean' },
		},
	},
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
	render: (args) => (
		<Field {...args}>
			<Field.Label>Email address</Field.Label>
			<Field.Control>
				<Input placeholder="Enter your email" />
			</Field.Control>
			<Field.Message />
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Basic field with label and input. Use the controls below to experiment with different states and options.',
			},
		},
	},
};

export const WithHelperText: Story = {
	render: () => (
		<Field helperText="We'll never share your email with anyone else.">
			<Field.Label>Email address</Field.Label>
			<Field.Control>
				<Input placeholder="Enter your email" />
			</Field.Control>
			<Field.Message />
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story: 'Field with helper text to provide additional guidance or context.',
			},
		},
	},
};

export const WithError: Story = {
	render: () => (
		<Field error="Email is required">
			<Field.Label>Email address</Field.Label>
			<Field.Control>
				<Input placeholder="Enter your email" />
			</Field.Control>
			<Field.Message />
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story: 'Field with error message for validation feedback. Automatically sets error state on the input.',
			},
		},
	},
};

export const Required: Story = {
	render: () => (
		<Field required helperText="This field is required">
			<Field.Label>Full name</Field.Label>
			<Field.Control>
				<Input placeholder="Enter your full name" />
			</Field.Control>
			<Field.Message />
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Required field with asterisk indicator. The required prop adds visual indication and accessibility attributes.',
			},
		},
	},
};

export const Disabled: Story = {
	render: () => (
		<Field disabled helperText="This field is currently disabled">
			<Field.Label>Username</Field.Label>
			<Field.Control>
				<Input placeholder="Enter username" />
			</Field.Control>
			<Field.Message />
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story: 'Disabled field with dimmed appearance. Automatically disables all child form controls.',
			},
		},
	},
};

export const Sizes: Story = {
	render: () => (
		<div className="space-y-6">
			<Field size="sm" helperText="Small size field">
				<Field.Label>Small Field</Field.Label>
				<Field.Control>
					<Input placeholder="Small input" />
				</Field.Control>
				<Field.Message />
			</Field>

			<Field size="md" helperText="Medium size field">
				<Field.Label>Medium Field</Field.Label>
				<Field.Control>
					<Input placeholder="Medium input" />
				</Field.Control>
				<Field.Message />
			</Field>

			<Field size="lg" helperText="Large size field">
				<Field.Label>Large Field</Field.Label>
				<Field.Control>
					<Input placeholder="Large input" />
				</Field.Control>
				<Field.Message />
			</Field>

			<Field size="xl" helperText="Extra large size field">
				<Field.Label>Extra Large Field</Field.Label>
				<Field.Control>
					<Input placeholder="Extra large input" />
				</Field.Control>
				<Field.Message />
			</Field>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Available field sizes. The size prop controls label, input, and message sizing consistently.',
			},
		},
	},
};

export const States: Story = {
	render: () => (
		<div className="space-y-6">
			<Field state="default" helperText="Default state">
				<Field.Label>Default State</Field.Label>
				<Field.Control>
					<Input placeholder="Default input" />
				</Field.Control>
				<Field.Message />
			</Field>

			<Field state="error" error="This field has an error">
				<Field.Label>Error State</Field.Label>
				<Field.Control>
					<Input placeholder="Error input" />
				</Field.Control>
				<Field.Message />
			</Field>

			<Field state="success" helperText="This looks good!">
				<Field.Label>Success State</Field.Label>
				<Field.Control>
					<Input placeholder="Success input" />
				</Field.Control>
				<Field.Message />
			</Field>

			<Field state="warning" helperText="Please double-check this field">
				<Field.Label>Warning State</Field.Label>
				<Field.Control>
					<Input placeholder="Warning input" />
				</Field.Control>
				<Field.Message />
			</Field>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Validation states for user feedback. States automatically apply appropriate styling to labels, inputs, and messages.',
			},
		},
	},
};

export const WithIcons: Story = {
	render: () => (
		<div className="space-y-6">
			<Field helperText="Enter your email address">
				<Field.Label>Email</Field.Label>
				<Field.Control>
					<Input leftIcon={<span>@</span>} placeholder="you@example.com" />
				</Field.Control>
				<Field.Message />
			</Field>

			<Field error="Invalid URL format">
				<Field.Label>Website</Field.Label>
				<Field.Control>
					<Input leftIcon={<span>🌐</span>} placeholder="https://example.com" />
				</Field.Control>
				<Field.Message />
			</Field>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Fields work seamlessly with inputs that have icons.',
			},
		},
	},
};

export const CustomMessage: Story = {
	render: () => (
		<Field>
			<Field.Label>Password</Field.Label>
			<Field.Control>
				<Input type="password" placeholder="Enter password" />
			</Field.Control>
			<Field.Message>
				<span className="text-xs text-muted-600">
					Password must be at least 8 characters long and contain uppercase, lowercase, and numbers.
				</span>
			</Field.Message>
		</Field>
	),
	parameters: {
		docs: {
			description: {
				story: 'Customize the message area with custom content for complex validation rules.',
			},
		},
	},
};

export const FormExample: Story = {
	render: () => (
		<form className="space-y-6 max-w-md">
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

			<Field helperText="Choose a strong password">
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
		</form>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Complete form example showing Field in action with various states. This is the recommended pattern for building accessible forms.',
			},
		},
	},
};
