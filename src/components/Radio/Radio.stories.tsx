import React from 'react';

import { Field } from '../Field';

import { Radio, RadioGroup } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof RadioGroup> = {
	title: 'Components/Radio',
	component: RadioGroup,
	tags: ['autodocs'],
	args: {
		name: 'example',
		orientation: 'vertical',
		size: 'md',
		colorScheme: 'primary',
	},
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
	render: (args) => (
		<RadioGroup {...args}>
			<Radio value="option1">Option 1</Radio>
			<Radio value="option2">Option 2</Radio>
			<Radio value="option3">Option 3</Radio>
		</RadioGroup>
	),
};

export const Orientation: Story = {
	render: () => (
		<div className="flex flex-col gap-8">
			<div>
				<h3 className="typo-h6 mb-3">Vertical (default)</h3>
				<RadioGroup name="vertical" orientation="vertical" defaultValue="option1">
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
					<Radio value="option3">Option 3</Radio>
				</RadioGroup>
			</div>
			<div>
				<h3 className="typo-h6 mb-3">Horizontal</h3>
				<RadioGroup name="horizontal" orientation="horizontal" defaultValue="option1">
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
					<Radio value="option3">Option 3</Radio>
				</RadioGroup>
			</div>
		</div>
	),
};

export const ColorSchemes: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<RadioGroup name="primary" colorScheme="primary" defaultValue="option1">
				<Radio value="option1">Primary</Radio>
				<Radio value="option2">Option 2</Radio>
			</RadioGroup>
			<RadioGroup name="secondary" colorScheme="secondary" defaultValue="option1">
				<Radio value="option1">Secondary</Radio>
				<Radio value="option2">Option 2</Radio>
			</RadioGroup>
			<RadioGroup name="success" colorScheme="success" defaultValue="option1">
				<Radio value="option1">Success</Radio>
				<Radio value="option2">Option 2</Radio>
			</RadioGroup>
			<RadioGroup name="warning" colorScheme="warning" defaultValue="option1">
				<Radio value="option1">Warning</Radio>
				<Radio value="option2">Option 2</Radio>
			</RadioGroup>
			<RadioGroup name="error" colorScheme="error" defaultValue="option1">
				<Radio value="option1">Error</Radio>
				<Radio value="option2">Option 2</Radio>
			</RadioGroup>
			<RadioGroup name="info" colorScheme="info" defaultValue="option1">
				<Radio value="option1">Info</Radio>
				<Radio value="option2">Option 2</Radio>
			</RadioGroup>
			<RadioGroup name="muted" colorScheme="muted" defaultValue="option1">
				<Radio value="option1">Muted</Radio>
				<Radio value="option2">Option 2</Radio>
			</RadioGroup>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<RadioGroup name="sm" size="sm" defaultValue="option1">
				<Radio value="option1">Small</Radio>
				<Radio value="option2">Option 2</Radio>
			</RadioGroup>
			<RadioGroup name="md" size="md" defaultValue="option1">
				<Radio value="option1">Medium (default)</Radio>
				<Radio value="option2">Option 2</Radio>
			</RadioGroup>
			<RadioGroup name="lg" size="lg" defaultValue="option1">
				<Radio value="option1">Large</Radio>
				<Radio value="option2">Option 2</Radio>
			</RadioGroup>
			<RadioGroup name="xl" size="xl" defaultValue="option1">
				<Radio value="option1">Extra Large</Radio>
				<Radio value="option2">Option 2</Radio>
			</RadioGroup>
		</div>
	),
};

export const States: Story = {
	render: () => (
		<div className="flex flex-col gap-6">
			<div>
				<h3 className="typo-h6 mb-3">Default</h3>
				<RadioGroup name="default" defaultValue="option1">
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
					<Radio value="option3">Option 3</Radio>
				</RadioGroup>
			</div>
			<div>
				<h3 className="typo-h6 mb-3">Disabled Group</h3>
				<RadioGroup name="disabled-group" disabled defaultValue="option1">
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
					<Radio value="option3">Option 3</Radio>
				</RadioGroup>
			</div>
			<div>
				<h3 className="typo-h6 mb-3">Disabled Individual Option</h3>
				<RadioGroup name="disabled-option" defaultValue="option1">
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2" disabled>
						Option 2 (Disabled)
					</Radio>
					<Radio value="option3">Option 3</Radio>
				</RadioGroup>
			</div>
		</div>
	),
};

export const Controlled: Story = {
	render: function ControlledExample() {
		const [value, setValue] = React.useState('option2');

		return (
			<div className="flex flex-col gap-4">
				<p className="typo-body">
					Selected value: <strong>{value}</strong>
				</p>
				<RadioGroup name="controlled" value={value} onChange={setValue}>
					<Radio value="option1">Option 1</Radio>
					<Radio value="option2">Option 2</Radio>
					<Radio value="option3">Option 3</Radio>
				</RadioGroup>
			</div>
		);
	},
};

export const Standalone: Story = {
	render: function StandaloneExample() {
		const [checked1, setChecked1] = React.useState(false);
		const [checked2, setChecked2] = React.useState(true);

		return (
			<div className="flex flex-col gap-4">
				<p className="typo-body-sm text-foreground-muted mb-2">
					Standalone radios (not recommended - use RadioGroup instead)
				</p>
				<Radio name="standalone" value="option1" checked={checked1} onChange={(e) => setChecked1(e.target.checked)}>
					Option 1
				</Radio>
				<Radio name="standalone" value="option2" checked={checked2} onChange={(e) => setChecked2(e.target.checked)}>
					Option 2
				</Radio>
			</div>
		);
	},
};

export const WithField: Story = {
	render: function WithFieldExample() {
		const [value, setValue] = React.useState('');
		const [error, setError] = React.useState('');

		const handleChange = (newValue: string) => {
			setValue(newValue);
			setError('');
		};

		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault();
			if (!value) {
				setError('Please select an option');
				return;
			}
			// eslint-disable-next-line no-alert
			alert(`Selected: ${value}`);
		};

		return (
			<form onSubmit={handleSubmit} className="max-w-md">
				<Field error={error}>
					<Field.Label>Choose your preferred contact method</Field.Label>
					<RadioGroup name="contact" value={value} onChange={handleChange}>
						<Radio value="email">Email</Radio>
						<Radio value="phone">Phone</Radio>
						<Radio value="sms">SMS</Radio>
					</RadioGroup>
					{!error && <Field.Message>We'll use this method to reach you</Field.Message>}
				</Field>
				<button
					type="submit"
					className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-500 transition-colors"
				>
					Submit
				</button>
			</form>
		);
	},
};

export const RealWorld: Story = {
	render: function RealWorldExample() {
		const [plan, setPlan] = React.useState('pro');
		const [billing, setBilling] = React.useState('monthly');

		return (
			<div className="max-w-2xl p-6 border border-border rounded-lg bg-card">
				<h2 className="typo-h4 mb-6">Choose Your Plan</h2>

				<div className="space-y-6">
					<Field>
						<Field.Label>Subscription Plan</Field.Label>
						<RadioGroup name="plan" value={plan} onChange={setPlan} orientation="vertical">
							<Radio value="basic">
								<div className="flex flex-col">
									<span className="font-medium">Basic - $9/month</span>
									<span className="typo-body-sm text-foreground-muted">Perfect for individuals</span>
								</div>
							</Radio>
							<Radio value="pro">
								<div className="flex flex-col">
									<span className="font-medium">Pro - $29/month</span>
									<span className="typo-body-sm text-foreground-muted">Best for professionals</span>
								</div>
							</Radio>
							<Radio value="enterprise">
								<div className="flex flex-col">
									<span className="font-medium">Enterprise - Custom</span>
									<span className="typo-body-sm text-foreground-muted">For large organizations</span>
								</div>
							</Radio>
						</RadioGroup>
					</Field>

					<Field>
						<Field.Label>Billing Cycle</Field.Label>
						<RadioGroup name="billing" value={billing} onChange={setBilling} orientation="horizontal">
							<Radio value="monthly">Monthly</Radio>
							<Radio value="yearly">Yearly (Save 20%)</Radio>
						</RadioGroup>
						<Field.Message>You can change your billing cycle at any time</Field.Message>
					</Field>
				</div>

				<div className="mt-6 p-4 bg-muted-50 rounded-md">
					<p className="typo-body">
						<strong>Selected:</strong> {plan.charAt(0).toUpperCase() + plan.slice(1)} plan, billed {billing}
					</p>
				</div>
			</div>
		);
	},
};

export const FullWidth: Story = {
	render: () => (
		<div className="max-w-md">
			<RadioGroup name="fullwidth" fullWidth defaultValue="option1">
				<Radio value="option1">Option 1 (Full Width)</Radio>
				<Radio value="option2">Option 2 (Full Width)</Radio>
				<Radio value="option3">Option 3 (Full Width)</Radio>
			</RadioGroup>
		</div>
	),
};

export const OptionsAPI: Story = {
	render: () => {
		const options = [
			{ value: '1', label: 'Option 1' },
			{ value: '2', label: 'Option 2' },
			{ value: '3', label: 'Option 3' },
		];

		return (
			<div className="flex flex-col gap-6">
				<div>
					<h3 className="typo-h6 mb-3">Using RadioGroup with options prop</h3>
					<RadioGroup name="options-api" options={options} defaultValue="1" />
				</div>

				<div>
					<h3 className="typo-h6 mb-3">Using Radio.Group compound component</h3>
					<Radio.Group name="compound-api" options={options} defaultValue="2" />
				</div>
			</div>
		);
	},
};

export const OptionsAPIComplex: Story = {
	render: function OptionsAPIComplexExample() {
		const [value, setValue] = React.useState('pro');

		const options = [
			{
				value: 'basic',
				label: (
					<div className="flex flex-col">
						<span className="font-medium">Basic Plan</span>
						<span className="typo-body-sm text-foreground-muted">$9/month - Perfect for individuals</span>
					</div>
				),
			},
			{
				value: 'pro',
				label: (
					<div className="flex flex-col">
						<span className="font-medium">Pro Plan</span>
						<span className="typo-body-sm text-foreground-muted">$29/month - Best for professionals</span>
					</div>
				),
			},
			{
				value: 'enterprise',
				label: (
					<div className="flex flex-col">
						<span className="font-medium">Enterprise Plan</span>
						<span className="typo-body-sm text-foreground-muted">Custom pricing - For organizations</span>
					</div>
				),
				disabled: true,
			},
		];

		return (
			<div className="max-w-md">
				<h3 className="typo-h6 mb-4">Select Your Plan</h3>
				<Radio.Group name="plans" options={options} value={value} onChange={setValue} />
				<p className="typo-body mt-4">
					Selected: <strong>{value}</strong>
				</p>
			</div>
		);
	},
};

export const OptionsAPIComparison: Story = {
	render: function OptionsAPIComparisonExample() {
		const [value1, setValue1] = React.useState('b');
		const [value2, setValue2] = React.useState('b');

		const options = [
			{ value: 'a', label: 'Option A' },
			{ value: 'b', label: 'Option B' },
			{ value: 'c', label: 'Option C' },
		];

		return (
			<div className="grid grid-cols-2 gap-8">
				<div>
					<h3 className="typo-h6 mb-3">Traditional API (Children)</h3>
					<Radio.Group name="traditional" value={value1} onChange={setValue1}>
						<Radio value="a">Option A</Radio>
						<Radio value="b">Option B</Radio>
						<Radio value="c">Option C</Radio>
					</Radio.Group>
				</div>

				<div>
					<h3 className="typo-h6 mb-3">Options API (Concise)</h3>
					<Radio.Group name="options" options={options} value={value2} onChange={setValue2} />
				</div>
			</div>
		);
	},
};
