// 引入axios
import axios from '~/axios'

// 登陆接口
export function login(username,password){
    return axios.post("/admin/login",{
        username,
        password
    })
}

// 获取菜单信息接口
export function getinfo(){
    return axios.post("/admin/getinfo")
}

// 退出登陆接口
export function logout(){
    return axios.post("/admin/logout")
}

// 修改密码接口
export function updatepassword(data){
    return axios.post("/admin/updatepassword",data)
}

// 修改密码接口
export function updateuser(id,data){
    return axios.post("/admin/updateuser/"+id,data)
}