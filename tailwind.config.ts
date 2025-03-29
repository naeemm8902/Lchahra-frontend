import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'primary-hard': 'linear-gradient(to top right, #1e40af, #581c87)',
        'primary-soft': 'linear-gradient(to top right, #bfdbfe, #ddd6fe)',
        'primary-circle': 'linear-gradient(to top right, #60a5fa, #9333ea)',
        'primary-light': 'linear-gradient(to top right, #bfdbfe, #ddd6fe)',
      },
      colors: {
        foreground: {
          DEFAULT: '#681740',
        },
        primary: {
          gradient: 'linear-gradient(to top right, #1e40af, #581c87)',
          hard: 'linear-gradient(to top right, #1e40af, #581c87)',
        },
        background: {
          DEFAULT: '#50122E',
          light: '#7B274E',
          accent: '#A43C6C',
        },
        navbar: '#AB234C',
        sidebar: '#AB234C',
        secondary: {
          DEFAULT: '#FA7C5A',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#E3534C',
          foreground: '#681740',
        },
        accent: {
          DEFAULT: '#AB234C',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#E3534C',
          foreground: '#FFFFFF',
        },
        border: '#681740',
        input: '#FA7C5A',
        ring: '#E3534C',
        chart: {
          '1': '#FFA874',
          '2': '#FA7C5A',
          '3': '#E3534C',
          '4': '#AB234C',
          '5': '#681740',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
