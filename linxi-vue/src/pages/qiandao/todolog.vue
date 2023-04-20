<template>
  <div>
    <el-card shadow="never" class="border-0 pl-[10px]" :body-style="{ padding: '0px' }">
      <el-table :data="Data" stripe border style="width: 100%" v-loading="loading">
        <el-table-column prop="title" label="序号" />
        <el-table-column prop="username" label="签到任务" />
        <el-table-column prop="email" label="所属账号" />
        <el-table-column prop="date" label="执行时间" />
        <el-table-column prop="address" label="执行结果" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-popconfirm title="是否要删除该数据？" confirmButtonText="确认" cancelButtonText="取消"
              @confirm="DelData_Button(scope.row)">
              <template #reference>
                <el-button text type="primary" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex items-center justify-center mt-2">
        <el-pagination background layout="prev, pager ,next" :total="total" :current-page="currentPage"
          :page-size="limit" @current-change="GetDataTable" />
      </div>

    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getTodolog, delTodolog } from "~/api/qiandao"
// 提示框
import { showModal, toast } from "~/composables/util";
// 表单板块加载动画
const loading = ref(false)
// 页面数据
const Data = ref([])
// 分页
const currentPage = ref(1)
// 单页数量
const limit = ref(10)
// 总数量
const total = ref(0)
// table表格页面-打开页面请求数据
function GetDataTable(p = null) {
  if (typeof p == "number") {
    currentPage.value = p
  }
  loading.value = true
  // console.log(p)
  getTodolog(currentPage.value)
    .then(res => {
      Data.value = res.data
      // console.log(res)
      total.value = res.total
    })
    .finally(() => {
      loading.value = false
    })
}
GetDataTable()

// 按钮菜单项删除
const DelData_Button = (index) => {
  showModal("是否确实要删除该条数据?", "warning", "提示")
    .then(() => {
      Data.value.splice(index, 1)
      delTodolog(index.id)
      GetDataTable()
    })
    .catch(() => {

    });
}
</script>