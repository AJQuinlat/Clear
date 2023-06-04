/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        isko: {
          "primary": "#8A1538",
          "secondary": "#00573F",
          "accent": "#BC8816",
          "neutral": "#3D4451",
          "base-100": "#ffffff",
          "base-200": "#f2f2f2",
          "base-300": "#e7e7e7",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#B71c1c",
          "black": "000000"
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

