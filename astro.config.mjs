// @ts-check
import { defineConfig } from 'astro/config';
import astroI18next from "astro-i18next";
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [astroI18next(), react()]
});