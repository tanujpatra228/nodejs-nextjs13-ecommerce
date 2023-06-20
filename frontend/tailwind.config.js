/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'ping-once': {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          }
        }
      },
      animation: {
        'ping-once': 'ping-once 1s cubic-bezier(0, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
