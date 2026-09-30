/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: {
    DEFAULT: '1rem',
    sm: '2rem',
    md: '2rem',
    lg: '2rem',
    xl: '2rem',
    '2xl': '3rem',
  },},
    extend: {
      colors: {
        primary: {
          DEFAULT: '#b68125',
          dark: '#9a6c1e',
          light: '#d4a346',
          extralight: '#f9f5ec',
        },
        light: '#FFFFFF',
        dark: '#0a0f10',
        text: {
          DEFAULT: '#1a1a1a',
          light: '#4a4a4a',
        },
        border: '#e8a918',
      },
    }
  },
  plugins: [],
}