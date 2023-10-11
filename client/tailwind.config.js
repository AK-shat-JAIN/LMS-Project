/** @type {import('tailwindcss').Config} */

if(!Object.hasOwn){
  Object.hasOwn = function(obj, key) => {
    return typeof obj === 'object' && obj.hasOwnProperty(key);
  }
}

export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
}

