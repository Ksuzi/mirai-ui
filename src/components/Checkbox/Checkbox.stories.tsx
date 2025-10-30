import React from 'react';

import { Button } from '@mirai-ui/components';

import { Checkbox } from './Checkbox.component';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Checkbox> = {
	title: 'Components/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg', 'xl'],
		},
		colorScheme: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'muted'],
		},
		disabled: {
			control: { type: 'boolean' },
		},
		checked: {
			control: { type: 'boolean' },
		},
	},
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	args: {
		label: 'Default checkbox',
	},
};

export const WithoutLabel: Story = {
	args: {},
};

export const Checked: Story = {
	args: {
		label: 'Checked checkbox',
		defaultChecked: true,
	},
};

export const Disabled: Story = {
	args: {
		label: 'Disabled checkbox',
		disabled: true,
	},
};

export const DisabledChecked: Story = {
	args: {
		label: 'Disabled checked checkbox',
		disabled: true,
		defaultChecked: true,
	},
};

export const AllSizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Checkbox size="sm" label="Small" defaultChecked />
			<Checkbox size="md" label="Medium" defaultChecked />
			<Checkbox size="lg" label="Large" defaultChecked />
			<Checkbox size="xl" label="Extra Large" defaultChecked />
		</div>
	),
};

export const ColorVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-4">
				<Checkbox colorScheme="primary" label="Primary" defaultChecked />
				<Checkbox colorScheme="secondary" label="Secondary" defaultChecked />
				<Checkbox colorScheme="success" label="Success" defaultChecked />
				<Checkbox colorScheme="warning" label="Warning" defaultChecked />
				<Checkbox colorScheme="error" label="Error" defaultChecked />
				<Checkbox colorScheme="info" label="Info" defaultChecked />
				<Checkbox colorScheme="muted" label="Muted" defaultChecked />
			</div>
			<div className="flex items-center gap-4">
				<Checkbox colorScheme="primary" label="Primary Unchecked" />
				<Checkbox colorScheme="secondary" label="Secondary Unchecked" />
				<Checkbox colorScheme="success" label="Success Unchecked" />
				<Checkbox colorScheme="warning" label="Warning Unchecked" />
				<Checkbox colorScheme="error" label="Error Unchecked" />
				<Checkbox colorScheme="info" label="Info Unchecked" />
				<Checkbox colorScheme="muted" label="Muted Unchecked" />
			</div>
		</div>
	),
};

const InteractiveStory = () => {
	const [checked, setChecked] = React.useState(false);

	return (
		<div className="flex flex-col w-2xs gap-4">
			<Checkbox
				label={`Checkbox is ${checked ? 'checked' : 'unchecked'}`}
				checked={checked}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked)}
			/>
			<Button onClick={() => setChecked((prev) => !prev)}>Toggle programmatically</Button>
		</div>
	);
};

export const Interactive: Story = {
	render: () => <InteractiveStory />,
};

export const WithCustomStyling: Story = {
	render: () => (
		<div className="flex flex-col gap-6">
			<div>
				<h3 className="text-lg font-semibold mb-2">Custom Wrapper Styling</h3>
				<Checkbox
					label="Checkbox with custom wrapper"
					colorScheme="primary"
					wrapperClassName="p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
				/>
			</div>
			<div>
				<h3 className="text-lg font-semibold mb-2">Block Layout</h3>
				<Checkbox label="Block checkbox with margin" colorScheme="secondary" wrapperClassName="flex-col items-start" />
			</div>
		</div>
	),
};
