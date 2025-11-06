import React from 'react';

import { Field } from '../Field';

import { Checkbox } from './Checkbox.component';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Checkbox> = {
	title: 'Components/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
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
};

export const Checked: Story = {
	args: {
		defaultChecked: true,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const DisabledChecked: Story = {
	args: {
		disabled: true,
		defaultChecked: true,
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
};
