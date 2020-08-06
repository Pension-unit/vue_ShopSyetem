<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <div class="charts_title">用户来源</div>
      <!-- 2. 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 1500px; height:700px; position: relative; top: -100px"></div>
    </el-card>
  </div>
</template>

<script src="https://cdn.bootcss.com/echarts/3.7.1/echarts.min.js"></script>
<script>
// 1. 导入 echarts
import echarts from 'echarts'
import echartsGL from 'echarts-gl'
import _ from 'lodash'

export default {
  data() {
    return {
      // 需要合并的数据
      option: {
        title: {
          text: '用户来源'
        },
        tooltip: {},
        visualMap: {
          max: 16000,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
          },
        },
        xAxis3D: {
          type: 'category',
          data: [],
        },
        yAxis3D: {
          type: 'category',
          data: [],
        },
        zAxis3D: {
          type: 'value',
        },
        grid3D: {
          boxWidth: 200,
          boxDepth: 80,
          light: {
            main: {
              intensity: 1.2,
            },
            ambient: {
              intensity: 0.3,
            },
          },
        },
        series: [
          {
            type: 'bar3D',
            data: [].map(function (item) {
              return {
                value: [item[1], item[0], item[2]],
              }
            }),
            shading: 'color',

            label: {
              show: false,
              textStyle: {
                fontSize: 16,
                borderWidth: 1,
              },
            },

            itemStyle: {
              opacity: 0.4,
            },

            emphasis: {
              label: {
                textStyle: {
                  fontSize: 20,
                  color: '#900',
                },
              },
              itemStyle: {
                color: '#900',
              },
            },
          },
        ],
      },
    }
  },
  created() {},
  // 此时，页面上的元素，已经被渲染完毕了！
  async mounted() {
    // 3. 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))

    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) {
      return this.$message.error('获取折线图数据失败！')
    }

    console.log(res.data)
    console.log('option', this.option.series[0].data)
    // this.option.series[0].data = []
    // 4. 准备数据和配置项

    // 渲染x轴坐标值
    var xAxisArr = []
    res.data.xAxis[0].data.forEach(function (item, index) {
      xAxisArr.push(item)
    })
    this.option.xAxis3D.data = xAxisArr

    // 渲染y轴坐标值
    var yAxisArr = []
    res.data.legend.data.forEach(function (item, index) {
      yAxisArr.push(item)
    })
    this.option.yAxis3D.data = yAxisArr

    // 渲染z轴数值
    var _arr = []
    res.data.series.forEach(function (item, index, arr) {
      let _index = index
      item.data.forEach(function (item, index, arr) {
        // console.log([_index, index, item])
        _arr.push([_index, index, item])
      })
    })
    
    // console.log("_arr", _arr)
    this.option.series[0].data = _arr.map(function (item) {
      return {
        value: [item[1], item[0], item[2]],
      }
    })
    // this.option.series[0].data = []
    const result = this.option

    // 5. 展示数据
    myChart.setOption(result)
  },
  methods: {},
}
</script>

<style lang="less" scoped>
  .charts_title {
    font-weight: 800;
    font-size: 30px;
  }
</style>
