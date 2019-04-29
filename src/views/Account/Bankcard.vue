<template>
  <div class="bankcard"><!-- 这是根节点 -->
	<div class="bankcard-inner">
		<h3 class="bankcard-title">绑定银行卡</h3>

		<el-form :model="form" :rules="rules" ref="ruleForm" label-width="150px" class="bankcard-form">
			<el-form-item label="开卡姓名" >
				<p>{{custName}}</p>
			</el-form-item>
			<el-form-item label="身份证号" >
				<p>{{certificateno_show}}</p>
			</el-form-item>
			<el-form-item label="银行名称" prop="bankName">
				<el-select v-model="form.bankName" placeholder="请选择银行">
					<el-option v-for="(item,key) in bankcardData" :key="key" :label="item.label" :value="key"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="银行卡号" prop="bankId">
				<el-input v-model="form.bankId" autocomplete="off" placeholder="请输入银行卡号"></el-input>
			</el-form-item>
			<el-form-item label="开户支行" prop="bankOpen">
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
			<el-form-item label="验证码" prop="checkCode" >
				<el-input v-model="form.checkCode" autocomplete="off" style="width:300px;" placeholder="请输入验证码"></el-input>
				<el-button type="primary" @click="sendCode('ruleForm')" :disabled="timeDisable" style="float:right; width:135px;">{{timeText}}</el-button>
			</el-form-item>
			<el-form-item label="交易密码" prop="password" >
				<el-input v-model="form.password" autocomplete="off" placeholder="请输入交易密码" show-password></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>


	

  </div>
</template>

<script>

import cityData from '@/model/country-data.js';
export default {
	name: 'Bankcard',
	data(){
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
		return {
			options:cityData,
			time:'0',
			timeText:'发送验证码',
			timeDisable:false,
			saveBankCard:this.$store.state.BANK_CARD,
			custName:'',
			certificateno:'',
			certificateno_show:'',
			moneyaccount:'',
			form:{
        bankName: '',
				bankId: '',
				bankOpen:[],
				bankPhone:'',
				checkCode:'',
				password:'',
            },
			rules: {
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
				password:[
					{ required: true, message: '请输入密码', trigger: 'change' },
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
	methods:{
		submitForm(formName) {
			var checkFlag = true;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					
				} else {
					checkFlag = false;
					console.log('error submit!!');
					this.$message({
						message: '有未完成的选项',
						type: 'error',
						center: true
					});
					return false;
				}

				if(checkFlag){
					this.addCard();
				}
			});
		},
		addCard(){
			var pro_text = this.$refs['city'].currentLabels[0];
			var city_text = this.$refs['city'].currentLabels[1];

			var pro_value = this.form.bankOpen[0];
			var city_value = this.form.bankOpen[1];
			
			var bankData = this.bankcardData[this.form.bankName];
			var bankName = bankData.label;
			var channelid = bankData.value;

			this.$httpPost("/pc/myaccount/identifyBackSendAddFy",{accountName:this.custName, mobileno:this.form.bankPhone, tpasswd:this.form.password,
				certificateno:this.form.card, channelid:channelid, depositacct:this.form.bankId, pro_text:pro_text, pro_value:pro_value,
				city_text:city_text, city_value:city_value, bankName:bankName, validCode:this.form.checkCode
				}).then(res => {
			
				if(res.isValid == "true"){
					this.$message({
						message: '恭喜你添加银行卡成功!',
						type: 'success',
						center: true
					});
					this.saveBankCard.push(res.userBankList);
					this.$store.commit('setBankCard',this.saveBankCard);
					this.$router.go(-1);
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
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		handleChange(value) {
			// console.log(value);
		},
		sendCodeValid(formName){
			var valData = ['bankName','bankId','bankOpen','bankPhone'];
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
			this.$httpPost("/pc/myaccount/bgMsgSendForBankCard",{accountName:this.form.name,mobileno:this.form.bankPhone,
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
			this.getDetails();
		},
		getDetails(){
			this.$httpPost("/pc/myaccount/getUserDetails").then (rec=>{
				if(rec.isValid == "redirect"){
					this.$router.push('/login');
				}else{
					this.custName = rec.custName;
					this.certificateno_show = rec.certificateno_show;
					this.certificateno = rec.certificateno;
				}
			}).catch(err =>{
				//错误的回调
				console.log("访问接口失败"+err);
			});
		}
	},
	mounted() {
		this.init();
		
	},
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/styles/vars.scss';
@import '~@/assets/icon/iconfont.css';
.bankcard{
	.bankcard-inner{
		width: 1140px;
		margin: 20px auto;
		background-color: #fff;
		box-sizing: border-box;
		padding: 15px;

		.bankcard-title{
			font-weight: normal;
			font-size: 17px;
			padding: 10px;
		}
		.bankcard-form{
			padding: 30px;
			padding-left: 150px;
			width: 600px;

		}
	}
}
</style>
<style lang="scss">
.bankcard-form{
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
</style>

