// 引入cookie管理
import { useCookies } from '@vueuse/integrations/useCookies'


// 设置token的key值
const TokenKey = "Authorization-token"
// 实例化cookie
const cookie = useCookies()

// 获取token
export function getToken(){
    return cookie.get(TokenKey)
}

// 设置token
export function setToken(token){
    return cookie.set(TokenKey,token)
}

// 清除token
export function removeToken(){
    // 清除菜单标签
    cookie.remove("tabList")
    return cookie.remove(TokenKey)
}