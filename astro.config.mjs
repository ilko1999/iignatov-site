// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Replace with your actual domain
  site: 'https://yourdomain.com',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), mdx()],
  adapter: cloudflare(),
});