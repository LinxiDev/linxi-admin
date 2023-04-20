<template>
    <el-container>
        <el-header>
            <f-header />
        </el-header>
        <el-container>
            <el-aside :width="$store.state.asideWidth">
                <f-menu></f-menu>
            </el-aside>
            <el-main>
                <f-tag-list />
                    <router-view v-slot="{ Component }">
                        <transition name="fade">
                            <keep-alive :max="10">
                                <component :is="Component"></component>
                            </keep-alive>
                        </transition>
                    </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script setup>
import FHeader from './components/FHeader.vue';
import FMenu from './components/FMenu.vue';
import FTagList from './components/FTagList.vue';

</script>
<style>
.el-aside {
    transition: all 0.2s;
}

/* 进入之前动画 */
.fade-enter-from {
    opacity: 0;
}

/* 进入之后动画 */
.fade-enter-to {
    opacity: 1;
}

/* 离开之前动画 */
.fade-leave-from {
    opacity: 1;
}

/* 离开之前动画 */
.fade-leave-to {
    opacity: 0;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
    transition: all .3s;
}

/* 延迟进入 先执行离开 */
.fade-enter-active {
    transition-delay: .3s;
}
</style>