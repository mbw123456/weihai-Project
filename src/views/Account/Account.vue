<template>
  <div class="account"><!-- 这是根节点 -->
	<div class="account-inner">
		<el-row>
			<el-col :span="5" >
				<div class="account-leftbox">
					<div class="account-titlebox">
						<div><img :src="head_url"></div>
						<p>{{title_name}}</p>
						<h6>上次登录:{{last_login_time}}</h6>
					</div>

					<div class="account-routebtn">
						<router-link :to="{ path: '/account'}" tag="li"><span class="iconfont-hjy icon-hjyzichan"></span>基金资产<i class="el-icon-caret-right"></i></router-link>
						<router-link :to="{ path: '/account/plan'}" tag="li"><span class="iconfont-hjy icon-hjyshijian"></span>定投计划<i class="el-icon-caret-right"></i></router-link>
						<router-link :to="{ path: '/account/detail'}" tag="li"><span class="iconfont-hjy icon-hjyxinxishichang"></span>交易明细<i class="el-icon-caret-right"></i></router-link>
						<router-link :to="{ path: '/account/invite'}" tag="li"><span class="iconfont-hjy icon-hjyyiqipindan"></span>邀请好友<i class="el-icon-caret-right"></i></router-link>
						<router-link :to="{ path: '/account/set'}" tag="li"><span class="iconfont-hjy icon-hjyfuwuguanli"></span>账户设置<i class="el-icon-caret-right"></i></router-link>
					</div>
				</div>
				<p class="account-download"><i class="el-icon-mobile-phone" style="margin-right:5px; font-size:14px;"></i>更多信息可在app中查看</p>
			</el-col>
			<el-col :span="18" :offset="1">
					<keep-alive exclude="Plan,Asset,Detail,Invite">
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
		getAccountBaseMessage(){//查询客户基本信息
			this.$httpPost("/pc/account/accountBase").then(res => {
				this.title_name = res.cust_name;
				this.last_login_time = res.last_login_time_str;
				// this.dtb = res.resultData.dtbTypeE[0];
				// this.jzb = res.resultData.wisdomList;
				// this.xqd = res.resultData.sevenDayOfYearYield;
				// this.xqd.roundData = String(this.xqd.roundData).replace('%', '');
				// this.loading = false;
			// eslint-disable-next-line no-unused-vars
			}).catch(err => {
				//错误的回调
				// eslint-disable-next-line no-console
				console.log("访问接口失败"+err);
			});
		},
		queryCustInfoForAccountCal(){//查询客户总资产
			this.$httpPost("/pc/account/accountBase").then(res => {
				this.title_name = res.cust_name;
				this.last_login_time = res.last_login_time_str;
				
			}).catch(err => {
				//错误的回调
				// eslint-disable-next-line no-console
				console.log("访问接口失败"+err);
			});
		},
		getHeadPortrait(){//查询DIY资产
			this.$httpPost("/pc/account/getHeadPortrait").then(res => {
				if(res.url){
					this.head_url = res.url;
					console.log('head_url:' + res.url);
				}
			}).catch(err => {
				//错误的回调
				// eslint-disable-next-line no-console
				console.log("访问接口失败"+err);
			});
		},
		init() {
			// this.getNotices();
			this.getAccountBaseMessage();
			this.getHeadPortrait();
			// console.log(this.publicPath);
			// setInterval(this.annoScroll,3000);
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
	.account{
		padding-top: 30px;
		padding-bottom: 30px;
		
		.account-inner{
			width: 1140px;
			margin: 0 auto;

			.account-download{
				font-size: 12px;
				color: $color-font-fourth;
				text-align: center;
				padding-top: 20px;
			}
			.account-leftbox{
				height: 500px;
				background-color: #fff;
				box-shadow: 0 5px 5px rgba($color: #000000, $alpha: 0.2);
				border-radius: 5px;
			
				.account-titlebox{
					padding: 20px;
					height: 147px;

					div{
						height: 90px;
						width: 90px;
						margin: 0 auto;
						border-radius: 50%;

						img{
							display: block;
							width: 100%;
							height: 100%;
						}
					}
					p{
						text-align: center;
						padding-top: 15px;
						color: $color-font-first;
					}
					h6{
						text-align: center;
						font-weight: normal;
						color: $color-font-fourth;
						padding-top: 5px;
					}
				}
				.account-routebtn{
					padding-top: 30px;

					li{
						line-height: 50px;
						padding: 0 15px;
						padding-left: 35px;
						border-top: 1px solid $color-back-second;
						color: $color-font-third;
						font-size: 16px;
						cursor: pointer;
						box-sizing: border-box;

						span{
							font-size: 25px;
							color: $color-font-fourth;
							vertical-align: -3px;
							margin-right: 20px;
						}
						i{
							font-size: 20px;
							color: #fff;
							float: right;
							line-height: 50px;
						}
						&:hover{
							color: $color-font-first;
						}
						&:hover span{
							color: $color-primary;
						}
						&:hover i{
							color: $color-font-fourth;
						}
					}
					.router-link-exact-active{
						color:$color-font-first;
						background-color: $color-back-third;

						span{
							color: $color-primary;
						}
						i{
							color: $color-font-fourth;
						}
					}
				}
			}
			
		}
	}
</style>