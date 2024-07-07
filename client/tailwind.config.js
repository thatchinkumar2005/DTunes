/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0C0C0C",
        text: "#F4F9F9",
        primary: "#526D82",
        secondary: "#27374D",
        button: "#F2613F",
      },
    },
  },
  plugins: [],
};
