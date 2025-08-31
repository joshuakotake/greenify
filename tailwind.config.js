/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "400px",
        // xs: min-width 400px, so anything below 400px will be the default
      },
    },
  },
  plugins: [],
};
