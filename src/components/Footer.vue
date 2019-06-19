<template>
  <div class="footer"><!-- 这是根节点 -->
    <div class="footer-inner">
		<el-row>
			<el-col :span="7">
				<div class="footerbox">
					<p>友情链接</p>
					<router-link to="/about">环保工程专业论坛</router-link>
					<router-link to="/about">养殖废水处理需求</router-link>
					<router-link to="/about">无为环境工业废水处理</router-link>
					<router-link to="/about">工业废水处理服务</router-link>
					<router-link to="/about">生活废水处理厂家</router-link>
					<router-link to="/about">中国制造网</router-link>
					<router-link to="/about">污水处理</router-link>
				</div>
			</el-col>
			<el-col :span="7" :offset="1">
				<div class="footerbox">
					<p>科技机构</p>
					<router-link to="/about">方硕电子科技</router-link>
					<router-link to="/about">希尔德新材料</router-link>
					<router-link to="/about">蓝鲸金属修复</router-link>
					<router-link to="/about">蓝鲸金属修复</router-link>
				</div>
			</el-col>
			<el-col :span="4" :offset="1">
				<div class="footerbox">
					<img src="@/assets/img/weihai-footer_03.png" alt="">
					<h6>关注微信公众号<br>更多消息即时晓</h6>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="footerbox">
					<h5><i class="el-icon-phone"></i>400-812-8888</h5>
					<h4>工作日 8:30~17:00</h4>
				</div>
			</el-col>
			
		</el-row>
		
	</div>
	<div class="footer-bottom">
		<div class="footer-bottom-inner">
			<p>版权所有：威海市总工会　鲁ICP备05010559号   地址：新威路129号政府10号楼三楼</p>
			<p><img src="@/assets/img/weihai_index_17.png"/>鲁公网安备 37100202000292号</p>
			<div>
				<img src="@/assets/img/weihai_index_21.png"/>
				<img src="@/assets/img/weihai_index_23.png"/>
				<img src="@/assets/img/weihai_index_25.png"/>
			</div>
		</div>
	</div>
	
	
	
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  name: 'Footer',
  data(){
	return {}
  },
  methods:{
	// downloadFile(item){
	// 	/**
	// 	axios({
	// 		method: 'get',
	// 		url: '/pc/document/downLoad',
	// 		params: {
	// 			id: item
	// 		},
	// 		responseType: 'blob'
	// 	}).then(response => {
	// 		// console.log(response);
	// 		this.download(response)
	// 	}).catch((error) => {

	// 	})
	// 	*/ 
	// 	window.location='/hjy_pc_interface/breakingnews/downLoad?id='+item;
	// },

	// download (data) {
	// 	if (!data) {
	// 		return
	// 	}
	// 	let url = window.URL.createObjectURL(new Blob([data.data]))
	// 	let link = document.createElement('a')
	// 	link.style.display = 'none'
	// 	link.href = url
	// 	let fileName = decodeURIComponent(data.headers.realname);
	// 	//console.log(fileName);
	// 	link.setAttribute('download', fileName)
	// 	document.body.appendChild(link)
	// 	link.click()
	// }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '@/assets/styles/vars.scss';
	.footer {
		box-sizing: border-box;
		background-color: $color-font-first;
		padding-top: 40px;
		border-top: 5px solid $color-primary;
		
		.footer-inner{
			width: 1140px;
			margin: 0 auto;
			color: #fff;
			padding-bottom: 10px;
			text-align: center;

			.footerbox{
				text-align: left;
				p{
					font-size: 17px;
					padding-bottom: 15px;
				}
				a{
					font-size: 14px;
					padding-right: 18px;
					opacity: .5;
					line-height: 25px;

					&:last-child{
						border: none 0;
					}
					&:hover{
						opacity: 1;
					}
				}
				img{
					width: 120px;
					display: block;
					height: 120px;
					margin: 0 auto;
				}
				h6{
					font-size: 13px;
					text-align: center;
					padding-top: 5px;
					font-weight: normal;
					color: $color-font-fourth;
				}
				h5{
					text-align: right;
					font-size: 20px;
					font-style: italic;
					padding-top: 20px;
				}
				h4{
					text-align: right;
					font-size: 14px;
					font-weight: normal;
					padding-top: 10px;
					color: $color-font-fourth;
				}
			}
			
		}

		.footer-bottom{
			border-top: 1px solid #3f4142;
			
			.footer-bottom-inner{
				width: 1140px;
				margin: 0 auto;
				padding-top: 20px;
				padding-bottom: 10px;
				text-align: center;

				p{
					font-size: 12px;
					color: $color-font-third;
					text-align: center;
					width: 900px;
					margin: 0 auto;

					img{
						vertical-align: -4px;
					}
				}
				div{
					padding-top: 20px;

					img{
						margin: 0 10px;
					}
				}
			}

		}
		
	}
</style>
