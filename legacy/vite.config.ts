import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Static site: all member .md files are read at build time from /data/members.
// Relative base ('./') makes the build work at any sub-path — e.g. GitHub Pages
// serves at https://<user>.github.io/<repo>/ — without hardcoding the repo name.
// Safe here because the app has no client-side routing.
export default defineConfig({
  base: './',
  plugins: [react()],
});
