import { useState } from 'react';

import { Field } from '../Field';

import { Switch } from './Switch.component';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Switch> = {
	title: 'Components/Switch',
	component: Switch,
	tags: ['autodocs'],
	args: {
		size: 'md',
		colorScheme: 'primary',
	},
	argTypes: {
		onChange: { action: 'changed' },
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'xl'],
		},
		colorScheme: {
			control: 'select',
			options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'muted'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Switch>;

// 1. Default story
export const Default: Story = {
	args: {
		defaultChecked: false,
	},
};

// 2. Controlled example
export const Controlled: Story = {
	render: () => {
		const ControlledExample = () => {
			const [checked, setChecked] = useState(false);

			return (
				<div className="flex flex-col gap-4">
					<Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />
					<p className="text-sm text-foreground-muted">Switch is {checked ? 'ON' : 'OFF'}</p>
				</div>
			);
		};

		return <ControlledExample />;
	},
};

// 3. Color schemes showcase
export const ColorSchemes: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-3">
				<Switch colorScheme="primary" defaultChecked />
				<span className="text-sm">Primary</span>
			</div>
			<div className="flex items-center gap-3">
				<Switch colorScheme="secondary" defaultChecked />
				<span className="text-sm">Secondary</span>
			</div>
			<div className="flex items-center gap-3">
				<Switch colorScheme="success" defaultChecked />
				<span className="text-sm">Success</span>
			</div>
			<div className="flex items-center gap-3">
				<Switch colorScheme="warning" defaultChecked />
				<span className="text-sm">Warning</span>
			</div>
			<div className="flex items-center gap-3">
				<Switch colorScheme="error" defaultChecked />
				<span className="text-sm">Error</span>
			</div>
			<div className="flex items-center gap-3">
				<Switch colorScheme="info" defaultChecked />
				<span className="text-sm">Info</span>
			</div>
			<div className="flex items-center gap-3">
				<Switch colorScheme="muted" defaultChecked />
				<span className="text-sm">Muted</span>
			</div>
		</div>
	),
};

// 4. Sizes showcase
export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-6">
			<div className="flex flex-col items-center gap-2">
				<Switch size="sm" defaultChecked />
				<span className="text-xs text-foreground-muted">Small</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Switch size="md" defaultChecked />
				<span className="text-sm text-foreground-muted">Medium</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Switch size="lg" defaultChecked />
				<span className="text-base text-foreground-muted">Large</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Switch size="xl" defaultChecked />
				<span className="text-lg text-foreground-muted">Extra Large</span>
			</div>
		</div>
	),
};

// 5. States showcase
export const States: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-3">
				<Switch defaultChecked={false} />
				<span className="text-sm">Default (Off)</span>
			</div>
			<div className="flex items-center gap-3">
				<Switch defaultChecked />
				<span className="text-sm">Default (On)</span>
			</div>
			<div className="flex items-center gap-3">
				<Switch loading />
				<span className="text-sm">Loading</span>
			</div>
			<div className="flex items-center gap-3">
				<Switch disabled />
				<span className="text-sm">Disabled (Off)</span>
			</div>
			<div className="flex items-center gap-3">
				<Switch disabled defaultChecked />
				<span className="text-sm">Disabled (On)</span>
			</div>
		</div>
	),
};

// 6. Real-world examples
export const RealWorld: Story = {
	render: () => {
		const RealWorldExample = () => {
			const [notifications, setNotifications] = useState(true);
			const [newsletter, setNewsletter] = useState(false);
			const [darkMode, setDarkMode] = useState(false);

			return (
				<div className="max-w-md space-y-6">
					<h3 className="text-lg font-semibold">Settings</h3>

					<Field helperText="Receive notifications about activity">
						<div className="flex items-center justify-between">
							<Field.Label className="mb-0">Enable Notifications</Field.Label>
							<Field.Control>
								<Switch checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
							</Field.Control>
						</div>
						<Field.Message />
					</Field>

					<Field helperText="Subscribe to our weekly newsletter">
						<div className="flex items-center justify-between">
							<Field.Label className="mb-0">Newsletter Subscription</Field.Label>
							<Field.Control>
								<Switch checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} colorScheme="success" />
							</Field.Control>
						</div>
						<Field.Message />
					</Field>

					<Field helperText="Use dark color scheme">
						<div className="flex items-center justify-between">
							<Field.Label className="mb-0">Dark Mode</Field.Label>
							<Field.Control>
								<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} colorScheme="secondary" />
							</Field.Control>
						</div>
						<Field.Message />
					</Field>
				</div>
			);
		};

		return <RealWorldExample />;
	},
};

// 7. Form Integration
export const WithForm: Story = {
	render: () => {
		const FormExample = () => {
			const [formData, setFormData] = useState({
				emailNotifications: true,
				smsNotifications: false,
				marketingEmails: false,
				termsAccepted: false,
			});
			const [errors, setErrors] = useState<Record<string, string>>({});
			const [submitted, setSubmitted] = useState(false);

			const handleSubmit = (e: React.FormEvent) => {
				e.preventDefault();
				const newErrors: Record<string, string> = {};

				if (!formData.termsAccepted) {
					newErrors.termsAccepted = 'You must accept the terms and conditions';
				}

				if (Object.keys(newErrors).length > 0) {
					setErrors(newErrors);
					return;
				}

				setErrors({});
				setSubmitted(true);
				setTimeout(() => setSubmitted(false), 3000);
			};

			const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
				setFormData((prev) => ({ ...prev, [field]: e.target.checked }));
				if (errors[field]) {
					setErrors((prev) => {
						const newErrors = { ...prev };
						delete newErrors[field];
						return newErrors;
					});
				}
			};

			return (
				<div className="max-w-lg">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>

							<div className="space-y-4">
								<Field>
									<div className="flex items-center justify-between">
										<Field.Label className="mb-0">Email Notifications</Field.Label>
										<Field.Control>
											<Switch
												checked={formData.emailNotifications}
												onChange={handleChange('emailNotifications')}
												colorScheme="primary"
											/>
										</Field.Control>
									</div>
								</Field>

								<Field helperText="Receive notifications via SMS">
									<div className="flex items-center justify-between">
										<Field.Label className="mb-0">SMS Notifications</Field.Label>
										<Field.Control>
											<Switch
												checked={formData.smsNotifications}
												onChange={handleChange('smsNotifications')}
												colorScheme="info"
											/>
										</Field.Control>
									</div>
									<Field.Message />
								</Field>

								<Field>
									<div className="flex items-center justify-between">
										<Field.Label className="mb-0">Marketing Emails</Field.Label>
										<Field.Control>
											<Switch
												checked={formData.marketingEmails}
												onChange={handleChange('marketingEmails')}
												colorScheme="success"
											/>
										</Field.Control>
									</div>
								</Field>
							</div>
						</div>

						<div className="border-t pt-4">
							<Field error={errors.termsAccepted}>
								<div className="flex items-start gap-3">
									<Field.Control>
										<Switch
											checked={formData.termsAccepted}
											onChange={handleChange('termsAccepted')}
											colorScheme={errors.termsAccepted ? 'error' : 'primary'}
											size="sm"
										/>
									</Field.Control>
									<div className="flex-1">
										<Field.Label className="mb-0 font-normal">I accept the terms and conditions</Field.Label>
										<Field.Message />
									</div>
								</div>
							</Field>
						</div>

						<div className="flex items-center gap-3">
							<button
								type="submit"
								className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-500 transition-colors"
							>
								Save Preferences
							</button>

							{submitted && (
								<span className="text-success-600 text-sm font-medium">✓ Preferences saved successfully!</span>
							)}
						</div>
					</form>
				</div>
			);
		};

		return <FormExample />;
	},
};

// 8. Loading States
export const LoadingStates: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-3">
				<Switch size="sm" loading />
				<span className="text-sm">Small Loading</span>
			</div>
			<div className="flex items-center gap-3">
				<Switch size="md" loading />
				<span className="text-sm">Medium Loading</span>
			</div>
			<div className="flex items-center gap-3">
				<Switch size="lg" loading />
				<span className="text-sm">Large Loading</span>
			</div>
			<div className="flex items-center gap-3">
				<Switch size="xl" loading />
				<span className="text-sm">Extra Large Loading</span>
			</div>
		</div>
	),
};
