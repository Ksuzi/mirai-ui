import React from 'react';

import { Field } from '../Field';

import { Checkbox } from './Checkbox.component';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Checkbox> = {
	title: 'Components/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Accessible checkbox component with multiple sizes and color schemes. Use with Field component for labels and form integration.',
			},
		},
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'xl'],
		},
		colorScheme: {
			control: 'select',
			options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'muted'],
		},
		disabled: {
			control: 'boolean',
		},
		checked: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story: 'Basic checkbox with default styling. Use the controls below to experiment with different props.',
			},
		},
	},
};

export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Checkbox size="sm" defaultChecked />
			<Checkbox size="md" defaultChecked />
			<Checkbox size="lg" defaultChecked />
			<Checkbox size="xl" defaultChecked />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Available checkbox sizes from small to extra large. Medium is the default.',
			},
		},
	},
};

export const ColorSchemes: Story = {
	render: () => (
		<div className="flex flex-wrap gap-4">
			<Checkbox colorScheme="primary" defaultChecked />
			<Checkbox colorScheme="secondary" defaultChecked />
			<Checkbox colorScheme="success" defaultChecked />
			<Checkbox colorScheme="warning" defaultChecked />
			<Checkbox colorScheme="error" defaultChecked />
			<Checkbox colorScheme="info" defaultChecked />
			<Checkbox colorScheme="muted" defaultChecked />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Multiple color schemes to match different semantic contexts in your application.',
			},
		},
	},
};

export const Checked: Story = {
	args: {
		defaultChecked: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Checkbox in checked state. Use `checked` for controlled or `defaultChecked` for uncontrolled.',
			},
		},
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Disabled checkboxes cannot be toggled and are visually dimmed.',
			},
		},
	},
};

export const DisabledChecked: Story = {
	args: {
		disabled: true,
		defaultChecked: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Disabled checkbox in checked state, useful for displaying read-only selections.',
			},
		},
	},
};

export const WithFieldComponent: Story = {
	render: () => (
		<div className="space-y-6 max-w-md">
			<h3 className="text-lg font-medium">Using Checkbox with Field Component</h3>
			<p className="text-sm text-muted-600 mb-4">
				For forms with labels and helper text, use the Field component as shown below.
			</p>

			<Field>
				<div className="flex items-center gap-2">
					<Field.Control>
						<Checkbox />
					</Field.Control>
					<Field.Label className="mb-0">I agree to the terms and conditions</Field.Label>
				</div>
			</Field>

			<Field required error="You must accept the privacy policy">
				<div className="flex items-center gap-2">
					<Field.Control>
						<Checkbox />
					</Field.Control>
					<Field.Label className="mb-0">I accept the privacy policy</Field.Label>
				</div>
				<Field.Message />
			</Field>

			<Field helperText="You will receive weekly updates via email">
				<div className="flex items-center gap-2">
					<Field.Control>
						<Checkbox defaultChecked />
					</Field.Control>
					<Field.Label className="mb-0">Subscribe to newsletter</Field.Label>
				</div>
				<Field.Message />
			</Field>

			<Field disabled>
				<div className="flex items-center gap-2">
					<Field.Control>
						<Checkbox />
					</Field.Control>
					<Field.Label className="mb-0">Receive SMS notifications (coming soon)</Field.Label>
				</div>
			</Field>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Recommended pattern for using Checkbox in forms with Field for labels, validation, and accessibility.',
			},
		},
	},
};

export const ControlledCheckbox: Story = {
	render: function ControlledExample() {
		const [checked, setChecked] = React.useState(false);

		return (
			<div className="space-y-4">
				<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
				<p className="text-sm">
					Checkbox is <strong>{checked ? 'checked' : 'unchecked'}</strong>
				</p>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Example of a controlled checkbox with state management using React hooks.',
			},
		},
	},
};
