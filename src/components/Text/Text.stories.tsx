import { Text } from './Text.component';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Text> = {
	title: 'Components/Text',
	component: Text,
	tags: ['autodocs'],
	argTypes: {
		textStyle: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'],
		},
		fontWeight: {
			control: 'select',
			options: ['light', 'normal', 'medium', 'semibold', 'bold'],
		},
		colorPalette: {
			control: 'select',
			options: ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink', 'muted'],
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
	},
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
	args: {
		children: 'Sphinx of black quartz, judge my vow.',
	},
};

export const TextStyles: Story = {
	render: () => (
		<div className="space-y-2">
			<Text textStyle="xs">Mirai Text (xs)</Text>
			<Text textStyle="sm">Mirai Text (sm)</Text>
			<Text textStyle="md">Mirai Text (md)</Text>
			<Text textStyle="lg">Mirai Text (lg)</Text>
			<Text textStyle="xl">Mirai Text (xl)</Text>
			<Text textStyle="2xl">Mirai Text (2xl)</Text>
			<Text textStyle="3xl">Mirai Text (3xl)</Text>
			<Text textStyle="4xl">Mirai Text (4xl)</Text>
			<Text textStyle="5xl">Mirai Text (5xl)</Text>
			<Text textStyle="6xl">Mirai Text (6xl)</Text>
			<Text textStyle="7xl">Mirai Text (7xl)</Text>
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

export const ColorPalettes: Story = {
	render: () => (
		<div className="space-y-2">
			<Text colorPalette="gray">Gray text</Text>
			<Text colorPalette="red">Red text</Text>
			<Text colorPalette="orange">Orange text</Text>
			<Text colorPalette="yellow">Yellow text</Text>
			<Text colorPalette="green">Green text</Text>
			<Text colorPalette="teal">Teal text</Text>
			<Text colorPalette="blue">Blue text</Text>
			<Text colorPalette="cyan">Cyan text</Text>
			<Text colorPalette="purple">Purple text</Text>
			<Text colorPalette="pink">Pink text</Text>
			<Text colorPalette="muted">Muted text</Text>
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
