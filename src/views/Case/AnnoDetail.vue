<template>
  <div v-loading="loading" class="annoDetail">
    <!-- 这是根节点 -->
    <el-button @click="backJump" class="annoDetail-back" icon="el-icon-arrow-left" circle size="small"></el-button>
    <div class="annoDetail-title">
      <h4>{{newstitle}}</h4>
      <h5>发布时间：{{releaseTime}}</h5>
    </div>
    <div class="annoDetail-inner" v-html="newsContent">
      {{newsContent}}
    </div>

    <el-row class="annoDetail-bottom">
      <el-col :span="12" @click.native="jumpbNews()"><i class="el-icon-arrow-left"></i><span>{{bNewstitle}}</span></el-col>
      <el-col :span="12" @click.native="jumpaNews()" style="text-align:right;"><span>{{aNewstitle}}</span><i class="el-icon-arrow-right"></i></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "AnnoDetail",
  data(){
    return{
      loading:true,
      
      newsContent:'',
      newstitle:'',
      releaseTime:'',

      aNewsid:'',
      bNewsid:'',
      aNewstitle:'',
      bNewstitle:'',

      newid:''
    }
  },
  methods:{
      backJump(){
        this.$router.go(-1);
      },
			getFundNewsDetial(){
        this.loading= true;
        this.newsContent = '';
        this.newstitle = '';
        this.releaseTime = '';
				this.$httpGet("/pc/breakingnews/getTaiChengView?id="+this.newid).then(res => {
					if(res) {
            //新闻详情
            
						if(res.resultData.newsdetial.news) {
              this.newsContent = res.resultData.newsdetial.news.newsContent;
              this.newstitle = res.resultData.newsdetial.news.title;
              this.releaseTime = res.resultData.newsdetial.releaseTime;
              this.loading= false;
            }

            //上一篇新闻
            if(res.resultData.newsdetial.aNews) {
              this.aNewsid = res.resultData.newsdetial.aNews.id;
              this.aNewstitle = res.resultData.newsdetial.aNews.title;
            }else{
              this.aNewsid=null;
              this.aNewstitle='没有了';
            }

            //下一篇新闻
            if(res.resultData.newsdetial.bNews) {
              this.bNewsid = res.resultData.newsdetial.bNews.id;
              this.bNewstitle = res.resultData.newsdetial.bNews.title;
            }else{
              this.bNewsid=null;
              this.bNewstitle='没有了';
            }

						
					}
				// eslint-disable-next-line no-unused-vars
				}).catch(err => {
					//错误的回调
					// eslint-disable-next-line no-console
					console.log("访问接口失败");
				});
      },
      jumpaNews(){
        if(this.aNewsid==null){

        }else{
          this.loading = true;
          this.newid = this.aNewsid;
          this.getFundNewsDetial();
        }
      },
      jumpbNews(){
        if(this.bNewsid==null){

        }else{
          this.loading = true;
          this.newid = this.bNewsid;
          this.getFundNewsDetial();
        }
      },
  },
  mounted(){
    // console.log(this.$route.params);
    this.newid=this.$route.params.aid;
    this.getFundNewsDetial();
  },
  watch: {
		'$route' (to,from) {
			if (this.$route.name === 'about_annoDetail') {
				this.newid=this.$route.params.aid;
        this.getFundNewsDetial();
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.annoDetail{
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
    }
  }
  .annoDetail-bottom{
    color: $color-primary;
    font-size: 14px;

    .el-col{
      span{
        cursor: pointer;
      }
    }
  }
}
</style>
