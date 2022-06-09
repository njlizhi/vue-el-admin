const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    allowedHosts: [
      "njlz.natapp1.cc", // 允许访问的域名地址，即花生壳内网穿透的地址
      "njlz.natapp1.cc" // .是二级域名的通配符
    ]
  }
})
