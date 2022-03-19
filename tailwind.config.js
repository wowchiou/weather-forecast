module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        notoSansTC: ['Noto Sans TC', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
