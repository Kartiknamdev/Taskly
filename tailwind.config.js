/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: { 
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        navy: {
          900: '#0f1b2d',
          800: '#16273d',
          700: '#1f3552'
        }
      },
      boxShadow: {
        card: '0 4px 24px -4px rgba(0,0,0,0.25)'
      }
    } 
  },
  plugins: [function({ addUtilities }) {
    addUtilities({
      '.scrollbar-hide': {
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': { display: 'none' }
      }
    });
  }],
};

