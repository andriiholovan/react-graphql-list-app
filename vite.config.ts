import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  server: {
    port: Number(process.env.VITE_PORT ?? 3001),
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.API_PORT ?? 4000}`,
      },
    },
  },
});
