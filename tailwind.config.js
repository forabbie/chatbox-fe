/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,scss}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        'primary-50': '#f5e6f7',
        'primary-100': '#e6cce9',
        'primary-200': '#ce99d2',
        'primary-300': '#b366ba',
        'primary-400': '#944099',
        'primary-500': '#611f69',
        'primary-600': '#551b5d',
        'primary-700': '#47174e',
        'primary-800': '#39123e',
        'primary-900': '#2b0d2f',
        'primary-950': '#1c081f',
        primary: '#696BFF',
        'primary-dark': '#5146EC',
        'slack-primary': '#1d1d1d',
        'slack-secondary': '#36c5f0'
      }
    }
  },
  plugins: []
}
