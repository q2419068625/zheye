// vue 配置代理允许跨域

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.vikingship.xyz',
        ws: true,
        changeOrigin: true,
        
      },
    }
  }
}