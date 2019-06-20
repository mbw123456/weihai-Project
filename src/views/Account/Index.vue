<template>
  <div class="account"><!-- 这是根节点 -->
	<div class="account-inner">
		<el-row>
			<el-col style="width:220px;">
				<div class="account-leftbox">

					<div class="account-routebtn">
						<router-link :to="{ path: '/account'}" tag="p" v-if="this.$store.state.custType=='1' || this.$store.state.custType=='3'"><span class="el-icon-document"></span>我的项目<i class="el-icon-caret-right"></i></router-link>
						<h4><span class="el-icon-star-off"></span>关注中心</h4>
						<router-link :to="{ path: '/account/attentionMe'}" tag="li">关注我的<i class="el-icon-caret-right"></i></router-link>
						<router-link :to="{ path: '/account/myAttention'}" tag="li">我关注的<i class="el-icon-caret-right"></i></router-link>
						<router-link :to="{ path: '/account/message'}" tag="p"><span class="el-icon-chat-dot-square"></span>消息中心<i class="el-icon-caret-right"></i></router-link>
						
						<router-link :to="{ path: '/account/set'}" tag="p"><span class="el-icon-s-tools"></span>账户设置<i class="el-icon-caret-right"></i></router-link>
						<div style="text-align:center; padding:20px; margin-top:50px;"><img style="width:100%;" src="@/assets/img/weihai-center_16.png" alt=""></div>
						
					</div>
				</div>
			</el-col>
			<el-col :span="19" :offset="1" style="width:870px;">
					<keep-alive>
						<router-view></router-view>
					</keep-alive>
			</el-col>
		</el-row>
	</div>
  </div>
</template>

<script>

import store from '@/store'
export default {
	name: 'Account',
	data(){
		return {
			//获取public路径
			publicPath: process.env.BASE_URL,

			title_name:'',//客户名
			last_login_time:'',//上次登陆时间
			head_url:'img/account-back_03.png',
			loading:true,
			jzbList:[   
				{ "name": "对抗通胀型", "desc":"分散布局     对抗通胀", "value": "4.54%", "tzlj":"通过配置多个相关性较低的资产以及基金，达到长期追求稳健收益的基金组合。", "fxsy":"中低风险，中低收益" },
				{ "name": "追求超额收益型", "desc":"低位建仓     建好就收", "value": "3.03%", "tzlj":"依靠积极有效的宏观研究加上理性的投资策略，追求在大部分时间内获得超额收益。", "fxsy":"高风险，高收益" },
				{ "name": "防守反击型", "desc":"配置转债     可攻可守", "value": "2.85%", "tzlj":"让投资者在大部分时间里以逸待劳，等待可转债出现明显的机会，争取在反击中“一击制胜”。", "fxsy":"中低风险，中高收益" },
				{ "name": "全球机会型", "desc":"全球建仓     资产轮动", "value": "3.12%", "tzlj":"资产价格走势总是起起伏伏，本产品致力于高抛低吸、抓住这些波动。", "fxsy":"高风险，高收益" },
			],
		}
	},
	methods:{
		// getAccountBaseMessage(){//查询客户基本信息
		// 	this.$httpPost("/pc/account/accountBase").then(res => {
		// 		this.title_name = res.cust_name;
		// 		this.last_login_time = res.last_login_time_str;
		// 		// this.dtb = res.resultData.dtbTypeE[0];
		// 		// this.jzb = res.resultData.wisdomList;
		// 		// this.xqd = res.resultData.sevenDayOfYearYield;
		// 		// this.xqd.roundData = String(this.xqd.roundData).replace('%', '');
		// 		// this.loading = false;
		// 	// eslint-disable-next-line no-unused-vars
		// 	}).catch(err => {
		// 		//错误的回调
		// 		// eslint-disable-next-line no-console
		// 		console.log("访问接口失败"+err);
		// 	});
		// },
		// queryCustInfoForAccountCal(){//查询客户总资产
		// 	this.$httpPost("/pc/account/accountBase").then(res => {
		// 		this.title_name = res.cust_name;
		// 		this.last_login_time = res.last_login_time_str;
				
		// 	}).catch(err => {
		// 		//错误的回调
		// 		// eslint-disable-next-line no-console
		// 		console.log("访问接口失败"+err);
		// 	});
		// },
		// getHeadPortrait(){//查询DIY资产
		// 	this.$httpPost("/pc/account/getHeadPortrait").then(res => {
		// 		if(res.url){
		// 			this.head_url = res.url;
		// 			console.log('head_url:' + res.url);
		// 		}
		// 	}).catch(err => {
		// 		//错误的回调
		// 		// eslint-disable-next-line no-console
		// 		console.log("访问接口失败"+err);
		// 	});
		// },
		// init() {
		// 	// this.getNotices();
		// 	this.getAccountBaseMessage();
		// 	this.getHeadPortrait();
		// 	// console.log(this.publicPath);
		// 	// setInterval(this.annoScroll,3000);
		// }
	},
	mounted() {
		// this.init();
	},
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '@/assets/styles/vars.scss';
	@import '~@/assets/icon/iconfont.css';
	.account{
		padding-top: 30px;
		padding-bottom: 30px;
		
		.account-inner{
			width: 1140px;
			margin: 0 auto;

			.account-leftbox{
				background-color: $color-primary-second;
				border-top: 2px solid $color-primary;
				overflow: hidden;
				padding-bottom: 20px;
				box-shadow: 0px 0px 10px rgba(#000, .2);
			
				.account-routebtn{
					
					h4{
						font-size: 15px;
						padding: 15px 0;
						padding-left: 40px;
						font-weight: normal;
						margin-top: 0 !important;
						color: $color-primary;
						

						span{
							font-size: 21px;
							margin-right: 10px;
							vertical-align: -2px;
						}
					}
					p{
						padding: 15px 0;
						text-align: left;
						font-size: 15px;
						padding-left: 40px;
						margin-top: 0 !important;
						cursor: pointer;
						color: $color-primary;
						

						&:first-child{
							border: none 0;
							margin-top: 5px;
						}

						span{
							font-size: 21px;
							margin-right: 10px;
							vertical-align: -2px;
						}
						i{
							font-size: 17px;
							color: $color-primary-second;
							float: right;
							line-height: 22px;
							margin-right: 15px;
						}
						&:hover{
							color: $color-primary;
						}
						&:hover span{
							color: $color-primary;
						}
						&:hover i{
							color: $color-primary;
						}
					}
					li{
						line-height: 35px;
						padding: 5px 15px;
						padding-left: 80px;
						color: #91b3f5;
						font-size: 14px;
						cursor: pointer;
						box-sizing: border-box;

						span{
							font-size: 25px;
							color: $color-font-fourth;
							vertical-align: -3px;
							margin-right: 20px;
						}
						i{
							font-size: 17px;
							color: $color-primary-second;
							float: right;
							line-height: 35px;
						}
						&:hover{
							color: $color-primary;
							background-color: #fff;
						}
						&:hover span{
							color: $color-primary;
						}
						&:hover i{
							color: $color-primary;
						}
					}
					.router-link-exact-active{
						color:$color-primary;
						background-color:#fff;
						span{
							color: $color-primary;
						}
						i{
							color: $color-primary;
						}
					}
				}
			}
			
		}
	}
</style>