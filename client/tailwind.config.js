/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        'fill-available': '-webkit-fill-available',
      },
      backgroundImage: {
        "card-pattern": "url('/src/svg/StatsCard/stats-bg.png')",
        "main-bg":"url('/src/svg/Background/rate.png')",
        "verification":"url('/src/svg/Background/verification.svg')",
        "stars":"url('/src/svg/Background/Stars.svg')",
        "que-bg":"url('/src/svg/Background/Que.svg')",      
        "login-screen":"url('/src/svg/Background/loginScreenBg.svg')",  
        "sundar-kanya":"url('/src/svg/Background/sundar-kanya.png')",  
        "custom-gradient":
          "linear-gradient(180deg, var(--tw-gradient-stops))",
      },
      colors: {        
        red: {
          100:"rgba(255, 56, 92, 1)",
          200: "rgba(255, 56, 92, 0.2)", // Custom value for red-200
        },
        yellow:{
          100: "rgba(237, 189, 20, 0.2)",
        },
        green:{
          100:"rgba(20, 225, 89, 0.2)",
        },
        teal:{
          100:"rgba(24, 233, 208, 1)",
          10:"rgba(24, 233, 208, 0.1)",
        },
        red:{
          100:"rgba(255, 31, 71, 1)",
          90:"rgba(255, 56, 92, 1)",
          80:"rgba(255, 56, 92, 0.2)",
          70:"rgba(255, 56, 92, 0.2)",
          60:"rgba(255, 56, 92, 0.3)",
          50:"rgba(255, 56, 92, 0.05)",
        },
        blue:{
          100:"var(--color-primary-100)",
          200:"var(--color-primary-200)",
          300:"var(--color-primary-300)",
          400:"var(--color-primary-400)",
        },        
        black:{
          100:"rgba(12, 13, 13, 1)",
        },        
        grey:{
          100:"rgba(88, 91, 95, 1)",
          70:"rgba(32, 33, 34, 1)",
          60:"rgba(35, 36, 37, 1)",
          20:"rgba(18, 19, 20, 0.2)",
        },        
        green:{
          100:"rgba(18, 211, 130, 1)",
          90:"rgba(20, 225, 89, 0.2)",
        },        
        yellow:{
          100:"rgba(237, 189, 20, 1)",
          90:"rgba(237, 189, 20, 0.2)",
        },        
        orange:{
          100:"rgba(253, 109, 4, 1)",
        },        
        light_blue:{
          100:"rgba(0, 153, 255, 1)",
        },        
        teal_blue:{
          100:"rgba(4, 238, 253, 1)",
        },        
        purple:{
          100:"rgba(99, 4, 253, 1)",
        },        
        pink:{
          100:"rgba(248, 4, 253, 1)",
        },        
        primary: {
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
        },
        secondary: {
          500: "var(--color-secondary-500)",
        },
        accent: {
          100: "var(--color-font-accent-100)",
          red: "var(--color-red-100)",
          yellow: "var(--color-yellow-100)",
          green: "var(--color-green-100)",
        },
        background: {
          100: "var(--color-background-100)",
          90: "var(--color-background-90)",
          80: "var(--color-background-80)",
          70: "var(--color-background-70)",
          60: "var(--color-background-60)",
          40: "var(--color-background-40)",
          30: `var(--color-background-30)`,
          yellow: "var(--color-yellow-100)",
          green: "var(--color-green-100)",
        },
        font: {
          primary: "var(--color-primary-100)",
          secondary: "var(--color-font-secondary)",
          accent: "var(--color-font-accent-100)",
          gray: "var(--color-font-gray-90)",
          red:"var(--color-red-100)",
          yellow:"var(--color-yellow-100)"
        },
      },

      fontFamily: {
        bricolage: ['"Bricolage Grotesque"', "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      fontSize: {
        h1: ["36px", { lineHeight: "54px" }],
        h2: ["24px", { lineHeight: "36px" }],
        h3: ["20px", { lineHeight: "150%" }],
        body: ["16px", { lineHeight: "150%" }],
        "display-d2": ["42px", { lineHeight: "110%" }],
        "small-p": ["12px", { lineHeight: "150%" }],
        "large-p": ["14px", { lineHeight: "20.3px" }],
      },
      fontWeight: {
        h1: "700",
        h2: "600",
        h3: "600",
        body: "300",
        "large-p": "400",
      },
    },
  },
  plugins: [],
};
