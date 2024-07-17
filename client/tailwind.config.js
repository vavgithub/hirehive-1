/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colors: {
          gradient: {
            0: '#045FFD',
            5: '#0942A3',
            11: '#0C3273',
            19: '#0D306E',
            39: '#111721',
            42: '#11161E',
            47: '#121314',
            100: '#121314',
          },
        },
        backgroundImage: {
          'custom-gradient': 'linear-gradient(180deg, var(--tw-gradient-stops))',
        },
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        secondary: {
          500: 'var(--color-secondary-500)',
        },
        accent: {
          100: 'var(--color-font-accent-100)',
        },
        background: {
          100: 'var(--color-background-100)',
          90: 'var(--color-background-90)',
          40: 'var(--color-background-40)',
          30: `var(--color-background-30)`,
        },
        font: {
          primary: 'var(--color-font-primary)',
          secondary: 'var(--color-font-secondary)',
          accent : 'var(--color-font-accent-100)',
        },
        
        neutral: colors.gray,
        'dark-gray': '#888CAA',
        'paragraph-black': '#000',
      },

      fontFamily: {
        'bricolage': ['"Bricolage Grotesque"', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
      },
      fontSize: {
        'h3': '20px',
        'large-p': '14px',
        "h1": "36px",
      },
      fontWeight: {
        'h3':'600',
        'large-p': '400',
        "h1": "700",
      },
      lineHeight: {
        'h3':'150%',
        'large-p': '20.3px',
        'h1': "54px",
      },
    },
  },
  plugins: [],
};
