<template>
    <div>
        <el-col :span="24">
            <el-row :gutter="10">
                <el-col :span="24">
                    <!-- <el-card> -->
                        <!-- <template #header>
                            <span>4k壁纸图API</span>
                        </template> -->
                        <div class="block text-center" :span="24">
                            <!-- <span class="demonstration">随机图片</span> -->
                            <el-carousel height="300px">
                                <el-carousel-item v-for="imgsrc in ImgData" :key="imgsrc">
                                    <img :src="imgsrc" style="width:100%" alt="">
                                    <!-- <h3 class="small justify-center" text="2xl">{{ imgsrc }}</h3> -->
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    <!-- </el-card> -->
                </el-col>
            </el-row>
        </el-col>
        <el-row :gutter="10" class="pt-4">
            <el-col :span="10">
                <el-card class="h-65">
                    <template #header>
                        <div>
                            <span>作者信息</span>
                            <el-button class="button" text><el-tag>看门大爷：林夕</el-tag></el-button>
                        </div>
                        <div>
                            <span>晚上好！愿你天黑有灯，下雨有伞</span>
                            <el-button class="button" text>今天是{{ date }}</el-button>
                        </div>
                    </template>
                    <div class="dirtext">
                        <el-descriptions :column="2" border>
                            <el-descriptions-item label="Github">http://github.com/linxi-520</el-descriptions-item>
                            <el-descriptions-item label="昵称">林夕</el-descriptions-item>
                            <el-descriptions-item label="联系方式" :span="2">木有，根本木有</el-descriptions-item>
                            <el-descriptions-item label="娱乐方式" :span="2">
                                <el-tag class="mr-1">摸鱼</el-tag>
                                <el-tag class="mr-1">摸鱼🐟</el-tag>
                                <el-tag class="mr-1">写代码</el-tag>
                            </el-descriptions-item>
                        </el-descriptions>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="14">
                <el-card class="h-65">
                    <div class="dirtextlist">
                        <el-descriptions title="技术栈" :column="3" border>
                            <el-descriptions-item label="Vue3" label-align="right">
                                <el-tag type="danger">^3.2.25</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="Element-Plus" label-align="right">
                                <el-tag>^2.2.27</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="WindiCSS" label-align="right">
                                <el-tag>^3.5.6</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="Echarts" label-align="right">
                                <el-tag type="danger">^5.3.3</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="Vite" label-align="right">
                                <el-tag>^4.0.3</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="Axios" label-align="right">
                                <el-tag>^1.2.1</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="Vuex" label-align="right">
                                <el-tag type="danger">^4.1.0</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="Vue-Router" label-align="right">
                                <el-tag type="danger">^4.1.6</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="Nprogress" label-align="right">
                                <el-tag>^0.2.0</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="Universal-cookie" label-align="right">
                                <el-tag>^4.0.4</el-tag>
                            </el-descriptions-item>
                        </el-descriptions>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getDateTime } from '~/api/public'
const date = getDateTime()

const ImgData= ref([
'https://api.btstu.cn/sjbz/api.php',
'https://api.r10086.com/img-api.php?type=动漫综合1',
'https://api.yimian.xyz/img',
'https://api.dujin.org/bing/1366.php',
'https://img.paulzzh.com/touhou/random',])

</script>

<style scoped>
.dirtext {
    width: 100%;
}

.dirtextlist {
    width: 100%;
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>