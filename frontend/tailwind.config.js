/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#1a1a1a',
        neutralLight: '#ddd5ce',
        neutralDark: '#b2ab9b',
        buttonLight: '#7c7572',
        buttonDark: '#3f3c3b',
      },
    },
  },
  plugins: [],
};
