/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      daisyui: {
        themes: [
          {
            light: {
              ...require("daisyui/src/theming/themes")["light"],
              primary: "#eb9b40", // Your orange color
              "primary-content": "#ffffff", // Text color on primary
            },
            dark: {
              ...require("daisyui/src/theming/themes")["dark"],
              primary: "#d88a36", // Slightly darker orange
              "primary-content": "#ffffff",
            },
          },
        ],
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        "pulse-ring": "pulse-ring 1s ease-out infinite",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(1.5)", opacity: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
