/* eslint-disable no-undef */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        white :"#fff",
        black: "#000",
        mainBody: "#0f172a",
        sidebarBody:"#0f172a",
        headerBody:"#0f172a",
        layoutBorder:"#374151",
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("daisyui"),
  ],
}

