import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [nextui()],
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config;
