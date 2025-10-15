import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import tailwind from '@tailwindcss/postcss';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-onboarding'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	async viteFinal(cfg) {
		return mergeConfig(cfg, {
			plugins: [tsconfigPaths()],
			css: { postcss: { plugins: [tailwind()] } },
		});
	},
};

export default config;
