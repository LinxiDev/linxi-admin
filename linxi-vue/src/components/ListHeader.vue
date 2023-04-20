<template>
    <div class="flex items-center justify-between mb-4">
        <div>
            <el-button v-if="btns.includes('create')" type="primary" size="default" @click="$emit('create')">{{title}}</el-button>
            <slot></slot>
        </div>
        <div>
            <el-tooltip v-if="btns.includes('refresh')" effect="dark" content="刷新数据" placement="top">
                <el-button size="default" text @click="$emit('refresh')">
                    <el-icon :size="15">
                        <Refresh />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
    layout: {
        type: String,
        default: "create,refresh"
    },
    title: {
        type: String,
        default: "新增数据"
    }
})
const btns = computed(() => props.layout.split(","))

defineEmits(["create", "refresh", "delete", "download"])
</script>