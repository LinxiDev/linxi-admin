// 引入axios
import axios from '~/axios'

// 表格接口
export function getNoticeList(page){
  return axios.get(`/getUserList/${page}`)
}

export function createNotice(data){
  return axios.post("/addUserlist",data)
}

export function updateNotice(id,data){
  return axios.post("/updateList/"+id,data)
}

export function deleteNotice(id){
  return axios.post(`/deleteList/${id}`)
}