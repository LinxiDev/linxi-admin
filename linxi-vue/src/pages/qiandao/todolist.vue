<template>
  <div>
    <ListHeader class="ml-[10px]" @create="AddData_Button" @refresh="GetData" :title="Newtitle" />
    <!-- 加载动画 -->
    <el-row v-loading="loading">
      <!-- 遍历数据 offset="1" 控制台查看获取的数据 -->
      <el-col :span="6" v-for="item in Data" :key="item">
        <!-- 阴影动画和样式 -->
        <el-card shadow="hover" class="card_lists">
          <!-- 按钮 -->
          <div class="item-state-pos">
            <el-dropdown>
              <el-icon class="text-blue-400">
                <MoreFilled />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="UpData_Button(item)"><el-icon>
                      <Tools />
                    </el-icon>修改任务</el-dropdown-item>
                  <el-dropdown-item @click="DelData_Button(item)"><el-icon>
                      <DeleteFilled />
                    </el-icon>删除任务</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

          <!-- 头像和标题 -->
          <div class="item-title"><img :src="item.img" alt="">{{ item.title }}</div>
          <!-- 具体数据 -->
          <div class="item-content">
            <div class="cot">
              <div class="cot-tit">创建时间</div>
              <div class="cot-txt">{{ item.date }}</div>
            </div>
            <div class="cot">
              <div class="cot-tit">所属账号</div>
              <div class="cot-txt">{{ item.user_name }}</div>
            </div>
          </div>
          <div class="item-content">
            <div class="cot">
              <div class="cot-tit">频率 <span>{{ item.pl }}</span></div>
            </div>
            <div class="cot">
              <div class="cot-tit">状态<span
                  :class="[item.status == 1 ? 'type suc-type' : item.status == 0 ? 'type' : 'type error-type',]">
                  {{ item.status == 1 ? '运行正常' : item.status == 0 ? '运行失败' : '暂停运行' }}</span>
              </div>
            </div>
          </div>
          <div class="item-content flx-row">
            <div class="cot">
              <div class="cot-tit">备注</div>
              <div class="cot-txt one-cut-txt">{{ item.content }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <FormDialog ref="DialogformRef" :title="Formtitle" width="40%" :Buttontitle="Buttontitle" @submit="FormSubmit">
      <!-- 数据表单 -->
      <el-form :model="form" :rules="rules" ref="formRef" :validate-on-rule-change="false" label-width="80px">
        <div class="flex justify-between">
          <el-form-item label="标题:" prop="title">
            <el-input v-model="form.title" autocomplete="off" />
          </el-form-item>
          <el-form-item label="日期:" prop="date">
            <el-input v-model="form.date" autocomplete="off" />
          </el-form-item>
        </div>
        <div class="flex justify-between">
          <el-form-item label="用户名:" prop="user_name">
            <el-input v-model="form.user_name" />
          </el-form-item>
          <el-form-item label="频率:" prop="pl">
            <el-input v-model="form.pl" />
          </el-form-item>
        </div>
        <div class="flex-auto">
          <el-form-item label="备注:" prop="content">
            <el-input v-model="form.content" />
          </el-form-item>
        </div>
        <div class="text-center">
          <el-radio-group v-model="form.status" prop="status">
            <el-radio :label="1"><span class="text-green-600">运行正常</span></el-radio>
            <el-radio :label="2"><span class="text-light-blue-400">暂停运行</span></el-radio>
            <el-radio :label="0" disabled ><span class="text-red-600">运行失败</span></el-radio>
          </el-radio-group>
        </div>
      </el-form>
    </FormDialog>
  </div>
</template>

<script setup>
// 引入弹窗表单框架,和新增框架
import ListHeader from "~/components/ListHeader.vue";
import FormDialog from "~/components/FormDialog.vue";
// 引入获取卡片列表
import { getTodolists, addTodoList, upTodoList, delTodolist } from '~/api/qiandao';
// 引入弹窗表单处理封装
import { InitForm } from '~/composables/Form'

const {
  // 新增按钮标题
  Newtitle,
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
  title: "卡片数据",
  rules: {
    title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
    date: [{ required: true, message: '请填写日期', trigger: 'blur' }],
    user_name: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
    number: [{ required: true, message: '请填写金额', trigger: 'blur' }],
    content: [{ required: true, message: '请填写备注', trigger: 'blur' }]
  },
  form: {
    title: '',
    date: '',
    user_name: '',
    pl: '',
    content: '',
    status:'',
  },
  Buttontitle_value: {
    title_1: '更新任务',
    title_2: '新增任务'
  },
  Formtitle_value: {
    title_1: '更新卡片任务',
    title_2: '新增卡片任务'
  },
  getdata: getTodolists,
  updata: upTodoList,
  adddata: addTodoList,
  deldata: delTodolist
})
</script>
<style scoped>
/* 卡片样式 */
.card_lists {
  /* 父级 卡片边距 */
  @apply relative m-[10px];
}

/* 菜单按钮 */
.item-state-pos {
  /* 子级 右边距 上边距 大小 圆角*/
  @apply absolute right-1 top-[10px] text-sm rounded-xl;
  /* font-size: 14px; */
  padding: 5px 10px;
}

.item-title {
  /* 块级flex容器 */
  @apply flex text-stroke-dark-500 text-left;
  /* 字体大小 */
  font-size: 16px;
  /* 字体宽度 */
  font-weight: 600;
  /* color: #0f1222; */
  /* text-align: left; */
  vertical-align: top;
  margin-bottom: 15px;
}

.item-title img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 5px;
  vertical-align: text-top;
}

.item-content {
  margin-bottom: 5px;
  @apply flex;
}

.card_lists .item-content .cot {
  flex: 1;
}

.card_lists .item-content .cot .cot-tit {
  font-size: 14px;
  font-weight: 400;
  color: #535875;
  padding-bottom: 5px;
}

.card_lists .item-content .cot .cot-tit span {
  font-size: 14px;
  color: #0f1222;
}

.card_lists .item-content .cot .cot-tit span.type {
  font-size: 10px;
  padding: 5px 10px;
  font-weight: 500;
  line-height: 0px;
  color: #fa4a1e;
  text-align: left;
  border-radius: 6px;
  background: #fa4a1e14;
}

.card_lists .item-content .cot .cot-tit span.type.error-type {
  color: #4060c7;
  background: #e8f3ff;
}

.card_lists .item-content .cot .cot-tit span.type.suc-type {
  color: #48ac4c;
  background: #e2ffef;
}

.card_lists .item-content .cot .cot-txt {
  font-size: 14px;
  font-weight: 400;
  color: #0f1222;
}

.card_lists .item-bottom {
  flex-flow: row-reverse;
}
</style>