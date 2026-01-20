import type { Config } from 'tailwindcss';
// @ts-ignore - TypeScript may have issues resolving this import, but it works at runtime
import { wearemetaPreset } from '@wearemeta/design-system/tailwind-preset';

const config: Config = {
  presets: [wearemetaPreset],
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    // Include design system components
    '../wearemeta-design-system/packages/design-system/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Only app-specific overrides here (if any)
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
