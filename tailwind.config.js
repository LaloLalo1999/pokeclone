/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gameboy: {
          screen: '#cbe0a8',
          dark: '#2a3b2e',
          light: '#9bbf6b',
        },
      },
    },
  },
  plugins: [],
};
