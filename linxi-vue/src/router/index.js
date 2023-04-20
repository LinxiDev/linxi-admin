// 引入vue-router官方路由
import { createRouter, createWebHashHistory } from "vue-router";
// 引入各类页面
// 后台框架
import Admin from "~/layouts/admin.vue";
// 后台首页
import Index from "~/pages/index.vue";
// 登陆页
import Login from "~/pages/login.vue";
// 404页面
import NotFound from "~/pages/404.vue";
// 卡片列表
import CardData from "~/pages/page/card.vue";
// 表格列表
import TableData from "~/pages/page/table.vue";
// 系统参数设置
import Config from "~/pages/system/config.vue";
// 菜单管理
import MenusList from "~/pages/system/menus.vue";
// 个人中心
import User from "~/pages/user/user.vue";
// 签到任务
import Todolist from "~/pages/qiandao/todolist.vue";
// 运行日志
import Todolog from "~/pages/qiandao/todolog.vue";




// 可视化大屏
import Bigscreen from "~/pages/screen/index.vue"

//默认路由,所有用户共享
const routes = [
  // 后台框架
  {
    path: "/home",
    name: "admin",
    component: Admin,
  },
  {
    path: "/",
    component: Bigscreen,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: "登录页",
    },
  },
  // 404匹配规则
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

//动态匹配添加路由
const asyncRoutes = [
  // 后台首页页面
  {
    // 后台首页
    path:"/home",
    name:"/home",
    component: Index,
    meta:{
      title:""
    },
  },
  // 添加路由实际页面
  {
    // 卡片数据
    path: "/card",
    component: CardData,
    meta: {
      title: "",
    },
  },
  {
    // 表格数据
    path: "/table",
    component: TableData,
    meta: {
      title: "",
    },
  }
  ,
  {
    // 参数配置
    path: "/sys/config",
    component: Config,
    meta: {
      title: "",
    },
  }
  ,
  {
    // 菜单管理
    path: "/sys/menus",
    component: MenusList,
    meta: {
      title: "",
    },
  }
  ,
  {
    // 个人中心
    path: "/user",
    component: User,
    meta: {
      title: "",
    },
  },
  {
    // 签到任务
    path: "/todolist",
    component: Todolist,
    meta: {
      title: "",
    },
  },
  {
    // 运行日志
    path: "/todolog",
    component: Todolog,
    meta: {
      title: "",
    },
  },
  
];

// 传入菜单数据设置菜单标题

// 创建实例化路由
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//动态添加路由方法
export function addRoutes(menus) {
  //是否有新的路由
  let hasNewRoutes = false;
  // 创建方法
  const findAndAddRoutesByMenus = (arr) => {
    // 遍历得到每个菜单项
    arr.forEach(e => {
      // 遍历动态路由列表
      let item = asyncRoutes.find((o) => o.path == e.path);
      // 判断路由是否存在
      if (item && !router.hasRoute(item.path)) {
        // 设置标题为获取到的name值
        item.meta.title=e.name
        // 指定父级路由
        router.addRoute("admin", item);
        // 设置标题
        hasNewRoutes = true;
      }
      //子路由,并且长度大于0,即添加子路由
      if (e.secMenus && e.secMenus.length > 0) {
        // 执行方法添加子路由
        findAndAddRoutesByMenus(e.secMenus);
      }
    });
  };
  // 执行方法
  findAndAddRoutesByMenus(menus)

  // console.log("获取路由",router.getRoutes());
  return hasNewRoutes;
}
