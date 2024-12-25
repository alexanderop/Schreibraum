/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        text: {
          primary: '#111827', // gray-900
          secondary: '#6b7280', // gray-500
          muted: '#9ca3af', // gray-400
        },
        accent: {
          DEFAULT: '#9333ea', // brand-600
          subtle: '#c084fc', // brand-400
        },
        background: {
          primary: '#ffffff',
          secondary: '#f9fafb', // gray-50
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
