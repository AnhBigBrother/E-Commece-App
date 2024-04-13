/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        permanent: ["Permanent Marker", "cursive"],
      },
      fontSize: {
        logosm: ["34px", "40px"],
        logo: ["40px", "48px"],
      },
    },
  },
  plugins: [],
};
