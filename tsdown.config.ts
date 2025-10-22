import { defineConfig } from 'tsdown';
import postcss from 'rollup-plugin-postcss';
import tailwind from '@tailwindcss/postcss';

export default defineConfig({
	entry: ['src/index.ts'],
	dts: true,
	outDir: 'dist',
	plugins: [
		postcss({
			plugins: [tailwind()],
			extract: 'index.css',
			sourceMap: false,
			minimize: true,
		}),
	],
});
