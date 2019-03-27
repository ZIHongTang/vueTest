module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? 'http://infomation.pub/html/dist' : '',

  // filenameHashing: false,
  // filenameHashing: false,
  productionSourceMap: false,
  css: {
    extract: false,
    modules: false,
    sourceMap: false,
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
