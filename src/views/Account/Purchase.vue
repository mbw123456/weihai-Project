<template>
  <div class="purchase"><!-- 这是根节点 -->
	<div class="purchase-inner">
		<h3 class="purchase-title">基金买入</h3>

		<el-form :model="form" :rules="rules" ref="ruleForm" label-width="150px" class="purchase-form" v-loading="loading">
			<el-form-item label="基金简称" >
				<p>{{fundname}}<span>{{fundcode}}</span></p>
			</el-form-item>
			<el-form-item label="交易方式" prop="bankChoice">
				<el-radio-group v-model="form.bankChoice">
				  <el-radio :label="item" border class="purchase-radio" v-for="(item,key) in bankList" :key="key">
						<img :src="`${publicPath}img/bank_icon/${item.img_name}`">
						<span :bankvalue="item.bankvalue">{{item.bankname}}({{item.bankaccount}})</span>
						<b>{{item.bank_limit}}</b>
					</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="购买金额" prop="money" >
				<el-input v-model="form.money" autocomplete="off" :placeholder="this.minBuyAmountShow" @input="handlemoneyInput"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password" >
				<el-input v-model="form.password" autocomplete="off" placeholder="请输入密码" show-password></el-input>
			</el-form-item>

			<el-form-item prop="choice">
				<el-checkbox-group v-model="form.choice">
				<el-checkbox label="" name="choice" class="invest-choice">
				我已阅读并同意
				<a @click.stop="dialogRiskVisible = true">《风险揭示书》</a>
				<a  @click.stop="openNomatching" v-show="this.showfxbpp">《风险不匹配警示函》</a>
				</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			
			<!-- 《风险揭示书》 因为购买页也需要使用，已封装成组件 -->
			<ProtocolRisk :visible="dialogRiskVisible" :hideComponentDialog="hideComponentDialog" :close="hideComponentDialog"/>

			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')" :loading="btnLoading" :disabled="btnLoading">确认买入</el-button>
			</el-form-item>
		</el-form>

	</div>

  </div>
</template>

<script>
import ProtocolRisk from '@/components/ProtocolRisk.vue';
export default {
	components:{
		ProtocolRisk
	},
	name: 'Purchase',
	data(){

		var checkminBuyAmount = (rule, value, callback) => {
			if (parseFloat(value) < parseFloat(this.minBuyAmount)) {
				this.checkAmountMsg='购买金额不能小于'+this.minBuyAmount+'元';
				callback(new Error(this.checkAmountMsg));
			} else if(parseFloat(value) > parseFloat(this.maxBuyAmount)){
				this.checkAmountMsg='购买金额不能大于'+this.maxBuyAmount+'元';
				callback(new Error(this.checkAmountMsg));
			} else if(Number(this.buy_step)!=0 && Number(value)%Number(this.buy_step)!=0){
				this.checkAmountMsg='购买金额必须是'+this.buy_step+'元的整数倍';
				callback(new Error(this.checkAmountMsg));
			}else{
				callback();
			}
		};

		return {
			//获取public路径
			publicPath: process.env.BASE_URL,
			loading:true,
			showfxbpp:false,
			dialogRiskVisible:false,
			bankList: {},//this.$store.state.BANK_CARD,
			form:{
				bankChoice:'',
				money:'',
				password:'',
            },
			rules: {
				bankChoice: [
					{required: true, message: '请选择银行', trigger: 'change' },
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				money:[
					{required: true, message: '请输入购买金额', trigger: 'change' },
					{validator: checkminBuyAmount, trigger: 'blur' }
				],
				password:[
					{required: true, message: '请输入密码', trigger: 'change' },
				],
				choice:[
					{ required: true, message: '请阅读并勾选', trigger: 'change' },
				],
			},

			//初始化传参
			pramfundcode:'',
			prambusiness:'',

			//接参数
			fundcode:'',
			fundname:'',
			fundtype:'',
			minBuyAmount:0,
			maxBuyAmount:0,
			buy_step:'',
			custrisk:'',
			risklevel:'',
			tano:'',
			sharetype:'',
			bindCard:'',
			minBuyAmountShow:'',

			//页面控制
			overlay:'',
			amountisinput:false,
			pwdisinput:false,
			agreementcheck:false,
			wallet_availablevol:0,
			cardType:'',
			bankvalue:null,
			buySuccessMsg:'',
			buySuccessType:'',
			showBuySuccessPage:false,
			riskMessage:'',
			riskButton:'',
			riskType:'',
			checkAmountMsg:'',
			btnLoading:false,
		}
	},
	methods:{
		
		hideComponentDialog(){
			this.dialogRiskVisible = false;
		},
		openNomatching(){
			this.$alert('根据适当性匹配原则，该产品/服务高于您的风险承受能力，特此向您书面警示： 购买该产品/服务，可能导致您承担超出自身承受能力损失以及不利后果。请您认真考虑相应风险，审慎决定购买该产品或服务，如果您坚持购买，请仔细阅读并确认以下承诺：“本人已收到贵司出具的《风险不匹配警示函》，对于本人申请购买产品/服务风险等级高于本人风险承受能力情况已知悉，并且已充分了解该产品/服务的风险特征和可能的不利后果。经本人审慎考虑，仍坚持申请购买该产品/服务，并自愿承担由此可能产生的一切不利后果和损失。该销售机构及工作人员在销售过程中，不存在直接或间接主动向本人推介该产品/服务的行为。”', '风险不匹配警示函', {
				confirmButtonText: '确定',
				callback: action => {
					this.$message({
						type: 'warning',
						message: `您已阅读风险不匹配`
					});
				}
			});
		},
		//交易日已过页面
		openNextBuyDay(){
			this.$confirm('因您的交易已过交易时间，所提交易会在下一个交易日进行提交。', '提示', {
				confirmButtonText: '确认购买',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
					this.buyFund();
				}).catch(() => {

			});
		},
		//购买成功页面
		openBuySucceed(){
			this.$alert(this.buySuccessMsg, '温馨提示', {
				confirmButtonText: '确定',
				callback: action => {
					if(this.buySuccessType=='0000'||this.buySuccessType=='1000'){
						//跳购买成功
						this.$router.push('account/detail');
					}else{
						//清除密码不跳转
					}
				}
			});
		},
		//没风险测评页面
		openNoRiskingPage(){
			this.$alert('您还没有进行风险测评，请先进行风险测评！', '温馨提示', {
				confirmButtonText: '确定',
				callback: action => {
					//风险测评跳页
					this.$router.push('risk');
				}
			});
		},
		//没绑卡页面
		openNoBindCardPage(){
			this.$alert('您还没有绑定银行卡，请先绑定银行卡！', '温馨提示', {
				confirmButtonText: '确定',
				callback: action => {
					//绑卡跳页
					this.$router.push('bankcard');
				}
			});
		},
		//风险测评的各种提示
		openRiskingPage(){
			this.$confirm(this.riskMessage, '温馨提示', {
				confirmButtonText: this.riskButton,
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
					if(this.riskType=='1'){
						//跳重新测评页面
						this.$router.push('risk');
					}else if(this.riskType=='2'){
						//关闭当前页
						//this.$router.go(-1);
					}else{

					}
				}).catch(() => {
					if(this.riskType=='1'){
						//跳上一页
						this.$router.go(-1);
					}else if(this.riskType=='2'){
						//跳上一页
						this.$router.go(-1);
					}else{

					}
				});
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.btnLoading = true;
					this.checkTradeTime();
				} else {
					console.log('error submit!!');
					this.$message({
						message: '有未完成的选项',
						type: 'error',
						center: true
					});
					return false;
				}
			});
		},
		initbuypage(){
			this.$httpGet("/pc/trade/buy?fundcode="+this.pramfundcode+"&business="+this.prambusiness).then(res => {
					console.log(res);
					if(res) {
						//银行卡信息
						if(res.resultData.bankInfo) {
							this.bindCard = res.resultData.bankInfo;
						}
						//银行卡列表
						if(res.resultData.bankList){
							this.bankList = res.resultData.bankList;
						}
						//购买基金信息
						if(res.resultData.fundInfo){
							this.minBuyAmount = res.resultData.fundInfo.minBuyAmount;
							this.minBuyAmountShow = "请输入购买金额，"+this.minBuyAmount+"元起";

							this.maxBuyAmount = res.resultData.fundInfo.maxBuyAmount;
							this.buy_step = res.resultData.fundInfo.buy_step;
							this.risklevel = res.resultData.fundInfo.risklevel;
							this.fundcode = res.resultData.fundInfo.fundcode;
							this.tano = res.resultData.fundInfo.tano;
							this.sharetype = res.resultData.fundInfo.sharetype;
							this.fundtype = res.resultData.fundInfo.fundtype;
							this.fundname = res.resultData.fundInfo.fundname;
						}
						//用户风险评级
						if(res.resultData.custrisk){
							this.custrisk = res.resultData.custrisk;
						}
						//处理风险不匹配警示函
						if(this.custrisk=='no'){
							//弹窗跳风险测评页面
							this.openNoRiskingPage();
						}else{
							if(this.bindCard.bindCard=='false'){
								//弹窗跳绑卡页面
								this.openNoBindCardPage();
							}else{
								if(this.custrisk == '01'){
									//弹窗跳风险测评页面
									this.riskMessage='您的风险能力为最低等级，只能购买低风险产品';
									this.riskButton='重新测评';
									this.riskType='1';
									this.openRiskingPage();

									this.showfxbpp = true;
								}else if(Number(this.custrisk)<Number(this.risklevel)){
									//弹窗提示
									this.riskMessage='当前所选的基金风险等级超过您测评的风险等级，请知晓风险';
									this.riskButton='继续交易';
									this.riskType='2';
									this.openRiskingPage();

									this.showfxbpp = true;
								}else if(this.risklevel == '05'){
									this.riskMessage='当前所选基金为高风险，请知晓风险';
									this.riskButton='继续交易';
									this.riskType='2';
									this.openRiskingPage();

									this.showfxbpp = true;
								}else{
									this.showfxbpp=false;
									//agreementcheck = true;
								}
							}
						}
						//等待完成
						this.loading= false;
						
					}
					// eslint-disable-next-line no-unused-vars
					}).catch(err => {
						//错误的回调
						// eslint-disable-next-line no-console
						console.log("访问接口失败");
					});
			},
			buyFund(){
				this.$httpPost("/pc/trade/buyFund",
				{
					fundcode:this.fundcode,
					value:this.form.bankChoice.bankvalue,
					tpasswd:this.form.password,
					tano:this.tano,
					sharetype:this.sharetype,
					applicationamt:this.form.money,
					fundtype:this.fundtype,
					fundname:this.fundname
				}).then(res => {
					console.log(res);
					if(res) {
						if(res.resultData.success=='false'){
							//返回登录页面
							this.$router.push('/login');
						}else if(res.resultData.success=='more'){
							//更多页面
							//window.location=ctx+'/error/accessmore';
						}else if(res.resultData.success=='error'){
							//错误页面
							//window.location=ctx+'/error/error';
						}else{
							if(res.resultData.rtncode=='0000'){
								this.buySuccessMsg = '基金买入成功';
								this.buySuccessType = '0000';
								this.openBuySucceed();

							}else if(res.resultData.rtncode=='1000'){
								this.buySuccessMsg = '支付失败';
								this.buySuccessType = '1000';
								this.openBuySucceed();

							}else{
								this.buySuccessMsg = res.resultData.msg;
								this.buySuccessType = '';
								this.openBuySucceed();

							}
							this.showBuySuccessPage = true;
						}
					}
				// eslint-disable-next-line no-unused-vars
					this.btnLoading = false;
				}).catch(err => {
					//错误的回调
					// eslint-disable-next-line no-console
					this.btnLoading = false;
					console.log("访问接口失败");
				});
			},
			checkTradeTime(){
				this.$httpGet("/pc/trade/checkTradeTime?fundcode="+this.fundcode+"&tano="+this.tano).then(res => {
						console.log(res);
						if(res) {
							if(res.resultData.success=='false'){
								//未登录
								//overlay.hide();
								//openLoginModal('loginCallBack');
							}else if(res.resultData.success=='more'){
								//已废弃？
								//window.location=ctx+'/error/accessmore';
							}else if(res.resultData.success=='error'){
								//系统错误，请联系管理员
								//window.location=ctx+'/error/error';
							}else{
								//成功
								if(res.resultData.result=='0'){
									//overlay.hide();
									//$('#myModalCheckTime').reveal($('#myModalCheckTime').data());
									this.openNextBuyDay();
								}else{
									//overlay.hide();
									this.buyFund();
								}
							}
						}
						// eslint-disable-next-line no-unused-vars
						}).catch(err => {
							//错误的回调
							// eslint-disable-next-line no-console
							this.btnLoading = false;
							console.log("访问接口失败");
						});
				},
				handlemoneyInput(){
					this.form.money = this.form.money.replace(/[^\d.]/g,""); //清除“数字”和“.”以外的字符
					this.form.money = this.form.money.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
					this.form.money = this.form.money.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
					this.form.money = this.form.money.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
					if(this.form.money.indexOf(".")< 0 && this.form.money !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
						this.form.money= parseFloat(this.form.money);
					}
				},
	},
	mounted(){
		this.pramfundcode=this.$route.query.fundcode;
		this.prambusiness=this.$route.query.business;
		this.initbuypage();
	},
	watch: {
		
		'$route' (to,from) {
			if (this.$route.name === 'purchase') {
				//所有变量赋值空
				//获取public路径
				this.showfxbpp=false;
				this.dialogRiskVisible=false;
				this.bankList = {};
				this.form = {
					bankChoice:'',
					money:'',
					password:'',
	            };

				//接参数
				this.fundcode='';
				this.fundname='';
				this.fundtype='';
				this.minBuyAmount=0;
				this.maxBuyAmount=0;
				this.buy_step='';
				this.custrisk='';
				this.risklevel='';
				this.tano='';
				this.sharetype='';
				this.bindCard='';
				this.minBuyAmountShow='';

				//页面控制
				this.overlay='';
				this.amountisinput=false;
				this.pwdisinput=false;
				this.agreementcheck=false;
				this.wallet_availablevol=0;
				this.cardType='';
				this.bankvalue=null;
				this.buySuccessMsg='';
				this.buySuccessType='';
				this.showBuySuccessPage=false;
				this.riskMessage='';
				this.riskButton='';
				this.riskType='';
				this.checkAmountMsg='';

				//执行初始化方法
				this.pramfundcode=this.$route.query.fundcode;
				this.prambusiness=this.$route.query.business;

				this.initbuypage();
        		// this.fundNoticeDetail();
			}
		}
	}
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/styles/vars.scss';
@import '~@/assets/icon/iconfont.css';
.purchase{
	.purchase-inner{
		width: 1140px;
		margin: 20px auto;
		background-color: #fff;
		box-sizing: border-box;
		padding: 15px;

		.purchase-title{
			font-weight: normal;
			font-size: 17px;
			padding: 10px;
		}
		.purchase-form{
			padding: 30px;
			padding-left: 150px;
			width: 600px;

			p{
				span{
					color: $color-font-third;
					margin-left: 10px;
				}
			}
			.purchase-radio{
				
				img{
					width: 30px;
					margin-top: 7px;
					vertical-align: -7px;
					margin-right: 5px;
				}
				span{
					font-size: 14px;
					color: $color-font-second;
				}
				b{
					font-size: 12px;
					font-weight: normal;
					color: $color-font-third;
					float: right;
					padding-top: 14px;
				}
			}

		}
	}
}
</style>
<style lang="scss">
@import '@/assets/styles/vars.scss';
.purchase-form{
	.el-form-item__label{
		padding-right: 30px;
	}
	.el-cascader,.el-radio-group,.el-radio{
		width: 100%;
	}
	.el-radio.is-bordered{
		padding: 0 15px;
	}
	.el-radio.is-bordered + .el-radio.is-bordered{
		margin-left: 0;
		margin-top: 10px;
	}
	.el-radio.is-bordered.is-checked{
		background-color: $color-primary-back;
	}
}
</style>

