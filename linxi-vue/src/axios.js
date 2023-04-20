// 引入axios
import axios from "axios"
// 消息提醒
import { toast } from '~/composables/util'
// 获取token
import { getToken } from '~/composables/auth'
// 获取状态管理
import store from "./store"
// 引入加载动画状态
import { ElLoading } from 'element-plus'

// 创建实例axios
const service = axios.create({
  // 定义api接口替代域名
  baseURL: import.meta.env.VITE_APP_BASE_API,
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 
  // 往header头自动添加token
  const token = getToken()
  // 如果有token
  if (token) {
    // 添加到请求头
    config.headers["token"] = token
  }

  return config;
}, function (error) {
  // 如果没有token 返回错误提示
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {

  // 返回响应数据
  return response.data;
}, function (error) {
  // 如果获取失败则获取错误提示
  const msg = error.response.data.msg || "请求失败"
  // 如果非法token
  if (msg == "非法token，请先登录！" || msg == "token已失效") {
    // 退出登陆并刷新
    store.dispatch("logout").finally(() => location.reload())
  }
  // 错误提示
  toast(msg, "error")

  return Promise.reject(error);
})

export default service