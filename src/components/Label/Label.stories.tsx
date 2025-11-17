import { Input } from '../Input';

import { Label } from './Label.component';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Label> = {
	title: 'Components/Label',
	component: Label,
	tags: ['autodocs'],
	args: {
		children: 'Label',
		size: 'md',
		required: false,
		disabled: false,
	},
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
	args: {
		htmlFor: 'input-example',
		children: 'Email Address',
	},
	render: (args) => (
		<div>
			<Label {...args} />
			<Input id="input-example" placeholder="Enter your email" />
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="flex flex-col gap-6">
			<div>
				<Label size="sm" htmlFor="input-sm">
					Small Label
				</Label>
				<Input id="input-sm" size="sm" placeholder="Small input" />
			</div>
			<div>
				<Label size="md" htmlFor="input-md">
					Medium Label (default)
				</Label>
				<Input id="input-md" size="md" placeholder="Medium input" />
			</div>
			<div>
				<Label size="lg" htmlFor="input-lg">
					Large Label
				</Label>
				<Input id="input-lg" size="lg" placeholder="Large input" />
			</div>
			<div>
				<Label size="xl" htmlFor="input-xl">
					Extra Large Label
				</Label>
				<Input id="input-xl" size="xl" placeholder="Extra large input" />
			</div>
		</div>
	),
};

export const Required: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div>
				<Label htmlFor="required-input" required>
					Required Field
				</Label>
				<Input id="required-input" placeholder="This field is required" required />
			</div>
			<div>
				<Label htmlFor="optional-input">Optional Field</Label>
				<Input id="optional-input" placeholder="This field is optional" />
			</div>
		</div>
	),
};

export const States: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div>
				<Label htmlFor="normal-input">Normal Label</Label>
				<Input id="normal-input" placeholder="Normal input" />
			</div>
			<div>
				<Label htmlFor="disabled-input" disabled>
					Disabled Label
				</Label>
				<Input id="disabled-input" placeholder="Disabled input" disabled />
			</div>
		</div>
	),
};

export const Standalone: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<Label>This label wraps content</Label>
			<Label required>Required label without input</Label>
			<Label size="lg">Large standalone label</Label>
		</div>
	),
};

export const RealWorld: Story = {
	render: () => (
		<form className="max-w-md space-y-4">
			<div>
				<Label htmlFor="fullname" required>
					Full Name
				</Label>
				<Input id="fullname" placeholder="John Doe" required />
			</div>

			<div>
				<Label htmlFor="email" required>
					Email Address
				</Label>
				<Input id="email" type="email" placeholder="john@example.com" required />
			</div>

			<div>
				<Label htmlFor="phone">Phone Number</Label>
				<Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
			</div>

			<div>
				<Label htmlFor="company">Company</Label>
				<Input id="company" placeholder="Acme Inc." />
			</div>

			<button
				type="submit"
				className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-500 transition-colors"
			>
				Submit
			</button>
		</form>
	),
};

export const CustomStyling: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div>
				<Label htmlFor="custom-1" className="text-primary-600 font-bold">
					Custom Color Label
				</Label>
				<Input id="custom-1" placeholder="Input with custom label" />
			</div>
			<div>
				<Label htmlFor="custom-2" className="uppercase tracking-wide">
					Uppercase Label
				</Label>
				<Input id="custom-2" placeholder="Input with uppercase label" />
			</div>
		</div>
	),
};
