module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport-rxdey': {
      viewportWidth: 750,
      unitPrecision: 3,
      viewportUnit: 'rem',
      selectorBlackList: ['.ignore'],
      minPixelValue: 1,
      multiple: 10,
      rules: {
        path: ['vant'],
        fn(pixels, vw) {
          return `${vw * 2}rem`;
        },
      },
    },
  },
};
