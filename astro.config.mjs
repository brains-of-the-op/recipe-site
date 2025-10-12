// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://your-username.github.io', // Replace with your actual GitHub username
  base: '/recipe-site' // Adjust this based on your deployment setup
});
