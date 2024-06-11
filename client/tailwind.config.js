/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        "bg": ["Bricolage Grotesque", "sans-serif"],

      },
      fontSize: {
        'h3': '18px',
        'large-p': '14px', // Large paragraph font size
        "h1": "36px"
      },
      fontWeight: {
        'h3': '600',
        'large-p': '400', // Large paragraph font weight
        "h1": "700"
      },
      lineHeight: {
        'h3': '1.2',
        'large-p': '20.3px', // Again, using pixels, though unitless is typical in Tailwind
        'h1':  "54px"
      },
      colors: {
        'dark-gray': '#888CAA',
        'paragraph-black': '#000', // Custom color for paragraph
      }
    },
  },
  plugins: [],
};
