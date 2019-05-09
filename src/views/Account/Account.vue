<template>
  <div class="account"><!-- 这是根节点 -->
	<div class="account-inner">
		<el-row>
			<el-col style="width:220px;">
				<div class="account-leftbox">

					<div class="account-routebtn">
						<p><span class="el-icon-user"></span>个人中心</p>
						<router-link :to="{ path: '/account'}" tag="li">基金资产<i class="el-icon-caret-right"></i></router-link>

						<p><span class="el-icon-document"></span>需求管理</p>
						<router-link :to="{ path: '/account/plan'}" tag="li">我发布的<i class="el-icon-caret-right"></i></router-link>
						<router-link :to="{ path: '/account/detail'}" tag="li">我参与的<i class="el-icon-caret-right"></i></router-link>
						<router-link :to="{ path: '/account/invite'}" tag="li">需求跟踪<i class="el-icon-caret-right"></i></router-link>
						
						<p><span class="el-icon-edit-outline"></span>服务管理</p>
						<router-link :to="{ path: '/account/set'}" tag="li">我的服务<i class="el-icon-caret-right"></i></router-link>
						<router-link :to="{ path: '/account/set1'}" tag="li">服务跟踪<i class="el-icon-caret-right"></i></router-link>

						<p><span class="el-icon-star-off"></span>成功案例</p>
						<router-link :to="{ path: '/account/plan1'}" tag="li">我的案例<i class="el-icon-caret-right"></i></router-link>
						<router-link :to="{ path: '/account/detail1'}" tag="li">申请案例<i class="el-icon-caret-right"></i></router-link>
						
						<p><span class="el-icon-setting"></span>个人设置</p>
						<router-link :to="{ path: '/account/set2'}" tag="li">个人资料<i class="el-icon-caret-right"></i></router-link>
						<router-link :to="{ path: '/account/set3'}" tag="li">名片管理<i class="el-icon-caret-right"></i></router-link>
						<router-link :to="{ path: '/account/set4'}" tag="li">认证管理<i class="el-icon-caret-right"></i></router-link>
						<router-link :to="{ path: '/account/set5'}" tag="li">密码管理<i class="el-icon-caret-right"></i></router-link>
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
				background-color: #fff;
				border-radius: 5px;
				padding:0 15px;
				overflow: hidden;
				padding-bottom: 20px;
			
				.account-routebtn{
					
					p{
						padding: 10px 0;
						text-align: left;
						font-size: 17px;
						padding-left: 20px;
						border-top: 1px solid $color-back-first;
						padding-top: 20px;
						margin-top: 15px;

						&:first-child{
							border: none 0;
							margin-top: 5px;
						}

						span{
							font-size: 21px;
							color: $color-font-third;
							margin-right: 10px;
							vertical-align: -2px;
						}
					}
					li{
						line-height: 35px;
						padding: 0 15px;
						padding-left: 50px;
						color: $color-font-third;
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
							color: #fff;
							float: right;
							line-height: 35px;
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
					.router-link-exact-active{
						color:$color-primary;
						background-color:$color-primary-second;

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