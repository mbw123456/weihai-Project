<template>
  <div class="asset"><!-- 这是根节点 -->
	<p class="asset-risk" v-show="showRisk">{{riskDetails}}<a @click="gotoRisk">{{gotoRiskHtml}}</a></p>
	<el-row :gutter="20">
		<el-col class="asset-top" :span="8" v-loading="loading">
			<div>
				<h6><i class="iconfont-hjy icon-hjyqiandai"></i>总资产(元)</h6>
				<h4>￥{{Number(total_asset_hold).toFixed(2)}}</h4>
				
			</div>
		</el-col>
		<el-col class="asset-top" :span="8" v-loading="loading">
			<div>
				<h6><i class="iconfont-hjy icon-hjyyingxiaozhongxin"></i>持仓收益(元)</h6>
				<h4 :class="score1 < 0 ?  'letter-green' : 'letter-red'">￥{{Number(score1).toFixed(2)}}</h4>
			</div>
		</el-col>
		<el-col class="asset-top" :span="8" v-loading="loading">
			<div>
				<h6><i class="iconfont-hjy icon-hjyjiaoyiguanli"></i>日收益{{income_day}}</h6>
				<h4 :class="total_asset_hold_day_income < 0 ?  'letter-green' : 'letter-red'">￥{{Number(total_asset_hold_day_income).toFixed(2)}}</h4>
			</div>
		</el-col>
	</el-row>

	<div class="asset-bottom" v-loading="loadingAsset">
		<div v-if="hasData">
				<div v-if="hasWallet" class="asset-bottomList">
					<div class="asset-bottomName">小钱袋</div>
					<el-row>
						<el-col :span="12" class="asset-bottomPart">

							<i class="iconfont-hjy icon-hjyxuanshang"></i>
							<h4>{{Number(wallet_asset_hold).toFixed(2)}}</h4>
							<h6>总资产(元)</h6>
							
						</el-col>
						<el-col :span="12" class="asset-bottomPart">

							<i class="iconfont-hjy icon-hjyjiaoyiguanli"></i>
							<h4 :class="wallet_asset_hold_day_income < 0 ?  'letter-green' : 'letter-red'">{{Number(wallet_asset_hold_day_income).toFixed(2)}}</h4>
							<h6>日收益{{income_day}}</h6>

						</el-col>
					</el-row>
				</div>

				<div v-for="(item,keydtb) in dtbList" :key="keydtb+'dtb'" class="asset-bottomList">
					<div class="asset-bottomName">{{item.group_name}}</div>
					<el-row>
						<el-col :span="12" class="asset-bottomPart">

							<i class="iconfont-hjy icon-hjyxuanshang"></i>
							<h4>{{Number(item.group_plans_asset).toFixed(2)}}</h4>
							<h6>总资产(元)</h6>
							
						</el-col>
						<el-col :span="12" class="asset-bottomPart">

							<i class="iconfont-hjy icon-hjyjiaoyiguanli"></i>
							<h4 :class="item.group_plans_day_income < 0 ?  'letter-green' : 'letter-red'">{{Number(item.group_plans_day_income).toFixed(2)}}</h4>
							<h6>日收益{{income_day}}</h6>

						</el-col>
					</el-row>
				</div>
				
				<div v-if="hasZLB" class="asset-bottomList">
					<div class="asset-bottomName">正利宝</div>
					<el-row>
						<el-col :span="12" class="asset-bottomPart">

							<i class="iconfont-hjy icon-hjyxuanshang"></i>
							<h4>{{Number(zlb_asset_hold).toFixed(2)}}</h4>
							<h6>总资产(元)</h6>
							
						</el-col>
						<el-col :span="12" class="asset-bottomPart">

							<i class="iconfont-hjy icon-hjyjiaoyiguanli"></i>
							<h4 :class="zlb_asset_hold_day_income < 0 ?  'letter-green' : 'letter-red'">{{Number(zlb_asset_hold_day_income).toFixed(2)}}</h4>
							<h6>日收益{{income_day}}</h6>

						</el-col>
					</el-row>
				</div>

				<div v-for="(item,keyjzb) in jzbList" :key="keyjzb+'jzb'" class="asset-bottomList">
					<div class="asset-bottomName">{{item.wisdom_name}}</div>
					<el-row>
						<el-col :span="12" class="asset-bottomPart">

							<i class="iconfont-hjy icon-hjyxuanshang"></i>
							<h4>{{Number(item.wisdom_plans_asset).toFixed(2)}}</h4>
							<h6>总资产(元)</h6>
							
						</el-col>
						<el-col :span="12" class="asset-bottomPart">

							<i class="iconfont-hjy icon-hjyjiaoyiguanli"></i>
							<h4 :class="item.wisdom_plans_day_income < 0 ?  'letter-green' : 'letter-red'">{{Number(item.wisdom_plans_day_income).toFixed(2)}}</h4>
							<h6>日收益{{income_day}}</h6>

						</el-col>
					</el-row>
				</div>

				<div v-if="hasNASA" class="asset-bottomList">
					<div class="asset-bottomName">NASA</div>
					<el-row>
						<el-col :span="12" class="asset-bottomPart">

							<i class="iconfont-hjy icon-hjyxuanshang"></i>
							<h4>{{Number(nasa_asset_hold).toFixed(2)}}</h4>
							<h6>总资产(元)</h6>
							
						</el-col>
						<el-col :span="12" class="asset-bottomPart">

							<i class="iconfont-hjy icon-hjyjiaoyiguanli"></i>
							<h4 :class="nasa_asset_hold_day_income < 0 ?  'letter-green' : 'letter-red'">{{Number(nasa_asset_hold_day_income).toFixed(2)}}</h4>
							<h6>日收益{{income_day}}</h6>

						</el-col>
					</el-row>
				</div>

				<div v-for="(item,keydiy) in diyList" :key="keydiy+'diy'" class="asset-bottomList">
					<div class="asset-bottomName">{{item.diy_name}}</div>
					<el-row>
						<el-col :span="12" class="asset-bottomPart">

							<i class="iconfont-hjy icon-hjyxuanshang"></i>
							<h4>{{Number(item.diy_plans_asset).toFixed(2)}}</h4>
							<h6>总资产(元)</h6>
							
						</el-col>
						<el-col :span="12" class="asset-bottomPart">

							<i class="iconfont-hjy icon-hjyjiaoyiguanli"></i>
							<h4 :class="item.diy_plans_day_income < 0 ?  'letter-green' : 'letter-red'">{{Number(item.diy_plans_day_income).toFixed(2)}}</h4>
							<h6>日收益{{income_day}}</h6>

						</el-col>
					</el-row>
				</div>
			
			<div v-if="hasOther" class="asset-bottomList">
				<div class="asset-bottomName">单只基金</div>
				<el-row>
					<el-col :span="12" class="asset-bottomPart">

						<i class="iconfont-hjy icon-hjyxuanshang"></i>
						<h4>{{Number(other_hold).toFixed(2)}}</h4>
						<h6>总资产(元)</h6>
						
					</el-col>
					<el-col :span="12" class="asset-bottomPart">

						<i class="iconfont-hjy icon-hjyjiaoyiguanli"></i>
						<h4 :class="other_income < 0 ?  'letter-green' : 'letter-red'">{{Number(other_income).toFixed(2)}}</h4>
						<h6>日收益{{income_day}}</h6>

					</el-col>
				</el-row>
			</div>
		</div>
		<div v-else class="asset-nothing">
			<i class="iconfont-hjy icon-hjyqueshengye"></i>
			<h4>暂无持仓</h4>
		</div>
	</div>
  </div>
</template>

<script>


export default {
	name: 'Asset',
	data(){
		return {
			riskDetails:'',
			gotoRiskHtml:'',
			showRisk:false,
			loading:true,
			loadingAsset:true,
			title:'总资产(元)',
			score1:'0.00',
			score2:'0.00',
			income_day:'',
			hasData:true,
			hasWallet:false,
			hasOther:false,
			hasZLB:false,
			hasNASA:false,
			other_hold:0.00,//其他资产
			total_asset_hold:0.00,//总资产
			dt_asset_hold:0.00,//定投宝资产
			wallet_asset_hold:0.00,//小钱袋资产
			jzb_asset_hold:0.00,//基智宝资产
			diy_asset_hold:0.00,//diy资产
			nasa_asset_hold:0.00,//nasa资产
			zlb_asset_hold:0.00,//正利宝资产
			//日收益
			total_asset_hold_day_income:0.00,//总日收益
			dt_asset_hold_day_income:0.00,//定投宝日收益
			wallet_asset_hold_day_income:0.00,//小钱袋日收益
			jzb_asset_hold_day_income:0.00,//基智宝日收益
			diy_asset_hold_day_income:0.00,//diy日收益
			nasa_asset_hold_day_income:0.00,//nasa日收益
			zlb_asset_hold_day_income:0.00,//正利宝日收益
			//组合基金是否已加载完毕
			if_dtb_load:false,
			if_jzb_load:false,
			if_zlb_load:false,
			if_nasa_load:false,
			if_diy_load:false,
			if_wallet_load:false,
			if_other_load:false,
			other_income_date:"",
			dtbList:null,
			jzbList:null,
			diyList:null,
			other_income:0.00,
		}
	},
	methods:{
		queryCustInfoForAccountCal(){//查询客户总资产
			this.$httpPost("/pc/account/totalAsset").then(res => {
				this.loading = false;
				if(isNaN(res.total_asset)){
					this.total_asset_hold = 0.00;
					this.hasData = false;
				}else{
					this.total_asset_hold = res.total_asset;
					if(this.total_asset_hold > 0){
						this.hasData = true;
					}else{
						this.hasData = false;
					}
				}

				if(isNaN(res.total_position)){
					this.score1 = 0.00;
				}else{
					this.score1 = res.total_position;
				}

				if(res.income_info == null){
					this.total_asset_hold_day_income = 0.00;
				}else{
					if(isNaN(res.income_info.sum_income)){
						this.total_asset_hold_day_income = 0.00;
					}else{
						this.total_asset_hold_day_income = res.income_info.sum_income;
					}
				}
				if(res.income_info.trad_date_str != null && res.income_info.trad_date_str != undefined){
					this.income_day = '(' + res.income_info.trad_date_str + ')';
				}else{
					this.income_day = '';
				}

				var baobao_info = res.baobao_info;
				this.hasWallet = false;
				if(baobao_info == null){
					this.wallet_asset_hold = 0.00;
					this.wallet_asset_hold_day_income = 0.00;
					this.hasWallet = false;
				}else{
					if(isNaN(baobao_info.fund_income)){
						this.wallet_asset_hold_day_income = 0.00;
					}else{
						this.wallet_asset_hold_day_income = Number(baobao_info.fund_income).toFixed(2);
					}
					if(isNaN(baobao_info.availbal_mode1)){
						this.wallet_asset_hold = 0.00;
					}else{
						this.wallet_asset_hold = Number(baobao_info.availbal_mode1).toFixed(2);
						if(baobao_info.availbal_mode1 > 0){
							this.hasWallet = true;
						}
					}
				}
				this.if_wallet_load = true;
				this.showOtherAsset();
			}).catch(err => {
				//错误的回调
				// eslint-disable-next-line no-console
				console.log("访问接口失败"+err);
			});
		},

		getDTBData(){//查询定投宝资产
			this.$httpPost("/pc/account/dtbAsset").then(res => {
				this.loadingAsset = false;
				this.dtbList = res.group_plan_list;
				if(isNaN(res.fixed_total_asset)){
					this.dt_asset_hold = 0.00;
				}else{
					this.dt_asset_hold = res.fixed_total_asset;
				}
				if(isNaN(res.fixed_total_income)){
					this.dt_asset_hold_day_income = 0.00;
				}else{
					this.dt_asset_hold_day_income = res.fixed_total_income;
				}
				
				this.if_dtb_load = true;
				this.showOtherAsset();    
			}).catch(err => {
				//错误的回调
				// eslint-disable-next-line no-console
				console.log("访问接口失败"+err);
			});
		},
		getZLBData(){//查询正利宝资产
			this.$httpPost("/pc/account/zlbAsset").then(res => {
				// var zlb_plan_list = res.zlb_plan_list;
				if(res.zlb_plan_list == null || res.zlb_plan_list == undefined){
					this.hasZLB = false;
					this.zlb_asset_hold = 0.00;
					this.zlb_asset_hold_day_income = 0.00;
				}else{
					var zlb_plan = res.zlb_plan_list[0];
					console.log('zlb_plan:' + zlb_plan.zlb_plans_asset);
					if(zlb_plan == null || zlb_plan == undefined){
						this.hasZLB = false;
						this.zlb_asset_hold = 0.00;
						this.zlb_asset_hold_day_income = 0.00;
					}else{
						if(isNaN(zlb_plan.zlb_plans_asset)){
							this.hasZLB = false;
							this.zlb_asset_hold = 0.00;
							this.zlb_asset_hold_day_income = 0.00;
						}else{
							this.zlb_asset_hold = zlb_plan.zlb_plans_asset;
							if(zlb_plan.zlb_plans_asset > 0){
								console.log('zlb_plan:' + zlb_plan.zlb_plans_asset);
								this.hasZLB = true;
							}
							this.zlb_asset_hold_day_income = zlb_plan.zlb_plans_day_income;
						}
						
					}
				}
				this.if_zlb_load = true;
				this.showOtherAsset();
			}).catch(err => {
				//错误的回调
				// eslint-disable-next-line no-console
				console.log("访问接口失败0"+err);
			});
		},
		getJZBData(){//查询基智宝资产
			this.$httpPost("/pc/account/jzbAsset").then(res => {
				this.jzbList = res.wisdom_plan_list;
				if(isNaN(res.wisdom_total_asset)){
					this.jzb_asset_hold = 0.00;
				}else{
					this.jzb_asset_hold = res.wisdom_total_asset;
				}
				if(isNaN(res.wisdom_total_income)){
					this.jzb_asset_hold_day_income = 0.00;
				}else{
					this.jzb_asset_hold_day_income = res.wisdom_total_income;
				}
				this.if_jzb_load = true;
				this.showOtherAsset();
			}).catch(err => {
				//错误的回调
				// eslint-disable-next-line no-console
				console.log("访问接口失败"+err);
			});
		},
		getNASAData(){//查询NASA资产
			this.$httpPost("/pc/account/nasaAsset").then(res => {
				if(isNaN(res.nasa_asset)){
					this.nasa_asset_hold = 0.00;
					this.nasa_asset_hold_day_income = 0.00;
					this.hasNASA = false;
				}else{
					if(res.nasa_asset > 0){
						this.nasa_asset_hold = res.nasa_asset;
						this.hasNASA = true;
							if(isNaN(res.nasa_day_income)){
							this.nasa_asset_hold_day_income = 0.00;
						}else{
							this.nasa_asset_hold_day_income = res.nasa_day_income;
						}
					}else{
						this.nasa_asset_hold = 0.00;
						this.nasa_asset_hold_day_income = 0.00;
						this.hasNASA = false;
					}
				}
				this.if_nasa_load = true;
				this.showOtherAsset();
			}).catch(err => {
				//错误的回调
				// eslint-disable-next-line no-console
				console.log("访问接口失败"+err);
			});
		},
		getDIYData(){//查询DIY资产
			this.$httpPost("/pc/account/diyAsset").then(res => {
				this.diyList = res.diy_plan_list;
				if(isNaN(res.diy_total_asset)){
					this.diy_asset_hold = 0.00;
				}else{
					this.diy_asset_hold = res.diy_total_asset;
				}
				if(isNaN(res.diy_total_income)){
					this.diy_asset_hold_day_income = 0.00;
				}else{
					this.diy_asset_hold_day_income = res.diy_total_income;
				}
				this.if_diy_load = true;
				this.showOtherAsset();
			}).catch(err => {
				//错误的回调
				// eslint-disable-next-line no-console
				console.log("访问接口失败"+err);
			});
		},
		showOtherAsset(){
			if(this.if_dtb_load && this.if_jzb_load && this.if_zlb_load && this.if_nasa_load && this.if_diy_load && this.if_wallet_load && !this.if_other_load){
				this.other_hold = this.total_asset_hold - this.dt_asset_hold - this.wallet_asset_hold - this.jzb_asset_hold - this.diy_asset_hold - this.nasa_asset_hold - this.zlb_asset_hold;
				this.other_income = this.total_asset_hold_day_income - this.dt_asset_hold_day_income - this.wallet_asset_hold_day_income - this.jzb_asset_hold_day_income - 
					this.diy_asset_hold_day_income - this.nasa_asset_hold_day_income - this.zlb_asset_hold_day_income;
				// console.log('this.total_asset_hold:' + this.total_asset_hold);
				// console.log('this.dt_asset_hold:' + this.dt_asset_hold);
				// console.log('this.wallet_asset_hold:' + this.wallet_asset_hold);
				// console.log('this.jzb_asset_hold:' + this.jzb_asset_hold);
				// console.log('this.diy_asset_hold:' + this.diy_asset_hold);
				// console.log('this.nasa_asset_hold:' + this.nasa_asset_hold);
				// console.log('this.zlb_asset_hold:' + this.zlb_asset_hold);

				// console.log('this.total_asset_hold_day_income:' + this.total_asset_hold_day_income);
				// console.log('this.dt_asset_hold_day_income:' + this.dt_asset_hold_day_income);
				// console.log('this.wallet_asset_hold_day_income:' + this.wallet_asset_hold_day_income);
				// console.log('this.jzb_asset_hold_day_income:' + this.jzb_asset_hold_day_income);
				// console.log('this.diy_asset_hold_day_income:' + this.diy_asset_hold_day_income);
				// console.log('this.nasa_asset_hold_day_income:' + this.nasa_asset_hold_day_income);
				// console.log('this.zlb_asset_hold_day_income:' + this.zlb_asset_hold_day_income);
				if(this.other_hold > 0){
					this.hasOther = true;
				}else{
					this.hasOther = false;
				}

				this.if_dtb_load=false;
				this.if_jzb_load=false;
				this.if_zlb_load=false;
				this.if_nasa_load=false;
				this.if_diy_load=false;
				this.if_wallet_load=false;
				this.if_other_load=true;
			}
		},
		gotoRisk(){
			this.$router.push('/risk')
		},
		getRiskType(){
			var riskType = this.$store.state.riskType;
			console.log("riskType... : " + riskType);
			if(riskType == "no"){
				this.showRisk = true;
				this.riskDetails = "为更好了解自己的风险承受能力，交易前需进行风险测评。";
				this.gotoRiskHtml = "去测评";
			}else if(riskType == "timeOut"){
				this.showRisk = true;
				this.riskDetails = "风险测评已过有效期，为更好了解自己的风险承受能力，不影响正常交易，请点击重新测评。";
				this.gotoRiskHtml = "重新测评";
			}else{
				this.showRisk = false;
				this.riskDetails = "";
				this.gotoRiskHtml = "";
			}
		},
		init() {
			this.queryCustInfoForAccountCal();
			this.getDTBData();
			this.getZLBData();
			this.getJZBData();
			this.getNASAData();
			this.getDIYData();
		},
	},
	mounted() {
		this.init();
		this.getRiskType();
	},
	watch: {
		'$route' (to,from) {
			if (this.$route.name === 'asset') {
				this.getRiskType();
			}
			
		}
	}
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '@/assets/styles/vars.scss';
	@import '~@/assets/icon/iconfont.css';
	.asset{
		.asset-top{
			
			box-sizing: border-box;
			
			div{
				background-color: #fff;
				border-radius: 5px;
				padding: 30px 15px;
				box-shadow: 0 3px 5px rgba($color: #000000, $alpha: 0.1);
			}
			h4{
				color: $color-primary;
				font-size: 30px;
				font-weight: normal;
				padding-top: 15px;
				height:40px;
			}
			h6{
				font-family: arial;
				color: $color-font-third;
				font-size: 14px;
				font-weight: normal;

				i{
					font-size: 20px;
					vertical-align: -2px;
					margin-right: 5px;
				}
			}

		}
		.asset-bottom{
			background-color: #fff;
			border-radius: 5px;
			margin-top: 20px;
			min-height: 300px;
			padding-bottom: 10px;
			box-shadow: 0 3px 5px rgba($color: #000000, $alpha: 0.1);

			.asset-bottomList{
				padding: 20px 15px;
				border-bottom: 1px solid $color-back-first;

				&:nth-child(2n){
					background-color: $color-back-third;
				}
				&:last-child{
					border: none 0;
				}
				.asset-bottomName{
					font-size: 18px;
					color: $color-font-second;
					font-weight: bold;
				}
				.asset-bottomPart{
					text-align: center;
					
					&:first-child{
						border-right: 1px solid $color-back-first;
					}
					i{
						padding: 5px;
						background-color: $color-primary-back;
						border-radius: 50%;
						font-size: 30px;
						color: $color-primary-second;
					}
					h4{
						color: $color-primary;
						font-size: 25px;
						font-weight: normal;
						padding-top: 15px;
						height:30px;
					}
					h6{
						font-family: arial;
						color: $color-font-third;
						font-size: 14px;
						font-weight: normal;
					}
				}
			}
			
		}
		.asset-nothing{
			text-align: center;
			padding-top: 70px;
			i{
				font-size: 100px;
				color: $color-font-fourth;
			}
			h4{
				color: $color-font-third;
				padding-top: 20px;
				font-weight: normal;
				padding-right: 20px;
			}
		}
		.asset-risk{
			margin-bottom: 15px;
			font-weight: bold;
			background-color: #fef0f0;
			color: #f56c6c;
			padding: 8px 16px;
			box-sizing: border-box;
			border-radius: 4px;
			font-size: 13px;

			a{
				float: right;
				text-decoration: underline;
			}
		}
		
	}
</style>
