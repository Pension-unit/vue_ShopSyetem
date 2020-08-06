<!--  -->
<template>
        <!-- 右边主要内容 -->
        <el-main class='mainBox'>
            <!-- 1 顶部 面包屑导航 -->
            <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
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
                <el-table :data="goodslist" border stripe style="width: 100%" class='orderlist'>
                    <el-table-column
                    type="index"
                    :index="indexMethod"
                    label="#">
                    </el-table-column>

                    <el-table-column label="订单编号" prop='order_number'>
                        <template slot-scope="scope">
                          <span style="margin-left: 10px"> {{scope.row.order_number}} </span>
                        </template>
                    </el-table-column>

                    <el-table-column label="订单价格" prop='order_price'>
                        <template slot-scope="scope">
                          <span style="margin-left: 10px">{{scope.row.order_price}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="是否付款" prop='pay_status'>
                        <template slot-scope="scope">
                          <span style="margin-left: 10px" v-if="scope.row.pay_status!='0'">已付款</span>
                          <span style="margin-left: 10px" v-if="scope.row.pay_status=='0'">未付款</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="是否发货" prop='is_send'>
                        <template slot-scope="scope">
                          <span style="margin-left: 10px">{{ scope.row.is_send }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="下单时间" prop='create_time'>
                        <template slot-scope="scope">
                          <span style="margin-left: 10px">{{ scope.row.create_time | dateFormat}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                          <el-button @click='changeAddress' type="primary" icon="el-icon-edit" size="mini"></el-button>
                          <el-button @click='checkOrderStatus' type="info" icon="el-icon-location-outline" size="mini" style='background:#67c23a'></el-button>
                        </template> 
                    </el-table-column>
                </el-table>

                <!-- 分页器 -->
                <div class="block">
                    <el-pagination
                    layout="total, sizes, prev, pager, next,jumper"
                    :total="total"
                    :page-sizes="[5,10,15,20]"
                    :page-size="queryInfo.pagesize"
                    @size-change='handleSizeChange'
                    @current-change="handleCurrentChange"
                    >
                    </el-pagination>
                    <!-- 设置layout，表示需要显示的内容，逗号分隔。prev表示上一页，next为下一页，pager表示页码列表，jumper表示跳页元素，total表示总条目数，size用于设置每页显示的页码数量;
                    page-sizes 接受一个整型数组，数组元素为展示的选择每页显示个数的选项;
                    size-change和current-change事件来处理页码大小和当前页变动时候触发的事件  -->
                </div>

                <!-- 修改地址对话框 -->
                <el-dialog title="修改地址" :visible.sync="dialogFormVisible" @close="addressDialogClosed">
                  <el-form label-width="100px" :model='addressForm' ref="addressFormRef">
                    <el-form-item label="省市区/县" required prop="address1">
                      <el-cascader :options="citydatas" v-model='addressForm.address1'></el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址" 
                    prop="address2"
                    :rules="{required: true, message: '请填写详细地址', trigger: 'blur'}">
                      <el-input v-model='addressForm.address2'></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                  </div>
                </el-dialog>

                <!-- 物流状态对话框 -->
                <el-dialog title="物流进度" :visible.sync="progressVisible" width="50%">
                  <el-timeline >
                    <el-timeline-item
                      v-for="(item, index) in orderstatusinfo"
                      :key="index"
                      :timestamp="item.time">
                      {{item.context}}
                    </el-timeline-item>
                  </el-timeline>
                </el-dialog>
                
            </div>
        </el-main>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import citydatas from './citydata';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    value: '',
    input3:'',
    queryInfo:{
      query:'',
      pagenum: 1,
      pagesize: 10
    },
    goodslist:[],
    total:0,
    dialogFormVisible: false,
    value: [],
    citydatas,
    addressForm:{
      address1:[],
      address2:'',
    },
    progressVisible: false,
    orderstatusinfo:[],
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
      },

    //获取所有订单信息
    async getOrderList(){
      let res = await this.$http.get('orders',{
        params: this.queryInfo
      })
      // console.log(res.data);
      this.goodslist = res.data.data.goods;
      this.total = res.data.data.total;
      // console.log(this.total);
      // console.log(this.goodslist);
    },

    //页码显示条数函数处理
    handleSizeChange:function(newSize){
      this.queryInfo.pagesize = newSize;
      this.getOrderList();
    },
    handleCurrentChange:function(newPage){
      this.queryInfo.pagenum = newPage;
      this.getOrderList();
    },

    //显示修改地址弹出框
    changeAddress:function(){
      this.dialogFormVisible = true;
    },
    
    //修改地址框关闭后数据清除
    addressDialogClosed:function(){
      this.$refs.addressFormRef.resetFields()
    },

    //订单物流状态框
    async checkOrderStatus(){
      let res = await this.$http.get('/kuaidi/804909574412544580');
      // console.log(res.data);
      this.orderstatusinfo = res.data.data;
      console.log(this.orderstatusinfo);

      this.progressVisible = true; //显示物流状态框
    },
},

//生命周期 - 创建完成（可以访问当前this实例）
created() {
  this.getOrderList();
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

@import '../../plugins/timeline/timeline.css';
@import '../../plugins/timeline-item/timeline-item.css';

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
    .el-cascader {
      width: 100%;
    }
    
  }
}
</style>