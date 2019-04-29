<template>
  <div class="notFound"><!-- 这是根节点 -->
	  <HeaderMini :title="title"/>
    <div class="notFound-inner">
      <i class="iconfont-hjy icon-hjyicon-test"></i>
      <p>你要找的页面不存在 <router-link to="/">返回首页</router-link></p>
    </div>
  </div>
</template>

<script>
import HeaderMini from '@/components/HeaderMini.vue';
export default {
  name: 'notFound',
  components:{
    HeaderMini
  },
  data(){
    return {
      title:'404',
    }
  }

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/styles/vars.scss';
@import '~@/assets/icon/iconfont.css';
.notFound{
  .notFound-inner{
    text-align: center;
    i{
      display: block;
      margin-top: 50px;
      color: $color-font-fourth;
      font-size: 300px;
    }
    p{
      color: $color-font-third;

      a{
        color: $color-primary;
      }
    }
  }
}
</style>
