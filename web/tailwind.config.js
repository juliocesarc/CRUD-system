/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-buttom': 'linear-gradient(90deg, rgba(217,0,164,1) 0%, rgba(143,0,219,1) 66%, rgba(0,1,255,1) 100%)'
      }
    },
  },
  plugins: [],
}
