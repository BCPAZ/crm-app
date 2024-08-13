/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily : {
      primary : 'Plus Jakarta Sans'
    },
    extend: {
      colors : {
        secondary : '#003458',
        light : '#fff',
        grey : '#919EAB',
        column : '#F4F6F8'
      }
    },
  },
  plugins: [],
}