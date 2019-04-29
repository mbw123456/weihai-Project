<template>
  <div class="base"><!-- 这是根节点 -->
		<!-- banner -->
		<template>
			<el-carousel height="320px">
				<el-carousel-item v-for="(item,key) in bannerList" :key="key">
					<div class="banner-box" :style="{backgroundImage: 'url('+publicPath+'img/' + item+ ')'}"></div>
				</el-carousel-item>
			</el-carousel>
				<div class="login-box">
					<div v-if="this.$store.state.autoLogin != 1">
						<el-button type="warning" @click="goToLogin()">立即登录</el-button>
						<el-button type="primary" @click="goToRegister()">免费注册</el-button>
					</div>
					<div v-else class="login-user">
						<p>{{this.$store.state.custName}},欢迎回来</p>
						<el-button type="primary" @click="goToAccount()">我的账户</el-button>
					</div>
					<div class="login-box-bar"></div>
					<el-row :gutter="20">
						<el-col :span="12" class="login-download">
							<p>扫一扫</p>
							<h6>立即下载APP</h6>
						</el-col>
						<el-col :span="12"><img src="@/assets/img/base-img1_05.png"></el-col>
					</el-row>
				</div>
		</template>
		
		
		<!-- 公告 -->
		<div class="base-anno">
			<div class="base-anno-inner">
				<el-row :gutter="0">
					<el-col :span="1" class="base-anno-left"><i class="el-icon-bell"></i></el-col>
					<el-col :span="12" class="base-anno-center" >
						<div>
							<ul :class="{'anim':animate==true,'':animate==false}">
								<li v-for="(item,key) in annoList" :id="item.id" :key="key">
									<router-link :to="'/about/annoDetail/'+item.id">{{item.title}}</router-link>
								</li>
							</ul>
						</div>
					</el-col>
					<el-col :span="6" :offset="5" style="text-align: right;">
						<el-button type="primary" id="btn_notices_more" round size="mini"><router-link to="/about/anno">更多公告</router-link></el-button>
					</el-col>
				</el-row>
			</div>
		</div>
		
		<!-- 正利宝、定投宝 -->
		<div class="base-dtb">
			<el-row :gutter="30"> 
				<!-- <el-col :span="12" class="base-dtb-details" v-for="(item,key) in dtbList" :key="key">
					<transition name="el-zoom-in-center">
						<div class="detailDiv" v-show="key !== showNum">
							<div v-if="key !== showFront[key]">
								<p>{{item.name}}</p>
								<h5>{{item.desc}}</h5>
								<h4>{{item.value}}</h4>
								<span>成立以来收益率</span>
								<el-button type="primary" round size="medium" @click="showBox(key)">查看详情</el-button>
							</div>
							<div v-else style="padding:0 15px;">
								<h6>投资逻辑</h6>
								<h3>一款属于货币增强型的产品，在任何年份追求正收益的产品组合。</h3>
								<h6>风险收益</h6>
								<h3>中低风险，中低收益</h3>
								<i class="el-icon-d-arrow-left" @click="hideBox(key)"></i>
							</div>
						</div>
					</transition>
				</el-col> -->

				<!-- 正利宝 -->
				<el-col :span="12" class="base-dtb-details">
					<transition name="el-zoom-in-center">
						<div class="detailDiv" v-show="0 !== showNum" v-loading="loading">
							<div v-if="0 !== showFront[0]">
								<p>正利宝 R3</p>
								<h5>货币增强     稳字当头</h5>
								<h4>{{zlb.f_avgreturn_sincefound}}<b style="font-size:17px;font-weight:bold;">%</b></h4>
								<span>成立以来收益率</span>
								<el-button type="primary" round size="medium" @click="showBox(0)">查看详情</el-button>
							</div>
							<div v-else style="padding:0 15px;" @click="hideBox(0)">
								<h6>投资逻辑</h6>
								<h3>一款属于货币增强型的产品，在任何年份追求正收益的产品组合。</h3>
								<h6>风险收益</h6>
								<h3>低风险，低收益</h3>
								<h2>更多详情请下载好基友基金APP</h2>
								<i class="el-icon-d-arrow-left"></i>
							</div>
						</div>
					</transition>
				</el-col>
				<!-- 定投宝 -->
				<el-col :span="12" class="base-dtb-details">
				<transition name="el-zoom-in-center">
					<div class="detailDiv else" v-show="1 !== showNum" v-loading="loading">
					<div v-if="1 !== showFront[1]">
						<p>定投宝 R5</p>
						<h5>价值低估     长期投资</h5>
						<h4>{{dtb.f_avgreturn_sincefound}}<b style="font-size:17px;font-weight:bold;">%</b></h4>
						<span>成立以来收益率</span>
						<el-button type="primary" round size="medium" @click="showBox(1)">查看详情</el-button>
					</div>
					<div v-else style="padding:0 15px;" @click="hideBox(1)">
						<h6>投资逻辑</h6>
						<h3>寻找价值稳定、估值被低估、股价跌破每股净资产且股息率在4.5%以上的资产做定期投资。</h3>
						<h6>风险收益</h6>
						<h3>中高风险，中高收益</h3>
						<h2>更多详情请下载好基友基金APP</h2>
						<i class="el-icon-d-arrow-left"></i>
					</div>
					</div>
				</transition>
				</el-col>
			</el-row>
		</div>

		<!-- 基智宝 -->
		<div class="base-jzb">
			<div class="base-jzb-inner">
				<el-row >
					<el-col :span="5" class="jzb-left">
						<h1>基智宝</h1>
						<div><img src="@/assets/img/base-img2_03.png">组合购买</div>
						<div><img src="@/assets/img/base-img2_06.png">目标止盈 </div>
						<div><img src="@/assets/img/base-img2_09.png">资产调仓</div>
						<img src="@/assets/img/base-img_16.png">
					</el-col>
					<el-col :span="18" :offset="1" class="jzb-right" >
						<el-row :gutter="30" >
							<el-col :span="8" class="base-dtb-details" v-for="(item,key) in jzb" :key="key" v-loading="loading">
								<transition name="el-zoom-in-center">
									<div class="detailDiv" v-show="key !== jzbShowNum">
										<div v-if="key !== jzbShowFront[key]">
											<p>{{item.DICTDATA_NAME}} {{item.level}}</p>
											<h5>{{item.tag}}</h5>

											<!-- <div style="height:31px;text-align:center; padding: 0px 0px;">
												<el-row :gutter="0" style="height:31px;padding: 0 0;padding-top: 10px;margin: 0 0;">
												<el-col :span="12" style="height:31px;padding: 0 0;">
													<span
													style="border:1px solid black;width: 70px;color:black;height:20px;line-height:20px;margin: 0px 15px;float:right;"
													>{{jzbTagArr[key][0]}}</span>
												</el-col>
												<el-col :span="12" style="height:31px;padding: 0 0;">
												<span
												style="border:1px solid black;width: 70px;color:black;height:20px;line-height:20px;margin: 0px 15px;float:left;"
												>{{jzbTagArr[key][1]}}</span>
												</el-col>
												</el-row>
											</div> -->
											<h4>{{item.f_avgreturn_sincefound}}<b style="font-size:17px;font-weight:bold;">%</b></h4>
											<span>成立以来收益率</span>
											<el-button type="primary" round size="medium" @click="jzbShowBox(key)">查看详情</el-button>
										</div>
										<div v-else style="padding:0 15px;"  @click="jzbHideBox(key)">
											<h6>投资逻辑</h6>
											<h3>{{jzbTagArr[key][2]}}</h3>
											<h6>风险收益</h6>
											<h3>{{jzbTagArr[key][3]}}</h3>
											<h2>更多详情请下载好基友基金APP</h2>
											<i class="el-icon-d-arrow-left"></i>
										</div>
									</div>
								</transition>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</div>
		</div>

		<!-- 小钱袋 -->
		<div class="base-bag">
			<h2 class="base-bag-title">小钱袋</h2>
			<div class="base-bag-inner">
				<el-row>
					<el-col :span="6" class="bag-left">
						<h2>{{xqd.roundData}}<b style="font-size:17px;font-weight:bold;">%</b></h2>
						<p>七日年化收益</p>
						<el-popover
						popper-class="download-popover"
						placement="top"
						width="120"
						trigger="click"
						>
						<div style="text-align: center; margin: 0">
							<img src="@/assets/img/header_phone_ewm.png">
						</div>
						<el-button type="primary" round slot="reference">立即转入</el-button>
					</el-popover>
						
					</el-col>
					<el-col :span="4" class="bag-center">
						<img src="@/assets/img/base-img_20.png">
						货币基金
					</el-col>
					<el-col :span="4" class="bag-center">
						<img src="@/assets/img/base-img_24.png">
						快取秒级到账
					</el-col>
					<el-col :span="9" :offset="1">
						<div class="bag-right">
							<xqd-chart id="xqd" :style="{height:'260px',position:'relative'}"/>
						</div>
					</el-col>
				</el-row>
				
				
			</div>
		</div>

		<!-- NASA -->
		<div class="base-nasa">
			<div class="base-nasa-inner">
					<div class="nasa-title">NASA</div>
					<el-row >
						<el-col :span="8" :offset="1" class="nasa-part">
							<h4>自动投资</h4>
							<span class="nasa-part-borderTop"></span>
							<p>（投资收益）（AI投资决策）（机械化自动投资）<br>&nbsp;&nbsp;&nbsp;目标价值  &nbsp;    =    &nbsp;&nbsp;&nbsp;发现价值    &nbsp;&nbsp;&nbsp;  +   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  行动价值<br>选基，调仓自动化，经用户确认后，便可实现自动投资操作。</p>
							<span class="nasa-part-borderBottom"></span>
						</el-col>
						<el-col :span="6" :offset="1" class="nasa-part">
							<h4>卓越团队</h4>
							<span class="nasa-part-borderTop"></span>
							<p>NASA投资由好基友基金专业团队提供服务。秉承“金融交易策略是核心，IT开发是金融策略的封装形式，机器学习是思考大脑和策略进化的保证”的思路。</p>
							<span class="nasa-part-borderBottom"></span>
						</el-col>
						<el-col :span="6" :offset="1" class="nasa-part">
							<h4>万人万面</h4>
							<span class="nasa-part-borderTop"></span>
							<p>根据每位特定用户的风险偏好、身份特质、过往投资行为、投资期望久期等多因子来提供基金FOF服务。</p>
							<span class="nasa-part-borderBottom"></span>
						</el-col>
					</el-row>
					  <el-popover
						popper-class="download-popover"
						placement="top"
						width="120"
						trigger="click"
						>
						<div style="text-align: center; margin: 0">
							<img src="@/assets/img/header_phone_ewm.png">
						</div>
						<el-button round slot="reference">查看详情</el-button>
					</el-popover>
			</div>
		</div>

  </div>
</template>

<script>
/* eslint-disable */
import XqdChart from '@/components/XqdChart.vue';
import store from '@/store.js';
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
	name: 'Base',
	components:{
		XqdChart
	},
	store,
	data(){
		return {
			//获取public路径
			publicPath: process.env.BASE_URL,
			loading:true,
			//banner
			bannerList:['base-img_06.png'],
			//anno
			annoList: [],
			animate: false,
			//part1
			dtbList:[    
				{ "name": "正利宝", "desc":"货币增强     稳字当头", "value": "35.95%" },
				{ "name": "定投宝", "desc":"价值低估     长期投资", "value": "22.85%" },
			],
			loginFlag:false,
			//dtb
			showNum:-1,
			showFront:[-1,-1],
			//jzb
			jzbList:[   
				{ "name": "对抗通胀型", "desc":"分散布局     对抗通胀", "value": "4.54%", "tzlj":"通过配置多个相关性较低的资产以及基金，达到长期追求稳健收益的基金组合。", "fxsy":"中低风险，中低收益" },
				{ "name": "追求超额收益型", "desc":"低位建仓     建好就收", "value": "3.03%", "tzlj":"依靠积极有效的宏观研究加上理性的投资策略，追求在大部分时间内获得超额收益。", "fxsy":"高风险，高收益" },
				{ "name": "防守反击型", "desc":"配置转债     可攻可守", "value": "2.85%", "tzlj":"让投资者在大部分时间里以逸待劳，等待可转债出现明显的机会，争取在反击中“一击制胜”。", "fxsy":"中低风险，中高收益" },
				{ "name": "全球机会型", "desc":"全球建仓     资产轮动", "value": "3.12%", "tzlj":"资产价格走势总是起起伏伏，本产品致力于高抛低吸、抓住这些波动。", "fxsy":"高风险，高收益" },
			],
			jzbShowNum:-1,
			jzbShowFront:[-1,-1,-1,-1],
			
			zlb: {},
			dtb: {},
			jzb: ['','','',''],
			jzbTagArr: [
				["分散布局","对抗通胀", "通过配置多个相关性较低的资产以及基金，达到长期追求稳健收益的基金组合。", "中低风险，中低收益"],
				["低位建仓","见好就收", "依靠积极有效的宏观研究加上理性的投资策略，追求在大部分时间内获得超额收益。", "高风险，高收益"],
				["配置转债","可攻可守", "让投资者在大部分时间里以逸待劳，等待可转债出现明显的机会，争取在反击中“一击制胜”。", "中低风险，中高收益"],
				["全球建仓","资产轮动", "资产价格走势总是起起伏伏，本产品致力于高抛低吸、抓住这些波动。", "高风险，高收益"]
			],
			xqd: {},
			loaded: false,
			chartdata: []
		}
	},
	methods:{
		handleSelect(item) {
        // console.log(item);
		},
	
		handleIconClick(ev) {
        // console.log(ev);
		},
		//anno
		annoScroll(){
			this.animate = true;
			setTimeout(()=>{
				this.annoList.push(this.annoList[0]);
				this.annoList.shift();
				this.animate = false;
			},500);
		},
		//dtb
		showBox(key){
			this.showNum = key;
			setTimeout(()=>{
				this.showNum = -1;
				this.showFront[key] = key;
			},100);
		},
		hideBox(key){
			this.showNum = key;
			setTimeout(()=>{
				this.showNum = -1;
				this.showFront[key] = -1;
			},100);
		},
		//jzb
		jzbShowBox(key){
			this.jzbShowNum = key;
			setTimeout(()=>{
				this.jzbShowNum = -1;
				this.jzbShowFront[key] = key;
			},100);
		},
		jzbHideBox(key){
			this.jzbShowNum = key;
			setTimeout(()=>{
				this.jzbShowNum = -1;
				this.jzbShowFront[key] = -1;
			},100);
		},
		getNotices(){
			//axios.get("/notices").then(res => {
				// if(res.data) {
				// 	if(res.data.tbFundNewsList) {
				// 		this.annoList = res.data.tbFundNewsList;
				// 		this.animate = res.data.isShow;
				// 	}
				// }
			this.$httpGet("/index/notices").then(res => {
				if(res) {
					if(res.tbFundNewsList) {
						this.annoList = res.tbFundNewsList;
						this.animate = res.isShow;
					}
				}
			// eslint-disable-next-line no-unused-vars
			}).catch(err => {
				//错误的回调
				// eslint-disable-next-line no-console
				console.log("访问接口失败");
			});
		},
		getFundData(){
			this.$httpGet("/index/baobaoList").then(res => {
				this.zlb = res.zlbInfo[0];
				this.dtb = res.dtbTypeE[0];
				this.jzb = res.wisdomList;
				this.xqd = res.sevenDayOfYearYield;
				this.xqd.roundData = String(this.xqd.roundData).replace('%', '');
				this.loading = false;
			// eslint-disable-next-line no-unused-vars
			}).catch(err => {
				//错误的回调
				// eslint-disable-next-line no-console
				console.log("访问接口失败"+err);
			});
		},

		init() {
			this.getNotices();
			this.getFundData();
			// console.log(this.publicPath);
			setInterval(this.annoScroll,3000);
		},
		goToLogin(){
			this.$router.push('/login');
		},
		goToRegister(){
			this.$router.push('/register');
		},
		goToAccount(){
			this.$router.push('/account');
		},
	},
	mounted() {
		this.init();
	},
	created(){

	},
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '@/assets/styles/vars.scss';
	.base{
		position:relative;
		
		.banner-box{
			height: 320px;
			background-position: center center;
			background-repeat: repeat-x;
		}

		.login-box{
			box-sizing: border-box;
			position: absolute;
			width: 300px;
			height: 260px;
			background-color: #fff;
			right: 50%;
			margin-right: -570px;
			top: 30px;
			z-index: 101;
			box-shadow: 0 5px 15px rgba($color: #000000, $alpha: 0.3);
			padding: 15px 25px;

			.el-button{
				width: 100%;
				display: block;
				margin-left: 0;
				margin-bottom: 10px;
			}
			.login-box-bar{
				height: 1px;
				background-color: $color-back-first;
				margin: 15px 0;
			}
			.login-download{
				background: url(../../assets/img/base-img1_03.png) no-repeat center 0;
				height: 104px;
				text-align: center;
				padding-top: 25px;

				p{
					font-size: 14px;
					color: $color-font-second;
				}
				h6{
					font-weight: normal;
					font-size: 14px;
					padding-top: 5px;
					color: $color-primary;
				}
			}
			.login-user{
				height: 90px;

				p{
					font-size: 14px;
					color: $color-font-second;
					padding: 10px 0;
				}
			}
		}
		.base-anno{
			padding: 15px 0;
			background-color: #fff;
			
			.base-anno-inner{
				width: 1140px;
				margin: 0 auto;
				
				.base-anno-left{
					line-height: 28px;
					
					i{
						font-size: 18px;
						font-weight: bold;
						color: $color-primary;
						vertical-align: -2px;
					}
				}
				.base-anno-center{
					line-height: 28px;
					color: $color-font-first;
					font-size: 14px;
					
					div{
						height: 28px;
						overflow: hidden;
					}
					.anim{
							transition: all .3s;
							margin-top: -28px;
					}
				}
				
			}
			
		}
		.base-dtb{
				width: 1140px;
				margin: 0 auto;
				padding-top: 30px;
				
				.base-dtb-details{
					padding-top: 15px;
					
					.detailDiv{
						background: url(~@/assets/img/base-img_09.png) no-repeat right center;
						background-size: 170px;
						background-color: #fff;
						padding: 20px 0;
						text-align: center;
						transition: all .3s;
						box-shadow: 0px 0px 10px rgba($color: #000000, $alpha: 0.1);
						
						&.else{
							background-image: url(~@/assets/img/base-img_11.png);
						}
						div{
							height: 175px;
							box-sizing: border-box;
							position: relative;
						}
						&:hover{
							box-shadow: 0px 0px 10px rgba($color: #000000, $alpha: 0.3);
							transition: all .3s;
						}
						i{
							padding: 5px;
							position: absolute;
							right: 10px;
							bottom: -7px;
							color: $color-primary;
							font-weight: bold;
							cursor: pointer;
						}
						p{
							font-size: 20px;
							font-weight: bold;
							color: $color-font-first;
						}
						h4{
							color: $color-primary;
							font-size: 30px;
							margin: 10px 0;
						}
						h5{
							font-size: 16px;
							padding-top: 10px;
							font-weight: normal;
							color: $color-font-second;
						}
						h6{
							color: $color-primary;
							font-size: 16px;
							width: 80px;
							padding-bottom: 5px;
							border-bottom: 2px solid $color-primary;
						}
						h3{
							font-size: 14px;
							padding-top: 10px;
							font-weight: normal;
							color: $color-font-third;
							text-align: left;
							padding-bottom: 20px;

							
						}
						h2{
							font-size: 14px;
							font-weight: normal;
							color: $color-primary;
							padding: 5px 25px;
							text-align: left;
							background-color: $color-primary-back;
							border-radius: 3px;
							position: absolute;
							bottom: -10px;

						}
						span{
							display: block;
							font-size: 12px;
							color: $color-font-third;
						}
						.el-button{
							margin-top: 10px;
						}
					}
				}
				
		}
		.base-jzb{
			margin-top: 50px;
			background-color: #fff;
			height: 390px;

			.base-jzb-inner{
				width: 1140px;
				margin: 0 auto;

				.jzb-left{
					text-align: center;
					height: 430px;
					margin-top: -20px;
					background-color: $color-primary-second;
					position: relative;
					
					&::before{
						content: '';
						display: block;
						position: absolute;
						right: -20px;
						border-bottom:20px solid $color-primary-second;
						border-right:20px solid transparent;
					}
					&::after{
						content: '';
						display: block;
						position: absolute;
						right: -20px;
						bottom:0;
						border-width: 20px 20px 0 20px;
						border-style:solid;
						border-color: $color-primary-second transparent transparent transparent;
					}
					h1{
						color: #fff;
						text-align: center;
						padding-top: 50px;
						text-shadow: 0 0 10px rgba($color: #000, $alpha: 0.5);
						padding-bottom: 50px;
					}
					div{
						text-align: center;
						width: 95%;
						color: #fff;
						font-size: 17px;
						padding-top: 10px;

						img{
							vertical-align: -10px;
							margin-right: 10px;
						}
					}
				}
				.jzb-right{

					.detailDiv{
						background-color: #fff;
						padding: 20px 0;
						text-align: center;
						transition: all .3s;
						box-shadow: 0px 0px 10px rgba($color: #000000, $alpha: 0.2);
						margin-top: 20px;
						position: relative;
						
						div{
							height: 300px;
							box-sizing: border-box;
						}
						&:hover{
							box-shadow: 0px 0px 10px rgba($color: #000000, $alpha: 0.3);
							transition: all .3s;
						}
						i{
							padding: 5px;
							position: absolute;
							right: 15px;
							bottom: 50px;
							color: $color-primary;
							font-weight: bold;
							cursor: pointer;
						}
						p{
							font-size: 20px;
							padding-top: 20px;
							font-weight: bold;
							color: $color-font-first;
						}
						h4{
							color: $color-primary;
							font-size: 30px;
							margin: 30px 0;
							margin-bottom: 10px;
						}
						h5{
							font-size: 16px;
							padding-top: 20px;
							font-weight: normal;
							color: $color-font-second;
						}
						h6{
							color: $color-primary;
							font-size: 16px;
							width: 80px;
							padding-bottom: 5px;
							border-bottom: 2px solid $color-primary;
						}
						h3{
							font-size: 14px;
							padding-top: 5px;
							font-weight: normal;
							color: $color-font-third;
							text-align: left;
							padding-bottom: 20px;

							
						}
						h2{
							font-size: 14px;
							font-weight: normal;
							color: $color-primary;
							padding: 5px 20px;
							text-align: left;
							background-color: $color-primary-back;
							border-radius: 3px;
							position: absolute;
							bottom: 20px;

						}
						span{
							display: block;
							font-size: 12px;
							color: $color-font-third;
						}
						.el-button{
							margin-top: 50px;
						}
					}
				}
			}
		}
		.base-bag{
			width: 1140px;
			margin: 0 auto;
			margin-top: 60px;

			.base-bag-title{
				padding-bottom: 15px;
				color: $color-font-first;
			}
			.base-bag-inner{
				background-color: #fff;
				height: 220px;
				box-shadow: 0px 0px 10px rgba($color: #000000, $alpha: 0.2);
				box-sizing: border-box;

				.bag-left{
					text-align: center;
					padding-top: 50px;
					h2{
						color: $color-primary;
						font-size: 40px;
					}
					p{
						font-size: 14px;
						color: $color-font-second;
						margin-top: 5px;
					}
					.el-button{
						width: 60%;
						margin: 0 auto;
						margin-top: 15px;
					}
				}
				.bag-center{
					padding-top: 80px;
					font-size: 17px;
					color: $color-font-first;
					text-align: center;
					img{
						vertical-align: -12px;
						margin-right: 5px;
					}
				}
				.bag-right{
					height: 260px;
					border-radius: 5px;
					box-shadow: 0px 0px 15px rgba($color: #000000, $alpha: 0.2);
					background-color: #fff;
					margin-top: -70px;
					margin-right: 20px;
					border-radius: 5px;
					position: relative;

					&::before{
						content: '';
						position: absolute;
						width: 50px;
						height: 50px;
						background: url(~@/assets/img/base-bag_03.png) no-repeat center center;
						background-size: 40px;
						bottom: 50px;
						left: -30px;
						z-index: 10000;
					}
					&::after{
						content: '';
						position: absolute;
						width: 480px;
						height: 50px;
						background: url(~@/assets/img/base-bag_07.png) no-repeat center center;
						background-size: contain;
						bottom: -40px;
						left: -40px;
						z-index: 10000;
					}
				}
			}
		}
		.base-nasa{
			background: url('~@/assets/img/base-img_29.png') no-repeat center 0;
			margin-top: 40px;
			padding-bottom: 30px;

			.base-nasa-inner{
				width: 1140px;
				margin: 0 auto;

				.nasa-title{
					color: #b49c61;
					font-size: 40px;
					padding-top: 30px;
				}
				.nasa-part{
					padding-top: 30px;

					h4{
						color: #b49c61;
						font-size: 18px;
					}
					p{
						color: #c5ae9a;
						font-size: 15px;
						padding-left: 15px;
						padding-right: 15px;
						padding-top: 0px;
						line-height: 25px;
					}
					.nasa-part-borderTop{
						display: block;
						width: 100%;
						height: 40px;
						background: url('~@/assets/img/base-img-border_03.png') no-repeat 0 center;
						background-size: 70px;
					}
					.nasa-part-borderBottom{
						display: block;
						width: 100%;
						height: 40px;
						background: url('~@/assets/img/base-img-border_07.png') no-repeat right center;
						background-size: 70px;
					}
					
				}
				.el-button{
					margin-top: 20px;
					width: 150px;
					color: $color-primary;
				}
			}
		}
	}


.my-autocomplete {
		
	li {
		.name {
			padding-top: 5px;
			line-height: 25px;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.addr {
			padding-bottom: 5px;
			line-height: 15px;
			font-size: 12px;
			color: #b4b4b4;
			display: block;
		}
		.highlighted .addr {
			color: #ddd;
		}
		
	}
	
}
</style>
<style>
.download-popover.el-popover{
	min-width: 50px !important;
	padding: 0 !important;	
}
</style>
