/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf2f4',
          100: '#fbe5e9',
          200: '#f7ced7',
          300: '#f1a8b9',
          400: '#e87693',
          500: '#e8175d', // Source doc accent color #E8175D / Health Compiler primary #E32168
          600: '#d40f4e',
          700: '#b2083e',
          800: '#940a36',
          900: '#7c0d32',
          950: '#450217',
        },
        docBg: '#F9F5F2', // Matches doc table background fills
        docBorder: '#E0D8D0', // Matches doc table border color
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
        doc: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
