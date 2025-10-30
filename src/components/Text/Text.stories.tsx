import { Text } from './Text.component';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Text> = {
	title: 'Components/Text',
	component: Text,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['body-lg', 'body', 'body-sm', 'caption', 'overline', 'label', 'button', 'code', 'link'],
		},
		colorScheme: {
			control: 'select',
			options: [
				'default',
				'muted',
				'primary',
				'secondary',
				'success',
				'warning',
				'error',
				'info',
				'accent',
				'disabled',
			],
		},
		fontWeight: {
			control: 'select',
			options: ['light', 'normal', 'medium', 'semibold', 'bold'],
		},
		as: {
			control: 'select',
			options: ['p', 'span', 'div', 'label'],
		},
		truncate: {
			control: 'boolean',
		},
		lineClamp: {
			control: 'select',
			options: [1, 2, 3, 4, 5, 6],
		},
		align: {
			control: 'select',
			options: ['left', 'center', 'right', 'justify'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
	args: {
		children: 'Sphinx of black quartz, judge my vow.',
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="space-y-4">
			<Text variant="body-lg">Body Large: Sphinx of black quartz, judge my vow.</Text>
			<Text variant="body">Body: Sphinx of black quartz, judge my vow.</Text>
			<Text variant="body-sm">Body Small: Sphinx of black quartz, judge my vow.</Text>
			<Text variant="caption">Caption: Sphinx of black quartz, judge my vow.</Text>
			<Text variant="overline">Overline: Category</Text>
			<Text variant="code">Code: const example = true;</Text>
		</div>
	),
};

export const FontWeights: Story = {
	render: () => (
		<div className="space-y-2">
			<Text fontWeight="light">Sphinx of black quartz, judge my vow. (light)</Text>
			<Text fontWeight="normal">Sphinx of black quartz, judge my vow. (normal)</Text>
			<Text fontWeight="medium">Sphinx of black quartz, judge my vow. (medium)</Text>
			<Text fontWeight="semibold">Sphinx of black quartz, judge my vow. (semibold)</Text>
			<Text fontWeight="bold">Sphinx of black quartz, judge my vow. (bold)</Text>
		</div>
	),
};

export const ColorSchemes: Story = {
	render: () => (
		<div className="space-y-2">
			<Text colorScheme="default">Default text</Text>
			<Text colorScheme="muted">Muted text</Text>
			<Text colorScheme="primary">Primary text</Text>
			<Text colorScheme="secondary">Secondary text</Text>
			<Text colorScheme="success">Success text</Text>
			<Text colorScheme="warning">Warning text</Text>
			<Text colorScheme="error">Error text</Text>
			<Text colorScheme="info">Info text</Text>
			<Text colorScheme="accent">Accent text</Text>
			<Text colorScheme="disabled">Disabled text</Text>
		</div>
	),
};

export const Truncation: Story = {
	render: () => (
		<div className="max-w-xs space-y-4">
			<div>
				<Text className="text-sm font-medium mb-1">Normal text:</Text>
				<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
			</div>
			<div>
				<Text className="text-sm font-medium mb-1">Truncated text:</Text>
				<Text truncate>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
			</div>
		</div>
	),
};

export const LineClamp: Story = {
	render: () => (
		<div className="max-w-xs space-y-4">
			<div>
				<Text className="text-sm font-medium mb-1">Normal text:</Text>
				<Text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
					magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat.
				</Text>
			</div>
			<div>
				<Text className="text-sm font-medium mb-1">Line clamp (2 lines):</Text>
				<Text lineClamp={2}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
					magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat.
				</Text>
			</div>
		</div>
	),
};

export const SemanticElements: Story = {
	render: () => (
		<div className="flex flex-col gap-2">
			<Text as="p">Paragraph text</Text>
			<Text as="span">Span text</Text>
			<Text as="div">Div text</Text>
			<Text as="label">Label text</Text>
		</div>
	),
};
