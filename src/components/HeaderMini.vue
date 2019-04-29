<template>
  <div class="headerMini"><!-- 这是根节点 -->
		<el-row class="headerMini-inner">
			<el-col :span="12">
				<router-link to="/"><img src="@/assets/img/base-img_03.png"></router-link>
				<span>{{title}}</span>
			</el-col>
			<el-col :span="12">
				<!-- <el-button type="text">忘记密码?</el-button> -->
			</el-col>
		</el-row>
	
	
  </div>
</template>

<script>
/* eslint-disable */

export default {
	name: 'HeaderMini',
  props:['title']
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '@/assets/styles/vars.scss';
	.headerMini {
		padding: 0;
		background-color: #fff;
		height: 70px;
		box-shadow: 0 3px 3px rgba($color: #000000, $alpha: 0.1);
		
		.headerMini-inner{
			width: 1140px;
			margin:0 auto;
			img{
				width: 130px;
				margin-top: 10px;
			}
			span{
				font-size: 18px;
				color: $color-font-second;
				font-weight: bold;
				vertical-align: 15px;
				margin-left: 30px;
				border-left: 1px solid $color-back-first;
				padding-left: 30px;
			}
		}
	
	}
</style>
