// 引入状态管理
import { createStore } from "vuex";
// 引入登陆和获取菜单接口
import { login, getinfo } from "~/api/manager";
// 得到token后设置和删除
import { setToken, removeToken } from "~/composables/auth";

// 实例化状态管理
const store = createStore({
  state() {
    return {
      // 用户信息数据
      user: {},
      // 后台标题: 供Header模块菜单收缩使用
      title: "后台管理",
      // 侧边菜单宽度: 供Header模块菜单收缩使用
      asideWidth: "200px",
      // 后端传进来的菜单列表
      menus: [],

      // ruleNames: [],
    };
  },
  mutations: {
    // 记录用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    },
    // 展开/缩起侧边 和 标题收缩
    handleAsideWidth(state) {
      state.title = state.title == "后台管理" ? undefined : "后台管理";
      state.asideWidth = state.asideWidth == "200px" ? "50px" : "200px";
    },
    // 设置菜单数据
    SET_MENUS(state, menu) {
      state.menus = menu;
    },

    // SET_RULENAMES(state, ruleNames) {
    //   state.ruleNames = ruleNames;
    // },
  },
  actions: {
    // 登录-提交用户名和密码
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login(username, password)
          .then((res) => {
            // 登陆成功,设置token
            setToken(res.token);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    // 获取当前登录用户信息
    getinfo({ commit }) {
      return new Promise((resolve, reject) => {
        getinfo()
          .then((res) => {
            // 获取成功
            // 提交数据给用户信息
            commit("SET_USERINFO", res);
            // 提交菜单数据给菜单列表
            commit("SET_MENUS", res.menus);

            // commit("SET_RULENAMES", res.ruleNames);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    // 退出登录
    logout({ commit }) {
      // 移除cookie里的token
      removeToken();
      // 清除当前用户状态 vuex
      commit("SET_USERINFO", {});
    },
  },
});

export default store;
