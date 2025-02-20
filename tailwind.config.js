/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ['Merriweather', 'serif'], // Correct syntax
        'open-sans': ['Open Sans', 'sans-serif'], // Correct syntax
      },
      colors:{
        primary: '#FB923C',
        secondary: '#14B8A6',
        background: '#FFF7ED',
        text: '#374151'
      },
    },
  },
  plugins: [ require('daisyui'),],
}