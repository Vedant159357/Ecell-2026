/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        classic: ['Arial', 'Helvetica', 'sans-serif'],
        heading: ['Arial', 'Helvetica', 'sans-serif'],
        modern: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
