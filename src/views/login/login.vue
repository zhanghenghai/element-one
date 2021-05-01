<template>
<div class="login">

  <div style="margin: 20px;">
    <h2 class="cebter">登录</h2>
  </div>
  <el-form :label-position="labelPosition" label-width="80px" :model="user">
    <el-form-item label="用户">
      <el-input v-model="user.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="user.password"></el-input>
    </el-form-item>
    <el-button type="primary" class="element" @click.prevent="submitForm()">登录</el-button>
  </el-form>

</div>
</template>


<script>
import http from "@/utils/request"

export default {
  data() {
    return {
      labelPosition: 'right',
      user: {
        username: '',
        password: '',
      }
    };
  },
  methods :{
    submitForm(){
      console.log(this.user.username)
      http({
        method: 'post',
        url: '/login',
        data: this.user
      }).then(res => {
        if (res.data === 'success') {
          let data = res.data
          console.log(data)
          //获取并存储服务器返回的AuthorizationToken信息
          var authorization=res.headers['token'];
          console.log(authorization)
          localStorage.setItem('authorization',authorization);
          //保存token到sessionStorage中
          //window.sessionStorage.setItem("token", res.data.token);
          this.$router.replace('/about')
        }
      })
    }
  }
}
</script>



<style scoped>

/*文字居中*/
.cebter{text-align: center}
/*元素居中*/
.element{display:block;margin: auto}
/*框架*/
.login{
  width: 33%;
  height: 330px;
  margin: 10% auto;
  border-radius: 8px;
  padding: 3% 3% 1% 1%;
  box-shadow: 0 2px 4px rgba(3, 3, 3, .30), 0 0 6px rgba(0, 0, 0, .13)
}
</style>
