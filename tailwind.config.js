/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F0',
          100: '#FFEADD',
          200: '#FFD5BB',
          300: '#FFC099',
          400: '#FFAB77',
          500: '#FF9655',
          600: '#FF7F33',
          700: '#FF6811',
          800: '#EE5400',
          900: '#CC4700',
        },
        secondary: {
          50: '#F5F0FF',
          100: '#EBE0FF',
          200: '#D6C2FF',
          300: '#C2A3FF',
          400: '#AD85FF',
          500: '#9966FF',
          600: '#8547FF',
          700: '#7029FF',
          800: '#5C0BFF',
          900: '#4B00D6',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF5F1F 0%, #FF9A5A 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #8A2BE2 0%, #C29FFF 100%)',
        'gradient-mixed': 'linear-gradient(135deg, #FF5F1F 0%, #9966FF 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};