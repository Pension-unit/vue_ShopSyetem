<!--  -->
<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img :src="headersrc" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :rules="loginFormRules"
        :model="loginForm"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" @blur="changeProfile"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Img from "../static/logo.png"
import pyqImg from "../static/pyq.png"
import yfmImg from "../static/yfm.png"
import dzhImg from "../static/dzh.png"
import zyImg from "../static/zhangyan.png"
import jwImg from "../static/jiangwei.png"
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      // 头像路径
     headersrc:Img,
      loginForm: {
        username: "",
        password: "",
      },
      //   表单的验证规则对象
      loginFormRules: {
        //   用户验证规则
        username: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        //   密码验证规则
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    resetLoginForm: function () {
      //   console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    login: function () {
      this.$refs.loginFormRef.validate(async (valid) => {
        //   登录预验证
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.meta.status !== 200) return this.$message({
             message: '登录失败',
            type: 'error'
        })
       this.$message(
           {
               message:'登录成功',
               type: 'success'
           }
       )
       window.sessionStorage.setItem('token',res.data.token)
       window.sessionStorage.setItem('username',res.data.username)
       this.$router.push('/home')
      });
    },
  changeProfile(){
       if(this.loginForm.username == "pyq"){
         this.headersrc = pyqImg
       }else if(this.loginForm.username == "yfm") {
         this.headersrc = yfmImg
       }else if(this.loginForm.username == "dzh") {
         this.headersrc = dzhImg
       }else if(this.loginForm.username == "zhangyan") {
         this.headersrc = zyImg
       }else if(this.loginForm.username == "jiangwei") {
         this.headersrc = jwImg
       }
       window.sessionStorage.setItem('headerSrc',this.headersrc)
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
   
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
<style lang="less" scoped>
.login_container {
  // background-color: #2b4b6b;
  // background-image: linear-gradient(#e66465, #9198e5);
  background-image: linear-gradient(-90deg, #e66465, #9198e5);
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>