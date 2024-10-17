import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Ajoutez ceci si vous utilisez des chemins relatifs
    // base: '/departs/', // Si vos composants utilisent des chemins relatifs
  },
});
