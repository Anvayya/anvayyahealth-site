/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/*.js"],
  theme: {
    extend: {
      colors: {
        teal: '#1F4F4A',
        tealdeep: '#173B37',
        marigold: '#D88B3A',
        ivory: '#FBF6EE',
        ink: '#1A1A18',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        deva: ['Tiro Devanagari Sanskrit', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
