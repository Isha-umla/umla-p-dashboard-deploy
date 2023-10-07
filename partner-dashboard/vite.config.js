import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/umla/partnerDashboard",
  build: {
    // Extend or replace the existing build.after hook.
    rollupOptions: {
      // ... other rollup options
    },
    // Define a build.after hook to execute custom code.
    after: [
      (options, build) => {
        const base = '/umla/partnerDashboard/'; // Replace with your actual base path
        const generatedJSFiles = build.ondemandEntries
          .filter((entry) => entry.isEntry)
          .map((entry) => entry.file);

        generatedJSFiles.forEach((file) => {
          const content = fs.readFileSync(file, 'utf-8');
          const updatedContent = content.replace(/(["'])\//g, `$1${base}assets/`);
          fs.writeFileSync(file, updatedContent, 'utf-8');
        });
      },
    ],
  },
})
