<template>
  <div class="login"><!-- 这是根节点 -->
  <HeaderMini :title="title"/>
	<div class="login-box">
    
      <transition name="el-zoom-in-center">
      <div class="login-rightbox" v-show="show">
        <h3>密码登录<span><a @click="showCheck">验证码登录</a></span></h3>
        <el-form :model="form" :hide-required-asterisk="true" :rules="rules" ref="ruleForm" label-width="50px" class="login-form">
          <el-form-item label="账号" prop="account" >
            <el-input v-model="form.account" autocomplete="off" placeholder="请输入账户"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" >
            <el-input v-model="form.password" autocomplete="off" placeholder="请输入密码" show-password></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" :loading="btnLoading">登录</el-button>
            <h6><router-link to="/forget">忘记密码?</router-link></h6>
          </el-form-item>
        </el-form>
      </div>
      </transition>

      <transition name="el-zoom-in-center">
      <div class="login-rightbox" v-show="show1">
        <h3>验证码登录<span><a @click="showCheck">密码登录</a></span></h3>
        <el-form :model="form" :hide-required-asterisk="true" :rules="rules" ref="ruleForm" label-width="60px" class="login-form">
          <el-form-item label="账号" prop="account" >
            <el-input v-model="form.account" autocomplete="off" placeholder="请输入账户"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="checkCode" >
            <el-input v-model="form.checkCode" autocomplete="off" style="width:160px;" placeholder="请输入验证码"></el-input>
            <el-button type="primary" @click="sendCode('ruleForm')" :disabled="timeDisable" style="float:right; width:120px;">{{timeText}}</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" :loading="btnLoading">登录</el-button>
            <h6><router-link to="/forget">忘记密码?</router-link></h6>
          </el-form-item>
        </el-form>
      </div>
      </transition>


     
    
    
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
      show:true,
      show1:false,
      timeDisable:false,
      form:{
				account:'',
        password:'',
        checkCode:'',
      },
      rules: {
				account:[
          { required: true, message: '请输入账号', trigger: 'blur' },
				],
				password:[
					{ required: true, message: '请输入密码', trigger: 'blur' },
        ],
        checkCode:[
        	{ required: true, message: '请输入密码', trigger: 'blur' },  
        ]
      },
      timeText:'发送验证码',
    }
  },
  methods:{
    showCheck(){
      if(this.show == true){
        this.show = false;
        setTimeout(() => {
          this.show1 = true;
        }, 300);
        return;
      }
      this.show1 = false;
      setTimeout(() => {
        this.show = true;
      }, 300);
    },
    submitForm(formName) {      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = true;
          this.$store.commit('changeAutoLogin','1');
          this.$router.push(this.$route.query.redirect || '/account'); 
          // this.$httpPost("/login/login",{account:this.form.account,password:this.form.password}).then(res => {
          //   if(res.code == "success"){
          //     this.$store.commit('setCustName',res.cust_name);
          //     this.$store.commit('changeAutoLogin','1');
          //     this.$store.commit('setCustType',res.cust_type)
          //     this.$router.push(this.$route.query.redirect || '/account'); 
          //     this.btnLoading = false;
          //     this.$httpGet("/account/requirements/myRequirements").then(res =>{
                
          //     })
          //   }else{
          //     this.btnLoading = false;
          //     this.$message({
          //       showClose: true,
          //       type: 'error',
          //       customClass:'register-error',
          //       center:true,
          //       message: res.msg
          //     });
          //   }
          // }).catch(err => {
          //   this.btnLoading = false;
          //   console.log("访问接口失败"+err);
          // });
        }
      });
    },
    sendCode(formName){
			this.$refs[formName].validateField('phone',(validMessage) => {
				console.log(validMessage);
				if (validMessage == "") {
					this.$httpPost("/pc/userRegister/getMobileCodeForRetPwd",{mobileno:this.form.phone}).then(res => {
							if(res.isValid == "true"){
								this.visitor = res.visitor;
								this.time = 60;
								this.disabled = true;
								this.timer();
							}else{
								this.$message({
									showClose: true,
									type: 'error',
									customClass:'register-error',
									center:true,
									message: res.resultMessage
								});
							}
						}).catch(err => {
							//错误的回调
							// eslint-disable-next-line no-console
							console.log("访问接口失败"+err);
						});
				} else {
					console.log('no validate!!');
					return false;
				}
			});
		},
		timer(){
			if( this.time > 0){
				this.time--;
				this.timeText = this.time + "s后重新获取";
				setTimeout(this.timer, 1000);
				this.timeDisable = true;
			}else{
				this.timeText = '发送验证码';
				this.timeDisable = false;
			}
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
  background: url(~@/assets/img/weihai-back_02.jpg) no-repeat center center;

  .login-box{
    width: 1140px;
    margin: 30px auto;
    height: 550px;
    

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
      float: right;
      box-sizing: border-box;
      width: 400px;
      border-radius: 5px;
      padding: 10px 15px;
      background-color: rgba($color: #fff, $alpha: 1);
      margin-top: 90px;
      margin-right: 70px;
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
