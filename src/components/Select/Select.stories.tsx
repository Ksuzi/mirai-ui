import { Field } from '../Field';

import { Select } from './Select.component';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Select> = {
	title: 'Components/Select',
	component: Select,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Flexible select dropdown component with custom dropdown menu, keyboard navigation, and multiple visual styles. Use with Field component for labels and validation messages.',
			},
		},
		layout: 'padded',
	},
	decorators: [
		(Story) => (
			<div style={{ minHeight: '300px' }}>
				<Story />
			</div>
		),
	],
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
type Story = StoryObj<typeof Select>;

const basicOptions = [
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2' },
	{ value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
	args: {
		placeholder: 'Select an option...',
		options: basicOptions,
	},
	parameters: {
		docs: {
			description: {
				story: 'Basic select with default styling. Click to open the custom dropdown menu.',
			},
		},
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="space-y-4" style={{ minHeight: '500px' }}>
			<Select variant="default" placeholder="Default variant" options={basicOptions} />
			<Select variant="outlined" placeholder="Outlined variant" options={basicOptions} />
			<Select variant="filled" placeholder="Filled variant" options={basicOptions} />
			<Select variant="borderless" placeholder="Borderless variant" options={basicOptions} />
			<Select variant="underlined" placeholder="Underlined variant" options={basicOptions} />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Five visual styles: default (standard), outlined (transparent), filled (subtle shadow), borderless (minimal), and underlined (Material Design style).',
			},
		},
	},
};

export const Sizes: Story = {
	render: () => (
		<div className="space-y-4">
			<Select size="sm" placeholder="Small" options={basicOptions} />
			<Select size="md" placeholder="Medium" options={basicOptions} />
			<Select size="lg" placeholder="Large" options={basicOptions} />
			<Select size="xl" placeholder="Extra Large" options={basicOptions} />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Available select sizes from small to extra large. Medium is the default.',
			},
		},
	},
};

export const States: Story = {
	render: () => (
		<div className="space-y-4">
			<Select state="default" placeholder="Default state" options={basicOptions} />
			<Select state="error" placeholder="Error state" options={basicOptions} />
			<Select state="success" placeholder="Success state" options={basicOptions} />
			<Select state="warning" placeholder="Warning state" options={basicOptions} />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Visual states for validation feedback. Typically controlled by the Field component.',
			},
		},
	},
};

const countryOptions = [
	{ value: 'us', label: 'United States' },
	{ value: 'uk', label: 'United Kingdom' },
	{ value: 'ca', label: 'Canada' },
	{ value: 'au', label: 'Australia' },
];

const departmentOptions = [
	{ value: 'engineering', label: 'Engineering' },
	{ value: 'design', label: 'Design' },
	{ value: 'marketing', label: 'Marketing' },
	{ value: 'sales', label: 'Sales' },
];

export const WithIcon: Story = {
	render: () => (
		<div className="space-y-4">
			<Select leftIcon={<span>🌍</span>} placeholder="Select country" options={countryOptions} />
			<Select leftIcon={<span>💼</span>} placeholder="Select department" options={departmentOptions} />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Add a left icon to provide visual context for the select field.',
			},
		},
	},
};

const optionsWithDisabled = [
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2 (Disabled)', disabled: true },
	{ value: 'option3', label: 'Option 3' },
];

const manyOptions = [
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2' },
	{ value: 'option3', label: 'Option 3' },
	{ value: 'option4', label: 'Option 4' },
	{ value: 'option5', label: 'Option 5' },
	{ value: 'option6', label: 'Option 6' },
	{ value: 'option7', label: 'Option 7' },
	{ value: 'option8', label: 'Option 8' },
	{ value: 'option9', label: 'Option 9' },
	{ value: 'option10', label: 'Option 10' },
];

export const WithScrolling: Story = {
	render: () => (
		<div>
			<Select placeholder="Select an option (scroll to see all)" options={manyOptions} />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"When the dropdown has many options, it becomes scrollable with a maximum height of 15rem (240px). This ensures the dropdown doesn't grow too large and maintains usability.",
			},
		},
	},
};

export const Disabled: Story = {
	render: () => (
		<div className="space-y-4">
			<div>
				<h3 className="text-sm font-medium mb-2">Disabled Select</h3>
				<Select disabled placeholder="Disabled select" options={basicOptions} />
			</div>
			<div>
				<h3 className="text-sm font-medium mb-2">Disabled Options</h3>
				<Select placeholder="Select an option" options={optionsWithDisabled} />
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Disabled selects cannot be interacted with. Individual options can also be disabled.',
			},
		},
	},
};

export const FullWidthToggle: Story = {
	render: () => (
		<div className="space-y-4">
			<div>
				<h3 className="text-lg font-medium mb-2">Full Width (default)</h3>
				<Select placeholder="Full width select" fullWidth options={basicOptions} />
			</div>
			<div>
				<h3 className="text-lg font-medium mb-2">Auto Width</h3>
				<Select placeholder="Auto width select" fullWidth={false} options={basicOptions} />
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Selects are full width by default but can be set to auto width.',
			},
		},
	},
};

const contactOptions = [
	{ value: 'email', label: 'Email' },
	{ value: 'phone', label: 'Phone' },
	{ value: 'sms', label: 'SMS' },
];

const planOptions = [
	{ value: 'basic', label: 'Basic' },
	{ value: 'pro', label: 'Pro' },
	{ value: 'enterprise', label: 'Enterprise' },
];

export const WithFieldComponent: Story = {
	render: () => (
		<div className="space-y-6 max-w-md">
			<h3 className="text-lg font-medium">Using Select with Field Component</h3>
			<p className="text-sm text-muted-600 mb-4">
				For forms with labels and helper text, use the Field component as shown below.
			</p>

			<Field required>
				<Field.Label>Country</Field.Label>
				<Field.Control>
					<Select placeholder="Select your country" options={countryOptions} />
				</Field.Control>
				<Field.Message />
			</Field>

			<Field required error="Please select a department">
				<Field.Label>Department</Field.Label>
				<Field.Control>
					<Select leftIcon={<span>💼</span>} placeholder="Select department" options={departmentOptions} />
				</Field.Control>
				<Field.Message />
			</Field>

			<Field helperText="Choose your preferred contact method" size="lg">
				<Field.Label>Contact Preference</Field.Label>
				<Field.Control>
					<Select placeholder="Select method" options={contactOptions} />
				</Field.Control>
				<Field.Message />
			</Field>

			<Field disabled helperText="This option is currently unavailable">
				<Field.Label>Premium Plan</Field.Label>
				<Field.Control>
					<Select placeholder="Select plan" options={planOptions} />
				</Field.Control>
				<Field.Message />
			</Field>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Complete form example showing Select used with Field for labels, validation, and accessibility. This is the recommended pattern for forms.',
			},
		},
	},
};

const ageRangeOptions = [
	{ value: '18-24', label: '18-24' },
	{ value: '25-34', label: '25-34' },
	{ value: '35-44', label: '35-44' },
	{ value: '45-54', label: '45-54' },
	{ value: '55+', label: '55+' },
];

const interestOptions = [
	{ value: 'technology', label: 'Technology' },
	{ value: 'design', label: 'Design' },
	{ value: 'business', label: 'Business' },
	{ value: 'marketing', label: 'Marketing' },
	{ value: 'other', label: 'Other' },
];

export const RealWorld: Story = {
	render: () => (
		<div className="space-y-6 max-w-md">
			<h3 className="text-lg font-medium mb-4">User Registration Form</h3>

			<Field required>
				<Field.Label>Age Range</Field.Label>
				<Field.Control>
					<Select placeholder="Select your age range" options={ageRangeOptions} />
				</Field.Control>
				<Field.Message />
			</Field>

			<Field required helperText="This helps us provide relevant content">
				<Field.Label>Interests</Field.Label>
				<Field.Control>
					<Select leftIcon={<span>⭐</span>} placeholder="Choose your primary interest" options={interestOptions} />
				</Field.Control>
				<Field.Message />
			</Field>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Real-world example of using Select components in a registration form.',
			},
		},
	},
};

export const CompositionBasic: Story = {
	render: () => (
		<div className="space-y-4">
			<div>
				<h3 className="text-sm font-medium mb-2">Props-based (Simple)</h3>
				<Select placeholder="Select an option" options={basicOptions} />
			</div>
			<div>
				<h3 className="text-sm font-medium mb-2">Composition-based (Advanced)</h3>
				<Select>
					<Select.Trigger placeholder="Select an option" />
					<Select.Content>
						<Select.Option value="option1">Option 1</Select.Option>
						<Select.Option value="option2">Option 2</Select.Option>
						<Select.Option value="option3">Option 3</Select.Option>
					</Select.Content>
				</Select>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Select supports both props-based (simple) and composition-based (advanced) patterns. Use props-based for simple dropdowns, composition for custom option content.',
			},
		},
	},
};

export const CompositionCustomContent: Story = {
	render: () => (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium mb-2">Custom Option Content</h3>
				<Select>
					<Select.Trigger placeholder="Select a user" leftIcon={<span>👤</span>} />
					<Select.Content>
						<Select.Option value="john">
							<div className="flex items-center gap-2">
								<span className="text-2xl">👨</span>
								<div>
									<div className="font-medium">John Doe</div>
									<div className="text-xs text-muted-500">john@example.com</div>
								</div>
							</div>
						</Select.Option>
						<Select.Option value="jane">
							<div className="flex items-center gap-2">
								<span className="text-2xl">👩</span>
								<div>
									<div className="font-medium">Jane Smith</div>
									<div className="text-xs text-muted-500">jane@example.com</div>
								</div>
							</div>
						</Select.Option>
						<Select.Option value="bob" disabled>
							<div className="flex items-center gap-2">
								<span className="text-2xl">👨‍💼</span>
								<div>
									<div className="font-medium">Bob Johnson</div>
									<div className="text-xs text-muted-500">bob@example.com (Unavailable)</div>
								</div>
							</div>
						</Select.Option>
					</Select.Content>
				</Select>
			</div>

			<div>
				<h3 className="text-lg font-medium mb-2">With Icons and Badges</h3>
				<Select>
					<Select.Trigger placeholder="Select a priority" />
					<Select.Content>
						<Select.Option value="high">
							<div className="flex items-center justify-between w-full">
								<span className="flex items-center gap-2">
									<span className="text-xl">🔴</span>
									<span>High Priority</span>
								</span>
								<span className="px-2 py-0.5 bg-error-100 text-error-700 text-xs rounded">Urgent</span>
							</div>
						</Select.Option>
						<Select.Option value="medium">
							<div className="flex items-center justify-between w-full">
								<span className="flex items-center gap-2">
									<span className="text-xl">🟡</span>
									<span>Medium Priority</span>
								</span>
								<span className="px-2 py-0.5 bg-warning-100 text-warning-700 text-xs rounded">Normal</span>
							</div>
						</Select.Option>
						<Select.Option value="low">
							<div className="flex items-center justify-between w-full">
								<span className="flex items-center gap-2">
									<span className="text-xl">🟢</span>
									<span>Low Priority</span>
								</span>
								<span className="px-2 py-0.5 bg-success-100 text-success-700 text-xs rounded">Later</span>
							</div>
						</Select.Option>
					</Select.Content>
				</Select>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'With composition pattern, you can create rich option content with avatars, badges, icons, multi-line text, and any custom JSX.',
			},
		},
	},
};
