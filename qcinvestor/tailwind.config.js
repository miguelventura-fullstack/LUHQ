/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'blurple' : '#768FFD',
        'light-green' : '#A8FFAB',
        'weird-gray' : '#D9D9D9',
        'pinkish': '#F9A5FF',
        'purplish': '#AD8BFF',
        'bluish': '#202744',
        'backblue': '#0C0F19'
      }
    },
    fontFamily: {
      'sfpro': ['SF Pro', ...defaultTheme.fontFamily.sans],
      'lora': ['Lora'],
      'rubik': ['Rubik', ...defaultTheme.fontFamily.sans],
      'agxb': ['Aktiv Grotesk Ex XBold', ...defaultTheme.fontFamily.sans]
  },
  plugins: [],
}
}
