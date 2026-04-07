import { defineConfig } from 'vite';
import { plugin as markdown } from 'vite-plugin-markdown';

export default defineConfig({
  base: '/edki/',
  plugins: [
    markdown({ mode: 'html' }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
