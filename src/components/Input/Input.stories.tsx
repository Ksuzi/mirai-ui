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
		required: {
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
			<Input variant="default" placeholder="Default" label="Default" />
			<Input variant="outlined" placeholder="Outlined" label="Outlined" />
			<Input variant="filled" placeholder="Filled" label="Filled" />
			<Input variant="borderless" placeholder="Borderless" label="Borderless" />
			<Input variant="underlined" placeholder="Underlined" label="Underlined" />
		</div>
	),
};

export const WithLabel: Story = {
	args: {
		label: 'Email Address',
		placeholder: 'Enter your email...',
		type: 'email',
	},
};

export const WithHelperText: Story = {
	args: {
		label: 'Password',
		placeholder: 'Enter your password...',
		type: 'password',
		helperText: 'Password must be at least 8 characters long',
	},
};

export const WithError: Story = {
	args: {
		label: 'Email Address',
		placeholder: 'Enter your email...',
		type: 'email',
		error: 'Please enter a valid email address',
		value: 'invalid-email',
	},
};

export const Required: Story = {
	args: {
		label: 'Full Name',
		placeholder: 'Enter your full name...',
		required: true,
		helperText: 'This field is required',
	},
};

export const WithIcons: Story = {
	render: () => (
		<div className="space-y-4">
			<Input
				label="Search"
				placeholder="Search for something..."
				leftIcon={
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				}
			/>
			<Input
				label="Amount"
				placeholder="0.00"
				type="number"
				rightIcon={<span className="text-gray-500 text-sm">USD</span>}
			/>
		</div>
	),
};

export const AllStates: Story = {
	render: () => (
		<div className="space-y-4">
			<Input label="Default State" placeholder="Enter text..." helperText="This is a helper text" />
			<Input label="Error State" placeholder="Enter text..." error="This field has an error" />
			<Input label="Success State" placeholder="Enter text..." success="Looks good!" />
			<Input label="Warning State" placeholder="Enter text..." warning="Please double check" />
		</div>
	),
};

export const CombinedVariantsAndStates: Story = {
	render: () => (
		<div className="space-y-6">
			<div>
				<h3 className="text-sm font-medium mb-3 text-muted-700">Default Variant</h3>
				<div className="space-y-3">
					<Input variant="default" placeholder="Default" helperText="Normal state" />
					<Input variant="default" placeholder="Error" error="Error message" />
					<Input variant="default" placeholder="Success" success="Success message" />
				</div>
			</div>

			<div>
				<h3 className="text-sm font-medium mb-3 text-muted-700">Outlined Variant</h3>
				<div className="space-y-3">
					<Input variant="outlined" placeholder="Default" helperText="Normal state" />
					<Input variant="outlined" placeholder="Error" error="Error message" />
					<Input variant="outlined" placeholder="Success" success="Success message" />
				</div>
			</div>

			<div>
				<h3 className="text-sm font-medium mb-3 text-muted-700">Filled Variant</h3>
				<div className="space-y-3">
					<Input variant="filled" placeholder="Default" helperText="Normal state" />
					<Input variant="filled" placeholder="Error" error="Error message" />
					<Input variant="filled" placeholder="Success" success="Success message" />
				</div>
			</div>
		</div>
	),
};

export const AllSizes: Story = {
	render: () => (
		<div className="space-y-4">
			<Input size="sm" placeholder="Small input" label="Small (sm)" />
			<Input size="md" placeholder="Medium input" label="Medium (md)" />
			<Input size="lg" placeholder="Large input" label="Large (lg)" />
			<Input size="xl" placeholder="Extra large input" label="Extra Large (xl)" />
		</div>
	),
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Input',
		placeholder: 'This input is disabled',
		disabled: true,
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
