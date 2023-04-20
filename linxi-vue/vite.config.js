// 引入vite
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// WindiCSS样式模块
import WindiCSS from 'vite-plugin-windicss'
// 引入路径
import path from "path"
// 引入图片压缩插件
// import viteImagemin from 'vite-plugin-imagemin'


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // src目录别名
    alias: {
      "~": path.resolve(__dirname, "src"),
    }
  },

  // 配置前端服务地址和端口
  server: {
    // 前端地址
    host: '0.0.0.0',
    // 前端端口
    port: 8080,
    // 启动成功自动打开浏览器
    // open: true,
    // 设置反向代理，跨域
    proxy: {
      '/api': {
        target: 'http://linxi-flask.run.goorm.app',//http://flask.linxi.tk
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },

  plugins: [vue(), WindiCSS()]
})
