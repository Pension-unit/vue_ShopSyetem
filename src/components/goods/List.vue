<!--  -->
<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getProductsList"
          >
            <el-button
              slot="append"
              type="primary"
              icon="el-icon-search"
              @click.stop="getProductsList"
            ></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- table表格区域 -->
      <el-table :data="productslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="95px"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="70px"></el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="140px">
          <template slot-scope="scope">{{ scope.row.add_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editProInfo(scope.row.goods_id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click.stop="removeById(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 编辑商品弹出框 -->
    <el-dialog title :visible.sync="productDialog" width="50%" @close>
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" label-position="top">
        <el-tabs>
          <el-tab-pane label="基本信息">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="editForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格(元)" prop="goods_price" type="number">
              <el-input v-model="editForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight" type="number">
              <el-input v-model="editForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number" type="number">
              <el-input v-model="editForm.goods_number"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!-- 渲染表单的Item项 -->
          <el-tab-pane label="商品参数">
            <el-form-item v-for="item in manyTableData" :label="item.attr_name" :key="item.attr_id">
              <!-- 复选框组 -->
              <el-checkbox-group v-model="checkedAttributes">
                <el-checkbox v-for="(cb, i) in item.attr_vals" :label="cb" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <!-- 商品属性 -->
          <el-tab-pane label="商品属性">
            <el-form-item v-for="item in onlyTableData" :label="item.attr_name" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片">
            <el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headerObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <!-- 富文本编辑器 -->
          <el-tab-pane label="商品内容">
            <vue-editor v-model="editForm.goods_introduce"/>
          </el-tab-pane>
        </el-tabs>
      </el-form>

      <span slot="footer">
        <el-button @click="productDialog=false">取 消</el-button>
        <el-button type="primary" @click="editSub">修 改</el-button>
      </span>
    </el-dialog>


    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath" alt class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 富文本编辑器
import { VueEditor } from 'vue2-editor'

// 导入Lodash
import _ from 'lodash'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    VueEditor,
  },
  data() {
    //这里存放数据
    return {
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
      // 商品列表
      productslist: [],
      // 数据总条数
      total: 0,
      // 修改商品信息弹框
      productDialog: false,
      // 要修改的表单数据对象
      editForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        // 图片的数组
        pics: [],
        // 商品的详情描述
        goods_introduce: '',
        attrs: [],
      },
      // 修改商品
      id: '',
      // 表单验证规则
      editFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' },
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
        ],
      },
      // 动态参数列表数据
      manyTableData: [],
      // 静态属性列表数据
      onlyTableData: [],
      // 已选中参数
      checkedAttributes: [],
      // 上传图片的URL地址
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      // 图片上传的请求头
      headerObj: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      // 图片路径
      previewPath: '',
      // 图片预览
      previewVisible: false,
    }
  },
  computed: {},
  watch: {},
  // 在创建之前获取列表, 创建好之后直接渲染到页面上
  created() {
    this.getProductsList()
  },
  methods: {
    // 提交修改
    editSub(){
      this.$refs.editForm.validate(async valid => {
        if(!valid){
          return this.$message.error('请填写必要的选项! ')
        }
        // 执行修改的业务逻辑
        const form = _.cloneDeep(this.editForm)
        // console.log(form)
        // 处理动态属性
        this.manyTableData.forEach(item => {
          const newInfo = {
             // 商品id
            attr_id: item.attr_id,
            // 已选中的参数
            attr_value: this.checkedAttributes.join(' ')
          }
          this.editForm.attrs.push(newInfo)
        })
        // 处理静态属性
        this.onlyTableData.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          this.editForm.attrs.push(newInfo)
        })
        form.attrs = this.editForm.attrs
        console.log(form)
        // console.log(this.id)

        // 发起请求修改商品
        // 商品的名称 必须是唯一的
        const { data: res } = await this.$http.put('goods/'+ this.id, form)
        console.log(res)
        if(res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }

        this.$message.success('商品信息修改成功! ')
        // 修改成功跳转商品列表
        this.getProductsList()
        this.productDialog = false
      })
    },
    // 处理移除图片的操作
    handleRemove(file) {
      // console.log(file)
      const filePath = file.response.data.tmp_path
      const i = this.editForm.pics.findIndex((x) => x.pic === filePath)
      this.editForm.pics.splice(i, 1)
      // console.log(this.addForm)
    },
    // 处理图片预览的效果
    handlePreview(file) {
      console.log(file.response)
      this.previewPath = file.response.data.url
      this.previewVisible = true
    },
    // 监听图片上传成功的事件
    handleSuccess(response) {
      // console.log(response)
      // 1. 拼接得到一个图片信息对象
      const picInfo = { pic: response.data.tmp_path }
      this.editForm.pics.push(picInfo)
      // console.log(this.addForm)
    },
    // 弹出编辑框根据 id 获取信息
    async editProInfo(id) {
      // 显示编辑的弹框
      this.productDialog = true
      // 将id保存, 修改信息用
      this.id = id;
      // 获取参数前清空参数
      this.onlyTableData = []
      this.manyTableData = []
      const { data: res } = await this.$http.get('goods/' + id)

      if (res.meta.status !== 200) {
        return this.$message.error('获取动态参数列表失败! ')
      }
      // console.log(res)
      res.data.attrs.forEach((item) => {
        if (item.attr_sel === 'only') {
          this.onlyTableData.push(item)
        } else {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
          this.manyTableData.push(item)
        }
      })
      this.editForm.goods_cat = res.data.goods_cat
      // 如果有值, 将其赋予 checkedAttributes( checked 动态绑定值)
      if (this.manyTableData[0]) {
        this.checkedAttributes = this.manyTableData[0].attr_vals
      }
      // console.log(this.checkedAttributes)
      // console.log(res)
      // console.log(this.manyTableData)
      // console.log(this.onlyTableData)
    },
    // 根据分页获取对应的商品列表
    async getProductsList() {
      const { data: res } = await this.$http.get('goods', {
        params: this.queryInfo,
      })
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败!')
      }
      this.$message.success('获取商品列表成功!')
      this.productslist = res.data.goods
      // console.log(res)
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getProductsList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getProductsList()
    },
    // 根据id 删除商品
    async removeById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除!')
      }

      const { data: res } = await this.$http.delete('goods/' + id)
      // console.log('goods/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败!')
      }

      this.$message.success('删除成功!')
      // 删除后刷新页面
      let _this = this
      setTimeout(function () {
        _this.getProductsList()
      }, 1000)
    },
    goAddPage: function () {
      this.$router.push('/goods/add')
    },
  },

  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
}
</script>

<style lang="less" scoped>
</style>