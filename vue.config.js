const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV !== 'development'
const autoprefixer = require('autoprefixer')

module.exports = {
  // 项目部署的基本url
  // baseUrl: '',

  // 打包到dist文件下
  outputDir: 'dist',

  // 静态资源目录
  assetsDir: 'static',

  // 关闭生产 SourceMap
  productionSourceMap: process.env.NODE_ENV !== 'production',

  css: {
    extract: true,
    sourceMap: process.env.NODE_ENV !== 'production',
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer()
        ]
      },
      sass: {
        prependData: `@import "@/assets/common.scss";`
      }
    }
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
  },

  configureWebpack: config => {
    // config.externals = {
    //   vue: 'Vue',
    //   'vue-router': 'VueRouter',
    //   axios: 'axios',
    //   AMap: 'window.AMap',
    //   vant: 'vant'
    // }

    //文件夹别名
    // config.resolve = {
    //   alias: {
    //
    //   }
    // }

    if (isProduction) {
      // 打包生产.gz包
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
      // 添加自定义代码压缩配置
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true
              // drop_console: true
            }
          },
          sourceMap: process.env.NODE_ENV !== 'production',
          parallel: true
        })
      )
    }
  },

  devServer: {
    open: true,
    host: 'localhost',
    port: 9888,
    // proxy: {
    //   // '/api': {
    //   //   target: 'http://dev.kzgcnj.com',
    //   //   changeOrigin: true
    //   // }
    //   // '/admin': {
    //   //   target: 'http://www.kzgcnj.com',
    //   //   changeOrigin: true
    //   // }
    // }
  }
}
