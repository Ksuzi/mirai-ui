import { Field } from '../Field';

import { Textarea } from './Textarea.component';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Textarea> = {
	title: 'Components/Textarea',
	component: Textarea,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Multi-line text input component with multiple visual styles and states. Use with Field component for labels and validation messages.',
			},
		},
	},
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
		resize: {
			control: 'select',
			options: ['none', 'vertical', 'horizontal', 'both'],
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
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
	args: {
		placeholder: 'Enter your text...',
		rows: 4,
	},
	parameters: {
		docs: {
			description: {
				story: 'Basic textarea with default styling. Use the controls below to experiment with different props.',
			},
		},
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="space-y-4">
			<Textarea variant="default" placeholder="Default variant" rows={3} />
			<Textarea variant="outlined" placeholder="Outlined variant" rows={3} />
			<Textarea variant="filled" placeholder="Filled variant" rows={3} />
			<Textarea variant="borderless" placeholder="Borderless variant" rows={3} />
			<Textarea variant="underlined" placeholder="Underlined variant" rows={3} />
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
			<Textarea size="sm" placeholder="Small" rows={3} />
			<Textarea size="md" placeholder="Medium" rows={3} />
			<Textarea size="lg" placeholder="Large" rows={3} />
			<Textarea size="xl" placeholder="Extra Large" rows={3} />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Available textarea sizes from small to extra large. Medium is the default.',
			},
		},
	},
};

export const States: Story = {
	render: () => (
		<div className="space-y-4">
			<Textarea state="default" placeholder="Default state" rows={3} />
			<Textarea state="error" placeholder="Error state" rows={3} />
			<Textarea state="success" placeholder="Success state" rows={3} />
			<Textarea state="warning" placeholder="Warning state" rows={3} />
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

export const ResizeOptions: Story = {
	render: () => (
		<div className="space-y-4">
			<div>
				<h3 className="text-sm font-medium mb-2">None (fixed size)</h3>
				<Textarea resize="none" placeholder="Cannot resize" rows={3} />
			</div>
			<div>
				<h3 className="text-sm font-medium mb-2">Vertical (default)</h3>
				<Textarea resize="vertical" placeholder="Resize vertically" rows={3} />
			</div>
			<div>
				<h3 className="text-sm font-medium mb-2">Horizontal</h3>
				<Textarea resize="horizontal" placeholder="Resize horizontally" rows={3} />
			</div>
			<div>
				<h3 className="text-sm font-medium mb-2">Both</h3>
				<Textarea resize="both" placeholder="Resize in any direction" rows={3} />
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Control how users can resize the textarea. Vertical resizing is the default.',
			},
		},
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		placeholder: 'Disabled textarea',
		value: 'This textarea is disabled and cannot be edited.',
		rows: 3,
	},
	parameters: {
		docs: {
			description: {
				story: 'Disabled textareas cannot be edited and are visually dimmed.',
			},
		},
	},
};

export const FullWidthToggle: Story = {
	render: () => (
		<div className="space-y-4">
			<div>
				<h3 className="text-lg font-medium mb-2">Full Width (default)</h3>
				<Textarea placeholder="Full width textarea" fullWidth rows={3} />
			</div>
			<div>
				<h3 className="text-lg font-medium mb-2">Auto Width</h3>
				<Textarea placeholder="Auto width textarea" fullWidth={false} rows={3} />
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Textareas are full width by default but can be set to auto width.',
			},
		},
	},
};

export const WithFieldComponent: Story = {
	render: () => (
		<div className="space-y-6 max-w-md">
			<h3 className="text-lg font-medium">Using Textarea with Field Component</h3>
			<p className="text-sm text-muted-600 mb-4">
				For forms with labels and helper text, use the Field component as shown below.
			</p>

			<Field required>
				<Field.Label>Description</Field.Label>
				<Field.Control>
					<Textarea placeholder="Enter a description..." rows={4} />
				</Field.Control>
				<Field.Message />
			</Field>

			<Field required error="Please provide feedback (minimum 20 characters)">
				<Field.Label>Feedback</Field.Label>
				<Field.Control>
					<Textarea placeholder="Share your thoughts..." rows={4} />
				</Field.Control>
				<Field.Message />
			</Field>

			<Field helperText="This will be visible on your public profile" size="lg">
				<Field.Label>Bio</Field.Label>
				<Field.Control>
					<Textarea placeholder="Tell us about yourself..." rows={5} />
				</Field.Control>
				<Field.Message />
			</Field>

			<Field disabled helperText="This feature is coming soon">
				<Field.Label>Additional Notes</Field.Label>
				<Field.Control>
					<Textarea placeholder="Add notes..." rows={3} />
				</Field.Control>
				<Field.Message />
			</Field>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Complete form example showing Textarea used with Field for labels, validation, and accessibility. This is the recommended pattern for forms.',
			},
		},
	},
};

export const RealWorldExamples: Story = {
	render: () => (
		<div className="space-y-8 max-w-2xl">
			<div>
				<h3 className="text-lg font-medium mb-4">Comment Form</h3>
				<div className="space-y-4 p-4 border rounded-md">
					<Field required helperText="Maximum 500 characters">
						<Field.Label>Leave a Comment</Field.Label>
						<Field.Control>
							<Textarea placeholder="Share your thoughts..." rows={4} variant="outlined" maxLength={500} />
						</Field.Control>
						<Field.Message />
					</Field>
				</div>
			</div>

			<div>
				<h3 className="text-lg font-medium mb-4">Support Ticket</h3>
				<div className="space-y-4 p-4 border rounded-md">
					<Field required helperText="Please be as detailed as possible">
						<Field.Label>Issue Description</Field.Label>
						<Field.Control>
							<Textarea placeholder="Describe the issue you're experiencing..." rows={6} variant="filled" />
						</Field.Control>
						<Field.Message />
					</Field>
					<Field>
						<Field.Label>Steps to Reproduce</Field.Label>
						<Field.Control>
							<Textarea
								placeholder="1. First step&#10;2. Second step&#10;3. ..."
								rows={5}
								variant="filled"
							/>
						</Field.Control>
					</Field>
				</div>
			</div>

			<div>
				<h3 className="text-lg font-medium mb-4">Minimal Note Taking</h3>
				<Textarea variant="borderless" placeholder="Quick notes..." rows={8} className="font-mono" />
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Real-world examples showing different textarea use cases in common UI patterns.',
			},
		},
	},
};
