const girlGuidingColors = require('./src/data/girlguiding-colours.json');
const awardThemeColors = require('./src/data/award-theme-colours.json');

const baseColors = {
  transparent: 'transparent',
  'off-white': '#F5F5F5',
  info: {
    DEFAULT: '#03A9F4',
    dark: '#0288D1',
    light: '#B3E5FC'
  },
  success: {
    DEFAULT: '#8BC34A',
    dark: '#689F38',
    light: '#DCEDC8'
  },
  warning: {
    DEFAULT: '#FF9800',
    dark: '#F57C00',
    light: '#FFE0B2'
  },
  danger: {
    DEFAULT: '#F44336',
    dark: '#D32F2F',
    light: '#FFCDD2'
  }
};

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,css,js,tsx}', './public/index.html'],
  theme: {
    fontFamily: {
      sans: ['Trebuchet MS', 'Frutiger', 'sans-serif'],
      mono: ['Ludicrous', 'monospace']
    },
    extend: {
      colors: {
        ...baseColors,
        ...girlGuidingColors,
        ...awardThemeColors
      }
    }
  },
  plugins: []
};
