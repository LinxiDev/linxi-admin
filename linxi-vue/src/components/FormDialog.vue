<!-- 弹出提示框 -->
<template>
    <!-- draggable可拖拽 -->
    <el-dialog v-model="showDrawer" :title="title" :width="width" :destroy-on-close="destroyOnClose" draggable :close-on-click-modal="false">
        <div class="formDrawer">
            <div class="body">
                <!-- 插槽 -->
                <slot></slot>
            </div>
            <div class="actions">
                <el-button type="primary" @click="submit" :loading="loading">{{ Buttontitle }}</el-button>
                <el-button type="default" @click="close">取消</el-button>
            </div>
        </div>
  </el-dialog>
</template>
<script setup>
    import { ref } from "vue"
    const showDrawer = ref(false)

    const props = defineProps({
        title:String,
        width:{
            type:String,
            default:"45%"
        },
        destroyOnClose:{
            type:Boolean,
            default:false
        },
        Buttontitle:{
            type:String,
            default:"提交"
        }
    })

    const loading = ref(false)
    const showLoading = ()=>loading.value = true
    const hideLoading = ()=>loading.value = false

    // 打开
    const open = ()=> showDrawer.value = true

    // 关闭
    const close = ()=>showDrawer.value = false

    // 提交
    const emit = defineEmits(["submit"])
    const submit = ()=> emit("submit")

    // 向父组件暴露以下方法
    defineExpose({
        open,
        close,
        showLoading,
        hideLoading
    })

</script>
<style>
    .formDrawer{
        width: 100%;
        height: 100%;
        position: relative;
        @apply flex flex-col;
    }

    .formDrawer .body{
        bottom: 50px;
        overflow-y: auto;
    }

    .formDrawer .actions{
        height: 50px;
        @apply mt-auto flex items-center justify-center;
    }
</style>