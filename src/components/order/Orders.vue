<!--  -->
<template>
    <el-container>
        <!-- 右边主要内容 -->
        <el-main class='mainBox'>
            <!-- 1 顶部 标题列表 -->
            <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item>订单列表</el-breadcrumb-item>
            </el-breadcrumb>

            <!-- 2 订单列表 -->
            <div class='orderBox'>
                <!-- inp搜索框 -->
                <div style="margin-top: 15px;" class='searchBox'>
                <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                </div>

                <!-- table订单列表 -->
                <el-table :data="tableData" border stripe style="width: 100%" class='orderlist'>
                    <el-table-column
                    type="index"
                    :index="indexMethod"
                    label="#">
                    </el-table-column>

                    <el-table-column label="订单编号" width="150">
                        <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ 10000 }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="订单价格" width="150">
                        <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ 0 }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="是否付款" width="150">
                        <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ 0 }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="是否发货" width="150">
                        <template slot-scope="scope">
                        <!-- <i class="el-icon-time"></i> -->
                        <span style="margin-left: 10px">否</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="下单时间" width="150">
                        <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        <el-button type="info" icon="el-icon-location-outline" size="mini" style='background:#67c23a'></el-button>
                        </template> 
                    </el-table-column>
                </el-table>

                <!-- 底部页数 -->
                <div class='pageShow'>
                    <!-- 总页数 -->
                    <div class='totalPage'> 共<span>5</span>条 </div>

                    <!-- 下拉选项 -->
                    <template>
                        <el-select v-model="value" placeholder="10条/页" class='setNum'>
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                    </template>

                    <!-- 分页器 -->
                    <div class="block, pagetab">
                        <el-pagination
                        layout="prev, pager, next"
                        :total="50">
                        </el-pagination>
                    </div>

                    <!-- 选择跳页 -->
                    <div class='choosePage'>
                        前往
                        <span class='pageNum'> 1 </span>
                        页
                    </div>
                </div>
            </div>
        </el-main>

    </el-container>
   
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
    options: [{
          value: '选项1',
          label: '5条/页'
        }, {
          value: '选项2',
          label: '10条/页'
        }, {
          value: '选项3',
          label: '15条/页'
        }],
    value: '',
    input3:'',
  };
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    indexMethod(index) {
        return index * 1 + 1;
      }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

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
<style  lang='less' scoped>
.mainBox{
  background-color: #eaedf1;
  .title{
    margin-bottom:20px;
  }
  .orderBox{
    background-color: #ffffff;
    padding: 6px 20px 20px 20px;
    .searchBox{
      width:400px;
      margin-bottom:15px;
    };
    .orderlist{
        margin-bottom: 10px;
    }
    .pageShow{
      display:flex;
      margin-bottom: 10px;
      height: 30px;
      align-items: center;
      .totalPage{
        color: #7a627f;
        font-size: 14px;
        font-weight:100px;
        margin-right: 20px;
        margin-top:20px;
      }
      .setNum{
        width:100px;
        margin-right:10px;
        margin-top:20px;
      }
      .pagetab{
        margin-right:10px;
        line-height:30px;
        margin-top:10px;
      }
      .choosePage{
        color: #7a627f;
        font-size: 14px;
        font-weight:100px;
        margin-top:20px;
        .pageNum{
          display:inline-block;
          width: 50px;
          height:30px;
          border: 1px solid #ccc;
          border-radius: 5px;
          text-align: center;
          line-height:30px;
        }
      }
    }
  }
}
</style>