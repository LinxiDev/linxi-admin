// 消息提示模块
import { ElNotification,ElMessageBox } from 'element-plus'
// 进度条样式
import nprogress from 'nprogress'
// 消息提示
export function toast(message,type = "success",dangerouslyUseHTMLString = false){
    ElNotification({
      // 消息内容
        message,
      // 类型
        type,
        dangerouslyUseHTMLString,
      // 显示时间
        duration:2000
    })
}

// 显示全屏loading
export function showFullLoading(){
  nprogress.start()
}

// 隐藏全屏loading
export function hideFullLoading(){
  nprogress.done()
}

// 弹出提示框
export function showModal(content = "提示内容",type = "warning",title = ""){
    return ElMessageBox.confirm(
        content,
        title,
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type,
        }
      )
}
