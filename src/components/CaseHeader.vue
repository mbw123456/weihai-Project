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
			<p class="case-title">成功案例</p>
			<el-menu-item index="/case">
				<span slot="title">所有案例</span>
			</el-menu-item>
			
			<el-menu-item index="/case/help">
				<span slot="title">常见问题</span>
			</el-menu-item>
			<el-menu-item index="/case/optionGuide">
				<span slot="title">机构操作指引</span>
			</el-menu-item>
			<el-menu-item index="/case/complain">
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
	name: 'CaseHeader',
  data(){
		return {
			
		}
  },
  methods:{
		handleAboutSelect(key, keyPath){
			
		},
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
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
				if(this.$route.name=='caseAll'){
					return '/case'
				}
				else if(this.$route.name=='about_help'){
					return '/case/help'
				}
				else if(this.$route.name=='about_optionGuide'){
					return '/case/optionGuide'
				}
				else if(this.$route.name=='about_complain'){
					return '/case/complain'
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
	.about-menu{
		border: none 0;
		border: 1px solid $color-back-first;
		text-align: center;
		
		.case-title{
			text-align: center;
			background-color: $color-back-third;
			line-height: 50px;
			font-weight: bold;
			border-top: 2px solid $color-primary;
			font-size: 15px;
		}
		.el-menu-item{
			min-width: 150px;
			background-color: $color-back-fourth;
			border-top: 1px solid $color-back-first;

		}
		.el-menu-item.is-active{
			background-color: $color-primary-second;

			&::after{
				content: '>>'
			}
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
