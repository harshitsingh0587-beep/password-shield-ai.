/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#060913',
          card: 'rgba(15, 23, 42, 0.75)',
          border: 'rgba(56, 189, 248, 0.2)',
          accent: '#00ff9d',
          cyan: '#06b6d4',
          purple: '#8b5cf6',
          pink: '#ec4899',
          danger: '#ef4444',
          warning: '#f59e0b',
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
        'cyber-grid': 'cyberGrid 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(0, 255, 157, 0.3))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 25px rgba(6, 182, 212, 0.6))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
