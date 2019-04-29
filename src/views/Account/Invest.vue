<template>
  <div class="purchase"><!-- 这是根节点 -->
	<div class="purchase-inner">
		<h3 class="purchase-title">定投开通</h3>

		<el-form :model="form" :rules="rules" ref="ruleForm" label-width="150px" class="purchase-form" v-loading="loading">

			<el-form-item label="基金简称" >
				<p>{{fundname}}<span>{{fundcode}}</span></p>
			</el-form-item>
			<el-form-item label="交易方式" prop="bankChoice" class="invest-trade">
				<el-radio-group v-model="form.bankChoice">
				  <el-radio :label="item" border class="purchase-radio" v-for="(item,key) in bankList" :key="key">
						<img :src="`${publicPath}img/bank_icon/${item.img_name}`">
						<span :bankvalue="item.bankvalue">{{item.bankname}}({{item.bankaccount}})</span>
						<b>{{item.bank_limit}}</b>
					</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="定投金额" prop="money" >
				<el-input v-model="form.money" autocomplete="off" :placeholder="minInvestAmountShow" @input="handlemoneyInput"></el-input>
			</el-form-item>
			
			<el-form-item label="定投周期" prop="investDate" class="invest-trade">
				<el-cascader
					expand-trigger="hover"
					:options="options"
					v-model="form.investDate"
					@change="handleChange">
				</el-cascader>
			</el-form-item>

			<el-form-item label="" prop="nonexistdayflag" v-show="this.nonexistdaycheck">
				<el-radio-group v-model="form.nonexistdayflag">
				<el-radio label="0">当月最后一交易日</el-radio>
				<el-radio label="1">顺延下月首交易日</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="密码" prop="password" >
				<el-input v-model="form.password" autocomplete="off" placeholder="请输入密码" show-password></el-input>
			</el-form-item>

			<el-form-item prop="choice">
				<el-checkbox-group v-model="form.choice">
				<el-checkbox label="" name="choice" class="invest-choice">
				我已阅读并同意
				<a @click.stop="dialogDTXYVisible = true">《定投协议》</a>
				<a @click.stop="dialogRiskVisible = true">《风险揭示书》</a>
				<a @click.stop="openNomatching" v-show="this.showfxbpp">《风险不匹配警示函》</a>
				</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			
			
			<!-- 《风险揭示书》 因为购买页也需要使用，已封装成组件 -->
			<ProtocolRisk :visible="dialogRiskVisible" :hideComponentDialog="hideComponentDialog" :close="hideComponentDialog"/>

			<!-- 《定投协议》 -->
			<el-dialog title="基金定投服务协议" fullscreen :visible.sync="dialogDTXYVisible">
				<div class="set-riskDialog">
					<h5>甲方：投资者</h5>
					<h5>乙方：泰诚财富基金销售（大连）有限公司（以下简称“乙方”）</h5>
					<h4>第一条 设立依据</h4>
					<h5>依照《中华人民共和国证券投资基金法》、《证券投资基金销售管理办法》和其他有关法律法规以及乙方代销基金产品的公开法律文件，现就甲方委托乙方代理开放式基金定投签订本协议。本协议的未尽事宜，双方同意按照乙方的有关规定办理。</h5>
					<h4>第二条 业务范围</h4>
					<h5>本协议下的基金定投是指投资者通过乙方的基金电子交易平台（PC网站、手机APP及WAP页等）提交基金定期定额申请，约定扣款日期、扣款金额、投资基金的名称等，由乙方于约定扣款日在甲方指定资金账户内自动完成扣款，并提交基金申购申请的一种长期投资方式。</h5>
					<h5>本协议下的基金定期定额投资业务，包括基金定投合约的设定、修改、暂停、恢复、终止等业务。</h5>
					<h4>第三条 业务规则</h4>
					<h6>一、适用投资者</h6>
					<h5>基金定投业务适用于已开通乙方的基金电子交易，并与乙方签订了《银行自动转账授权书》的代扣款支付协议的个人投资者。</h5>
					<h6>二、扣款日期</h6>
					<h5>甲方在开立基金定投合约时须选择扣款日期，该扣款日期即被视为基金合同中约定的申购申请日（Ｔ日）。若甲方约定的扣款日期为非基金交易日，则顺延至下一个交易日扣款。扣款日基金必须处于可定期定额申购状态，否则无法发起扣款，本期定投失败。</h5>
					<h6>三、扣款金额和执行规则</h6>
					<h5>甲方设定基金定投合约时，每笔基金定投最低、最高限额遵照乙方与基金公司对每个基金产品的约定执行。若甲方设定了多个基金定投合约，但扣款当日其指定账户卡内资金余额不足，乙方将对多个定投合约的扣款顺序由系统按随机原则处理，直至余额不足无法继续扣款。</h5>
					<h6>四、扣款失败授权顺延规则</h6>
					<h5>甲方须保证约定扣款日的前一日扣款账户内有足额申购款。</h5>
					<h5>1、如定期定额计划扣款日为非交易日，该笔扣款申请将顺延至下一个交易日提交，顺延可跨月；</h5>
					<h5>2、如定期定额交易申请因账户余额不足、网络或通讯故障等导致扣款失败，将在之后的2个交易日内补扣，若仍未成功则取消本期定额投资的扣款，扣款失败；</h5>
					<h5> 3、因任何原因定期定额交易申请扣款失败连续出现六期（即，出现18次划款失败）的，则定期定额交易自动暂停。</h5>
					<h6>五、基金定投合约的设定、修改、暂停、恢复、终止</h6>
					<h5>甲方设定基金定投合约后，可以对定期定额申购协议中的扣款日和申购金额进行修改，也可以申请暂停、恢复、终止定期定额申购协议。设定、修改、暂停、恢复、终止申请将于操作日期的所属交易日生效。</h5>
					<h5>1、基金定投合约D日设定后，D日所属交易日生效；如果设定的定投合约的申请日与定期定额申购扣款日为同一交易日，首次扣款日为定投合约申请日的下一交易日；</h5>
					<h5>2、基金定投合约D日修改/暂停/恢复/终止后，D日所属交易日生效；如果修改后的扣款日为当天所属交易日的话，扣款实际发生时间则为下一交易日；定投扣款当日开市之前进行暂停、终止操作，当日不再扣。定投扣款当日开市之后不允许进行定投计划的修改、暂停和终止，若当天进行定投计划的恢复操作，会重新计算下次扣款日期，按照规则进行顺延。</h5>
					<h5>注1：D日为自然日。</h5>
					<h5>注2：基金定期定额申购不支持撤单。</h5>
					<h6>六、基金定投申请的确认</h6>
					<h5>1、乙方仅负责在甲方约定的扣款日进行扣款和上报定投委托申请数据，对于最终申购成功与否及确认基金份额，均以该基金注册登记人的确认数据为准。</h5>
					<h5>2、每期成功扣款日为定期定额申购申请实际提交日（T日），该日基金净值为成交价格，甲方可自申请实际提交日后的第二个交易日起（即T+2日，QDII基金为T+3日）可通过乙方的基金电子交易平台查询成交记录。</h5>
					<h5>3、甲方可同时建立多只基金的定投合约或对同一基金设定多个定投合约，各笔定投合约之间相互独立。注：T为交易日。</h5>
					<h6>七、适用费率</h6>
					<h5>基金定投业务的申购费率及计费方式以定期定额申购申请实际扣款日对应乙方电子交易平台基金申购费率及计费方式为准。若费率有变动，以基金管理公司或本平台最新公告为准。</h5>
					<h6>八、指定账户银行卡换卡</h6>
					<h5>如果甲方指定的扣款账户银行卡发生挂失、损坏更换、销卡等异常情况，基金定投业务在实际扣款日将有可能扣款失败。上述情况发生时，甲方须尽快终止基金定投计划及解除原扣款银行卡的授权，并进行扣款银行卡的变更。在扣款银行卡变更完成后，甲方可以使用新的扣款银行卡重新办理基金定投业务。甲方未及时采取上述必要措施所产生的一切后果，由甲方自行承担。</h5>
					<h4>第四条 风险提示条款</h4>
					<h6>一、基金有风险，投资须谨慎</h6>
					<h5>1、乙方仅作为基金公司的代销机构，对基金的业绩不承担任何责任。乙方受理的各类基金交易委托，委托确认结果以该基金登记注册机构的确认结果为准。</h5>
					<h5>2、甲方应当充分了解基金定期定额投资和零存整取等储蓄方式的区别。定期定额投资是引导投资者进行长期投资、平均投资成本的一种简单易行的投资方式。但是定期定额投资并不能规避基金投资所固有的风险，不能保证投资人获得收益，也不是替代储蓄的等效理财方式。</h5>
					<h5>3、基金投资须谨慎。请投资人认真阅读基金的相关法律文件，并选择适合自身风险承受能力的投资品种进行投资。</h5>
					<h6>二、自主决策、自担风险</h6>
					<h5>甲方如同意本协议即视为充分知晓基金投资的风险，自主决策、自担风险。</h5>
					<h4>第五条 争议的解决</h4>
					<h5>甲、乙双方在履行本协议的过程中如发生争议，应本着友好协商的原则解决。协商不成的，任何一方均可将争议提交大连仲裁委员会申请仲裁。仲裁期间，本协议不涉及争议的条款继续履行。</h5>
					<h4>第六条 免责条款</h4>
					<h5>1、如遇自然灾害等不可抗力事件或其它不可预见的非常情况或网络、通讯故障发生，导致乙方无法履行协议的，乙方不承担任何责任。</h5>
					<h5>2、如因甲方指定办理基金代销业务的资金账户不正常导致乙方无法履行协议的，乙方不承担任何责任。</h5>
					<h5>3、甲方应仔细阅读本协议内容，因违反乙方定期定额业务交易规则导致的损失，乙方不承担任何责任。</h5>
					<h4>第七条 协议的生效与终止</h4>
					<h5>1、甲方认同本协议的签订方式及其法律效力，甲方如同意本协议即为对该协议的签订并具有法律上的效力。</h5>
					<h5>2、本协议从合约签订之日起生效。协议生效后，甲方可在乙方基金电子交易平台办理所有基金定投合约的终止手续，本协议随基金定投合约终止失效。</h5>
					<h5>3、若发生基金终止、基金公司变更此项业务或其他导致基金定投业务无法正常进行的情况，基金定投业务自动终止。</h5>
					<h4>第八条其他</h4>
					<h5>乙方对本协议拥有修改权和最终解释权。</h5>
					<div slot="footer" class="dialog-footer">
						<el-button type="primary" style="margin-top:20px;"  @click="dialogDTXYVisible = false">我已阅读</el-button>
					</div>
				</div>
			</el-dialog>

			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')" :loading="btnLoading" :disabled="btnLoading">确认开通</el-button>
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
	name: 'Invest',
	data(){

		var checkminBuyAmount = (rule, value, callback) => {
			if (parseFloat(value) < parseFloat(this.minInvestAmount)) {
				this.checkAmountMsg='定投金额不能小于'+this.minInvestAmount+'元';
				callback(new Error(this.checkAmountMsg));
			} else if(parseFloat(value) > parseFloat(this.maxInvestAmount)){
				this.checkAmountMsg='定投金额不能大于'+this.maxInvestAmount+'元';
				callback(new Error(this.checkAmountMsg));
			} else{
				callback();
			}
		};

		return {
			//获取public路径
			publicPath: process.env.BASE_URL,
			loading:true,
			dialogRiskVisible:false,
			dialogDTXYVisible:false,
			bankList: {},//this.$store.state.BANK_CARD,
			form:{
				bankChoice:'',
				money:'',
				password:'',
				investDate:[],
				choice:[],
				nonexistdayflag:'0',
            },
			rules: {
				bankChoice: [
					{ required: true, message: '请选择银行', trigger: 'change' },
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				money:[
					{ required: true, message: '请输入定投金额', trigger: 'change' },
					{validator: checkminBuyAmount, trigger: 'blur' }
				],
				password:[
					{ required: true, message: '请输入密码', trigger: 'change' },
				],
				investDate:[
					{ required: true, message: '请选择定投周期', trigger: 'change' },
				],
				choice:[
					{ required: true, message: '请阅读并勾选', trigger: 'change' },
				],
			},

			//初始传参
			pramfundcode:'',

			//接参数
			minInvestAmount : '',
			minInvestAmountShow : '',
			maxInvestAmount : '',
			custrisk : '',
			risklevel : '',
			fundcode : '',
			tano : '',
			sharetype : '',
			fundtype : '',
			fundname : '',

			//页面控制和页面元素
			periodsselect : false,
			agreementcheck : false,
			nonexistdaycheck : false,
			amountisinput : false,
			pwdisinput : false,
			riskmatching : '1',
			cardType : "",
			bankvalue : null,
			showfxbpp : false,
			investPayType : '0',

			riskMessage : '',
			riskButton : '',
			riskType : '',

			buySuccessMsg : '',
			buySuccessType : '',

			showBuySuccessPage : '',

			btnLoading:false,

			options : [{
				value: '0',
				label: '每月',
				children: [{
					value: "01",
					label: "1号"
				}, {
					value: "02",
					label: "2号"
				}, {
					value: "03",
					label: "3号"
				}, {
					value: "04",
					label: "4号"
				}, {
					value: "05",
					label: "5号"
				}, {
					value: "06",
					label: "6号"
				}, {
					value: "07",
					label: "7号"
				}, {
					value: "08",
					label: "8号"
				}, {
					value: "09",
					label: "9号"
				}, {
					value: "10",
					label: "10号"
				}, {
					value: "11",
					label: "11号"
				}, {
					value: "12",
					label: "12号"
				}, {
					value: "13",
					label: "13号"
				}, {
					value: "14",
					label: "14号"
				}, {
					value: "15",
					label: "15号"
				}, {
					value: "16",
					label: "16号"
				}, {
					value: "17",
					label: "17号"
				}, {
					value: "18",
					label: "18号"
				}, {
					value: "19",
					label: "19号"
				}, {
					value: "20",
					label: "20号"
				}, {
					value: "21",
					label: "21号"
				}, {
					value: "22",
					label: "22号"
				}, {
					value: "23",
					label: "23号"
				}, {
					value: "24",
					label: "24号"
				}, {
					value: "25",
					label: "25号"
				}, {
					value: "26",
					label: "26号"
				}, {
					value: "27",
					label: "27号"
				}, {
					value: "28",
					label: "28号"
				}, {
					value: "29",
					label: "29号"
				}, {
					value: "30",
					label: "30号"
				}, {
					value: "31",
					label: "31号"
				}]
			},
			{
				value: '1',
				label: '每周',
				children: [{
					value: "1",
					label: "周一"
				}, {
					value: "2",
					label: "周二"
				}, {
					value: "3",
					label: "周三"
				}, {
					value: "4",
					label: "周四"
				}, {
					value: "5",
					label: "周五"
				}]
			},
			{
				value: '2',
				label: '每双周',
				children: [{
					value: "1",
					label: "周一"
				}, {
					value: "2",
					label: "周二"
				}, {
					value: "3",
					label: "周三"
				}, {
					value: "4",
					label: "周四"
				}, {
					value: "5",
					label: "周五"
				}]
			}
			]

		}
	},
	methods:{
		handlemoneyInput(){
			this.form.money = this.form.money.replace(/[^\d.]/g,""); //清除“数字”和“.”以外的字符
			this.form.money = this.form.money.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
			this.form.money = this.form.money.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
			this.form.money = this.form.money.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
			if(this.form.money.indexOf(".")< 0 && this.form.money !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
				this.form.money= parseFloat(this.form.money);
			}
		},
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
		//购买成功页面
		openBuySucceed(){
			this.$alert(this.buySuccessMsg, '温馨提示', {
				confirmButtonText: '确定',
				callback: action => {
					if(this.buySuccessType=='0000'){
						//跳购买成功
						this.$router.push('account/detail');
					}else{
						//清除密码不跳转
					}
				}
			});
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.btnLoading = true;
					this.investFund();
				} else {
					return false;
				}
			});
		},
		handleChange(value) {
			if(this.form.investDate[1]=='29'||this.form.investDate[1]=='30'||this.form.investDate[1]=='31'){
				this.nonexistdaycheck = true;
			}else{
				this.nonexistdaycheck = false;
				this.form.nonexistdayflag='0';
			}
		},
		initinvestpage(){
			this.$httpGet("/pc/trade/newInvest?fundcode="+this.pramfundcode).then(res => {
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
							this.minInvestAmount = res.resultData.fundInfo.minInvestAmount;
							this.minInvestAmountShow = "请输入定投金额，"+this.minInvestAmount+"元起";

							this.maxInvestAmount = res.resultData.fundInfo.maxInvestAmount;
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
									this.riskmatching = '0';
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

			investFund(){
				this.$httpPost("/pc/trade/addInvest",
				{
					value:this.form.bankChoice.bankvalue,
					tpasswd:this.form.password,
					fundcode:this.fundcode,
					sharetype:this.sharetype,
					investamount:this.form.money,
					riskmatching:this.riskmatching,
					tano:this.tano,
					investcycle:this.form.investDate[0],
					investcyclevalue:this.form.investDate[1],
					fundname:this.fundname,
					nonexistdayflag:this.form.nonexistdayflag,
					investPayType:this.investPayType,
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
								this.buySuccessMsg = '定投计划开通成功';
								this.buySuccessType = '0000';
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
	},
	mounted() {
		this.pramfundcode=this.$route.query.fundcode;
		this.initinvestpage();
	},
	watch: {
		'$route' (to,from) {
			if (this.$route.name === 'invest') {
				//变量全初始化

				//获取public路径
				this.dialogRiskVisible=false;
				this.dialogDTXYVisible=false;
				this.bankList={};//this.$store.state.BANK_CARD,
				this.form={
					bankChoice:'',
					money:'',
					password:'',
					investDate:[],
					choice:[],
					nonexistdayflag:'0',
	            };

				//接参数
				this.minInvestAmount='';
				this.minInvestAmountShow = '';
				this.maxInvestAmount = '';
				this.custrisk = '';
				this.risklevel = '';
				this.fundcode = '';
				this.tano = '';
				this.sharetype = '';
				this.fundtype = '';
				this.fundname = '';

				//页面控制和页面元素
				this.periodsselect = false;
				this.agreementcheck = false;
				this.nonexistdaycheck = false;
				this.amountisinput = false;
				this.pwdisinput = false;
				this.riskmatching = '1';
				this.cardType = "";
				this.bankvalue = null;
				this.showfxbpp = false;
				this.investPayType = '0';
				this.riskMessage = '';
				this.riskButton = '';
				this.riskType = '';
				this.buySuccessMsg = '';
				this.buySuccessType = '';
				this.showBuySuccessPage = '';
				this.btnLoading = false;

				//页面初始化方法
				this.pramfundcode=this.$route.query.fundcode;
				this.initinvestpage();
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
			.invest-choice{
				color: $color-font-third;
			}

		}
		.set-riskDialog{
			h4{
				font-size: 17px;
				font-weight: normal;
				margin-top: 10px;
			}
			h5{
				font-size: 14px;
				font-weight: normal;
				color: $color-font-third;
				margin: 8px;
			}
			h6{
				font-size: 14px;
				font-weight: normal;
				margin-top: 10px;
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
	.invest-trade{
		.el-cascader,.el-radio-group,.el-radio{
			width: 100%;
		}
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

