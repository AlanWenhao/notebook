import babel from 'rollup-plugin-babel';

export default {
  input: './index.js',
  output: {
    file: '../website/client/bundle.js',
    format: 'umd' // 统一模块化，支持AMD、CMD、commonjs、es6规范
  },
  watch: {
    exclude: 'node_modules/**'
  },
  plugins: [
    babel({
      babelrc: false,
      presets: [
        '@babel/preset-env'
      ]
    })
  ]
}
