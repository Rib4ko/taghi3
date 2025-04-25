/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-background': '#F5F5F5',
        'border': '#E0E0E0',
        'primary': '#3498db',
        'secondary': '#2980b9',
        'text': '#333333',
        'error': '#e74c3c',
      },
    },
  },
  plugins: [],
}

