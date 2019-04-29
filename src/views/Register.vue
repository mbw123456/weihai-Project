<template>
  <div class="register"><!-- 这是根节点 -->
  <HeaderMini :title="title"/>
	<el-card class="register-box">
    <el-steps :active="pageActive" align-center class="register-steps">
      <el-step title="个人信息" icon="iconfont-hjy icon-hjyrenzheng2"></el-step>
      <el-step title="密码设置" icon="iconfont-hjy icon-hjymima"></el-step>
      <el-step title="注册成功" icon="iconfont-hjy icon-hjyanquan"></el-step>
    </el-steps>

			<el-form :model="form" :hide-required-asterisk="true" :rules="rules" ref="ruleForm" label-width="150px" class="register-form" v-show="nextPart">
				<el-form-item label="真实姓名" prop="name" >
					<el-input v-model="form.name" autocomplete="off" placeholder="请输入真实姓名"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" prop="card" >
					<el-input v-model="form.card" autocomplete="off" placeholder="请输入身份证号"></el-input>
				</el-form-item>
				<el-form-item label="选择开户银行" prop="bankName">
					<el-select v-model="form.bankName" placeholder="请选择开户银行">
						<el-option v-for="(item,key) in bankcardData" :key="key" :label="item.label" :value="key"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="银行卡号" prop="bankId">
					<el-input v-model="form.bankId" autocomplete="off" placeholder="请输入银行卡号"></el-input>
				</el-form-item>
				<el-form-item label="开户城市" prop="bankOpen">
					<el-cascader
						ref="city"
						expand-trigger="hover"
						:options="options"
						v-model="form.bankOpen"
						@change="handleChange">
					</el-cascader>
				</el-form-item>
				<el-form-item label="银行预留手机号" prop="bankPhone" >
					<el-input v-model="form.bankPhone" autocomplete="off" placeholder="请输入银行预留手机号"></el-input>
				</el-form-item>
				<el-form-item label="验证码" prop="checkCode" ref="validateCode">
					<el-input v-model="form.checkCode" autocomplete="off" style="width:360px;" placeholder="请输入验证码"></el-input>
					<el-button type="primary" @click="sendCodeValid('ruleForm')" :disabled="timeDisable" style="float:right; width:135px;">{{timeText}}</el-button>
				</el-form-item>
				<el-form-item label="邀请码(选填)" prop="invite" >
					<el-input v-model="form.invite" autocomplete="off" placeholder="请输入邀请码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
				</el-form-item>
			</el-form>
			<el-form :model="form" :hide-required-asterisk="true" :rules="rules" ref="ruleNextForm" label-width="150px" class="register-form" v-show="!nextPart">
				<el-form-item label="密码" prop="password" >
					<el-input v-model="form.password" autocomplete="off" placeholder="请输入密码" show-password></el-input>
				</el-form-item>
				<el-form-item label="密码重复" prop="passwordAgain" >
					<el-input v-model="form.passwordAgain" autocomplete="off" placeholder="请再次输入密码" show-password></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" :loading="btnLoading" @click="submitNextForm('ruleNextForm')">注册</el-button>
				</el-form-item>
				
			</el-form>
    
  </el-card>
	
  </div>
</template>

<script>
import HeaderMini from '@/components/HeaderMini.vue';
import cityData from '@/model/country-data.js';
export default {
  name: 'Register',
  components:{
    HeaderMini
  },
  data(){
		var validatePassword = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.form.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		var validateCustName = (rule, value, callback) => {
			var reg = /^[\u4E00-\u9FA5]{2,20}$/;
			if(!reg.test(value)){
				callback(new Error('姓名不符合标准'));
			}else{
				callback();
			}
		};
		var validateMobile = (rule, value, callback) => {
			if(value.length != 11){
				callback(new Error('手机号位数不正确'));
			}else{
				var reg = /1[3456789][0-9]{9}/;
				if(!reg.test(value)){
						callback(new Error('手机号有误'));
				}else{
					callback();
				}
			}
		};
		var validateCheckCode = (rule, value, callback) => {
			if(value === ''){
				callback(new Error("请输入验证码"));
			}else{
				if(value.length < 4 || value.length > 6){
					callback(new Error("验证码位数不正确"));
				}else{
					callback();
				}
			}
		};
		var validateCardNum = (rule, code, callback) => {
			
			var Errors = new Array("true", "身份证号码必须是15或者18位", "身份证号码出生年月日格式不对",
					"身份证号码不正确", "身份证号码不正确", "15位身份证号码由数字组成",
					"18位身份证号码前17位由数字组成,第18位可以是数字或者大写\"X\"!");
			if (code.length != 15 && code.length != 18) {// 身份证长度不正确
				// return Errors[1];
				callback(new Error(Errors[1]));
			}
			var area = {
				11 : "北京",
				12 : "天津",
				13 : "河北",
				14 : "山西",
				15 : "内蒙古",
				21 : "辽宁",
				22 : "吉林",
				23 : "黑龙江",
				31 : "上海",
				32 : "江苏",
				33 : "浙江",
				34 : "安徽",
				35 : "福建",
				36 : "江西",
				37 : "山东",
				41 : "河南",
				42 : "湖北",
				43 : "湖南",
				44 : "广东",
				45 : "广西",
				46 : "海南",
				50 : "重庆",
				51 : "四川",
				52 : "贵州",
				53 : "云南",
				54 : "西藏",
				61 : "陕西",
				62 : "甘肃",
				63 : "青海",
				64 : "宁夏",
				65 : "新疆",
				71 : "台湾",
				81 : "香港",
				82 : "澳门",
				91 : "国外"
			}
			var Y, JYM;
			var S, M;
			var ereg;
			var idcard_array = new Array();
			idcard_array = code.split("");
			// 地区检验
			if (area[parseInt(code.substr(0, 2))] == null)
				return Errors[4];
			// 身份号码位数及格式检验
			switch (code.length) {
			case 15:
				if (!/^[0-9]{15}$/.test(code)) {
					// return Errors[5];
					callback(new Error(Errors[5]));
				}
				var sBirthday = "19" + code.substr(6, 2) + "-"
						+ Number(code.substr(8, 2)) + "-" + Number(code.substr(10, 2));
				var d = new Date(sBirthday.replace(/-/g, "/"));
				var flag = (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1)
						+ "-" + d.getDate()));
				if (!flag)
					// return Errors[0];
					callback();
				else
					// return Errors[2];
					callback(new Error(Errors[2]));
				break;
			case 18:
				if (!/^[0-9]{17}([0-9X])$/.test(code)) {
					return Errors[6];
				}

				var sBirthday = code.substr(6, 4) + "-" + Number(code.substr(10, 2))
						+ "-" + Number(code.substr(12, 2));
				var d = new Date(sBirthday.replace(/-/g, "/"));
				var flag = (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1)
						+ "-" + d.getDate()));
				if (!flag) {// 测试出生日期的合法性
					// 计算校验位
					S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
							+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11]))
							* 9
							+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12]))
							* 10
							+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13]))
							* 5
							+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14]))
							* 8
							+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15]))
							* 4
							+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16]))
							* 2 + parseInt(idcard_array[7]) * 1
							+ parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9])
							* 3;
					Y = S % 11;
					M = "F";
					JYM = "10X98765432";
					M = JYM.substr(Y, 1);
					// 判断校验位
					if (M == idcard_array[17])
						// return Errors[0];// 检测ID的校验位
						callback();
					else
						// return Errors[3];
						callback(new Error(Errors[3]));
				} else
					// return Errors[2];
					callback(new Error(Errors[2]));
				break;
			default:
				// return Errors[1];
				callback(new Error(Errors[1]));
				break;
			}
		};

    return {
			nextPart: true,
			pageActive:1,
			btnLoading:false,
      title:'注册',
      options:cityData,
			time:'0',
			timeText:'发送验证码',
			timeDisable:false,
			saveBankCard:this.$store.state.BANK_CARD,
			form:{
        name:'',
        card:'',
        bankName: '',
				bankId: '',
				bankOpen:[],
				bankPhone:'',
				checkCode:'',
				invite:'',
				password:'',
				passwordAgain:'',
            },
			rules: {
        name: [
					{ required: true, message: '请输入真实姓名', trigger: 'blur' },
					{ validator: validateCustName, trigger: 'change' },
				],
				card:[
					{ required: true, message: '请输入身份证号', trigger: 'blur' },
					{ validator: validateCardNum, trigger: 'change' },
				],
				bankName: [
					{ required: true, message: '请选择银行', trigger: 'change' },
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				bankId:[
					{ required: true, message: '请输入银行卡号', trigger: 'blur' },
					{ min: 12, max: 35, message: '请输入正确的银行卡号', trigger: 'blur' }
				],
				bankOpen:[
					{ required: true, message: '请选择开户城市', trigger: 'change' },
				],
				bankPhone:[
					{ required: true, message: '请输入银行预留手机号', trigger: 'change' },
					{ validator: validateMobile, trigger: 'change' },
				],
				checkCode:[
					{ validator: validateCheckCode, trigger: 'change' },
				],
				invite:[
					{ required: false, message: '请输入邀请码', trigger: 'change' },
				],
				password:[
					{ required: true, message: '请输入密码', trigger: 'change' },
				],
				passwordAgain:[
					{ validator: validatePassword, message: '请输入确认密码', trigger: 'change' },
				],
			},
			bankcardData: [{
				"label": "建设银行",
				"value":"F000",
			},{
				"label": "工商银行",
				"value":"F001",
			},{
				"label": "农业银行",
				"value":"F002",
			},{
				"label": "中国银行",
				"value":"F003",
			},{
				"label": "兴业银行",
				"value":"F004",
			},{
				"label": "光大银行",
				"value":"F005",
			},{
				"label": "中信银行",
				"value":"F006",
			},{
				"label": "浦发银行",
				"value":"F007",
			},{
				"label": "交通银行",
				"value":"F008",
			},{
				"label": "邮政储蓄",
				"value":"F009",
			},{
				"label": "平安银行",
				"value":"F010",
			},{
				"label": "上海银行",
				"value":"F011",
			},{
				"label": "招商银行",
				"value":"F013",
			},{
				"label": "广发银行",
				"value":"F014",
			},{
				"label": "民生银行",
				"value":"F015",
			},{
				"label": "华夏银行",
				"value":"F016",
			}],
    }
	},
	props: {
          value: 'label',
        },
  methods:{
    submitForm(formName) {
			var checkFlag = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
					
        } else {
					checkFlag = false;
          console.log('error submit!!');
          return false;
        }
			});
			
			if(checkFlag){
				var pro_text = this.$refs['city'].currentLabels[0];
				var city_text = this.$refs['city'].currentLabels[1];

				var pro_value = this.form.bankOpen[0];
				var city_value = this.form.bankOpen[1];
				
				var bankData = this.bankcardData[this.form.bankName];
				var bankName = bankData.label;
				var channelid = bankData.value;

				this.$httpPost("/pc/userRegister/bgMsgCheckOnly",{accountName:this.form.name,mobileno:this.form.bankPhone,
				certificateno:this.form.card,channelid:channelid,depositacct:this.form.bankId,pro_text:pro_text,pro_value:pro_value,
				city_text:city_text,city_value:city_value,bankName:bankName}).then(res => {
				
					if(res.isValid == "true"){
						this.nextPart = false;
						this.pageActive = 2;
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
			}
		},
		submitNextForm(formName) {
			var checkFlag = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {

        } else {
					checkFlag = false;
          console.log('error submit!!');
          return false;
        }
			});
			
			if(checkFlag){
				var pro_text = this.$refs['city'].currentLabels[0];
				var city_text = this.$refs['city'].currentLabels[1];

				var pro_value = this.form.bankOpen[0];
				var city_value = this.form.bankOpen[1];
				
				var bankData = this.bankcardData[this.form.bankName];
				var bankName = bankData.label;
				var channelid = bankData.value;

				this.$httpPost("/pc/userRegister/registerUserNewFy",{accountName:this.form.name, mobileno:this.form.bankPhone, password:this.form.password,
				certificateno:this.form.card, channelid:channelid, depositacct:this.form.bankId, pro_text:pro_text, pro_value:pro_value,
				city_text:city_text, city_value:city_value, bankName:bankName, validateCode:this.form.checkCode, inviteCode:this.form.invite}).then(res => {
				
					if(res.isValid == "true"){
					
						this.pageActive = 3;
						this.btnLoading = true;

						setTimeout(()=>{ //延时是为了展示按钮效果，请删除

							this.btnLoading = false;   //关闭按钮动画
							this.$notify({							//右上角tip
								title: '成功',
								message: '您已注册成功，已自动为您登录',
								type: 'success'
							});
							this.$router.push('/');		//页面跳转
							this.$store.commit('changeAutoLogin','1'); //修改登录状态
						},2000);
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
				
			}


    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value,label) {
			console.log(value);
			console.log(label);
		},
    sendCodeValid(formName){
			var valData = ['name','card','bankName','bankId','bankOpen','bankPhone'];
			var checkFlag = true;
			this.$refs[formName].validateField(valData,(validMessage) => {
				if (validMessage == "") {
					console.log("true");
				} else {
					console.log('error submit!!');
					checkFlag = false;
					return false;
				}
			});
			if(checkFlag){
				this.sendCode(formName);
			}
		},
		sendCode(formName){
			var pro_text = this.$refs['city'].currentLabels[0];
			var city_text = this.$refs['city'].currentLabels[1];

			var pro_value = this.form.bankOpen[0];
			var city_value = this.form.bankOpen[1];
			
			var bankData = this.bankcardData[this.form.bankName];
			var bankName = bankData.label;
			var channelid = bankData.value;
			this.$httpPost("/pc/userRegister/bgMsgSendForReg",{accountName:this.form.name,mobileno:this.form.bankPhone,
				certificateno:this.form.card,channelid:channelid,depositacct:this.form.bankId,pro_text:pro_text,pro_value:pro_value,
				city_text:city_text,city_value:city_value,bankName:bankName
				}).then(res => {
			
				if(res.isValid == "true"){
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
		init(){
			var inviteCode = this.getQueryString("inviteCode");
			if(inviteCode != null && inviteCode != "" && inviteCode != undefined && inviteCode !="null"){
				this.form.invite = inviteCode;
			}
		},
		getQueryString(name) {  
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
				var r = window.location.search.substr(1).match(reg);  
				if (r != null) return unescape(r[2]);  
			return null;  
		}
  },
  mounted(){
		this.init();
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/styles/vars.scss';
@import '~@/assets/icon/iconfont.css';
.register{
  .register-box{
    width: 1140px;
    margin: 30px auto;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid $color-back-second;
    box-sizing: border-box;
    padding: 50px 150px;

    .register-form{
      padding-top: 40px;
      padding-right: 80px;

      
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
</style>
<style lang="scss">
@import '@/assets/styles/vars.scss';
.register{
	.register-form{
		.el-form-item__label{
			padding-right: 30px;
		}
		.el-select{
			width: 100%;
		}
		.el-cascader{
			width: 100%;
		}
	}
	.iconfont-hjy{
		font-size: 35px;
		font-weight: normal;
	}
	.el-step__title.is-process{
		color: $color-font-fourth;
		font-weight: normal;
	}
	.el-step__head.is-process{
		color: $color-font-fourth;
	}
	
}
.register-error{
		top:120px;
	}
</style>
