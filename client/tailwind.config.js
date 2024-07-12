/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#141414",
        layout: "#262527",
        text: "#F4F9F9",
        primary: "#333333",
        secondary: "#2a2a2a",
        button: "#F2613F",
      },
    },
  },
  plugins: [],
};
