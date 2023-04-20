<template>
  <div id="app" style="width: 100%;">
    <dv-full-screen-container style="background: #01133d;width: 100%">
      <dv-border-box-11 title="智慧服务" class="flex">
        <div class="container">
          <div class="itme" :style="{ width: '70%', height: '100%' }">
            <!-- 用于设置echarts元素的-->
              <dv-border-box-10 class="p-2">
                <el-carousel trigger="click" height="500px">
                  <el-carousel-item v-for="item in srcitem" :key="item">
                    <img :src="item" style="width:100%;height:100%;" alt="">
                  </el-carousel-item>
                </el-carousel>
              </dv-border-box-10>
          </div>
          <div class="itme" :style="{ width: '30%', height: '100%' }">
            <div style="width: 95%;height: 50%;float: left;padding-bottom: 1%;">
              <dv-border-box-10 class="p-2">
                <dv-capsule-chart :config="config2" style="width:100%;height:100%" />
              </dv-border-box-10>
            </div>
            <div style="width: 95%;height: 50%;float: left;">
              <dv-border-box-10 class="p-3">
                <dv-scroll-ranking-board :config="config3" style="width:100%;height:100%" />
              </dv-border-box-10>
            </div>
          </div>

        </div>
        <div class="footer">
          <div class="itme" :style="{ width: '100%', height: '70%' }">
            <div style="width: 98.6%;height: 100%;float: left;margin-right: 10px">
              <dv-border-box-10>
                <dv-scroll-board :config="config4" class="p-2" style="width:100%;height:220px" />
              </dv-border-box-10>
            </div>
          </div>

        </div>
      </dv-border-box-11>
    </dv-full-screen-container>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const srcitem = reactive([
  'http://www.qiku.com/static/img/product/n7lite/index-bg1.jpg',
  'http://www.qiku.com/static/img/product/n7lite/index-bg3.jpg',
  'http://www.qiku.com/static/img/product/n7lite/index-bg8.jpg',
  'http://www.qiku.com/static/img/product/n7lite/index-bg81.jpg',
  'http://www.qiku.com/static/img/product/n7lite/index-bg9.jpg'
])

const config2 = reactive({
  data: [
    {
      name: '南阳',
      value: 167
    },
    {
      name: '周口',
      value: 123
    },
    {
      name: '漯河',
      value: 98
    },
    {
      name: '郑州',
      value: 75
    },
    {
      name: '西峡',
      value: 66
    },
  ],
  colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
  unit: '单位',
  showValue: true
})
const config3 = reactive({
  data: [
    {
      name: '周口',
      value: 55
    },
    {
      name: '南阳',
      value: 120
    },
    {
      name: '西峡',
      value: 78
    },
    {
      name: '驻马店',
      value: 66
    },
    {
      name: '新乡',
      value: 80
    },
    {
      name: '信阳',
      value: 45
    },
    {
      name: '漯河',
      value: 29
    }
  ]
})
const config4 = reactive({
  header: ['列1', '列2', '列3'],
  data: [
    ['行1列1', '行1列2', '行1列3'],
    ['行2列1', '行2列2', '行2列3'],
    ['行3列1', '行3列2', '行3列3'],
    ['行4列1', '行4列2', '行4列3'],
    ['行5列1', '行5列2', '行5列3'],
    ['行6列1', '行6列2', '行6列3'],
    ['行7列1', '行7列2', '行7列3'],
    ['行8列1', '行8列2', '行8列3'],
    ['行9列1', '行9列2', '行9列3'],
    ['行10列1', '行10列2', '行10列3']
  ],
  index: true,
  columnWidth: [50],
  align: ['center'],
  headerBGC: '00',
})

</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.itme {
  float: left;
  padding: 0px 0px 0px 0px;
  margin: 75px 0px 0px 9px;
}

.container {
  height: 60%;
  width: 99%;
  padding-left: 1%;
  flex-direction: row;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: flex-start;
}

.footer {
  height: 40%;
  padding-left: 1%;
  padding-top: 1%;
  flex-direction: row;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: flex-start;
}
</style>