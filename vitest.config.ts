import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'src/components/**/*.{ts,tsx}',
        'src/hooks/**/*.{ts,tsx}',
        'src/features/**/*.{ts,tsx}'
      ],
      exclude: [
        'src/test/**',
        'src/services/**',
        'src/components/Address/**',
        'src/components/Expertise/**',
        'src/components/Feedback/**',
        'src/components/Navigation/**',
        'src/components/Panel/**',
        'src/components/Portfolio/**',
        'src/components/shared/PhotoBox/**',
        'src/components/shared/ScrollToTop/**',
        'src/features/**/__tests__/**'
      ],
      thresholds: {
        branches: 35,
        functions: 35,
        lines: 35,
        statements: 35
      }
    }
  }
});