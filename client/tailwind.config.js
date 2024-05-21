/* eslint-disable no-undef */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  //media
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        neutral900: "#171717",
        neutral800: "#262626",
        neutral700: "#262626",
        neutral600: "#4B5563",
        neutral500: "#6B7280",
        neutral400: "#9CA3AF",
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
}



