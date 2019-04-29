<template>
  <div class="header"><!-- 这是根节点 -->

		<el-menu
			:default-active="onRoutes"
			class="about-menu"
			@open="handleOpen"
			:router="true"
			@select="handleAboutSelect"
			@close="handleClose"
			text-color="#666"
			>
			<el-menu-item index="/about">
				<i class="iconfont-hjy icon-hjyyuangongguanli"></i>
				<span slot="title">关于我们</span>
			</el-menu-item>
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-bell"></i>
					<span>文件公告</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/about/anno">平台公告</el-menu-item>
					<el-menu-item index="/about/legal">法律法规</el-menu-item>
					<el-menu-item index="/about/document">电子文件</el-menu-item>
					<el-menu-item index="/about/investorEducation">投资者教育</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			
			<el-menu-item index="/about/help">
				<i class="el-icon-search"></i>
				<span slot="title">常见问题</span>
			</el-menu-item>
			<el-menu-item index="/about/optionGuide">
				<i class="el-icon-location-outline"></i>
				<span slot="title">机构操作指引</span>
			</el-menu-item>
			<el-menu-item index="/about/complain">
				<i class="el-icon-service"></i>
				<span slot="title">咨询与投诉</span>
			</el-menu-item>
		</el-menu>
						<!-- <el-menu :default-active="onRoutes" class="el-menu-demo2" mode="horizontal" :router="true" @select="handleAboutSelect">
							<el-menu-item index="/about/help">常见问题</el-menu-item>
							<el-menu-item index="/about/optionGuide">机构操作指引</el-menu-item>
							<el-menu-item index="/about/complain">咨询与投诉</el-menu-item>
						</el-menu> -->
	
	
	
  </div>
</template>

<script>
/* eslint-disable */
export default {
	name: 'AboutHeader',
  data(){
		return {
			
		}
  },
  methods:{
		handleAboutSelect(key, keyPath){
			
		},
		handleOpen(key, keyPath) {
			// console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			// console.log(key, keyPath);
		}
  },
  mounted(){
		//console.log("aaaaaaaaaa")
	},
	computed:{
      onRoutes(){
				// this.$route.path
				if(this.$route.name=='about_root'){
					return '/about'
				}
				else if(this.$route.name=='about_anno' || this.$route.name=='about_annoDetail'){
					return '/about/anno'
				}
				else if(this.$route.name=='about_legal'){
					return '/about/legal'
				}
				else if(this.$route.name=='about_document'){
					return '/about/document'
				}
				else if(this.$route.name=='about_help'){
					return '/about/help'
				}
				else if(this.$route.name=='about_investorEducation'){
					return '/about/investorEducation'
				}
				else if(this.$route.name=='about_optionGuide'){
					return '/about/optionGuide'
				}
				else if(this.$route.name=='about_complain'){
					return '/about/complain'
				}else{
					return '/'
				}
			},
  },
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '@/assets/styles/vars.scss';
	@import '~@/assets/icon/iconfont.css';
	.about-menu{
		border: none 0;
		border-radius: 4px;
		box-shadow: 0 5px 5px rgba($color: #000000, $alpha: 0.1);

		.el-submenu .el-menu-item{
			min-width: 150px;
		}
		.el-menu-item.is-active{
			background-color: $color-primary-back;
		}
		.iconfont-hjy{
			font-size: 21px;
			margin-right: 7px;
			margin-left: 1px;
		}
		.el-menu-item-group{
			background-color: $color-back-fourth;
		}
		
	}
</style>
<style>
.about-menu .el-menu-item-group__title{
		 	padding: 0;
		 }
</style>
