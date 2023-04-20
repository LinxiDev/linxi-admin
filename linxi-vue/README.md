
### 项目简介：

# 💐💐💐 `Vue3.2` + `Element-Plus` + `Vite2` + `vuex` 后台管理系统

### 采用技术

- `Vue3.2 + Vue-router4 + Vuex4 + Vite2 + Vueuse`
- `ElementPlus`
- `Naive-ui`
- `Windicss`

### 前言 📖

项目基于 Vue3.2、Javascript、Vite2、vuex、Element-Plus 开发的一套后台管理模板，目前利用空余时间开发 🕒🕒🕒🕒。项目中借鉴很多优秀的后台管理系统，从 0 开始搭建项目，整个项目还有很多地方不完善。

### ？为什么开发这个管理系统 👩‍🔬

- 主要是想把自己常用的组件进行一个封装 二次巩固
- 目前看了很多优秀的 Vue3 的开源后台管理系统，感觉都非常庞大（想开发一套适合自己的）

### 一、在线预览 🛫

- Link：http://blog.linxi.tk/#/login


### 二、本地预览 🛫🛫🛫

```
git clone 项目地址

npm install  (依赖安装失败可以尝试cnpm install)

npm run dev
```

### 三、🔨 项目功能

- 🚀 使用 Vue3.2 开发，单文件组件 `＜script setup＞`开发
- 🚀 采用动态路由菜单模式
- 🚀 数据由Flask后端提供
- 🚀 使用 Vuex getter 模块化管理（ 加入了持久化插件）
- 🚀 Axios 的二次封装 （全局错误拦截、常用请求封装、全局请求 Loading、取消重复请求……）
- 🚀 对 el-table 组件进行的二次封装
- 🚀 使用 vue-router 进行路由权限拦截（403 页面）、页面按钮权限配置、路由懒加载
- 🚀 vite.config.js 打包配置(静态资源合并打包/清除 log/gzip 压缩配置等)

### 四、项目截图 📷


### 五、文件资源目录 📚

```text
├─ .vscode                # vscode推荐配置
├─ public                 # 静态资源文件
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ composables         # 全局工具库API封装(新增、删除、更新、获取函数的封装）
│  ├─ layout              # 框架布局
│  ├─ router              # 路由管理
│  ├─ store               # VUEX模块化管理
│  ├─ pages               # 项目所有页面
│  ├─ App.vue             # 入口页面
│  ├─ axios.js            # Axios封装
│  ├─ permission.js       # 权限管理
│  └─ main.js             # 入口文件
└─ vite.config.ts         # vite 配置
```

### 六、项目后台接口 🧩🧐

> 项目后台接口: `Falsk` + `Sqlite3` 等部署后端数据API


### 七、所用技术栈

```npm
npm install vite -D

npm i -D vite-plugin-windicss windicss

npm install element-plus --save

npm install @element-plus/icons-vue

npm install axios

npm install vue-router@4

npm i @vueuse/integrations

// 下面的要依赖上面这个库
npm i @vueuse/integrations
npm i universal-cookie

cpm install vuex@next --save

cpm install --save nprogress

//图片压缩
cpm i unplugin-imagemin -D

// 可视化大屏
// npm install @jiaminghi/data-view
// Echarts
// npm install echarts --save
```
### 报错处理

#### dataV问题：`@jiaminghi/data-view `  问题如下解决办法:
``` npm
1、安装DataV：npm install @jiaminghi/data-view
2、将node_modules/@jiaminghi/data-view/lib/components/decoration3/src/main.vue中rect标签的:key="i"剪切到有v-for那一层的template中。
3、将node_modules/@jiaminghi/data-view/lib/components/decoration6/src/main.vue中rect标签的:key="i"剪切到有v-for那一层的template中。
  7  |        >
  8  |          <rect
  9  |            :key="i"
     |             ^
  10 |            :fill="mergedColor[0]"
  11 |            :x="point[0] - halfPointSideLength"
//原文件
<template
        v-for="(point, i) in points"
      >
        <rect
          :key="i"
          :fill="mergedColor[0]"
          :x="point[0] - halfPointSideLength"
          :y="point[1] - halfPointSideLength"
          :width="pointSideLength"
          :height="pointSideLength"
        >
//修改后
<template
        v-for="(point, i) in points " :key="i"
      >
        <rect
          :fill="mergedColor[0]"
          :x="point[0] - halfPointSideLength"
          :y="point[1] - halfPointSideLength"
          :width="pointSideLength"
          :height="pointSideLength"
        >
```