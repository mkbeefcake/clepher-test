/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path if necessary
  ],
  theme: {
    extend: {
      fontFamily: {
          sans: ['Roboto', 'sans-serif'], // Change 'Roboto' to your desired font
          serif: ['Merriweather', 'serif'],
          mono: ['Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}

