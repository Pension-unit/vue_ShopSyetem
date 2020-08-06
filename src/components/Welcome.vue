<!--  -->
<template>
  <div id="app">
    <el-card>
      <div id="main" style="width: 80vw;height:400px;"></div>
    </el-card>
    <div style="margin-top:30px"></div>
    <el-card>
      <div style="display:flex">
        <div id="pie" style="width: 30vw;height:400px;"></div>
        <div id="radar" style="width: 30vw;height:400px;"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import echarts from 'echarts'
export default {
  name: 'app',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      option: {
        legend: {
          data: ['收入', '毛利润', '收入增长率', '利润增长率'],
          bottom: 20,
        },
        title: {
          text: '分公司业绩总览(2021年财报)',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56',
            },
          },
        },
        xAxis: {
          type: 'category',
          data: [
            '北京',
            '上海',
            '广州',
            '深圳',
            '浙江',
            '湖北',
            '四川',
            '湖南',
            '安徽',
            '辽宁',
            '海外',
          ],
        },
        yAxis: [
          {
            type: 'value',
            name: '收入',
            min: 0,
            max: 4000,
            position: 'left',
            axisLine: {
              lineStyle: {
                color: '#ccc',
              },
            },
            axisLabel: {
              formatter: '{value} W',
            },
          },
          {
            type: 'value',
            name: '收入增长率',
            min: 0,
            max: 100,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: '#ccc',
              },
            },
            axisLabel: {
              formatter: '{value} %',
            },
          },
        ],

        series: [
          {
            name: '收入',
            data: [1200, 2000, 1500, 800, 700, 1100, 1300, 700, 1100, 1300],
            type: 'bar',
            color: '#c3b6e6',
          },
          {
            name: '毛利润',
            data: [600, 1000, 750, 400, 300, 500, 600, 300, 500, 600],
            type: 'bar',
            color: '#71d4d4',
          },
          {
            name: '收入增长率',
            data: [3000, 3000, 3500, 3000, 2500, 2550, 3000, 2500, 2550, 3000],
            type: 'line',
            color: '#a3d2f6',
          },
          {
            name: '利润增长率',
            data: [2300, 2600, 2200, 2300, 2400, 2500, 2300, 2400, 2500, 2300],
            type: 'line',
            color: '#facfa9',
          },
        ],
      },
      optionpie: {
        backgroundColor: '#fff',

        title: {
          text: '产品品类分布总览南丁格尔饼图',
          left: 'center',
          top: 20,
          textStyle: {
            color: 'skyblue',
          },
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1],
          },
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '运动户外' },
              { value: 310, name: '家具电器' },
              { value: 274, name: '手机数码' },
              { value: 235, name: '汽车用品' },
            ].sort(function (a, b) {
              return a.value - b.value
            }),
            roseType: 'radius',
            label: {
              color: 'black',
            },
            labelLine: {
              lineStyle: {
                color: 'black',
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            },
          },
        ],
      },
      optionRadar: {
        title: {
          text: '订单总览雷达图',
        },
        tooltip: {},
        legend: {
            bottom: 0,
          data: ['预算数量', '下单数量', '发货数量'],
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: [
            { name: '家具厨具', max: 6500 },
            { name: '运动户外', max: 16000 },
            { name: '家用电器', max: 30000 },
            { name: '汽车用品', max: 38000 },
            { name: '服装腰包', max: 52000 },
            { name: '手机数码', max: 25000 },
          ],
        },
        series: [
          {
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: '预算数量',
              },
              {
                value: [5000, 14000, 25000, 21000, 32000, 11000],
                name: '下单数量',
              },
              {
                value: [5000, 10000, 23000, 3100, 4200, 2500],
                name: '发货数量',
              },
            ],
          },
        ],
      },
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    var myChart = echarts.init(document.getElementById('main'))
    myChart.setOption(this.option)
    var myChart = echarts.init(document.getElementById('pie'))
    myChart.setOption(this.optionpie)
    var myChart = echarts.init(document.getElementById('radar'))
    myChart.setOption(this.optionRadar)
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
</style>