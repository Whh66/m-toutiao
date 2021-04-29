module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],

      // 配置不要转换的样式文件
      exclude: 'github-markdown'
    }
  }
}
