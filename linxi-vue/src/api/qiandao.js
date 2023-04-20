// 引入axios
import axios from '~/axios'

// 签到日志获取
export function getTodolog(page) {
    return axios.get(`/getUserList/${page}`)
}
// 签到日志删除
export function delTodolog(id) {
    return axios.post(`/deleteList/${id}`)
}

// 签到卡片列表接口
export function getTodolists() {
    return axios.get("/gettodolist")
}

// 添加签到数据
export function addTodoList(data) {
    return axios.post("/addtodoList", { data })
}
// 更新(编辑)签到数据
export function upTodoList(id, data) {
    return axios.post("/uptodoList/" + id, data)
}
// 删除签到数据
export function delTodolist(id) {
    return axios.post("/deltodolist/" + id)
}