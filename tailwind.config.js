/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './**/*.html',
    './**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0B1121',
      },
      backgroundColor: {
        'card': 'rgba(30, 41, 59, 0.7)',
      },
    },
  },
  plugins: [],
}

