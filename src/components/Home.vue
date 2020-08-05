<!--  -->
<template>
  <div id="app">
    <el-container class="home_contian">
      <!-- 头部 -->
      <el-header>
        <div>
          <img src="../assets/hero.png" alt width="50" />
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!-- 主题 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse?'64px':'200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <!-- 侧边栏菜单区 -->
          <el-menu background-color="#313743" text-color="#fff" active-text-color="#0d87ea" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
            <!-- 一级菜单 -->
            <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
              <!-- 一级菜单模板 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconObj[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 -->
                <el-menu-item :index="'/'+sbuItem.path + ''" v-for="sbuItem in item.children" :key="sbuItem.id" @click="saveNavState('/'+sbuItem.path)">
                  <!-- 二级菜单模板 -->
                  <template slot="title">
                    <!-- 图标 -->
                    <i class="el-icon-menu"></i>
                    <!-- 文本 -->
                    <span>{{sbuItem.authName}}</span>
                  </template>
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
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
      menulist:[],
      iconObj:{
        '125':'iconfont icon-users',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao'
      },
      isCollapse:false,
      // 被激活的连接地址
      activePath:''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    logout: function () {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    toggleCollapse:function(){
      this.isCollapse = !this.isCollapse
    },
     // 获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    },
    saveNavState:function(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
    
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
.home_contian {
  height: 100%;
}
.el-container {
  .el-header {
    color: #ffffff;
    font-size: 15px;
    padding-left: 0;
    display: flex;
    justify-content: space-between;
    background-color: #363d40;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }

  .el-container {
    .el-aside {
      background-color: #313743;
      .toggle-button{
        background-color: #4d5264;
        font-size: 10px;
        text-align: center;
        color: white;
        letter-spacing: 0.2em;
        cursor: pointer;

      }
    }

    .el-main {
      background-color: #e9edf1;
    }
  }
  .iconfont {
    margin-right: 10px;
  }
  .el-menu {
    border:none
  }
}
</style>