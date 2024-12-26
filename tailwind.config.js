/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        fill: 'rgb(33, 39, 55)',
        text: {
          base: 'rgb(234, 237, 243)',
          muted: 'rgba(234, 237, 243, 0.7)',
        },
        accent: {
          DEFAULT: 'rgb(255, 107, 237)',
          muted: 'rgba(255, 107, 237, 0.1)',
          subtle: 'rgba(255, 107, 237, 0.7)',
        },
        card: {
          DEFAULT: 'rgb(52, 63, 96)',
          muted: 'rgb(138, 51, 123)',
          translucent: 'rgba(52, 63, 96, 0.5)',
        },
        border: {
          DEFAULT: 'rgb(171, 75, 153)',
          translucent: 'rgba(171, 75, 153, 0.1)',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-headings': 'rgb(255, 107, 237)',
            'h1': {
              color: 'rgb(255, 107, 237)',
            },
            'h2': {
              color: 'rgb(255, 107, 237)',
            },
            'h3': {
              color: 'rgb(255, 107, 237)',
            },
            'h4': {
              color: 'rgb(255, 107, 237)',
            },
            'h5': {
              color: 'rgb(255, 107, 237)',
            },
            'h6': {
              color: 'rgb(255, 107, 237)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
