// 创建app
import { createApp } from "vue";
// 引入ElementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 引入默认页面
import App from "./App.vue";
// 引入官方路由
import { router } from "./router";
// 引入状态管理
import store from "./store";
// 引入ElementPlus图标库
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 引入中文:时间选择器中文
import zhCn from "element-plus/es/locale/lang/zh-cn";
// 将大屏数据可视化自动注册所有组件为全局组件
// import DataVVue3 from '@kjgl77/datav-vue3'


// 实例化vue
const app = createApp(App);

// 屏蔽警告信息VUE warn
// app.config.warnHandler = () => null;

// 全局注册
// app.use(DataVVue3);

// 引用状态管理
app.use(store);
// 引用vue路由
app.use(router);
// 引用ElementPlus,加载中文
app.use(ElementPlus,{locale: zhCn});
// 全局注册ElementPlus图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 引入WindiCSS
import "virtual:windi.css";
// 引入permission.js
import "./permission";
// 引入进度条样式
import "nprogress/nprogress.css";

app.mount("#app");