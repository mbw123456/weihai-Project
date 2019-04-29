<template>
  <div class="home"><!-- 这是根节点 -->
  
			
			
			<div class="container">
				
				<Header/>
				
				<div class="content-box">
					<transition name="el-fade-in-linear">
						<keep-alive exclude="Risk,Bankcard,Plan,Asset,Detail,Invite,Purchase,Invest">
							<router-view></router-view>
						</keep-alive>
					</transition>
				</div>
				<Footer/>
			</div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
export default {
	components:{
		Header,Footer,
	},
  name: 'Home'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '@/assets/styles/vars.scss';
	.content-box{
		padding: 0px 0;
	}
	
</style>
