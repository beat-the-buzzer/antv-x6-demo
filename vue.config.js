const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false // 报错提示不覆盖页面
    }
  }
})
