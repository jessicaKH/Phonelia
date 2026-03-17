/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F6BED',
        secondary: '#8A6FF1',
        success: '#34C759',
        danger: '#FF3B30',
        accent: '#FFC857',
        bg: '#F7F9FC',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        card: '0 4px 20px rgba(0,0,0,0.06)',
        hover: '0 8px 30px rgba(0,0,0,0.10)',
      },
    },
  },
  plugins: [],
}
