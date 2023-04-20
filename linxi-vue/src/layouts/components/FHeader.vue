<template>
    <div class="f-header">
        <span class="logo" :style="{ width: $store.state.asideWidth }">
            <el-icon class="mr-0" :size="24">
                <Promotion />
            </el-icon>
            <!-- 距离左边图标边距 -->
            <div class="ml-1">{{$store.state.title}}</div>
        </span>
        <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
            <fold v-if="$store.state.asideWidth == '200px'"/>
            <Expand v-else/>
        </el-icon>

        <div class="ml-auto flex items-center">
            <el-tooltip effect="dark" content="刷新" placement="bottom">
                <el-icon class="icon-btn" @click="handleRefresh">
                    <refresh />
                </el-icon>
            </el-tooltip>
            <el-tooltip effect="dark" content="全屏" placement="bottom">
                <el-icon class="icon-btn" @click="toggle">
                    <full-screen v-if="!isFullscreen" />
                    <aim v-else />
                </el-icon>
            </el-tooltip>

            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-gray-700">
                    <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.name }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

    <FormDialog ref="formDrawerRef" title="修改密码" width="30%" destroyOnClose @submit="onSubmit">
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="default">
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password></el-input>
            </el-form-item>
        </el-form>
    </FormDialog>

</template>
<script setup>
import FormDialog from '~/components/FormDialog.vue'
import { useFullscreen } from '@vueuse/core'
import { useRepassword,useLogout } from "~/composables/LoginManage"
const {
    // 是否全屏状态
    isFullscreen,
    // 切换全屏
    toggle
} = useFullscreen()

const { formDrawerRef,form,rules,formRef,onSubmit,openRePasswordForm} = useRepassword()

const {handleLogout} = useLogout()

const handleCommand = (c) => {
    switch (c) {
        case "logout":
            handleLogout()
            break;
        case "rePassword":
            openRePasswordForm()
            break;
    }
}

// 刷新
const handleRefresh = () => location.reload()

</script>
<style>
.f-header {
    @apply flex items-center bg-light-400 text-gray-500 fixed top-0 left-0 right-0;
    height: 50px;
    z-index: 1000;
}

.logo {
    /* width: 200px; */
    @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 50px;
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-gray-400;
}

.f-header .dropdown {
    height: 50px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5;
}
</style>