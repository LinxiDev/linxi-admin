<template>
  <div>
    <el-card shadow="never" class="border-0 pl-[10px]" :body-style="{ padding: '0px' }">
      <!-- 新增|刷新 -->
      <ListHeader @create="AddData_Button" @refresh="GetData" :title="Newtitle" />

      <el-table :data="Data" stripe border style="width: 100%" v-loading="loading">
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="date" label="修改时间" />
        <el-table-column prop="address" label="地址" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="primary" size="small" text @click="UpData_Button(scope.row)">修改</el-button>

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
          :page-size="limit" @current-change="GetData" />
      </div>

      <FormDialog ref="DialogformRef" :title="Formtitle" @submit="FormSubmit" width="40%" :Buttontitle="Buttontitle">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
          <div class="flex justify-between">
            <el-form-item prop="title" label="标题">
              <el-input v-model="form.title" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item prop="username" label="用户名">
              <el-input v-model="form.username" placeholder="用户名"></el-input>
            </el-form-item>
          </div>
          <div class="flex justify-between">
            <el-form-item prop="email" label="邮箱">
              <el-input v-model="form.email" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="date" label="修改时间">
              <el-input v-model="form.date" placeholder="修改时间"></el-input>
            </el-form-item>
          </div>
          <div class="flex-auto">
            <el-form-item prop="address" label="地址">
              <el-input v-model="form.address" placeholder="地址" type="textarea"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </FormDialog>

    </el-card>
  </div>
</template>

<script setup>
import ListHeader from "~/components/ListHeader.vue";
import FormDialog from "~/components/FormDialog.vue";
import { getNoticeList, createNotice, updateNotice, deleteNotice } from "~/api/page"
import { InitForm } from '~/composables/Form.js'
const {
  // 新增按钮标题
  Newtitle,
  // 当前页码
  currentPage,
  // 数据总数量
  total,
  // 分页数量页码
  limit,
  // 页面获取的数据
  Data,
  // 数据板块的加载状态
  loading,
  // 表单按钮标题
  Buttontitle,
  // 表单标题
  Formtitle,
  // 区别新增和修改
  // editId,
  // 表单model
  form,
  // 表单验证规则
  rules,
  // 父级FormDialog的ref
  DialogformRef,
  // 表单el-form的ref
  formRef,
  // 获取页面数据
  GetData,
  // 新增数据按钮
  AddData_Button,
  // 修改|更新数据按钮
  UpData_Button,
  // 删除数据按钮
  DelData_Button,
  // 绑定FormDialog弹窗表单按钮事件
  FormSubmit
} = InitForm({
  title: "表格数据",
  // 搜索表单
  // searchKeyword: "",
  form: {
    title: "",
    username: "",
    email: "",
    date: "",
    address: ""
  },
  rules: {
    title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
    date: [{ required: true, message: '修改日期不能为空', trigger: 'blur' }],
    address: [{ required: false, message: '地址不能为空', trigger: 'blur' }]
  },
  Buttontitle_value: {
    title_1: '更新数据',
    title_2: '新增数据'
  },
  Formtitle_value: {
    title_1: '更新列表数据',
    title_2: '新增列表数据'
  },
  getdata: getNoticeList,
  updata: updateNotice,
  adddata: createNotice,
  deldata: deleteNotice
})
</script>