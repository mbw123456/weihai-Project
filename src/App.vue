<template>
  <div id="app">
    <div class="hjy-box-slidebar">
			<el-scrollbar ref="scrollbar" :native="false">
        
        <router-view/>

      </el-scrollbar>
		</div>
  </div>
</template>

<script>
export default {
  name:'App',
  data(){
    return{

    }
  },
  methods:{
    _isMobile(){
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      // return flag;
      console.log(flag);
      if(flag){
        window.location='http://m.haojiyoujijin.com';
      }
    },
  },
  created(){
    this._isMobile();
  }
}
</script>

<style>
.hjy-box-slidebar {
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.el-scrollbar{
  height: 100%;
}
.el-scrollbar .el-scrollbar__wrap{
  overflow: scroll;
  overflow-x:auto;
  padding-bottom: 17px;
}
</style>

