/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "back-gradient": "linear-gradient(to right, #355fa0, #4b71ab, #97c2f5)",
        "table-gradient": "linear-gradient(to top, #efefbb, #d4d3dd)",
        background: "linear-gradient(to right, #1f4e96, #355fa0)",
        "main-background": "linear-gradient(to right, #ece9e6, #ffffff)",
        // "":"linear-gradient(to right, #355fa0, #4b71ab, #97c2f5)",
        "background-opa":
          "linear-gradient(83deg, rgba(31,78,150,0.7021621148459384) 35%, rgba(53,95,160,0.7) 100%)",
        "sidebar-main": "linear-gradient(to left, rgb(31, 78, 150), rgb(99, 44, 228))",
        "sidebar-sub" : "linear-gradient(to right, rgb(31, 78, 150), blue)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin", // For Firefox
          scrollbarColor: "rgb(55, 95, 161) white", // Blue scrollbar color for Firefox
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px", // Width of the scrollbar
          },
          "&::-webkit-scrollbar-track": {
            background: "white", // Background of the track
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgb(55, 95, 161)", // Blue color for the scrollbar thumb
            borderRadius: "20px", // Roundness of the scrollbar
            border: "1px solid white", // Border for the scrollbar thumb
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgb(32, 79, 150) !important", // Darker blue on hover with !important
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
