// 引入路由和添加路由
import { router, addRoutes } from "~/router";
// 获取Token
import { getToken } from "~/composables/auth";
// 消息通知、进度条加载、进度条隐藏
import { toast, showFullLoading, hideFullLoading } from "~/composables/util";
// 状态管理
import store from "./store";

// 全局前置守卫
let hasGetInfo = false;
router.beforeEach(async (to, from, next) => {
  
  // 显示loading进度条
  showFullLoading();
  // 获取token
  const token = getToken();

  // 没有登录，强制跳转回登录页,可随意访问可视化大屏/路径
  if (!token && to.path != "/login" && to.path != "/" ) {
    // 消息提醒
    toast("请先登录", "error");
    // 跳转路径
    return next({ path: "/login" });
  }

  // 防止重复登录
  if (token && to.path == "/login") {
    // 消息提醒
    toast("请勿重复登录", "error");
    // 从哪来返回哪里
    return next({ path: from.path ? from.path : "/home" });
  }

  // 如果用户登录了，自动获取用户信息，并存储在vuex当中
  let hasNewRoutes = false;
  // 有token存在
  if (token && !hasGetInfo) {
    // 获取返回响应数据中的menus
    let { menus } = await store.dispatch("getinfo")
    // 查看是否成功执行异步操作,防止加载太快异步失败,如果没有数据则重新执行操作
    if (menus == null){
      menus = await store.dispatch("getinfo")
    }
    hasGetInfo = true
    //动态添加路由
    hasNewRoutes = addRoutes(menus)
  }

  // 设置页面标题
  let title = (to.meta.title ? to.meta.title : "林夕") + "-后台管理系统";
  document.title = title;

  // 如果有新路由则指定path,否则放行
  hasNewRoutes ? next(to.fullPath) : next();
});

// 全局后置守卫
router.afterEach((to, from) => hideFullLoading());
