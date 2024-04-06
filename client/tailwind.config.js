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
        dark_Body: "#0f172a",
        dark_border: "#374151",
        dark_sidebar_body: "#0f172a",
        dark_header_body: "#0f172a",
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("daisyui"),
  ],
}

