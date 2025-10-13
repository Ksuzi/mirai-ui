import { defineConfig } from 'tsdown';
import postcss from 'rollup-plugin-postcss';
import nodeResolve from '@rollup/plugin-node-resolve';
import tailwind from '@tailwindcss/postcss';

export default defineConfig({
	entry: ['src/index.ts'],
	dts: true,
	outDir: 'dist',
	plugins: [
		nodeResolve({ extensions: ['.mjs', '.js', '.ts', '.tsx', '.css'] }),
		postcss({
			plugins: [tailwind()],
			extract: 'index.css',
			sourceMap: false,
		}),
	],
});
