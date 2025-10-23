import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mirai-ui': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        'dist/',
        'playground/',
        'src/test/**',
        '**/*.stories.tsx',
        '**/*.types.ts',
        '**/*.variants.ts',
        '**/*.test.{ts,tsx}',
        '**/*.config.{ts,js}',
        '**/index.ts',
      ],
      include: ['src/**/*.{ts,tsx}'],
    },
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'playground'],
  },
})
