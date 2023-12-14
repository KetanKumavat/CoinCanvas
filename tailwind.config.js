/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'Green' : '#107028'
      }
    },
  },
  plugins: [require("daisyui")],
};
