<template>
  <div class="login"><!-- 这是根节点 -->
  <HeaderMini :title="title"/>
	<div class="login-box">
    <el-row>
      <el-col :span="12">
        <ul>坚持定投   必有收获
          <li>基金定投 积累未来</li>
          <li>平滑风险 智能调仓</li>
          <li>自动扣款 强制储蓄</li>
        </ul>
      </el-col>
      <el-col :span="12" class="login-rightbox">
        <h3>登录 <span>没有账号？<router-link to="/register">免费注册</router-link></span></h3>
        <el-form :model="form" :hide-required-asterisk="true" :rules="rules" ref="ruleForm" label-width="50px" class="login-form">
          <el-form-item label="账号" prop="account" >
            <el-input v-model="form.account" autocomplete="off" placeholder="请输入身份证号码/手机号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" >
            <el-input v-model="form.password" autocomplete="off" placeholder="请输入密码" show-password></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" :loading="btnLoading">登录</el-button>
            <h6><router-link to="/forget">忘记密码?</router-link></h6>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    
  </div>
	<p class="login-bottom">©2015 泰诚财富基金销售（大连）有限公司|辽ICP备14008189号|经营许可证(ICP): 辽B2-20150240</p>	
	
  </div>
</template>

<script>
import HeaderMini from '@/components/HeaderMini.vue';
export default {
  name: 'Login',
  components:{
    HeaderMini
  },
  data(){
    return {
      btnLoading:false,
      title:'登录',
      form:{
				account:'',
				password:'',
      },
      rules: {
				account:[
          { required: true, message: '请输入账号', trigger: 'blur' },
				],
				password:[
					{ required: true, message: '请输入密码', trigger: 'blur' },
				],
			},
    }
  },
  methods:{
    submitForm(formName) {      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = true;
          this.$httpPost("/login/login",{account:this.form.account,password:this.form.password}).then(res => {
            if(res.code == "success"){
              this.$store.commit('setCustName',res.cust_name);
              this.$store.commit('changeAutoLogin','1');
              this.$store.commit('setCustType',res.cust_type)
              this.$router.push(this.$route.query.redirect || '/account'); 
              this.btnLoading = false;
              this.$httpGet("/account/requirements/myRequirements").then(res =>{
                
              })
            }else{
              this.btnLoading = false;
              this.$message({
                showClose: true,
                type: 'error',
                customClass:'register-error',
                center:true,
                message: res.msg
              });
            }
          }).catch(err => {
            this.btnLoading = false;
            console.log("访问接口失败"+err);
          });
        }
      });
    },

  },
  mounted(){

  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/styles/vars.scss';
.login{
  .login-box{
    width: 1140px;
    margin: 30px auto;
    height: 550px;
    background: url(~@/assets/img/login-back.png) no-repeat center center;
    background-size: cover;
    background-color: #fff;
    border-radius: 4px;

    &:hover{
      box-shadow: 0 0px 10px rgba($color: #000000, $alpha: 0.2);
    }
    ul{
      font-size: 35px;
      color: #fff;
      box-sizing: border-box;
      padding-top: 100px;
      padding-left: 150px;
      text-shadow: 0 0px 10px rgba($color: #000000, $alpha: 0.5);

      li{
        list-style: circle;
        font-size: 24px;
        margin-top: 20px;
        text-shadow: 0 0px 5px rgba($color: #000000, $alpha: 0.4);
        letter-spacing: .1em;

        &:first-child{
          margin-top: 50px;
        }

      }
    }
    .login-rightbox{
      box-sizing: border-box;
      width: 400px;
      border-radius: 5px;
      padding: 10px 15px;
      background-color: rgba($color: #fff, $alpha: 1);
      margin-top: 90px;
      margin-left: 70px;
      box-shadow: 0 0px 10px rgba($color: #000000, $alpha: 0.2);

      h3{
        padding:8px 10px;
        font-size: 18px;
        font-weight: normal;
        margin-bottom: 25px;
        color: $color-primary;
        border-bottom: 1px solid $color-back-second;

        span{
          float: right;
          font-size: 14px;
          color: $color-font-third;
          line-height: 22px;

          a{
            color: $color-primary;
          }
        }
      }
      .login-form{
        padding-right: 15px;

        .el-button{
          width: 100%;
        }
        h6{
          height: 20px;
          text-align: right;

          a{
            font-size: 13px;
            color: $color-font-third;
            font-weight: normal;
          }
        }
      }
    }
  }
  .login-bottom{
    text-align: center;
    color: $color-font-third;
    font-size: 14px;
  }
}
</style>
