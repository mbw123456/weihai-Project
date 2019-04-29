<template>
  <div class="anno">
    <!-- 这是根节点 -->
    <div class="anno-top">
      <div class="anno-list" v-for="(item,key) in listData" :key="key">
        <h4 @click="jump(item.id)"><i class="el-icon-bell"></i>{{item.title}}</h4>
        <h5>{{item.releasetime}}</h5>
      </div>
    </div>

    <el-pagination
      style="text-align: center; margin-top:20px;"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="cur_page"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="totalnum">
    </el-pagination>

  </div>
</template>

<script>
export default {
  name: "Anno",
  data(){
    return{
      listData:[],
      cur_page:1,
      totalnum:100
    }
  },
  methods:{
      jump(key){
        this.$router.push('/about/annoDetail/'+ key +'');
      },
			//分页
			handleSizeChange(val) {
			  console.log('每页 ${val} 条');
			},
			handleCurrentChange(val) {
			console.log('当前页: ${val}');
					this.cur_page = val;
					this.queryFundNewsList();
					this.loading= true;
      },
			queryFundNewsList(){
				this.$httpGet("/pc/breakingnews/hjy_anno?page="+this.cur_page).then(res => {
					console.log(res);
					if(res) {
						//新闻列表
						if(res.resultData.tbFundNewsList) {
							this.listData = res.resultData.tbFundNewsList;
            }
            if(res.resultData.pageCount){
              this.totalnum = res.resultData.pageCount;
            }
						this.loading= false;
					}
				// eslint-disable-next-line no-unused-vars
				}).catch(err => {
					//错误的回调
					// eslint-disable-next-line no-console
					console.log("访问接口失败");
				});
			},
  },
  mounted(){
			this.queryFundNewsList();
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.anno{
  .anno-top{
    min-height: 400px;
  }
  .anno-list{
    border-bottom: 1px solid $color-back-second;
    padding: 12px 15px;

    &:last-child{
      border: none 0;
    }
    h4{
      color: $color-font-first;
      font-weight: normal;
      cursor: pointer;
      transition: all .3s;
      font-size: 15px; 

      i{
        font-size: 18px;
        vertical-align: -1px;
        margin-right: 10px;
        color: $color-font-third;
      }
      &:hover{
        color: $color-primary;
        transition: all .3s;
        i{
          color: $color-primary;
          transition: all .3s;
        }
      }
    }
    h5{
      color: $color-font-third;
      font-weight: normal;
      font-size: 13px;
      padding-top: 5px;
      padding-left: 32px;
    }

  }
}
</style>
