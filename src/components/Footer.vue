<template>
  <div class="footer"><!-- 这是根节点 -->
    <div class="footer-inner">
		<router-link to="/about">环保工程专业论坛</router-link>
		<router-link to="/about">养殖废水处理需求</router-link>
		<router-link to="/about">无为环境工业废水处理</router-link>
		<router-link to="/about">工业废水处理服务</router-link>
		<router-link to="/about">生活废水处理厂家</router-link>
		<router-link to="/about">中国制造网</router-link>
		<router-link to="/about">污水处理</router-link>
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
		background-color: $color-font-second;
		padding-top: 40px;
		
		.footer-inner{
			width: 1140px;
			margin: 0 auto;
			color: #fff;
			padding-bottom: 10px;
			text-align: center;

			a{
				font-size: 14px;
				padding: 0px 30px;
				border-right: 1px solid $color-font-third;

				&:last-child{
					border: none 0;
				}
			}
		}

		.footer-bottom{

			.footer-bottom-inner{
				width: 1140px;
				margin: 0 auto;
				padding-top: 20px;
				padding-bottom: 20px;
				text-align: center;

				p{
					font-size: 12px;
					color: $color-font-third;
					text-align: center;
					width: 900px;
					margin: 0 auto;
					padding-bottom: 10px;

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
