/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // add this line
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      colors: {
        'background-menu': 'rgb(32, 26, 28)',
      },
      textColor: {
        'header': '#f90f63'
      },
      borderColor: {
        'box-border': '#f90f63'
      }
    },
  },
  plugins: [
    require('flowbite/plugin') // add this line
  ],
}

