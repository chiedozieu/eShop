/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      Roboto:["Roboto", "sans-serif"],
      Poppins:["Poppins", "sans-serif"],
    }, 
    extend: {
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "1300px": "1300px",
        "400px": "400px",
      },
    },
  },
  plugins: [],
}



// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }