/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        'kakao-yellow': '#FFE400',
        'kakao-bg': '#ABC1D1',
        'kakao-header': '#8FA9C1',
        'instagram-blue': '#3797F0',
        'instagram-gray': '#EFEFEF',
      }
    },
  },
  plugins: [],
} 