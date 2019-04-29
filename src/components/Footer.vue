<template>
  <div class="footer"><!-- 这是根节点 -->
    <div class="footer-inner">
		<el-row type="flex" justify="space-between">
		  <el-col :span="8" class="footer-left-box">
			  <el-col :span="8" class="footer-left"><router-link to="/about">关于我们</router-link></el-col>
			  <el-col :span="8" class="footer-left"><router-link to="/about/help">常见问题</router-link></el-col>
			  <el-col :span="8" class="footer-left"><a @click="downloadFile('fxtsh')">风险提示函</a></el-col>
			  <el-col :span="8" class="footer-left"><router-link to="/about/document">电子文件</router-link></el-col>
			  <el-col :span="8" class="footer-left"><router-link to="/about/legal">法律法规</router-link></el-col>
			  <el-col :span="8" class="footer-left"><router-link to="/about/investorEducation">投资者教育</router-link></el-col>
		  </el-col>
		  <el-col :span="8" :offset="1" class="footer-center-box">
			  <div class="footer-center">
				  <span><i class="el-icon-phone-outline"></i>联系客服：400-0411-001</span>
				  <span><i class="el-icon-date"></i>工作日：09:00-21:00</span>
				  <span><i class="el-icon-message"></i>客服邮箱：kefu@haojiyoujijin.com</span>
			  </div>
		  </el-col>
		  <el-col :span="7" class="footer-right-box">
				<el-col :span="7" :offset="5" class="footer-right"><img src="@/assets/img/header_phone_ewm.png"><p>APP下载</p></el-col>
				<el-col :span="7" :offset="3" class="footer-right"><img src="@/assets/img/header_wechat_ewm.png"><p>微信公众号</p></el-col>
		  </el-col>
		</el-row>
	</div>
	<div class="footer-bottom">
		<div class="footer-bottom-inner">
			<p>本网站发布此信息目的在于传播更多信息，与本网站立场无关。本网站不保证该信息（包括但不限于文字、数据及图表）全部或者部分内容的准确性、真实性、完整性、有效性、及时性、原创性等。所载文章、数据仅供参考，使用前请核实，风险自负。市场有风险，投资需谨慎。基金的过往业绩不预示其未来表现，基金管理人管理的其他基金的业绩并不构成基金业绩表现的保证。</p>
			<h5>©2015 泰诚财富基金销售（大连）有限公司     辽ICP备14008189号     电信经营许可证(ICP): 辽B2-20150240 <img src="@/assets/img/base-img_32.png"></h5>
		</div>
	</div>
	
	
	
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Footer',
  data(){
	return {}
  },
  methods:{
	downloadFile(item){
		/**
		axios({
			method: 'get',
			url: '/pc/document/downLoad',
			params: {
				id: item
			},
			responseType: 'blob'
		}).then(response => {
			// console.log(response);
			this.download(response)
		}).catch((error) => {

		})
		*/ 
		window.location='/hjy_pc_interface/breakingnews/downLoad?id='+item;
	},

	download (data) {
		if (!data) {
			return
		}
		let url = window.URL.createObjectURL(new Blob([data.data]))
		let link = document.createElement('a')
		link.style.display = 'none'
		link.href = url
		let fileName = decodeURIComponent(data.headers.realname);
		//console.log(fileName);
		link.setAttribute('download', fileName)
		document.body.appendChild(link)
		link.click()
	}
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '@/assets/styles/vars.scss';
	.footer {
		box-sizing: border-box;
		background-color: $color-font-first;
		height: 250px;
		padding-top: 20px;
		border-top: 3px solid $color-primary;
		
		.footer-inner{
			width: 1140px;
			margin: 0 auto;
			color: #fff;
			padding-bottom: 10px;
			
			.footer-left-box{
				font-size: 14px;
				
				.footer-left{
					text-align: center;
					margin: 15px auto;
					
				}
				
			}
			.footer-center-box{
				padding-left: 40px;
				border-left: 1px solid $color-font-second;
				font-size: 14px;
				
				.footer-center{
					margin: 13px auto;
					
					i{
						margin-right: 10px;
					}
					span{
						display: block;
						padding-bottom: 10px;
					}
					
				}
			}
			.footer-right-box{
				
				.footer-right img{
					width: 80%;
					margin-left: 10%;
				}
				p{
					font-size: 14px;
					text-align: center;
					padding-top: 5px;
				}
			}
		}

		.footer-bottom{
			height: 140px;
			background-color: #1b1b1b;

			.footer-bottom-inner{
				width: 1140px;
				margin: 0 auto;
				padding-top: 20px;

				p{
					font-size: 13px;
					color: $color-font-second;
					text-align: center;
					width: 900px;
					margin: 0 auto;
				}
				h5{
					font-size: 12px;
					font-weight: normal;
					color: $color-font-third;
					text-align: center;
					padding-top: 10px;

					img{
						height: 30px;
						vertical-align: -10px;
						margin-left: 5px;
					}
				}
			}

		}
		
	}
</style>
