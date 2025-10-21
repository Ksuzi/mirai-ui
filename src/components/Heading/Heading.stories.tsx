import { Heading } from './Heading.component';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Heading> = {
	title: 'Components/Heading',
	component: Heading,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'],
		},
		colorPalette: {
			control: 'select',
			options: ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink'],
		},
		as: {
			control: 'select',
			options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
	args: {
		children: 'The quick brown fox jumps over the lazy dog',
	},
};

export const AllSizes: Story = {
	render: () => (
		<div className="space-y-4">
			<Heading size="xs">Heading (xs)</Heading>
			<Heading size="sm">Heading (sm)</Heading>
			<Heading size="md">Heading (md)</Heading>
			<Heading size="lg">Heading (lg)</Heading>
			<Heading size="xl">Heading (xl)</Heading>
			<Heading size="2xl">Heading (2xl)</Heading>
			<Heading size="3xl">Heading (3xl)</Heading>
			<Heading size="4xl">Heading (4xl)</Heading>
			<Heading size="5xl">Heading (5xl)</Heading>
			<Heading size="6xl">Heading (6xl)</Heading>
			<Heading size="7xl">Heading (7xl)</Heading>
		</div>
	),
};

export const ColorPalettes: Story = {
	render: () => (
		<div className="space-y-4">
			<Heading colorPalette="gray">Gray Heading</Heading>
			<Heading colorPalette="red">Red Heading</Heading>
			<Heading colorPalette="orange">Orange Heading</Heading>
			<Heading colorPalette="yellow">Yellow Heading</Heading>
			<Heading colorPalette="green">Green Heading</Heading>
			<Heading colorPalette="teal">Teal Heading</Heading>
			<Heading colorPalette="blue">Blue Heading</Heading>
			<Heading colorPalette="cyan">Cyan Heading</Heading>
			<Heading colorPalette="purple">Purple Heading</Heading>
			<Heading colorPalette="pink">Pink Heading</Heading>
		</div>
	),
};

export const SemanticElements: Story = {
	render: () => (
		<div className="space-y-4">
			<Heading as="h1" size="4xl">
				Level 1 Heading
			</Heading>
			<Heading as="h2" size="3xl">
				Level 2 Heading
			</Heading>
			<Heading as="h3" size="2xl">
				Level 3 Heading
			</Heading>
			<Heading as="h4" size="xl">
				Level 4 Heading
			</Heading>
			<Heading as="h5" size="lg">
				Level 5 Heading
			</Heading>
			<Heading as="h6" size="md">
				Level 6 Heading
			</Heading>
		</div>
	),
};

export const WithCustomStyles: Story = {
	args: {
		children: 'Custom Styled Heading',
		size: '3xl',
		colorPalette: 'teal',
		className: 'font-bold underline',
	},
};
