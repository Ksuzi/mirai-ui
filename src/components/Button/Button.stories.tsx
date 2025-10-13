import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button.component';

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		children: 'Primary Button',
	},
};

export const Secondary: Story = {
	args: {
		children: 'Secondary Button',
		className: 'bg-gray-400 hover:bg-gray-500 text-white',
	},
};
