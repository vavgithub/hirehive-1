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
          gray: 'var(--color-font-gray-90)',
        },
      },

      fontFamily: {
        'bricolage': ['"Bricolage Grotesque"', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
      },
      fontSize: {
        'h1': ['36px', { lineHeight: '54px' }],
        'h2': ['24px', { lineHeight: '36px' }],
        'h3': ['20px', { lineHeight: '150%' }],
        'body': ['16px', { lineHeight: '150%' }],
        'small-p':['12px',{lineHeight: '150%'}],
        'large-p': ['14px', { lineHeight: '20.3px' }],
      },
      fontWeight: {
        'h1': '700',
        'h2': '600',
        'h3': '600',
        'body': '300',
        'large-p': '400',
      },
    },
  },
  plugins: [],
};
