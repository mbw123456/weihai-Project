<template>
  <div class="account-message">
      <h1 class="project-title">账户设置</h1>
      <h2 class="project-title-small"><span>手机号管理</span></h2>
      <el-row class="set-row">
        <el-col :span="5">手机号码</el-col>
        <el-col :span="15" :offset="1">15555555555</el-col>
        <el-col :span="3">
          <el-button type="primary" size="medium"  @click="dialogFormVisible = true">修改</el-button>
        </el-col>
      </el-row>
      <!-- 修改手机号码 -->
      <el-dialog title="修改手机号码" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" status-icon label-width="100px" ref="ruleForm" class="phoneChange-ruleForm">
          <el-form-item label="原手机号码" :label-width="formLabelWidth">
            <el-input autocomplete="off" v-model="form.mobileno" disabled></el-input>
          </el-form-item>
          <el-form-item label="新手机号码" prop="newPhone" :label-width="formLabelWidth">
            <el-input v-model="form.newPhone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="checkCode" :label-width="formLabelWidth">
            <el-input v-model="form.checkCode" autocomplete="off" style="width:350px;"></el-input>
            <el-button type="primary" @click="sendCode('ruleForm')" :disabled="timeDisable" style="float:right; width:135px;">{{timeText}}</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('ruleForm')">取 消</el-button>
          <el-button type="primary" :loading="btnLoading" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>



      <h2 class="project-title-small"><span>密码管理</span></h2>
      <el-row class="set-row">
        <el-col :span="5">登录密码</el-col>
        <el-col :span="15" :offset="1">15555555555</el-col>
        <el-col :span="3">
          <el-button type="primary" size="medium"  @click="dialogFormPasswordVisible = true">修改</el-button>
        </el-col>
      </el-row>
      <!-- 修改密码 -->
      <el-dialog title="修改密码" :visible.sync="dialogFormPasswordVisible">
        <el-form :model="form" :rules="rules" status-icon label-width="100px" ref="passwordForm" class="phoneChange-ruleForm">
          <el-form-item label="原密码" prop="oldPassword" :label-width="formLabelWidth">
            <el-input v-model="form.oldPassword" autocomplete="off" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword" :label-width="formLabelWidth">
            <el-input v-model="form.newPassword" autocomplete="off" placeholder="请输入新密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码重复" prop="newPasswordAgain" :label-width="formLabelWidth">
            <el-input v-model="form.newPasswordAgain" autocomplete="off" placeholder="请再次输入新密码" show-password></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('passwordForm')">取 消</el-button>
          <el-button type="primary" :loading="btnLoading" @click="submitPasswordForm('passwordForm')">确 定</el-button>
        </div>
      </el-dialog>



      <h2 class="project-title-small"><span>昵称管理</span></h2>
      <el-row class="set-row">
        <el-col :span="5">昵称</el-col>
        <el-col :span="15" :offset="1">15555555555</el-col>
        <el-col :span="3">
          <el-button type="primary" size="medium"  @click="dialogFormAddressVisible = true">修改</el-button>
        </el-col>
      </el-row>
      <!-- 修改昵称 -->
      <el-dialog title="修改昵称" :visible.sync="dialogFormAddressVisible">
        <el-form :model="form" :rules="rules" status-icon label-width="100px" ref="addressForm" class="phoneChange-ruleForm">
          <el-form-item label="昵称" prop="user_address" :label-width="formLabelWidth">
            <el-input v-model="form.user_address" autocomplete="off" placeholder="请输入昵称"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('addressForm')">取 消</el-button>
          <el-button type="primary" :loading="btnLoading" @click="submitAddressForm('addressForm')">确 定</el-button>
        </div>
      </el-dialog>


  </div>
</template>

<script>

export default {
  name: "account-message",
  data() {
    var samePassword = (rule, value, callback) => {
			if (value == this.form.oldPassword) {
				callback(new Error('新密码不能与原密码相同'));
			} else {
				callback();
			}
		};
		var validatePassword = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.form.newPassword) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
    return {
      //获取public路径
      publicPath: process.env.BASE_URL,
      //phone
      dialogFormVisible: false,
      dialogFormPasswordVisible:false,
      dialogFormAddressVisible:false,
			formLabelWidth: '100px',
			time:'0',
			timeText:'发送验证码',
      timeDisable:false,
      form: {
				newPhone:'',
				checkCode:'',
				user_address:'',
				user_act:'',
				oldPassword:'',
				newPassword:'',
				newPasswordAgain:'',
			},
      rules: {
				newPhone:[
					{required: true, len:11, message: '手机号格式不正确',trigger: 'blur' }
				],
				oldPassword: [
					{ required: true, message: '密码不能为空', trigger: 'blur' },
					{ min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
				],
				newPassword: [
					{ required: true, message: '密码不能为空', trigger: 'blur' },
					{validator: samePassword, trigger: 'blur' }
				],
				newPasswordAgain: [
					{validator: validatePassword, trigger: 'blur' }
				],
				user_address: [
					{ required: true, message: '请输入联系地址', trigger: 'change' }
				],
				// date1: [
				// 	{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				// ],
				// date2: [
				// 	{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }
				// ],
				// type: [
				// 	{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
				// ],
				// resource: [
				// 	{ required: true, message: '请选择活动资源', trigger: 'change' }
				// ],
				// desc: [
				// 	{ required: true, message: '请填写活动形式', trigger: 'blur' }
				// ]
			},
		
    };
  },
  methods: {
    //手机号修改提交
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$httpPost("/pc/myaccount/checkMobileCodeForChangeMobile",{mobileno:this.form.newPhone}).then(res => {
						if(res.isValid === "true"){
							this.btnLoading = true;
							setTimeout(()=>{ //为了展示按钮加载中动画。。。
								this.btnLoading = false;
								//关闭弹窗
								this.dialogFormVisible = false;
								//页面传值
								this.mobileno = this.form.newPhone;

								this.$refs['ruleForm'].resetFields();
								this.$message({
									message: '恭喜你，成功修改手机号',
									type: 'success',
									center: true
								});
							},1000);
						}else{
							this.$message({
								showClose: true,
								type: 'error',
								customClass:'register-error',
								center:true,
								message: res.msg
							});
						}
					}).catch(err => {
						//错误的回调
						// eslint-disable-next-line no-console
					});
				} else {
					console.log('error submit!!');
					return false;
					
				}
			});
    },
    resetForm(formName) {
			this.$refs[formName].resetFields();
			this.dialogFormVisible = false;
			this.dialogFormPasswordVisible = false;
			this.dialogFormAddressVisible = false;
			this.dialogFormActVisible = false;
		},
    sendCode(formName){
			this.$refs[formName].validateField('newPhone',(validMessage) => {
				if (validMessage) {
					this.$httpPost("/pc/myaccount/changeMobileSendCode",{mobileno:this.form.newPhone}).then(res => {
						if(res.isValid === "true"){
							this.time = 60;
							this.disabled = true;
							this.timer();
						}else{
							this.$message({
								showClose: true,
								type: 'error',
								customClass:'register-error',
								center:true,
								message: res.msg
							});
						}
					}).catch(err => {
						//错误的回调
						// eslint-disable-next-line no-console
					});
					
				} else {
					console.log('error submit!!');
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
    // handleClick(tab, event) {
    //     console.log(tab, event);
    // },
    // gotoPublish(index) {
    //   console.log(index);
    //   this.$router.push({
    //     name: "gain-publish",
    //     params: {
    //       id: index,
    //     }
    //   });
    // },
  },
  mounted() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.account-message {
  position: relative;
  background: url(~@/assets/img/weihai-center_07.png) no-repeat 700px 70px;
  background-size: 150px;
  background-color: #fff;
  min-height: 590px;
  box-sizing: border-box;
  border: 1px solid $color-back-second;

  .project-title{
    font-size: 16px;
    color: $color-primary;
    line-height: 50px;
    padding: 0 15px;
    border-bottom: 1px solid $color-back-second;
    background: url(~@/assets/img/weihai-center_03.png) no-repeat 800px center;
    background-size: 40px;
  }
  .project-title-small{
    font-size: 15px;
    padding: 15px 20px;
    margin-top:10px;

    span{
      border-bottom:2px solid $color-primary;
      padding-bottom: 5px;
    }
  }
  .set-row{
      line-height: 45px;
      margin: 0 20px;
      border-bottom: 1px dotted $color-back-first;

      .el-col{
        font-size: 14px;
        color: $color-font-third;

        &:first-child{
          color:$color-font-first;
        }
        
      }
      &:last-child{
        border: none 0;
      }
    }
}
</style>
