<template>
  <div class="caseAll">
    <!-- 这是根节点 -->
    <ul class="case-all-list">
      <li v-for="(item,key) in caseAllList" :key="key">
        <el-row class="case-top">
            <el-col :span="5" style="height:140px;">
                <img :src="item.url">
            </el-col>
            <el-col :span="18" :offset="1">
                <p>{{item.title}}</p>
                <div class="case-center">
                    <i class="el-icon-location-outline"></i>
                    <span>{{item.address}}</span><b>|</b>
                    <span>案例编号:{{item.caseNum}}</span>
                    <span>发布日期:{{item.year}}</span>
                </div>
                <el-row>
                    <el-col :span="8"><i class="el-icon-refresh"></i>{{item.circle}}</el-col>
                    <el-col :span="8" style="text-align:center;"><i class="el-icon-date"></i>对接日期:{{item.day}}天</el-col>
                    <el-col :span="8" style="text-align:right;">合同金额:<b>{{item.money}}</b>万</el-col>
                </el-row>
                
            </el-col>
        </el-row>
        <div class="case-bottom">
          <span>解决方:{{item.company}}</span>
          <el-button type="text">查看详情>></el-button>
        </div>
      </li>
    </ul>
    <el-pagination
      style="width: 100%; margin: 30px auto; text-align: center;"
      background
      :current-page="1"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="50"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "CaseAll",
  data(){
    return{
      caseAllList: [
        { 
          url:'/img/weihai_base_13.png',
          title: "山东建设汽车系统股份有限公司新能源汽车空调压缩机组装测试生产线SCADA数据采集监控系统", 
          address:'环翠区',
          caseNum:'2292',
          year:"2019-04-01",
          circle:"自动化",
          day:"29",
          money:'16',
          company:'光绘科技有限公司',
        },
        { 
          url:'/img/weihai_base_13.png',
          title: "山东建设汽车系统股份有限公司新能源汽车空调压缩机组装测试生产线SCADA数据采集监控系统", 
          address:'环翠区',
          caseNum:'2292',
          year:"2019-04-01",
          circle:"自动化",
          day:"29",
          money:'16',
          company:'光绘科技有限公司',
        },
        { 
          url:'/img/weihai_base_13.png',
          title: "山东建设汽车系统股份有限公司新能源汽车空调压缩机组装测试生产线SCADA数据采集监控系统", 
          address:'环翠区',
          caseNum:'2292',
          year:"2019-04-01",
          circle:"自动化",
          day:"29",
          money:'16',
          company:'光绘科技有限公司',
        },
        { 
          url:'/img/weihai_base_13.png',
          title: "山东建设汽车系统股份有限公司新能源汽车空调压缩机组装测试生产线SCADA数据采集监控系统", 
          address:'环翠区',
          caseNum:'2292',
          year:"2019-04-01",
          circle:"自动化",
          day:"29",
          money:'16',
          company:'光绘科技有限公司',
        },
        { 
          url:'/img/weihai_base_13.png',
          title: "山东建设汽车系统股份有限公司新能源汽车空调压缩机组装测试生产线SCADA数据采集监控系统", 
          address:'环翠区',
          caseNum:'2292',
          year:"2019-04-01",
          circle:"自动化",
          day:"29",
          money:'16',
          company:'光绘科技有限公司',
        },
      ],
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.caseAll{
  .case-all-list{

    li{
      background-color: #fff;
      border: 1px solid $color-back-first;
      margin-bottom: 15px;
      

      .el-row{
        color: $color-font-third;
        font-size: 14px;
        padding-top: 5px;

        .el-col{
          line-height: 25px;
          i{
            font-weight: bold;
            margin-right: 5px;
            color: $color-primary;
          }
          b{
            color: red;
            font-size: 20px;
            vertical-align: -2px;
          }
        }

        
      }
      .case-top{
        padding: 10px;
          height: 160px;
          box-sizing: border-box;
          
          .el-col{
            img{
                width: 100%;
                height: 100%;
            }
            p{
                color: $color-font-second;
                padding-top: 5px;
                height: 50px;
                font-size: 16px;
            }
            .case-center{
                padding-top: 20px;
                border-bottom: 1px solid $color-back-first;
                padding-bottom: 10px;

                i{
                  color: $color-font-third;
                  vertical-align: -1px;
                }
                b{
                  color: $color-font-fourth;
                  font-weight: normal;
                  margin:0 10px;
                }
                span{
                    font-size: 14px;
                    color: $color-font-third;

                    &:last-child{
                        float: right;
                    }

                    b{
                        color: #f23030;
                        font-size: 16px;
                    }
                }
            }
            .el-button{
                margin-top: 10px;
                float: right;
            }
          }
      }
      .case-bottom{
        background-color: $color-back-third;
        padding: 0 15px;
        line-height: 40px;
        height: 40px;

        span{
          font-size: 14px;
          color:$color-font-second;
        }
        .el-button{
          float: right;
        }
      }
    }
  }
}
</style>
