<template>
  <div class="fundAnno" v-loading="loading">
    <!-- 这是根节点 -->
    <el-button @click="backJump" class="annoDetail-back" icon="el-icon-arrow-left" circle size="small"></el-button>
    <div class="annoDetail-title">
      <h4>{{title}}</h4>
      <h5>发布时间：{{date}}</h5>
    </div>
    <div class="annoDetail-inner">
      <p v-html="content"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FundAnno",
  data(){
    return{
      loading:true,
      title: "",
      date: "",
      content: ""
    }
  },
  methods:{
    backJump(){
      this.$router.go(-1);
    },

    fundNoticeDetail(){
      this.loading=true;
      this.title = '';
      this.date = '';
      this.content = '';
      this.$httpGet("/pc/companyNotice/fundNoticeDetail",{newsId:this.$route.query.newsId}).then(data=>{
         if(data){
            this.title = data.title;
            this.date = data.date;
            this.content = data.content;
            this.loading=false;
         }
       })
    },


  },

  mounted(){
    this.fundNoticeDetail();
  },
  watch: {
		'$route' (to,from) {
			if (this.$route.name === 'fundAnno') {

        this.fundNoticeDetail();
			}
		}
	}
  // watch: {
  //   "$route": "fundNoticeDetail"
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
@import "~@/assets/icon/iconfont.css";
.fundAnno{
  background-color: #fff;
  box-sizing: border-box;
  width: 1140px;
  padding: 15px;
  margin: 20px auto;
  min-height: 600px;
  .annoDetail-back{
    font-size: 16px;
  }
  .annoDetail-title{
    border-bottom: 1px solid $color-back-second;
    padding: 12px 15px;

    h4{
      font-size: 17px;
      font-weight: normal;
      text-align: center;
    }
    h5{
      text-align: center;
      font-size: 14px;
      color: $color-font-third;
      font-weight: normal;
      padding-top: 5px;
    }


  }
  .annoDetail-inner{
    font-size: 14px;
    color: $color-font-second;
    padding: 12px 15px;
    line-height: 22px;
    min-height: 400px;

    p{
      padding-top: 10px;
      text-indent: 2em;

      a{
        color: $color-primary;
      }
    }
  }
}
</style>
