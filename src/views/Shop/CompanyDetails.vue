<template>
  <div class="companydetails"><!-- 这是根节点 -->
    <div class="company-details-top" v-loading="loading">
      
      <div class="shop-detail-title">{{companyBaseInfo.compName}}</div>
      <el-row class="shop-detail">
        <el-col :span="6">
          <h4>{{companyBaseInfo.compFoundDate}}</h4>
          <h5>成立时间</h5>
        </el-col>
        <el-col :span="5">
          <h4>{{companyBaseInfo.totalAsset}}<span>({{companyBaseInfo.totalAsset_date}})</span></h4>
          <h5>管理规模(亿元)</h5>
        </el-col>
        <el-col :span="4">
          <h4>{{companyBaseInfo.compFundNum}}</h4>
          <h5>旗下基金数</h5>
        </el-col>
        <el-col :span="4">
          <h4>{{companyBaseInfo.compManagerNum}}</h4>
          <h5>旗下经理数</h5>
        </el-col>
        <el-col :span="5">
          <h4>{{companyBaseInfo.president}}</h4>
          <h5>总经理</h5>
        </el-col>
      </el-row>


    </div>
	

    <div class="company-details-bottom">
      <el-tabs @tab-click="tabClick" type="border-card" v-model="activeName" v-loading="loading">
        <!-- 公司概况 -->
        <el-tab-pane label="公司概况" class="company-details-tabs" name="first">

          <el-row class="shop-details-row">
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">公司名称</el-col>
                 <el-col :span="18">{{companyBaseInfo.compName}}</el-col>
            </el-col>
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">成立时间</el-col>
                 <el-col :span="18">{{companyBaseInfo.compFoundDate}}</el-col>
            </el-col>
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">注册资本(亿)</el-col>
                 <el-col :span="18">{{companyBaseInfo.compRegcapital}}</el-col>
            </el-col>
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">管理规模</el-col>
                 <el-col :span="18">{{companyBaseInfo.totalAsset}}亿({{companyBaseInfo.totalAsset_date}})</el-col>
            </el-col>
            

            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">法人代表</el-col>
                 <el-col :span="18">{{companyBaseInfo.chairman}}</el-col>
            </el-col>
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">总经理</el-col>
                 <el-col :span="18">{{companyBaseInfo.president}}</el-col>
            </el-col>
            <el-col :span="24" class="shop-details-col">
                 <el-col :span="3">公司官网</el-col>
                 <el-col :span="21">{{companyBaseInfo.website}}</el-col>
            </el-col>

            <el-col :span="24" class="shop-details-col">
                 <el-col :span="3">联系地址</el-col>
                 <el-col :span="21">{{companyBaseInfo.compOffice}}</el-col>
            </el-col>
          </el-row>

          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>公司简介</p>
            <h4>{{companyBaseInfo.compBriefing}}</h4>
          </div>

        </el-tab-pane>
        <!-- 旗下基金 -->
        <el-tab-pane label="旗下基金" class="company-details-tabs" name="second">

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>货币型基金</p>
          </div>

          <el-table
            size="medium"
            :data="fundHBDataList"
            border
            max-height="650"
            @row-click="gotoFunddetails"
            v-loading="loading1"
            style="width: 100%; text-align:center; margin-top:20px;"
            >
            <el-table-column
              fixed
              prop="fund_name"
              width="200"
              label="基金名称">
            </el-table-column>
            <el-table-column
              align="center"
              prop="fund_type"
              label="类型"
              width="100">
            </el-table-column>
            <el-table-column
              prop="navAccumulated"
              label="7日年化"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="navUnit"
              label="万份收益"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              label="近1月"
              align="center"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.avgreturn_month==null||scope.row.avgreturn_month=='--'" >{{scope.row.avgreturn_month}}</span>
                <span v-if="scope.row.avgreturn_month!=null&&scope.row.avgreturn_month!='--'" :class="Number(scope.row.avgreturn_month.replace('%','')) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.avgreturn_month}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="近1年"
              align="center"
              width="100">
              <template slot-scope="scope">

                <span v-if="scope.row.avgreturn_year==null||scope.row.avgreturn_year=='--'" >{{scope.row.avgreturn_year}}</span>
                <span v-if="scope.row.avgreturn_year!=null&&scope.row.avgreturn_year!='--'" :class="Number(scope.row.avgreturn_year.replace('%','')) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.avgreturn_year}}</span>

               
              </template>
            </el-table-column>
            <el-table-column
              label="近3年"
              align="center"
              width="100">
              <template slot-scope="scope">

                <span v-if="scope.row.avgreturn_threeyear==null||scope.row.avgreturn_threeyear=='--'" >{{scope.row.avgreturn_threeyear}}</span>
                <span v-if="scope.row.avgreturn_threeyear!=null&&scope.row.avgreturn_threeyear!='--'" :class="Number(scope.row.avgreturn_threeyear.replace('%','')) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.avgreturn_threeyear}}</span>


              </template>
            </el-table-column>


            <el-table-column
              label="成立来"
              align="center"
              width="100">
              <template slot-scope="scope">

                <span v-if="scope.row.avgreturn_sincefound==null||scope.row.avgreturn_sincefound=='--'" >{{scope.row.avgreturn_sincefound}}</span>
                <span v-if="scope.row.avgreturn_sincefound!=null&&scope.row.avgreturn_sincefound!='--'" :class="Number(scope.row.avgreturn_sincefound.replace('%','')) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.avgreturn_sincefound}}</span>

              </template>
            </el-table-column>


            <el-table-column
              prop="feeratio_allocation"
              label="费率"
              align="center"
              width="100">
            </el-table-column>


            <el-table-column
              prop="minAmount"
              label="起购金额(元)"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="mangerName"
              label="基金经理"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <div @click.stop="">
                  <el-button @click.stop="jumpToBuy(scope.row)" type="text" size="small" :disabled="scope.row.wind_code=='001916.OF' ? true : (scope.row.status==1?false:true)">申购</el-button>
                  <el-button @click.stop="jumpToInvest(scope.row)" type="text" size="small" :disabled="scope.row.wind_code=='001916.OF' ? true : (scope.row.business_flag==1?false:true)">定投</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>

          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>非货币型基金</p>
          </div>

          <el-table
            size="medium"
            :data="showFundOtherDataList"
            border
            max-height="650"
            @row-click="gotoFunddetails"
            v-loading="loading2"
            style="width: 100%; text-align:center; margin-top:20px;"
            >
            <el-table-column
              fixed
              prop="fund_name"
              width="200"
              label="基金名称">
            </el-table-column>
            <el-table-column
              align="center"
              prop="fund_type"
              label="类型"
              width="100">
            </el-table-column>
            <el-table-column
              prop="navUnit"
              label="最新净值"
              align="center"
              width="100">
            </el-table-column>
            
            <el-table-column
              label="日增长率"
              align="center"
              width="100">
              <template slot-scope="scope">

                <span v-if="scope.row.dayChangeAmount==null||scope.row.dayChangeAmount=='--'" >{{scope.row.dayChangeAmount}}</span>
                <span v-if="scope.row.dayChangeAmount!=null&&scope.row.dayChangeAmount!='--'" :class="Number(scope.row.dayChangeAmount.replace('%','')) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.dayChangeAmount}}</span>

              </template>
            </el-table-column>


            <el-table-column
              label="近1月"
              align="center"
              width="100">
              <template slot-scope="scope">

                <span v-if="scope.row.avgreturn_month==null||scope.row.avgreturn_month=='--'" >{{scope.row.avgreturn_month}}</span>
                <span v-if="scope.row.avgreturn_month!=null&&scope.row.avgreturn_month!='--'" :class="Number(scope.row.avgreturn_month.replace('%','')) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.avgreturn_month}}</span>


              </template>
            </el-table-column>



            <el-table-column
              label="近1年"
              align="center"
              width="100">
              <template slot-scope="scope">
                
                <span v-if="scope.row.avgreturn_year==null||scope.row.avgreturn_year=='--'" >{{scope.row.avgreturn_year}}</span>
                <span v-if="scope.row.avgreturn_year!=null&&scope.row.avgreturn_year!='--'" :class="Number(scope.row.avgreturn_year.replace('%','')) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.avgreturn_year}}</span>


              </template>
            </el-table-column>



            <el-table-column
              label="近3年"
              align="center"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.avgreturn_threeyear==null||scope.row.avgreturn_threeyear=='--'" >{{scope.row.avgreturn_threeyear}}</span>
                <span v-if="scope.row.avgreturn_threeyear!=null&&scope.row.avgreturn_threeyear!='--'" :class="Number(scope.row.avgreturn_threeyear.replace('%','')) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.avgreturn_threeyear}}</span>

              
              </template>
            </el-table-column>



            <el-table-column
              label="成立来"
              align="center"
              width="100">
              <template slot-scope="scope">
                
                <span v-if="scope.row.avgreturn_sincefound==null||scope.row.avgreturn_sincefound=='--'" >{{scope.row.avgreturn_sincefound}}</span>
                <span v-if="scope.row.avgreturn_sincefound!=null&&scope.row.avgreturn_sincefound!='--'" :class="Number(scope.row.avgreturn_sincefound.replace('%','')) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.avgreturn_sincefound}}</span>

              </template>
            </el-table-column>

          
            <el-table-column
              prop="feeratio_allocation"
              label="费率"
              align="center"
              width="100">
            </el-table-column>

            <el-table-column
              prop="minAmount"
              label="起购金额(元)"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="mangerName"
              label="基金经理"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <div @click.stop="">
                  <el-button @click.stop="jumpToBuy(scope.row)" type="text" size="small" :disabled="scope.row.status==1?false:true">申购</el-button>
                  <el-button @click.stop="jumpToInvest(scope.row)" type="text" size="small" :disabled="scope.row.business_flag==1?false:true">定投</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            style="margin: 30px auto; text-align: center;"
            background
            @current-change="fundPaegChang"
            :current-page="cur_page1"
            :page-size="page_size"
            layout="prev, pager, next,total"
            :total="fundOtherDataList.length">
          </el-pagination>
          
        </el-tab-pane>
        <!-- 旗下经理 -->
        <el-tab-pane label="旗下经理" class="company-details-tabs" name="third">

          <el-table
            size="medium"
            :data="managerList"
            border
            max-height="650"
            v-loading="loading3"
            style="width: 100%; text-align:center;"
            >
            <el-table-column
              fixed
              type="index"
              label="序号"
              align="center"
              width="80">
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="姓名">
            </el-table-column>
            <el-table-column
              align="center"
              prop="fundNum"
              label="现任基金数量"
              >
            </el-table-column>
            <el-table-column
              prop="officeTime"
              label="本公司任职"
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="workingTime"
              label="从业时间"
              align="center"
              >
            </el-table-column>


           

           <el-table-column
              label="履任以来年化回报"
              align="center"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.annualReturns==null||scope.row.annualReturns=='--'" >{{scope.row.annualReturns}}</span>
                <span v-if="scope.row.annualReturns!=null&&scope.row.annualReturns!='--'" :class="Number(scope.row.annualReturns.replace('%','')) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.annualReturns}}</span>
              </template>
            </el-table-column>

           
            <el-table-column
              prop="similarRanking"
              label="履任以来同类排名"
              align="center"
              >
            </el-table-column>
          </el-table>

          <el-pagination
            style="margin: 30px auto; text-align: center;"
            background
            @current-change="managerListChange"
            :current-page="cur_page2"
            :page-size="page_size"
            layout="prev, pager, next,total"
            :total="totalnum">
          </el-pagination>
          
        </el-tab-pane>





        <!-- 基金公告 -->
        <el-tab-pane label="最新公告" class="company-details-tabs" name="fourth">
          
          <el-radio-group v-model="radio3" size="small" @change="getData" style="margin-bottom:20px;">
            <el-radio-button 
            :label="item.val" 
            border 
            v-for="item in dataType3"
            :key="item.val">
            {{item.name}}
            </el-radio-button>
          </el-radio-group>

          <el-table
            size="medium"
            :data="noticeList"
            border
            v-loading="loading4"
            @row-click="openDetails"
				  	:row-style="{cursor:'pointer'}"
            style="width: 100%; text-align:center; margin-top:20px;"
            >
            <el-table-column
              fixed
              prop="title"
              label="标题">
            </el-table-column>
            <el-table-column
              align="center"
              prop="type"
              width="150px"
              label="公告类型">
            </el-table-column>
            <el-table-column
              align="center"
              prop="date"
              width="150px"
              label="日期">
            </el-table-column>
          </el-table>
          <el-pagination
            style="margin: 30px auto; text-align: center;"
            background
            @current-change="NoticeListChange"
            :current-page="cur_page3"
            :page-size="page_size"
            layout="prev, pager, next,total"
            :total="noticeTotalnum">
          </el-pagination>

        </el-tab-pane>
      </el-tabs>
    </div>


  </div>
</template>

<script>

export default {
  name: 'CompanyDetails',
 
  data(){
	  return {
      companyBaseInfo:{},
      activeName:'first',
      fundHBDataList:[],
      fundOtherDataList:[],
      showFundOtherDataList: [],
      page_size: 10,

      loading:true,
      loading1:true,
      loading2:true,
      loading3:true,
      loading4:true,
      this_comp_name: '',
      managerList: [],
      totalnum: 0,
      noticeList: [],
      noticeTotalnum:0,

      
      //最新公告
      radio3:'0',
      dataType3:[{val:'0',name:'全部'},{val:'2',name:'定期公告'},{val:'1',name:'合同相关'},{val:'3',name:'其他'}],
      //分页
      cur_page1:1,
      cur_page2:1,
      cur_page3:1,
      
	  }
  },
  methods:{
    //tab点击事件
    tabClick(key){
      console.log(this.activeName);
      if(this.activeName=='third'){
        this.getPublicManagerList(1,this.page_size)
      }else if(this.activeName=='fourth'){
        this.getPublicNotice(1,this.page_size,this.radio3);
      }
    },
    //历史净值tab按钮
    getData(key){
      this.getPublicNotice(1,this.page_size,this.radio3);
    },
    
    //基金分页
    fundPaegChang(val){
        console.log('当前页: ${val}'+val);
        this.cur_page1 = val;
        this.loading2= true;
        var n = (val-1)*this.page_size;
        var m = (val)*this.page_size;
        this.showFundOtherDataList = this.fundOtherDataList.slice(n,m);
        this.loading2= false;
    },
    //跳转基金详情页
    gotoFunddetails(row, column, event){
      this.$router.push({
        path: '../funddetails', 
        query: { 
          fundcode: row.wind_code, 
          fundtype: row.pramfundtype
        }
      });
    },

    //基金经理分页
    managerListChange(val){
        console.log('当前页: ${val}'+val);
        this.cur_page2 = val;
        this.loading3= true;
        this.getPublicManagerList(val,this.page_size)
    },

    //公司公告分页
    NoticeListChange(val){
        console.log('当前页: ${val}'+val);
        this.cur_page3 = val;
        this.loading4= true;
        this.getPublicNotice(val,this.page_size,this.radio3);
    },


    //基金公告页面跳转
    openDetails(row, column, event){
      this.$router.push({
        path: '../fundAnno', 
        query: { 
          newsId: row.object_id
        }
      });
    },


    //点击申购
    jumpToBuy(row){
      this.$router.push({
        path: '../purchase', 
        query: {
          fundcode: row.wind_code, 
          business: '22'
          }
      });
    },
    //点击定投
    jumpToInvest(row){
      this.$router.push({
        path: '../invest', 
        query: { 
          fundcode: row.wind_code
          }
      });
    },

    getcompanydetail(){
      this.loading=true;
      this.$httpGet("/pc/publicCompanyDetail/getcompanydetail",{code:this.$route.params.aid}).then(data=>{
         if(data){
            this.companyBaseInfo = data.companyBaseInfo;
            this.this_comp_name = data.companyBaseInfo.compName;
            this.loading=false;
         }
       })
    },


    getPublicFundList(){
      this.$httpGet("/pc/publicCompanyDetail/getPublicFundList",{comp_id:this.$route.params.aid}).then(data=>{
         if(data){
            this.loading1= false;
            this.loading2= false;
            this.fundHBDataList =  data.fundHBDataList;
            this.fundOtherDataList = data.fundOtherDataList;
            this.showFundOtherDataList = data.fundOtherDataList.slice(0,this.page_size);
         }
       })
    },

    getPublicManagerList(page,pageSize){
      this.$httpGet("/pc/publicCompanyDetail/publicManagerList",{company:this.this_comp_name,page:page,pageSize:pageSize}).then(data=>{
         if(data){
            this.loading3= false;
            this.managerList = data.managerList;
            this.totalnum = data.totalnum;
         }
       })
    },


    getPublicNotice(page,pageSize,notice_type){
      this.$httpGet("/pc/publicCompanyDetail/getPublicNotice",{comp_id:this.$route.params.aid,pageIndex:page,limit:pageSize,notice_type:notice_type}).then(data=>{
         if(data){
            this.loading4= false;
            this.noticeList = data.dataList;
            this.noticeTotalnum = data.totalnum;
         }
       })
    },

    funcWatch(){

      this.activeName = 'first';

      this.companyBaseInfo = {};
      this.this_comp_name = "";
      this.loading1= true;
      this.loading2= true;
      this.fundHBDataList =  [];
      this.fundOtherDataList = [];
      this.showFundOtherDataList = [];
      this.cur_page1 = 1;
      this.cur_page2 = 1;
      this.cur_page3 = 1;

      this.getcompanydetail();
      this.getPublicFundList();
    }

  },
	mounted(){
      // console.log(this.$route.params);
      console.log("加载数据--------------------");
      
      this.getcompanydetail();
      this.getPublicFundList();
  },
  watch: {
		'$route' (to,from) {
			if (this.$route.name === 'companydetails') {
        this.funcWatch();
			}
		}
	}

  // watch: {
  //   "$route": "funcWatch"
  // }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '@/assets/styles/vars.scss';
  .companydetails{
    padding-top: 20px;
    padding-bottom: 30px;

    .company-details-top{
      width: 1140px;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 20px 0px;
      background-color: #fff;
      border: 1px solid $color-back-second;

      .shop-detail-title{
        font-size: 18px;
        color: $color-font-first;
        padding-left: 50px;
        padding-top: 10px;
      }
      .shop-detail{
        background-color: $color-primary-back;
        padding: 20px 0;
        margin: 20px 0;

        span{
          font-size: 15px;
          color: $color-font-third;
          margin-left: 5px;
        }

        .el-col{
          text-align: center;

          h4{
            font-weight: normal;
            color: $color-primary;
            font-size: 25px;
          }
          h5{
            font-weight: normal;
            color: $color-font-third;
            font-size: 14px;
            padding-top: 5px;
          }
        }
      }

    }
    .company-details-bottom{
      width: 1140px;
      margin: 0 auto;
      margin-top: 30px;
      
      .company-details-tabs{
        padding:10px 40px;

        &>h6{
          font-weight: normal;
          color: $color-font-third;
          margin-top: 20px;
        }
        .shop-details-row{
            border-bottom: 1px solid $color-back-first;
            border-right: 1px solid $color-back-first;
            font-size: 14px;
            color: $color-font-second;
        }
        .shop-details-col{
            border-top: 1px solid $color-back-first;
            border-left: 1px solid $color-back-first;

            .el-col{

              &:first-child{
                background-color: $color-primary-back;
                padding: 8px 15px;
                border-right: 1px solid $color-back-first;
              }
              &:last-child{
                padding: 8px 15px;
              }
              
            }
        }
        .shop-details-bottom-bar{
          height: 1px;
          border-top:1px dashed $color-back-first;
          margin: 30px 0;
        }
        .shop-details-word{

           p{
             font-size: 15px;
             color: $color-font-first;
             font-weight: bold;
             margin-bottom: 10px;

             i{
               font-size: 22px;
               vertical-align: -2px;
               color: $color-primary;
               margin-left: -6px;
             }
             span{
               font-size: 12px;
               color: $color-font-third;
               margin-left: 5px;
               font-weight: normal;
             }
           } 
           h4{
             font-weight: normal;
             font-size: 14px;
             color: $color-font-second;
             line-height: 22px;
           }
        }
        .manager-box{
          font-size: 16px;
          margin-top: 15px;
          background-color: $color-back-third;
          padding: 5px 0;

          span{
            font-weight: normal;
            font-size: 13px;
            color: $color-font-third;
            margin-left: 10px;
          }
          b{
            color: $color-primary;
          }
        }
        .top-inputbox-small{
          font-size: 14px;
          color: $color-font-third;
          padding-top: 10px;

          b{
            font-weight: normal;
            margin: 0 10px;
            color: $color-back-first;
          }
          span{
            color: $color-font-second;
            margin-left: 5px;
          }
        }
      }
    }
  }
</style>
<style>
.top-inputbox .el-input-group__append {
  background-color: #ff6600;
  border-color: #ff6600;
  color: #fff;
}
  
.shop-details-tabs .el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: rgba(255, 102, 0, 0.1) !important;
}
.company-details-bottom .el-tabs--border-card{
  border: 1px solid #dcdfe6;
  box-shadow: none;
}
</style>
