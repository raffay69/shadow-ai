/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#dc2626', // Red-600
        secondary: '#1a1a1a', // Darker gray for cyberpunk
        accent: '#000000', // Black
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cyber: ['Orbitron', 'sans-serif'], // Changed from scary to cyber
      },
    },
  },
  plugins: [],
};