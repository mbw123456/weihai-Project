<template>
  <div class="shopdetails"><!-- 这是根节点 -->
    <div class="shop-details-top">
      <el-row>
        <el-col :span="12" class="shop-details-top-bar">
          <template v-if="fundinfo.fundbaseinfo.publicFundInfo.f_info_name!=null">
            <div class="shop-detail-title">{{fundinfo.fundbaseinfo.publicFundInfo.f_info_name}}</div>
            <div class="shop-detail-title-desc">{{fundinfo.fundbaseinfo.publicFundInfo.fundtype_show}}<b>|</b>基金代码: <span>{{fundinfo.fundbaseinfo.front_code}}</span></div>
          </template>
          <template v-else>
            <div class="shop-detail-title">&nbsp;</div>
            <div class="shop-detail-title-desc">&nbsp;</div>
          </template>
          <el-row class="shop-detail">
            
              <template v-if="this.$route.query.fundtype=='2' || this.$route.query.fundtype=='9'">
                <el-col :span="8">
                <template v-if="fundinfo.fundbaseinfo.mfIncome.f_unityield!=null && fundinfo.fundbaseinfo.mfIncome.f_unityield!=''">             
                <h4>{{Number(fundinfo.fundbaseinfo.mfIncome.f_unityield).toFixed(4)}}</h4>
                <h5>万份收益({{fundinfo.fundbaseinfo.mfIncome.f_enddate}})</h5>
              </template>
              <template v-else>
                <h4>--</h4>
                <h5>万份收益</h5>
              </template>
            </el-col>
            <el-col :span="8">
              <h4 v-if="fundinfo.fundbaseinfo.mfIncome.f_yearlyroe!=null && fundinfo.fundbaseinfo.mfIncome.f_yearlyroe!=''">{{fundinfo.fundbaseinfo.mfIncome.f_yearlyroe}}</h4>
              <h4 v-else>--</h4>
              <h5>七日年化收益率</h5>
            </el-col>
              </template>
              <template v-else>
                <el-col :span="8">
                <template v-if="fundinfo.fundbaseinfo.nav_unit!=null && fundinfo.fundbaseinfo.nav_unit!=''">             
                <h4>{{Number(fundinfo.fundbaseinfo.nav_unit).toFixed(4)}}</h4>
                <h5>单位净值({{fundinfo.fundbaseinfo.ann_date}})</h5>
              </template>
              <template v-else>
                <h4>--</h4>
                <h5>单位净值</h5>
              </template>
            </el-col>
            <el-col :span="8">
              <h4 v-if="fundinfo.fundbaseinfo.dayChangeAmount!=null && fundinfo.fundbaseinfo.dayChangeAmount!=''" v-html="fundinfo.fundbaseinfo.dayChangeAmount"></h4>
              <h4 v-else>--</h4>
              <h5>日涨幅</h5>
            </el-col>
            </template>
              
            <el-col :span="8">
              <h4>{{fundinfo.fundbaseinfo.feeratio_allocation==null?'--':fundinfo.fundbaseinfo.feeratio_allocation}}</h4>
              <h5>购买费率</h5>
            </el-col>
          </el-row>

          <el-row class="shop-detail-small">
            <el-col :span="10" :offset="2">
              最新规模:
              <span v-if="fundinfo.fundbaseinfo.newest_prt_totalasset!=null && fundinfo.fundbaseinfo.newest_prt_totalasset!=''">{{fundinfo.fundbaseinfo.newest_prt_totalasset}}亿元</span>
              <span v-else>--</span>
            </el-col>
            <el-col :span="12">
              成立时间:<span>{{fundinfo.fundbaseinfo.setupdate}}</span>
            </el-col>
            <el-col :span="10" :offset="2">
              基金经理:<span>{{fundinfo.fundbaseinfo.managerNameStr}}</span>
            </el-col>
            <el-col :span="12">
              基金公司:<router-link :to="'/companydetails/'+fundinfo.fundbaseinfo.compInfo.comp_code">{{fundinfo.fundbaseinfo.compInfo.comp_name}}</router-link>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="11" :offset="1">
          <div class="title-topright">
            <span>风险等级:
               <b v-if="fundinfo.fundbaseinfo.risk_level!=null && fundinfo.fundbaseinfo.risk_level!=''">{{fundinfo.fundbaseinfo.risk_level}}</b>
               <b v-else>--</b>
            </span>
            <span>起购金额:<b>{{fundinfo.fundbaseinfo.minbuyamount==null?'--':Number(fundinfo.fundbaseinfo.minbuyamount).toFixed(2)+'元'}}</b></span>
          </div>
          <div class="top-inputbox">
            <p>购买金额:</p>
            <div class="top-input">
              <el-input
                
                :class="[fundinfo.fundbaseinfo.transaction_status.transaction_status_buy==true ? '':'stop-buy']"
                :placeholder="fundinfo.fundbaseinfo.minbuyamount==null?'':Number(fundinfo.fundbaseinfo.minbuyamount).toFixed(2)" ref="buyAmount"
                v-model="input">
                <i slot="suffix" class="el-input__icon" style="margin-right:5px;">元</i>
                <template v-if="fundinfo.fundbaseinfo.transaction_status.transaction_status_buy==true">
                  <el-button type="primary" slot="append" @click="jumpToBuy()">立即购买</el-button>
                </template>
                <template v-else>
                  <el-button type="primary" slot="append" disabled>暂停购买</el-button>
                </template>
              </el-input>
              <template v-if="fundinfo.fundbaseinfo.transaction_status.transaction_status_plan==true">
                <el-button type="primary" plain style="margin-left:15px;" @click="jumpToInvest()">定投</el-button>
              </template>
              <template v-else>
                <el-button type="primary" plain style="margin-left:15px;" disabled>暂停定投</el-button>
              </template>
              <el-button type="primary" plain style="margin-left:15px;" @click="jumpToRegister()">10秒开户</el-button>
            </div>
            <div class="top-inputbox-small">
              申购:<span v-if="fundinfo.fundbaseinfo.transaction_status.transaction_status_buy==true">开放</span><span v-else>暂停</span>
              <b>|</b>
              赎回:<span v-if="fundinfo.fundbaseinfo.transaction_status.transaction_status_sell == true">开放</span><span v-else>暂停</span>
              <b>|</b>
              定投:<span v-if="fundinfo.fundbaseinfo.transaction_status.transaction_status_plan == true">开放</span><span v-else>暂停</span>
            </div>
            
          </div>
        </el-col>
      </el-row>
    </div>
	

    <div class="shop-details-bottom">
      <el-tabs :tab-position="tabPosition" @tab-click="tabClick" v-model="activeName" v-loading="loading_base">
        <!-- 基金概况 -->
        <el-tab-pane label="基金概况" class="shop-details-tabs" name="baseData">
          <el-row class="shop-details-row">
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">基金简称</el-col>
                 <el-col :span="18">{{fundinfo.fundbaseinfo.publicFundInfo.f_info_name}}</el-col>
            </el-col>
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">基金代码</el-col>
                 <el-col :span="18">{{fundinfo.fundbaseinfo.front_code}}</el-col>
            </el-col>
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">基金全称</el-col>
                 <el-col :span="18">{{fundinfo.fundbaseinfo.publicFundInfo.f_info_fullname}}</el-col>
            </el-col>
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">基金类型</el-col>
                 <el-col :span="18">{{fundinfo.fundbaseinfo.publicFundInfo.fundtype_show}}</el-col>
            </el-col>

            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">基金公司</el-col>
                 <el-col :span="18">{{fundinfo.fundbaseinfo.compInfo.comp_name}}</el-col>
            </el-col>
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">基金经理</el-col>
                 <el-col :span="18">{{fundinfo.fundbaseinfo.managerNameStr}}</el-col>
            </el-col>
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">最新规模</el-col>
                 <el-col :span="18" v-if="fundinfo.fundbaseinfo.newest_prt_totalasset!=null && fundinfo.fundbaseinfo.newest_prt_totalasset!=''">{{fundinfo.fundbaseinfo.newest_prt_totalasset}}亿（{{fundinfo.fundbaseinfo.newest_prt_enddate}}）</el-col>
                 <el-col :span="18" v-else>--</el-col>
            </el-col>
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">最新份额</el-col>
                 <el-col :span="18">--</el-col>
            </el-col>

            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">基金管理费</el-col>
                 <el-col :span="18">{{fundinfo.fundbaseinfo.managementfeeratio }}</el-col>
            </el-col>
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">基金托管费</el-col>
                 <el-col :span="18">{{fundinfo.fundbaseinfo.custodianfeeratio}}</el-col>
            </el-col>
            <el-col :span="24" class="shop-details-col"> 
                 <el-col :span="3">基金托管人</el-col>
                 <el-col :span="18">{{fundinfo.fundbaseinfo.publicFundInfo.f_info_custodianbank}}</el-col>
            </el-col>
            <el-col :span="24" class="shop-details-col">
                 <el-col :span="4">基金业绩比较基准</el-col>
                 <el-col :span="18">{{fundinfo.fundbaseinfo.publicFundInfo.f_info_benchmark}}</el-col>
            </el-col>
          </el-row>

          <template v-if="fundinfo.fundbaseinfo.publicFundInfo.f_info_investobject!=null && fundinfo.fundbaseinfo.publicFundInfo.f_info_investobject!=''">
          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>投资目标</p>
            <h4>{{fundinfo.fundbaseinfo.publicFundInfo.f_info_investobject}}</h4>
          </div>
          </template>
          <template v-if="fundinfo.fundbaseinfo.publicFundInfo.f_info_investscope!=null && fundinfo.fundbaseinfo.publicFundInfo.f_info_investscope!=''">
          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>投资范围</p>
            <h4>{{fundinfo.fundbaseinfo.publicFundInfo.f_info_investscope }}</h4>
          </div>
          </template>
          <template v-if="fundinfo.fundbaseinfo.publicFundInfo.investstrategy!=null && fundinfo.fundbaseinfo.publicFundInfo.investstrategy!=''">
          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>投资策略</p>
            <h4>{{fundinfo.fundbaseinfo.publicFundInfo.investstrategy }}</h4>
          </div>
          </template>
          <template v-if="fundinfo.fundbaseinfo.publicFundInfo.risk_return!=null && fundinfo.fundbaseinfo.publicFundInfo.risk_return!=''">
            <div class="shop-details-bottom-bar"></div>
          
          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>风险收益特征</p>
            <h4>{{fundinfo.fundbaseinfo.publicFundInfo.risk_return }}</h4>
          </div>
          </template>
          
          

        </el-tab-pane>
        <!-- 基金公司 -->
        <el-tab-pane label="基金公司" class="shop-details-tabs" name="compData">
           <div v-loading="loading_comp">
          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>{{fundinfo.fundbaseinfo.compInfo.comp_name}}</p>
          </div>

          <el-table
            size="medium"
            border
            :data="comparray"
            style="width: 100%; text-align:center;"
            key="table1"
            >
            <el-table-column
              align="center"
              label="旗下基金(只)">
              {{compinfo.fundbaseinfo.compInfo.total_fund}}
            </el-table-column>
            <el-table-column
              align="center"
              label="旗下经理(人)">
              {{compinfo.fundbaseinfo.compInfo.total_manager}}
            </el-table-column>
            <el-table-column
              label="当前规模(亿元)"
              align="center">
              {{compinfo.totalAsset}}
            </el-table-column>
            <el-table-column
              label="资产净值(亿元)"
              align="center">
              --
            </el-table-column>
          </el-table>


          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>注册信息</p>
          </div>

          <el-row class="shop-details-row">
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">公司名称</el-col>
                 <el-col :span="18">{{compinfo.fundbaseinfo.compInfo.comp_name}}</el-col>
            </el-col>
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">成立时间</el-col>
                 <el-col :span="18">{{compinfo.fundbaseinfo.compInfo.founddate}}</el-col>
            </el-col>
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">注册资本(亿)</el-col>
                 <el-col :span="18">{{compinfo.fundbaseinfo.compInfo.regcapital}}</el-col>
            </el-col>
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">管理规模(亿)</el-col>
                 <el-col :span="18">{{compinfo.totalAsset}}</el-col>
            </el-col>
            

            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">法人代表</el-col>
                 <el-col :span="18">{{compinfo.chairman}}</el-col>
            </el-col>
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">总经理</el-col>
                 <el-col :span="18">{{compinfo.president}}</el-col>
            </el-col>
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">客服电话</el-col>
                 <el-col :span="18">{{compinfo.companyPhoneNbr}}</el-col>
            </el-col>
            <el-col :span="12" class="shop-details-col">
                 <el-col :span="6">公司官网</el-col>
                 <el-col :span="18">{{compinfo.website}}</el-col>
            </el-col>

            <el-col :span="24" class="shop-details-col">
                 <el-col :span="3">联系地址</el-col>
                 <el-col :span="18">{{compinfo.fundbaseinfo.compInfo.office}}</el-col>
            </el-col>
          </el-row>

          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>公司简介</p>
            <h4>{{fundinfo.fundbaseinfo.compInfo.briefing}}</h4>
          </div>
          </div>
        </el-tab-pane>


        <!-- 基金经理 -->
        <el-tab-pane label="基金经理" class="shop-details-tabs" name="managerData">
          <div v-loading="loading_manager">
          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>现任基金经理</p>
          </div>
          <div v-for="item in fundinfo.fundbaseinfo.managerBaseInfo" :key ="item.f_info_fundmanager_id">
            <p class="manager-box">{{item.f_info_fundmanager}}<span>(基金经理)</span></p>
            <div class="top-inputbox-small">
              上任日期:<span>{{item.f_info_manager_startdate}}</span>
              <b>|</b>
              从业时间:<span>{{item.publicManager.workingTime }}</span>
              <b>|</b>
              从业年均回报:<span>{{item.publicManager.annualReturns}}</span>
            </div>
            <div class="shop-details-word" style="padding-top:20px;">
              <h4>{{item.f_info_manager_resume}}</h4>
            </div>
            <el-table
              size="medium"
              :data="item.currentResult"
              border
              style="width: 100%; text-align:center; margin-top:20px;"
              key="table2"
              >
              <el-table-column
                align="center"
                prop="f_info_name"
                label="任职基金">
              </el-table-column>
              <el-table-column
                align="center"
                prop="f_info_firstinvesttype"
                label="类型">
              </el-table-column>
              <el-table-column
                prop="hold_date"
                label="任职天数"
                align="center">
              </el-table-column>
              <el-table-column
                label="任职回报"
                align="center">
                <template slot-scope="scope">
                  <template v-if="scope.row.f_rate!=null && scope.row.f_rate!=''">
                    <span :class="parseInt(scope.row.f_rate) > 0 ? 'letter-red' : 'letter-green'">{{scope.row.f_rate}}%</span>
                  </template>
                  <template v-else>
                    --
                  </template>
                </template>
              </el-table-column>
              <el-table-column
                label="最大盈利"
                align="center">
                <template slot-scope="scope">
                  <template v-if="scope.row.MaxProfitRate!=null && scope.row.MaxProfitRate!=''">
                    <span :class="parseInt(scope.row.MaxProfitRate) > 0 ? 'letter-red' : 'letter-green'">{{scope.row.MaxProfitRate}}%</span>
                  </template>
                  <template v-else>
                    --
                  </template>
                </template>
              </el-table-column>
              <el-table-column
                label="最大回撤"
                align="center">
                <template slot-scope="scope">
                  <template v-if="scope.row.MaxLostRate!=null && scope.row.MaxLostRate!=''">
                    <span :class="parseInt(scope.row.MaxLostRate) > 0 ? 'letter-red' : 'letter-green'">{{scope.row.MaxLostRate}}%</span>
                  </template>
                  <template v-else>
                    --
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>历任基金经理</p>
          </div>

          <el-table
            size="medium"
            :data="beformanagerinfo"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table3"
            >
            <el-table-column
              align="center"
              prop="f_info_fundmanager"
              label="姓名">
            </el-table-column>
            <el-table-column
              align="center"
              prop="f_info_manager_startdate"
              label="上任时间">
            </el-table-column>
            <el-table-column
              prop="f_info_manager_leavedate"
              label="离任时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="hold_date"
              label="任职天数"
              align="center">
            </el-table-column>
            <el-table-column
              label="任职回报(%)"
              align="center">
              <template slot-scope="scope">
                <template v-if="scope.row.f_rate!=null && scope.row.f_rate!=''">
                    <span :class="parseInt(scope.row.f_rate) > 0 ? 'letter-red' : 'letter-green'">{{scope.row.f_rate}}%</span>
                  </template>
                  <template v-else>
                    --
                  </template>
              </template>
            </el-table-column>
            <el-table-column
              label="同类平均(%)"
              align="center">
              --
            </el-table-column>
          </el-table>
         </div>
        </el-tab-pane>
        <!-- 费率 -->


        <el-tab-pane label="费率" class="shop-details-tabs" name="feeData">
          <template v-if="this.$route.query.fundtype!='2' && this.$route.query.fundtype!='9'">
          <template v-if="fundinfo.rateMap.Offer_to_buy!=null && fundinfo.rateMap.Offer_to_buy.length>0">
            <div class="shop-details-word">
              <p><i class="el-icon-caret-right"></i>认购</p>
            </div>

            <el-table
              size="medium"
              :data="fundinfo.rateMap.Offer_to_buy"
              border
              style="width: 100%; text-align:center; margin-top:20px;"
              key="table4"
              >
              <el-table-column
                align="center"
                prop="amountlimit_ds"
                label="认购条件">
              </el-table-column>
              <el-table-column
                align="center"
                label="认购费率">
                <template slot-scope="scope">
                  <span v-if="scope.row.feeratio_jz_ds_rate != null && scope.row.feeratio_jz_ds_rate != ''">
                    {{scope.row.feeratio_jz_ds_rate}}
                  </span>
                  <span v-else>
                    {{scope.row.feeratio_ds}}
                  </span>
                </template>
                
              </el-table-column>
            </el-table>

            <div class="shop-details-bottom-bar"></div>
          </template>
          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>申购</p>
          </div>

          <el-table
            size="medium"
            :data="fundinfo.rateMap.apply_for_purchase"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table5"
            >
            <el-table-column
              align="center"
              prop="amountlimit_ds"
              label="申购条件">
            </el-table-column>
            <el-table-column
              align="center"
              label="申购费率">
              <template slot-scope="scope" >
                <span v-if="scope.row.feeratio_jz_ds_rate != null && scope.row.feeratio_jz_ds_rate != ''">
                  {{scope.row.feeratio_jz_ds_rate}}
                </span>
                <span v-else>{{scope.row.feeratio_ds}}</span>
              </template>
            </el-table-column>
          </el-table>

          <div class="shop-details-bottom-bar"></div>
          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>赎回</p>
          </div>

          <el-table
            size="medium"
            :data="fundinfo.rateMap.atone_for"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table6"
            >
            <el-table-column
              align="center"
              prop="amountlimit_ds"
              label="赎回条件">
            </el-table-column>
            <el-table-column
              align="center"
              prop="feeratio_ds"
              label="赎回费率">
            </el-table-column>
          </el-table>
          </template>

          <template v-else>
          <el-table
            size="medium"
            :data="mfundfee"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table7"
            >
            <el-table-column
              align="center"
              prop="feetitle"
              label="名称">
            </el-table-column>
            <el-table-column
              align="center"
              prop="feeratio"
              label="费率">
            </el-table-column>
          </el-table>
          </template>
          <h6>提示：以上数据信息来自于好基友基金网，仅供参考。基金公司保留最终修改权力，实际产生的费用以基金公司确认为准，请用户参考基金募集说明书或者致电基金公司查询。</h6>
        </el-tab-pane>


        <!-- 资产配置 -->
        <el-tab-pane label="资产配置" class="shop-details-tabs" name="assetData">
           <div v-loading="loading_asset">
          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>资产配置</p>
          </div>

          <div v-if="assetalloinfo!=null && assetalloinfo.assetCharts!=null && assetalloinfo.assetCharts.length>0">
            <div :id="id1" :option="option1" :style="{height:'400px',width:'960px',position:'relative'}" ref="assetsPie" key="chart1"></div>
          </div>        
          <div v-else class="fund-noData">
            <i class="iconfont-hjy icon-hjyqueshengye"></i>
            <h4>暂无数据</h4>
          </div>
          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>资产分布<span v-if="assetalloinfo.assetDate!=null && assetalloinfo.assetDate!=''">({{assetalloinfo.assetDate}})</span></p>
          </div>
          <el-table
            size="medium"
            :data="assetalloinfo.assetData"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table8"
            >
            <el-table-column
              align="center"
              label="资产类型">
              <template slot-scope="scope">
                <span v-if="scope.row.name.length>10">{{scope.row.name.substring(0,10)}}</span>
                <span v-else> {{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="value"
              label="金额(亿元)">
            </el-table-column>
            <el-table-column
              prop="tonav"
              label="占资产净值比例(%)"
              align="center">
            </el-table-column>
          </el-table>
          </div>
        </el-tab-pane>


        <!-- 行业配置 -->
        <template v-if="this.$route.query.fundtype!='2' && this.$route.query.fundtype!='9'">
        <el-tab-pane :label="this.$route.query.fundtype=='1'?'债券配置':'行业配置'" class="shop-details-tabs" name="bondData">
          <div v-loading="loading_bond">
          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>{{this.$route.query.fundtype=='1'?'债券配置':'行业配置'}}</p>
          </div>

          <template v-if="this.$route.query.fundtype=='1'">
          <div v-if="bondalloinfo!=null && bondalloinfo.bondCharts!=null && bondalloinfo.bondCharts.length>0">
            <div :id="id2" :option="option2" :style="{height:'400px',width:'960px',position:'relative'}" ref="industryPie" key="chart2"></div>
          </div>
          <div v-else class="fund-noData">
            <i class="iconfont-hjy icon-hjyqueshengye"></i>
            <h4>暂无数据</h4>
          </div>
          </template>
          <template v-else>
          <div v-if="fundindinfo!=null && fundindinfo.fundIndPieList!=null && fundindinfo.fundIndPieList.length>0">
            <div :id="id2" :option="option2" :style="{height:'400px',width:'960px',position:'relative'}" ref="industryPie" key="chart3"></div>
          </div>
          <div v-else class="fund-noData">
            <i class="iconfont-hjy icon-hjyqueshengye"></i>
            <h4>暂无数据</h4>
          </div>
          </template>
          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>{{this.$route.query.fundtype=='1'?'债券配置':'行业配置'}}<span v-if="bondalloinfo.bondDate!=null && bondalloinfo.bondDate!=''">({{this.$route.query.fundtype=='1'?bondalloinfo.bondDate:fundinfo.fundbaseinfo.fundIndDate}})</span></p>
          </div>

          <template v-if="this.$route.query.fundtype=='1'">
          <el-table 
            size="medium"
            :data="bondalloinfo.bondData"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table9"
            >
            <el-table-column
              align="center"
              label="资产类型">
              <template slot-scope="scope">
                <span v-if="scope.row.name.length>10">{{scope.row.name.substring(0,10)}}</span>
                <span v-else> {{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="value"
              label="金额(亿元)">
            </el-table-column>
            <el-table-column
              prop="tonav"
              label="占资产净值比例(%)"
              align="center">
            </el-table-column>
          </el-table>
          </template>
          <template v-else>
            <el-table 
            size="medium"
            :data="fundindinfo.fundIndList"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table10"
            >
            <el-table-column
              align="center"
              label="资产类型">
              <template slot-scope="scope">
                <span v-if="scope.row.industriesname.length>10">{{scope.row.industriesname.substring(0,10)}}</span>
                <span v-else> {{scope.row.industriesname}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="f_prt_indusvalue"
              label="金额(亿元)">
            </el-table-column>
            <el-table-column
              prop="f_prt_industonav"
              label="占资产净值比例(%)"
              align="center">
            </el-table-column>
          </el-table>
          </template>
          </div>
        </el-tab-pane>
        </template>


        <!-- 重仓持股 -->
        <template v-if="this.$route.query.fundtype!='2' && this.$route.query.fundtype!='9'">
        <el-tab-pane :label="this.$route.query.fundtype=='1'?'重仓持债':'重仓持股'" class="shop-details-tabs" name="stockData">
          <div v-loading="loading_stock">
          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>{{this.$route.query.fundtype=='1'?'重仓持债':'重仓持股'}}</p>
          </div>

          
          <div v-if="stockinfo!=null && stockinfo.ness_list_Array!=null && stockinfo.ness_list_Array.length>0">
            <div :id="id3" :option="option3" :style="{height:'400px',width:'960px',position:'relative'}" ref="heavyPie" key="chart4"></div>
          </div>
          <div v-else class="fund-noData">
            <i class="iconfont-hjy icon-hjyqueshengye"></i>
            <h4>暂无数据</h4>
          </div>
          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>{{this.$route.query.fundtype=='1'?'重仓持债':'重仓持股'}}<span v-if="stockinfo.ness_season!=null && stockinfo.ness_season!=''">({{stockinfo.ness_season}})</span></p>
          </div>
         <template v-if="this.$route.query.fundtype=='1'">
          <el-table
            size="medium"
            :data="stockinfo.fundbaseinfo.fundStockList.ness_list"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
             key="table11"
            >
            <el-table-column
              align="center"
              label="序号">
              <template scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="s_info_name"
              label="债券简称">
            </el-table-column>
            <el-table-column
              label="占资百分比"
              align="center">
              <template scope="scope">
                {{scope.row.f_prt_stkvaluetonav}}%
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="f_prt_stkquantity"
              label="持券市值(元)">
            </el-table-column>
          </el-table>
        </template>
        <template v-else>
          <el-table
            size="medium"
            :data="stockinfo.fundbaseinfo.fundStockList.ness_list"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table12"
            >
            <el-table-column
              align="center"
              label="序号">
              <template scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="s_info_stockwindcode"
              label="股票代码">
            </el-table-column>
            <el-table-column
              prop="s_info_name"
              label="股票简称"
              align="center">
            </el-table-column>
            <el-table-column
              align="center"
              prop="nstkq"
              label="持股数(股)">
            </el-table-column>
            <el-table-column
              align="center"
              label="占资百分比">
              <template scope="scope">
                {{scope.row.f_prt_stkvaluetonav}}%
              </template>
            </el-table-column>
            <el-table-column
              label="持股变动(股)"
              align="center">
              <template slot-scope="scope">
                <span :class="parseInt(scope.row.cstkq) > 0 ? 'letter-red' : 'letter-green'">{{scope.row.cstkq}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
        </div>
        </el-tab-pane>
        </template>


          <!--货币持债 -->
        <template v-else>
          <el-tab-pane label="重仓持债" class="shop-details-tabs" name="mStockData">
          <div v-loading="loading_stock">
          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>重仓持债</p>
          </div>

          
          <div v-if="mstockinfo!=null && mstockinfo.tabledata!=null && mstockinfo.tabledata.length>0">
            <div :id="id3" :option="option3" :style="{height:'400px',width:'960px',position:'relative'}" ref="heavyPie" key="chart5"></div>
          </div>
          <div v-else class="fund-noData">
            <i class="iconfont-hjy icon-hjyqueshengye"></i>
            <h4>暂无数据</h4>
          </div>
          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>重仓持债<span v-if="mstockinfo.season_str!=null && mstockinfo.season_str!=''">({{mstockinfo.season_str}})</span></p>
          </div>
          <el-table
            size="medium"
            :data="mstockinfo.tabledata"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
             key="table13"
            >
            <el-table-column
              align="center"
              label="序号">
              <template scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="债券简称">
            </el-table-column>
            <el-table-column
              label="占资百分比"
              align="center">
              <template scope="scope">
                {{scope.row.ratio}}%
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="total"
              label="持券市值(元)">
            </el-table-column>
          </el-table>
          </div>
          </el-tab-pane>
        </template>

        <!-- 规模份额 -->
        <el-tab-pane label="规模份额" class="shop-details-tabs" name="scaleData">
          <div v-loading="loading_scale">
          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>净资产规模变动图</p>
          </div>

          <p class="manager-box" style="margin-bottom:20px;" v-if="scaleinfo.assetarray.length>0 && scaleinfo.assetarray[0].arrDate!=null"><span>截至<b>{{scaleinfo.assetarray[0].arrDate}}</b>，{{fundinfo.fundbaseinfo.publicFundInfo.f_info_name}}，期末净资产 <b>{{scaleinfo.assetarray[0].arrScale}}亿元</b>，比上期<template v-if="scaleinfo.assetarray[0].arrScalePer>0">增加<b>{{scaleinfo.assetarray[0].arrScalePer}}%</b></template><template v-else>减少<b>{{Number(scaleinfo.assetarray[0].arrScalePer)*-1}}%</b></template>。</span></p>

          

          <div v-if="scaleinfo!=null && scaleinfo.assetarray!=null && scaleinfo.assetarray.length>0 && scaleinfo.assetarray[0].arrDate!=null">
            <div :id="id4" :option="option4" :style="{height:'400px',width:'960px',position:'relative'}" ref="assetsLine" key="chart6"></div>
          </div>
          <div v-else class="fund-noData">
            <i class="iconfont-hjy icon-hjyqueshengye"></i>
            <h4>暂无数据</h4>
          </div>

          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>净资产规模变动详情</p>
          </div>

         

          <el-table
            size="medium"
            :data="(scaleinfo.assetarray==null || scaleinfo.assetarray[0].arrDate==null)?notableData:scaleinfo.assetarray"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
             key="table14"
            >
            <el-table-column
              align="center"
              prop="arrDate"
              label="日期">
            </el-table-column>
            <el-table-column
              align="center"
              prop="arrScale"
              label="净资产(亿元)">
            </el-table-column>
            <el-table-column
              prop="arrScalePer"
              label="净资产变动率(%)"
              align="center">
            </el-table-column>
          </el-table>


          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>份额规模变动图</p>
          </div>

          <p class="manager-box" style="margin-bottom:20px;" v-if="scaleinfo.scalearray.length>0 && scaleinfo.scalearray[0].arrDate!=null"><span>截至<b>{{scaleinfo.scalearray[0].arrDate}}</b>，{{fundinfo.fundbaseinfo.publicFundInfo.f_info_name}}，期末份额 <b>{{scaleinfo.scalearray[0].arrEndshares}}亿份</b>，<template v-if="Number(scaleinfo.scalearray[0].sharePer)<0">比上期减少<b>{{Number(scaleinfo.scalearray[0].sharePer)*-1}}%</b></template><template v-else>比上期增加<b>{{Number(scaleinfo.scalearray[0].sharePer)}}%</b></template>。</span></p>
          
          
          <div v-if="scaleinfo!=null && scaleinfo.scalearray!=null && scaleinfo.scalearray.length>0 && scaleinfo.scalearray[0].arrDate!=null">
            <div :id="id5" :option="option5" :style="{height:'400px',width:'960px',position:'relative'}" ref="shareColumn" key="chart7"></div>
          </div>
          <div v-else class="fund-noData">
            <i class="iconfont-hjy icon-hjyqueshengye"></i>
            <h4>暂无数据</h4>
          </div>

          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>份额规模变动详情</p>
          </div>

         

          <el-table
            size="medium"
            :data="(scaleinfo.scalearray==null || scaleinfo.scalearray[0].arrDate==null)?notableData:scaleinfo.scalearray"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table15"
            >
            <el-table-column
              align="center"
              prop="arrDate"
              label="报告日期">
            </el-table-column>
            <el-table-column
              align="center"
              prop="arrPurchase"
              label="期间申购(亿份)">
            </el-table-column>
            <el-table-column
              prop="arrRedemption"
              label="期间赎回(亿份)"
              align="center">
            </el-table-column>
            <el-table-column
              align="center"
              prop="arrEndshares"
              label="期末总份额(亿份)">
            </el-table-column>
            <el-table-column
              align="center"
              prop="sharePer"
              label="总份额变动率(%)">
            </el-table-column>
          </el-table>
          </div>
        </el-tab-pane>

        <!-- 持有人结构 -->
        <el-tab-pane label="持有人结构" class="shop-details-tabs" name="ownData" >
          <div v-loading="loading_own">
              <div class="shop-details-word">
                <p><i class="el-icon-caret-right"></i>持有人结构图</p>
              </div>
              
              <p class="manager-box" style="margin-bottom:20px;" v-if="ownerinfo.titleData[0]!=null"><span>截至<b>{{ownerinfo.titleData[0]}}</b>，{{fundinfo.fundbaseinfo.publicFundInfo.f_info_name}} 机构持有<b>{{ownerinfo.titleData[1]}}</b>，占总份额的<b>{{ownerinfo.titleData[2]}}</b>, 个人持有<b>{{ownerinfo.titleData[3]}}</b>，占总份额的<b>{{ownerinfo.titleData[4]}}</b>。</span></p>
              

              <div v-if="ownerinfo!=null && ownerinfo.tableData!=null && ownerinfo.tableData.length>0">
                <div :id="id6" :option="option6" :style="{height:'400px',width:'960px',position:'relative'}" ref="handColumn" key="chart8"></div>
              </div>
              <div v-else class="fund-noData">
                <i class="iconfont-hjy icon-hjyqueshengye"></i>
                <h4>暂无数据</h4>
              </div>

              <div class="shop-details-bottom-bar"></div>

            <div class="shop-details-word">
              <p><i class="el-icon-caret-right"></i>持有人变动详情</p>
            </div>

          

            <el-table
              size="medium"
              :data="ownerinfo.tableData==null?notableData:ownerinfo.tableData"
              border
              style="width: 100%; text-align:center; margin-top:20px;"
              key="table16"
              >
              <el-table-column
                align="center"
                prop="owner_date"
                label="日期">
              </el-table-column>
              <el-table-column
                align="center"
                prop="owner_Iper"
                label="机构持有比例(%)">
              </el-table-column>
              <el-table-column
                prop="owner_Pper"
                label="个人持有比例(%)"
                align="center">
              </el-table-column>
              <el-table-column
                align="center"
                prop="owner_Total"
                label="总份额 (亿元)">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>


        <!-- 历史净值 -->
        <template v-if="this.$route.query.fundtype!='2' && this.$route.query.fundtype!='9'">
        <el-tab-pane label="历史净值" class="shop-details-tabs" name="navData">
          <div v-loading="loading_nav">
          <el-radio-group v-model="radio1" size="small" @change="selectNavLineDate" style="margin-bottom:20px;" key="radiogroup1">
            <el-radio-button 
            :label="item" 
            border 
            v-for="(item,key) in dataType1"
            :key="key">
            {{item.value}}
            </el-radio-button>
          </el-radio-group>
          <div v-if="navLineinfo!=null && navLineinfo.length>0">
            <div :id="id7" :option="option7" :style="{height:'400px',width:'960px',position:'relative'}" ref="historyLine" key="chart9"></div>
          </div>
          <div v-else class="fund-noData">
            <i class="iconfont-hjy icon-hjyqueshengye"></i>
            <h4>暂无数据</h4>
          </div>
          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>历史净值表</p>
          </div>

          <div class="block">
            <el-date-picker
              key="datepicker1"
              @change="selectNavDate"
              v-model="navDateValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd" 
              format="yyyy-MM-dd">
            </el-date-picker>
          </div>

          <el-table
            size="medium"
            :data="navinfo.navlist==null?notableData:navinfo.navlist"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table17"
            >
            <el-table-column
              align="center"
              prop="price_date"
              label="报告日期">
            </el-table-column>
            <el-table-column
              align="center"
              label="单位净值(元)">
              <template scope="scope">
                {{Number(scope.row.f_nav_unit).toFixed(4)}}
              </template>

            </el-table-column>
            <el-table-column
              label="累计净值(元)"
              align="center">
              <template scope="scope">
              {{Number(scope.row.f_nav_accumulated).toFixed(4)}}
              </template>
            </el-table-column>
            <el-table-column
              label="日增长率(%)"
              align="center">
              <template scope="scope">
                <span :class="parseInt(scope.row.rate_of_rise) > 0 ? 'letter-red' : 'letter-green'">{{Number(scope.row.rate_of_rise).toFixed(2)}}%</span>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            style="text-align: center; margin-top:20px;"
            background
            layout="prev, pager, next"
            @current-change="handleNavCurrentChange"
            :page-size="parseInt(navinfo.pagesize)"
            :total="parseInt(navinfo.total)"
            key="pagination1">
          </el-pagination>
          </div>
        </el-tab-pane>
        <!-- 收益走势 -->
        <el-tab-pane label="收益走势" class="shop-details-tabs" name="incomeData">
           <div v-loading="loading_income">
          <el-radio-group v-model="radio2" size="small" @change="selectMFNavLineDate" style="margin-bottom:20px; " key="radiogroup1">
            <el-radio-button 
            :label="item" 
            border 
            v-for="(item,key) in dataType2"
            :key="key">
            {{item.value}}
            </el-radio-button>
          </el-radio-group>

          
          <div v-if="mfnavlineinfo!=null && mfnavlineinfo.length>0">
            <div :id="id8" :option="option8" :style="{height:'400px',width:'960px',position:'relative'}" ref="fundLine" key="chart10"></div>
          </div>
          <div v-else class="fund-noData">
            <i class="iconfont-hjy icon-hjyqueshengye"></i>
            <h4>暂无数据</h4>
          </div>
          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>{{radio2.value}}业绩表现</p>
          </div>

          <el-table
            size="medium"
            :data="(mfnavinfo==null || mfnavinfo[0]==null || mfnavinfo[0].syl==null)?notableData:mfnavinfo"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table18"
            >
            <el-table-column
              align="center"
              label="本基金">
              <template scope="scope">
                {{scope.row.syl}}%
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="同类平均">
              <template scope="scope">
                {{scope.row.tlsyl}}%
              </template>
            </el-table-column>
            <el-table-column
              prop="pm"
              label="同类排名"
              align="center">
            </el-table-column>
            <el-table-column
              label="四分位排名"
              align="center">
              <template scope="scope">
                <template v-if="scope.row.quartile<0.25">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_15.png">
                  <span>优秀</span>
                </template>
                <template v-else-if="scope.row.quartile>=0.25 && scope.row.quartile<0.5">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_17.png">
                  <span>良好</span>
                </template>
                <template v-else-if="scope.row.quartile>=0.5 && scope.row.quartile<0.75">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_19.png">
                  <span>一般</span>
                </template>
                <template v-else-if="scope.row.quartile>=0.75">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_21.png">
                  <span>不佳</span>
                </template>
              </template>
            </el-table-column>
          </el-table>
          </div>
        </el-tab-pane>
        </template>

        <template v-else>
          <el-tab-pane label="收益走势" class="shop-details-tabs" name="mIncomeData">
            <div v-loading="loading_mincome">
          <el-row class="fundD-part">
						<el-col :span="2" class="fundD-title">类型:</el-col>
						<el-col :span="22">
							<el-radio-group v-model="radio4" size="small" @change="getMFundIncomeLineData" style="margin-bottom:20px;" key="radiogroup1">
                <el-radio-button 
                :label="item" 
                border 
                v-for="(item,key) in dataType4"
                :key="key">
                {{item.value}}
                </el-radio-button>
              </el-radio-group>
						</el-col>
					</el-row>

          <el-row class="fundD-part">
						<el-col :span="2" class="fundD-title">时间区间:</el-col>
						<el-col :span="22">
							<el-radio-group v-model="radio5" size="small" @change="getMFundIncomeLineData" style="margin-bottom:20px;" key="radiogroup1">
                <el-radio-button 
                :label="item" 
                border 
                v-for="(item,key) in dataType5"
                :key="key">
                {{item.value}}
                </el-radio-button>
              </el-radio-group>
						</el-col>
					</el-row>

          
          <div v-if="mfLine!=null && mfLine.length>0">
            <div :id="id9" :option="option9" :style="{height:'400px',width:'960px',position:'relative'}" ref="mincomeLine" key="chart11"></div>
          </div>
          <div v-else class="fund-noData">
            <i class="iconfont-hjy icon-hjyqueshengye"></i>
            <h4>暂无数据</h4>
          </div>

          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>{{radio2.value}}业绩表现</p>
          </div>

          <el-table
            size="medium"
            :data="mfundincomeinfo.mfundperformace==null?notableData:mfundincomeinfo.mfundperformace"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table19"
            >
            <el-table-column
              align="center"
              label="本基金">
              <template scope="scope">
                {{Number(scope.row.syl).toFixed(2)}}%
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="同类平均">
              <template scope="scope">
                {{Number(scope.row.tlpj).toFixed(2)}}%
              </template>
            </el-table-column>
            <el-table-column
              prop="tlpm"
              label="同类排名"
              align="center">
            </el-table-column>
            <el-table-column
              label="四分位排名"
              align="center">
              <template scope="scope">
                <template v-if="scope.row.sfw<0.25">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_15.png">
                  <span>优秀</span>
                </template>
                <template v-else-if="scope.row.sfw>=0.25 && scope.row.sfw<0.5">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_17.png">
                  <span>良好</span>
                </template>
                <template v-else-if="scope.row.sfw>=0.5 && scope.row.sfw<0.75">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_19.png">
                  <span>一般</span>
                </template>
                <template v-else-if="scope.row.sfw>=0.75">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_21.png">
                  <span>不佳</span>
                </template>
              </template>
            </el-table-column>
          </el-table>

          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>历史收益</p>
          </div>

          <div class="block">
            <el-date-picker
              key="datepicker2"
              @change="selectMFundIncomeDate"
              v-model="mfundincomeinfo.dateValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd" 
              format="yyyy-MM-dd">
            </el-date-picker>
          </div>

          <el-table
            size="medium"
            :data="mFundIncomeList==null?notableData:mFundIncomeList"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table20"
            >
            <el-table-column
              align="center"
              prop="enddate"
              label="报告日期">
            </el-table-column>
            <el-table-column
              align="center"
              label="万分收益(元)">
              <template scope="scope">
                {{Number(scope.row.unityield).toFixed(4)}}
              </template>

            </el-table-column>
            <el-table-column
              label="七日年华收益率(%)"
              align="center">
              <template scope="scope">
                {{Number(scope.row.yearlyroe).toFixed(2)}}%
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            key="pagination2"
            style="text-align: center; margin-top:20px;"
            background
            layout="prev, pager, next"
            @current-change="handleMFundIncomeCurrentChange"
            :page-size="parseInt(mfundincomeinfo.pagesize)"
            :total="parseInt(mfundincomeinfo.total)">
          </el-pagination>
          </div>
        </el-tab-pane>
        </template>

        <!-- 基金涨幅 -->
        <el-tab-pane label="基金涨幅" class="shop-details-tabs" name="increaseData">
          <div v-loading="loading_increase">
          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>阶段涨幅</p>
          </div>

          <el-table
            size="medium"
            :data="increaseinfo.qjlist==null?notableData:increaseinfo.qjlist"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table21"
            >
            <el-table-column
              align="center"
              prop="title"
              label="">
            </el-table-column>
            <el-table-column
              align="center"
              label="区间回报">
              <template scope="scope">
                <span :class="parseInt(scope.row.qjhb) > 0 ? 'letter-red' : 'letter-green'">{{scope.row.qjhb==null?"--":Number(scope.row.qjhb).toFixed(2)+'%'}}</span>               
              </template>
            </el-table-column>
            <el-table-column
              label="同类平均"
              align="center">
              <template scope="scope">
                <span :class="parseInt(scope.row.tlhb) > 0 ? 'letter-red' : 'letter-green'">{{scope.row.tlhb==null?"--":Number(scope.row.tlhb).toFixed(2)+'%'}}</span> 
              </template>
            </el-table-column>
            <el-table-column
              label="沪深300"
              align="center">
              <template scope="scope">
                <span :class="parseInt(scope.row.hs300) > 0 ? 'letter-red' : 'letter-green'">{{scope.row.hs300==null?"--":Number(scope.row.hs300).toFixed(2)+'%'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="tlpm"
              label="同类排名">
            </el-table-column>
            <el-table-column
              label="四分位排名"
              align="center">
              <template scope="scope">
                <template v-if="scope.row.sfw=='1'">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_15.png">
                  <span>优秀</span>
                </template>
                <template v-else-if="scope.row.sfw=='2'">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_17.png">
                  <span>良好</span>
                </template>
                <template v-else-if="scope.row.sfw=='3'">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_19.png">
                  <span>一般</span>
                </template>
                <template v-else-if="scope.row.sfw=='4'">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_21.png">
                  <span>不佳</span>
                </template>
                <template v-else>                
                  <span>--</span>
                </template>
              </template>
            </el-table-column>
          </el-table>

          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>季度涨幅</p>
          </div>

          <el-table
            size="medium"
            :data="increaseinfo.jdlist==null?notableData:increaseinfo.jdlist"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table22"
            >
            <el-table-column
              align="center"
              prop="title"
              label="">
            </el-table-column>
            <el-table-column
              align="center"
              label="区间回报">
              <template scope="scope">
                <span :class="parseInt(scope.row.sb_qb) > 0 ? 'letter-red' : 'letter-green'">{{scope.row.sb_qb==null?"--":Number(scope.row.sb_qb).toFixed(2)+'%'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="同类平均"
              align="center">
              <template scope="scope">
                <span :class="parseInt(scope.row.sb_tj) > 0 ? 'letter-red' : 'letter-green'">{{scope.row.sb_tj==null?"--":Number(scope.row.sb_tj).toFixed(2)+'%'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="沪深300"
              align="center">
              <template scope="scope">
                <span :class="parseInt(scope.row.sb_hs) > 0 ? 'letter-red' : 'letter-green'">{{scope.row.sb_hs==null?"--":Number(scope.row.sb_hs).toFixed(2)+'%'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="同类排名">
              <template scope="scope">
                {{scope.row.sb_tm==null?"--":scope.row.sb_tm}}
              </template>
            </el-table-column>
            <el-table-column
              label="四分位排名"
              align="center">
              <template scope="scope">
                <template v-if="scope.row.sb_sm=='1'">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_15.png">
                  <span>优秀</span>
                </template>
                <template v-else-if="scope.row.sb_sm=='2'">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_17.png">
                  <span>良好</span>
                </template>
                <template v-else-if="scope.row.sb_sm=='3'">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_19.png">
                  <span>一般</span>
                </template>
                <template v-else-if="scope.row.sb_sm=='4'">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_21.png">
                  <span>不佳</span>
                </template>
                <template v-else>                
                  <span>--</span>
                </template>
              </template>
            </el-table-column>
          </el-table>

          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>年度涨幅</p>
          </div>

          <el-table
            size="medium"
            :data="increaseinfo.ndlist==null?notableData:increaseinfo.ndlist"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table23"
            >
            <el-table-column
              align="center"
              prop="title"
              label="">
            </el-table-column>
            <el-table-column
              align="center"
              label="区间回报">
              <template scope="scope">
                <span :class="parseInt(scope.row.sb_qb) > 0 ? 'letter-red' : 'letter-green'">{{scope.row.sb_qb==null?"--":Number(scope.row.sb_qb).toFixed(2)+'%'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="同类平均"
              align="center">
              <template scope="scope">
                <span :class="parseInt(scope.row.sb_tj) > 0 ? 'letter-red' : 'letter-green'">{{scope.row.sb_tj==null?"--":Number(scope.row.sb_tj).toFixed(2)+'%'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="沪深300"
              align="center">
              <template scope="scope">
                <span :class="parseInt(scope.row.sb_hs) > 0 ? 'letter-red' : 'letter-green'">{{scope.row.sb_hs==null?"--":Number(scope.row.sb_hs).toFixed(2)+'%'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="同类排名">
              <template scope="scope">
                {{scope.row.sb_tm==null?"--":scope.row.sb_tm}}
              </template>
            </el-table-column>
            <el-table-column
              label="四分位排名"
              align="center">
              <template scope="scope">
                <template v-if="scope.row.sb_sm=='1'">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_15.png">
                  <span>优秀</span>
                </template>
                <template v-else-if="scope.row.sb_sm=='2'">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_17.png">
                  <span>良好</span>
                </template>
                <template v-else-if="scope.row.sb_sm=='3'">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_19.png">
                  <span>一般</span>
                </template>
                <template v-else-if="scope.row.sb_sm=='4'">
                  <img style="margin-right:10px; vertical-align:-11px;" src="@/assets/img/details_indexImg_21.png">
                  <span>不佳</span>
                </template>
                <template v-else>                
                  <span>--</span>
                </template>
              </template>
            </el-table-column>
          </el-table>
            </div>
        </el-tab-pane>


        <!-- 分红送配 -->
        <el-tab-pane label="分红配送" class="shop-details-tabs" name="shareData">
          <div v-loading="loading_divend">
          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>分红统计</p>
          </div>

          <el-table
            size="medium"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            :data ="divendinfo.dividend_page.dividend_page==null?notableData:divendinfo.dividend_page.dividend_page"
            key="table24"
            >
            <el-table-column
              align="center"
              prop="dd_cumulative"
              label="累计分红">
            </el-table-column>            
            <el-table-column
              align="center"
              prop="dd_count"
              label="分红次数">
            </el-table-column>
            <el-table-column
              label="最近分红时间"
              prop="dd_new_date"
              align="center">
            </el-table-column>
          </el-table>

          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>分红详情</p>
          </div>

          <el-table
            size="medium"
            :data="divendinfo.dividend_page.dd_dividends==null?notableData:divendinfo.dividend_page.dd_dividends"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table25"
            >
            <el-table-column
              align="center"
              prop="ann_date"
              label="公告日期">
            </el-table-column>
            <el-table-column
              align="center"
              prop="eqy_record_dt"
              label="权益登记日">
            </el-table-column>
            <el-table-column
              prop="f_div_edexdate"
              label="除息日"
              align="center">
            </el-table-column>
            <el-table-column
              align="center"
              prop="cash_dvd_per_sh_tax"
              label="每份分红(元)">
            </el-table-column>
            <el-table-column
              prop="f_div_paydate"
              label="分红发放日"
              align="center">
            </el-table-column>
          </el-table>

          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>拆分详情</p>
          </div>

          <el-table
            size="medium"
            :data="divendinfo.cmf_dataList==null?notableData:divendinfo.cmf_dataList"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table26"
            >
            <el-table-column
              align="center"
              prop="f_info_splitanndate"
              label="公告日期">
            </el-table-column>
            <el-table-column
              align="center"
              prop="f_info_sharetransdate"
              label="拆分折算日">
            </el-table-column>
            <el-table-column
              prop="f_info_splitinc"
              label="拆分比例"
              align="center">
            </el-table-column>
            <el-table-column
              align="center"
              label="拆分前净值(元)">
              --
            </el-table-column>
            <el-table-column
              label="拆分后净值(元)"
              align="center">
              --
            </el-table-column>
          </el-table>

          <div class="shop-details-bottom-bar"></div>

          <div class="shop-details-word">
            <p><i class="el-icon-caret-right"></i>分红公告</p>
          </div>

          <el-table
            size="medium"
            :data="divendinfo.dividend_dataList==null?notableData:divendinfo.dividend_dataList"
            border
            @row-click="openDiviendReport"
				  	:row-style="{cursor:'pointer'}"
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table27"
            >
            <el-table-column
              prop="title"
              label="标题">
            </el-table-column>
            <el-table-column
              align="center"
              prop="date"
              width="150px"
              label="日期">
            </el-table-column>
          </el-table>
          </div>

        </el-tab-pane>


        <!-- 基金公告 -->
        <el-tab-pane label="最新公告" class="shop-details-tabs" name="reportData">
          <div v-loading="loading_report">
          <el-radio-group v-model="radio3" size="small" @change="selectReportType" style="margin-bottom:20px;" key="radiogroup1">
            <el-radio-button 
            :label="item" 
            border 
            v-for="(item,key) in dataType3"
            :key="key">
            {{item.value}}
            </el-radio-button>
          </el-radio-group>

          <el-table
            size="medium"
            :data="reportinfo.noticeList==null?notableData:reportinfo.noticeList"
            border
            @row-click="openDiviendReport"
				  	:row-style="{cursor:'pointer'}"
            style="width: 100%; text-align:center; margin-top:20px;"
            key="table28"
            >
            <el-table-column
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
            key="pagination3"
            style="text-align: center; margin-top:20px;"
            background
            layout="prev, pager, next"
            @current-change="handleRepotCurrentChange"
            :page-size="10"
            :total="parseInt(reportinfo.total)">
          </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>


  </div>
</template>

<script>
import HighCharts from "highcharts";

export default {
  name: 'FundDetails',
  data(){
	  return {
      activeName:'baseData',
      loading_base:true,
      loading_nav:true,
      loading_report:true,
      loading_increase:true,
      loading_divend:true,
      loading_mincome:true,
      loading_comp:true,
      loading_manager:true,
      loading_asset:true,
      loading_bond:true,
      loading_stock:true,
      loading_own:true,
      loading_scale:true,
      loading_income:true,
      routeKey:'',
      input:'',
      tabPosition: 'left',
      fundinfo:{fundbaseinfo:{publicFundInfo:{},compInfo:{},transaction_status:{},managerBaseInfo:{},mfIncome:{}},rateMap:{}},
      beformanagerinfo:[],
      compinfo:{fundbaseinfo:{compInfo:{}}},
      comparray:[],
      mfundfee:[],
      assetalloinfo:{assetData:[]},
      bondalloinfo:{bondData:[]},
      fundindinfo:{fundIndList:[]},
      stockinfo:{fundbaseinfo:{fundStockList:{ness_list:[]}}},
      mstockinfo:{tabledata:[],season_str:''},
      scaleinfo:{assetarray:[{}],scalearray:[{}]},
      nochartData : '<div style="background-color: #faf4e4; padding: 10px; font-size: 12px; margin-bottom: 20px;">暂无数据</div>',
      notableData:[],
      ownerinfo:{titleData:[],tableData:[]},
      radio1:{value:'近1月',code:'1m'},
      navDateValue:[],
      navLineinfo:[],
      dataType1:[{value:'近1月',code:'1m'},{value:'近3月',code:'3m'},{value:'近6月',code:'6m'},{value:'近1年',code:'1y'},{value:'今年以来',code:'ty'}],
      navinfo:{CurrentPage:'1',navlist:[],total:0,pagesize:0},
      radio2:{value:'近1月',code:'1m'},
      dataType2:[{value:'近1月',code:'1m'},{value:'近3月',code:'3m'},{value:'近6月',code:'6m'},{value:'近1年',code:'1y'}],
      mfnavinfo:[],
      mfnavlineinfo:[],
      increaseinfo:{qjlist:[],jdlist:[],ndlist:[]},
      divendinfo:{dividend_page:{dividend_page:[],dd_dividends:[]},cmf_dataList:[],dividend_dataList:[]},
      radio3:{value:'全部',code:'0'},
      dataType3:[{value:'全部',code:'0'},{value:'定期公告',code:'2'},{value:'合同相关',code:'1'},{value:'其他',code:'3'}],
      reportinfo:{total:0, noticeList:[], CurrentPage:1},
      radio4:{value:'7日年化收益走势图',code:'2'},
      dataType4:[{value:'7日年化收益走势图',code:'2'},{value:'万份收益走势图',code:'1'},{value:'排名走势图',code:'3'}],
      radio5:{value:'近1月',code:'1m',ctype:'month',between:-1},
      dataType5:[{value:'近1月',code:'1m',ctype:'month',between:-1},{value:'近3月',code:'3m',ctype:'month',between:-3},{value:'近6月',code:'6m',ctype:'month',between:-6},{value:'近1年',code:'1y',ctype:'year',between:-1},{value:'今年以来',code:'ty',ctype:'',between:0},{value:'自成立以来',code:'sf',ctype:'',between:0}],
      mfundincomeinfo:{total:0,pagesize:0,CurrentPage:1,dateValue:[],mfundperformace:[]},
      mFundIncomeList:[],
      mfLine:[],

      id1:'assetsPie',
      id2:'industryPie',
      id3:'heavyPie',
      id4:'assetsLine',
      id5:'shareColumn',
      id6:'handColumn',
      id7:'historyLine',
      id8:'fundLine',
      id9:'mincomeLine',
      option1:{credits:{
              enabled: false // 禁用版权信息
          },
          colors: ['#fc5b4d', '#fc8f37', '#f9c160', '#f8d68d','#56b1fe', '#0095d9', '#3e62ae', '#674599', '#b62b8f', '#fe6bac', ],
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: ''
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            }
          },
          series: [{
            name: '占比',
            colorByPoint: true,
            data: []
          }]},
      option2:{credits:{
              enabled: false // 禁用版权信息
          },
          colors: ['#fc5b4d', '#fc8f37', '#f9c160', '#f8d68d','#56b1fe', '#0095d9', '#3e62ae', '#674599', '#b62b8f', '#fe6bac', ],
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: ''
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            }
          },
          series: [{
            name: '占比',
            colorByPoint: true,
            data: []
          }]},
      option3:{credits:{
              enabled: false // 禁用版权信息
          },
          colors: ['#fc5b4d', '#fc8f37', '#f9c160', '#f8d68d','#56b1fe', '#0095d9', '#3e62ae', '#674599', '#b62b8f', '#fe6bac', ],
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: ''
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            }
          },
          series: [{
            name: '占比',
            colorByPoint: true,
            data: []
          }]},
      option4:{chart: {
            type: 'line'
          },
          colors: ['#fc5b4d', '#fc8f37', '#f9c160', '#f8d68d','#56b1fe', '#0095d9', '#3e62ae', '#674599', '#b62b8f', '#fe6bac', ],
          credits:{
              enabled: false // 禁用版权信息
          },
          title: {
            text: ''
          },
          subtitle: {
            text: '',
          },
          xAxis:{categories:[]},
          yAxis: {
            title: {
                text: ''
            },
            gridLineColor: '#eee',
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
          },
          tooltip: {
              valueSuffix: ''
          },
          legend: {
          },
          series: []},
      option5:{credits:{
              enabled: false // 禁用版权信息
          },
          colors: ['#fc5b4d', '#fc8f37', '#f9c160', '#f8d68d','#56b1fe', '#0095d9', '#3e62ae', '#674599', '#b62b8f', '#fe6bac', ],
          chart: {
            type: 'column'
          },
          title: {
            text: ''
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            categories: [],
            crosshair: true
          },
          yAxis: {
            title: {
              text: ''
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              borderWidth: 0
            }
          },
          series: []},
      option6:{credits:{
              enabled: false // 禁用版权信息
          },
          colors: ['#fc5b4d', '#fc8f37', '#f9c160', '#f8d68d','#56b1fe', '#0095d9', '#3e62ae', '#674599', '#b62b8f', '#fe6bac', ],
          chart: {
            type: 'column'
          },
          title: {
            text: ''
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            categories: [],
            crosshair: true
          },
          yAxis: {
            title: {
              text: ''
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              borderWidth: 0
            }
          },
          series: []},
      option7: {
          credits:{
              enabled: false // 禁用版权信息
          },
          colors: ['#fc5b4d', '#fc8f37', '#f9c160', '#f8d68d','#56b1fe', '#0095d9', '#3e62ae', '#674599', '#b62b8f', '#fe6bac', ],
          title: {
            text: ''
          },
          subtitle: {
            text: ''
          },
          xAxis : {
            gridLineColor: 'eee',
                lineColor: '#eee',
                  lineWidth: 1,
                  gridLineWidth: 1,
                  categories:null,
            type : 'datetime', // 定义x轴上日期的显示格式
            labels : {
              formatter : function() {
                var vDate = new Date(this.value);
                return vDate.getFullYear() + "."
                    + (vDate.getMonth() + 1) + "."
                    + vDate.getDate();
              },
              align : 'center'
              
            }
          },
          yAxis: {
            title: {
              text: '单位(元)'
            }
          },
          legend: {
          },
          series: [
          ],
          tooltip : {
            xDateFormat : '%Y-%m-%d',// 鼠标移动到趋势线上时显示的日期格式
            shared : true
				
    },
      plotOptions: {
            series: {
            	marker: {
            		enabled: false
            	}
            }
        },
          responsive: {
            rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }]
          }
      },
      
      option8: {
          credits:{
              enabled: false // 禁用版权信息
          },
          colors: ['#fc5b4d', '#fc8f37', '#f9c160', '#f8d68d','#56b1fe', '#0095d9', '#3e62ae', '#674599', '#b62b8f', '#fe6bac', ],
          title: {
            text: ''
          },
          subtitle: {
            text: ''
          },
          xAxis : {
            gridLineColor: 'eee',
                lineColor: '#eee',
                  lineWidth: 1,
                  gridLineWidth: 1,
                  categories:null,
            type : 'datetime', // 定义x轴上日期的显示格式
            labels : {
              formatter : function() {
                var vDate = new Date(this.value);
                return vDate.getFullYear() + "."
                    + (vDate.getMonth() + 1) + "."
                    + vDate.getDate();
              },
              align : 'center'
              
            }
          },
          yAxis: {
            title: {
              text: '单位(元)'
            }
          },
          legend: {
          },
          series: [
          ],
          tooltip : {
            xDateFormat : '%Y-%m-%d',// 鼠标移动到趋势线上时显示的日期格式
            shared : true
				
    },
      plotOptions: {
            series: {
            	marker: {
            		enabled: false
            	}
            }
        },
          responsive: {
            rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }]
          }
      },
      option9: {
          credits:{
              enabled: false // 禁用版权信息
          },
          colors: ['#fc5b4d', '#fc8f37', '#f9c160', '#f8d68d','#56b1fe', '#0095d9', '#3e62ae', '#674599', '#b62b8f', '#fe6bac', ],
          title: {
            text: ''
          },
          subtitle: {
            text: ''
          },
          xAxis : {
            gridLineColor: 'eee',
                lineColor: '#eee',
                  lineWidth: 1,
                  gridLineWidth: 1,
                  categories:null,
            type : 'datetime', // 定义x轴上日期的显示格式
            labels : {
              formatter : function() {
                var vDate = new Date(this.value);
                return vDate.getFullYear() + "."
                    + (vDate.getMonth() + 1) + "."
                    + vDate.getDate();
              },
              align : 'center'
              
            }
          },
          yAxis: {
            title: {
              text: ''
            }
          },
          legend: {
          },
          series: [
          ],
          tooltip : {
            xDateFormat : '%Y-%m-%d',// 鼠标移动到趋势线上时显示的日期格式
            shared : true
				
    },
      plotOptions: {
            series: {
            	marker: {
            		enabled: false
            	}
            }
        },
          responsive: {
            rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }]
          }
      },
      
	  }
  },
  methods:{
  
     
    baseData(){
       this.$httpPost("/pc/publicFundDetail/baseData",{code:this.$route.query.fundcode}
      ).then(res=>{
         this.loading_base=false;
         if(res){
           this.fundinfo = res;
           if(res.fundbaseinfo.publicFundInfo==null){
             this.fundinfo.fundbaseinfo.publicFundInfo = {};
           }
           if(res.fundbaseinfo.compInfo==null){
             this.fundinfo.fundbaseinfo.compInfo = {};
           }
           if(res.fundbaseinfo.transaction_status==null){
             this.fundinfo.fundbaseinfo.transaction_status = {};
           }
           if(res.fundbaseinfo.managerBaseInfo==null){
             this.fundinfo.fundbaseinfo.managerBaseInfo = {};
           }
           if(res.rateMap==null){
             this.fundinfo.rateMap = res.rateMap;
           }
           if(res.fundbaseinfo.mfIncome==null){
             this.fundinfo.fundbaseinfo.mfIncome = res.fundbaseinfo.mfIncome;
           }
           if(this.$route.query.fundtype=='2' || this.$route.query.fundtype=='9'){
             if(res.fundbaseinfo!=null){
                if(res.fundbaseinfo.managementfeeratio!=null){
                  this.mfundfee.push( {feetitle:'基金管理费',feeratio:res.fundbaseinfo.managementfeeratio});
                }else{
                  this.mfundfee.push({feetitle:'基金管理费',feeratio:'--'});
                }
                if(res.fundbaseinfo.custodianfeeratio!=null){
                  this.mfundfee.push(  {feetitle:'基金托管费',feeratio:res.fundbaseinfo.custodianfeeratio});
                }else{
                  this.mfundfee.push( {feetitle:'基金托管费',feeratio:'--'});
                }
                if(res.fundbaseinfo.sales_service_fee!=null){
                  this.mfundfee.push( {feetitle:'销售服务费',feeratio:Number(res.fundbaseinfo.sales_service_fee).toFixed(2)+'%'});
                }else{
                  this.mfundfee.push({feetitle:'销售服务费',feeratio:'--'});
                }
             }else{
                this.mfundfee.push( {feetitle:'基金管理费',feeratio:"--"});
                this.mfundfee.push({feetitle:'基金托管费',feeratio:"--"});
                this.mfundfee.push({feetitle:'销售服务费',feeratio:"--"});
             }
             
             this.mfundfee.push({feetitle:'认购费率',feeratio:'0.00%'});
             this.mfundfee.push( {feetitle:'申购费率',feeratio:'0.00%'});
             this.mfundfee.push( {feetitle:'赎回费率',feeratio:'0.00%'});
           }
                     
         }
       })
    },

    compData(){
      this.$httpPost("/pc/publicFundDetail/compData",{code:this.$route.query.fundcode}).then(res=>{
        this.loading_comp = false;
         if(res){
           this.compinfo = res;
           this.comparray = [];
           this.comparray.push(res);
           if(res.fundbaseinfo==null){
             this.compinfo.fundbaseinfo={compInfo:{}};
           }else{
             if(res.fundbaseinfo.compInfo==null){
               this.compinfo.fundbaseinfo.compInfo = {};
             }
           }
           
         }
       })
    },
    beforeManager(){
      this.$httpPost("/pc/publicFundDetail/beforeManager",{code:this.$route.query.fundcode}).then(res=>{
        this.loading_manager = false;
         if(res){
           if(res.before_list!=null){
             this.beformanagerinfo=res.before_list;
           }          
         }
       })
    },

    assetData(){
      this.$httpPost("/pc/publicFundDetail/assetData",{code:this.$route.query.fundcode}).then(res=>{
        this.loading_asset = false;
         if(res){
           if(res.assetAllo!=null){
              this.assetalloinfo = res.assetAllo;
              if(res.assetAllo.assetCharts!=null && res.assetAllo.assetCharts.length>0){
                this.$nextTick(()=>{
                  this.option1.series[0].data=res.assetAllo.assetCharts
                  HighCharts.chart(this.id1, this.option1);
                })
              }
              if(res.assetAllo.assetData==null){
                this.assetalloinfo.assetData=new Array();
              }

           }        
         }
       })
      
    },

    bondData(){
      this.$httpPost("/pc/publicFundDetail/bondData",{code:this.$route.query.fundcode}).then(res=>{
        this.loading_bond = false;
         if(res){
           if(res.bondAllo!=null){
              this.bondalloinfo = res.bondAllo;
              if(res.bondAllo.bondCharts!=null && res.bondAllo.bondCharts.length>0){
                this.$nextTick(()=>{
                  this.option2.series[0].data=res.bondAllo.bondCharts
                  this.option2.title.text='债券配置';
                  HighCharts.chart(this.id2, this.option2);
                });
                
             }
             if(res.bondAllo.bondData==null){
               this.bondalloinfo.bondData = new Array();
             }
           }         
         }
       })
    },

    indData(){
      this.$httpPost("/pc/publicFundDetail/indData",{code:this.$route.query.fundcode}).then(res=>{
        this.loading_bond = false;
         if(res){
           this.fundindinfo = res;
           if(res.fundIndPieList!=null && res.fundIndPieList.length>0){
             this.$nextTick(()=>{
                this.option2.series[0].data=res.fundIndPieList;
                this.option2.title.text='行业配置';
                HighCharts.chart(this.id2, this.option2);
             });
           }    
              
             if(res.fundIndList==null){
               this.fundindinfo.fundIndList = new Array();
             }
           }         
       })
    },

    stockData(){
      this.$httpPost("/pc/publicFundDetail/getSharesChange",{code:this.$route.query.fundcode}).then(res=>{
        this.loading_stock = false;
         if(res){
           this.stockinfo = res;
           if(res.fundbaseinfo==null){
             this.stockinfo.fundbaseinfo = {fundStockList:{ness_list:[]}};
           }else{
             if(res.fundbaseinfo.fundStockList==null){
                this.stockinfo.fundbaseinfo.fundStockList = {ness_list:[]};
              }else{
                if(res.fundbaseinfo.fundStockList.ness_list==null){
                  this.stockinfo.fundbaseinfo.fundStockList.ness_list = [];
                }
              }
            
           }

           if(res.ness_list_Array!=null && res.ness_list_Array.length>0){
            if(this.$route.query.fundetype=='1' || this.$route.query.fundetype=='2' || this.$route.query.fundetype=='9'){            
                this.option3.title.text='重仓持债';
              }else{
                this.option3.title.text='重仓持股';
              }
              this.$nextTick(()=>{
                this.option3.series[0].data = res.ness_list_Array;
                HighCharts.chart(this.id3, this.option3);
              });
          }
        }
           
       })
    },

    mStockData(){
      this.$httpPost('/pc/publicFundDetail/getMoneySharesChange',{windcode:this.$route.query.fundcode}).then(res=>{
        this.loading_stock = false;
        if(res){
          this.mstockinfo.season_str = res.season_str;
          if(res.hisProfitLst!=null && res.hisProfitLst.length>0){
              var pieData = new Array();
              res.hisProfitLst.forEach(element => {
                pieData.push({'name':element[0],'y':Number(element[1])});
                this.mstockinfo.tabledata.push({name:element[0],ratio:element[1],total:element[2]});
            });
            this.$nextTick(()=>{
              this.option3.title.text='重仓持债';
              this.option3.series[0].data = pieData;
              HighCharts.chart(this.id3, this.option3);
            });
          }
        }
      })
    },

    scaleData(){
      this.$httpPost("/pc/publicFundDetail/scale",{windcode:this.$route.query.fundcode}).then(res=>{
        this.loading_scale = false;
         if(res && res.gmbd!=null){ 
           var arrScale = new Array();
           if(res.gmbd.dataNetasset!=null){
              arrScale=res.gmbd.dataNetasset.replace("[","").replace("]","").split(',');
           }                  
           var arrDate=new Array();
           if(res.gmbd.date!=null){
             arrDate=res.gmbd.date.replace('["',"").replace('"]',"").split('", "');
           }
           var arrDate2=new Array();
           if(res.gmbd.unitDate!=null){
             arrDate2=res.gmbd.unitDate.replace('["',"").replace('"]',"").split('", "');
           }
           var arrPurchase = new Array();
           if(res.gmbd.dataPurchase!=null){
             arrPurchase = res.gmbd.dataPurchase.replace("[","").replace("]","").split(',');
           }
           var arrRedemption = new Array();
           if(res.gmbd.dataRedemption!=null){
             arrRedemption = res.gmbd.dataRedemption.replace("[","").replace("]","").split(',');
           }
           var arrEndshares = new Array();
           if(res.gmbd.dataEndshares!=null){
             arrEndshares = res.gmbd.dataEndshares.replace("[","").replace("]","").split(',');
           }
           var assetarray = new Array();
           var arrDate_last_index = arrDate.length-1;
            if(arrDate.length > 0){
              for(var i=arrDate_last_index ; i >= 0 ; i--){                  
                if(i == 0){
                  var asset = {arrDate:arrDate[i],arrScale:arrScale[i],arrScalePer:'0.00'};
                  assetarray[arrDate.length-i-1] = (asset);
                }else{
                  var asset = {arrDate:arrDate[i],arrScale:arrScale[i],arrScalePer:((arrScale[i]-arrScale[i-1])/arrScale[i-1] * 100).toFixed(2)};
                  assetarray[arrDate.length-i-1] = (asset);
                }               
              }
            }
           this.scaleinfo.assetarray = assetarray;
           if(arrScale!=null && arrScale.length>0){
            
            var lineData = new Array();
            for(var i=0;i<arrScale.length;i++){
              lineData[i] = Number(arrScale[i].replace(" ",""));

            }
            this.option4.xAxis.categories=arrDate;
            this.option4.yAxis.title.text = '净资产(亿元)';
            this.option4.tooltip.valueSuffix='亿元';
            this.$nextTick(()=>{
              this.option4.series[0] = {data:lineData,name:'净资产'};
              HighCharts.chart(this.id4, this.option4);
            });
           }

           var arrDate2_last_index = arrDate2.length;
           var scalearray = new Array();
           var arrPurchase_1 = new Array();
           var arrEndshares_1 = new Array();
           var arrRedemption_1 = new Array();
           var arrDate2_1 = new Array();
           if(arrDate2.length>0){
            for(var i = arrDate2_last_index-1 ; i > -1;i--){
                if(i == 0){                
                  scalearray[arrDate2.length - i - 1] = {arrDate:arrDate2[i],arrPurchase:arrPurchase[i],arrEndshares:arrEndshares[i],arrRedemption:arrRedemption[i],sharePer:'0.00'};                 
                }else{
                  scalearray[arrDate2.length - i - 1] = {arrDate:arrDate2[i],arrPurchase:arrPurchase[i],arrEndshares:arrEndshares[i],arrRedemption:arrRedemption[i],sharePer:((arrEndshares[i]-arrEndshares[i-1])/arrEndshares[i-1]).toFixed(2)};
                }
                arrDate2_1[i] = arrDate2[i];
                arrPurchase_1[i] = Number(arrPurchase[i]);
                arrEndshares_1[i] = Number(arrEndshares[i]);
                arrRedemption_1[i] = Number(arrRedemption[i]);
            }
           }
           this.scaleinfo.scalearray = scalearray;
           
           if(scalearray!=null && scalearray.length>0){
             this.$nextTick(()=>{
              this.option5.xAxis.categories=arrDate2_1;
              this.option5.yAxis.title.text = '份额(亿份)';
              this.option5.tooltip.pointFormat='<tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y:.2f} 亿份</b></td></tr>';
              this.option5.series = [{data:arrPurchase_1,name:'期间申购(亿份)'},{data:arrRedemption_1,name:'期间赎回(亿份)'},{data:arrEndshares_1,name:'期末总份额(亿份)'}];
              HighCharts.chart(this.id5, this.option5);
             });
           }
         }
       })
    },

    ownData(){
      this.$httpPost('/pc/publicFundDetail/owner',{windcode:this.$route.query.fundcode}).then(res=>{
        this.loading_own = false;
        if(res){
          var arrTitle = new Array();
          if(res.cyrjg.dataTitle!=null)
            arrTitle = res.cyrjg.dataTitle.replace("[","").replace("]","").split(",");
          var arrDataTotal = new Array();
          if(res.cyrjg.dataTotal!=null)
            arrDataTotal = res.cyrjg.dataTotal.replace("[","").replace("]","").split(',');
          var arrDate = new Array();
          if(res.cyrjg.date!=null)
            arrDate = res.cyrjg.date.replace('["',"").replace('"]',"").split('", "');
          var arrDataIper = new Array();
          if(res.cyrjg.dataInstitutionper!=null)
            arrDataIper = res.cyrjg.dataInstitutionper.replace("[","").replace("]","").split(',');
          var arrDataPper = new Array();
          if(res.cyrjg.dataPersonalper!=null)
            arrDataPper = res.cyrjg.dataPersonalper.replace("[","").replace("]","").split(',');
          var tableData_owner = new Array();
          var columnData_date = new Array();
          var columnData_Iper = new Array();         
          var columnData_Pper = new Array();
          for(var i=arrDate.length-1;i>=0;i--){
              tableData_owner[arrDate.length-1-i] = {owner_date:arrDate[i],owner_Iper:arrDataIper[i],owner_Pper:arrDataPper[i],owner_Total:arrDataTotal[i]};
              columnData_date[i] = arrDate[i];
              if(arrDataIper[i]!=null)
                columnData_Iper[i] = Number(arrDataIper[i].replace(" ",""));
              if(arrDataPper[i]!=null)
                columnData_Pper[i] = Number(arrDataPper[i].replace(" ",""));
          }
          
          this.ownerinfo.titleData = arrTitle;
          this.ownerinfo.tableData = tableData_owner;
          
          if(tableData_owner.length>0){
            this.$nextTick(()=>{
              this.option6.xAxis.categories=columnData_date;
              this.option6.tooltip.pointFormat='<tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y:.2f} %</b></td></tr>';
              this.option6.series = [{data:columnData_Pper,name:'个人持有比例'},{data:columnData_Iper,name:'机构持有比例'}];
              HighCharts.chart(this.id6, this.option6);
            });
          }
        }
      })  
      },

      selectNavDate(){
        this.navinfo.CurrentPage = 1;
        this.getNavData();
      },

    handleNavCurrentChange(val) {
        this.navinfo.CurrentPage = val;
        this.getNavData();

    },

    getNavData(){
        var beginDate = '2016-01-01';
        var endDate = '';
        if(this.navDateValue!=null && this.navDateValue.length>0){
          beginDate = this.navDateValue[0];
          endDate = this.navDateValue[1];
        }
        this.$httpPost('/pc/publicFundDetail/getPublicFundNav',
             {windcode:this.$route.query.fundcode,PageIndex:this.navinfo.CurrentPage+"",beginDate:beginDate,endDate:endDate})
             .then(res=>{
               this.loading_nav = false;
          this.navinfo.navlist = res.list;
          this.navinfo.pagesize = res.limit;
          this.navinfo.total = Number(res.total);
        })
      },

      initNavLineData(){
        this.getNavLineData(this.radio1.code);
      },

      selectNavLineDate(item){
        this.getNavLineData(item.code);
      },


      getNavLineData(timeInterval){
        this.$httpPost('/pc/publicFundDetail/publicfundlinedata',{timeInterval:timeInterval,windcode:this.$route.query.fundcode,type:'nav'}).then(res=>{
          if(res){
            var seriesOptions = [];
            if(res.line_unit_data!=null && res.line_accumulated_data!=null && res.line_unit_data.length>0){
              this.navLineinfo = res.line_unit_data;
              this.$nextTick(()=>{
                seriesOptions[0] = {
                              name: res.line_unit_name,
                              data: res.line_unit_data,
                              tooltip : {valueDecimals : 4}
                          };	
                seriesOptions[1] = {
                            name: res.line_accumulated_name,
                            data: res.line_accumulated_data,
                            tooltip : {valueDecimals : 4}
                        };
                this.option7.series = seriesOptions;
                HighCharts.chart(this.id7, this.option7);
              });
              
            }
            
          }
          
        })
      },

      selectMFNavLineDate(item){
        this.getMFNavLineData(item.code);
      },

      getMFNavLineData(timeInterval){
        this.$httpPost('/pc/publicFundDetail/publicfundlinedata',{timeInterval:timeInterval,windcode:this.$route.query.fundcode,type:'mfnav'}).then(res=>{
          this.loading_income = false;
          if(res){
            var seriesOptions = [];
            this.mfnavinfo = new Array();
            if(res.rightdata!=null){
              this.mfnavinfo.push(res.rightdata);
            }
            if(res.line_unit_data!=null && res.line_300_data!=null && res.line_tl_data!=null && res.line_unit_data.length>0){
              this.mfnavlineinfo = res.line_unit_data;
              seriesOptions[0] = {
                          name: res.line_unit_name,
                          data: res.line_unit_data,
                          tooltip : {valueDecimals : 2,valueSuffix: '%'}
                      };
              seriesOptions[1] = {
                          name: res.line_300_name,
                          data: res.line_300_data,
                          tooltip : {valueDecimals : 2,valueSuffix: '%'}
                      };
              
              seriesOptions[2] = {
                          name: res.line_tl_name,
                          data: res.line_tl_data,
                          tooltip : {valueDecimals : 2,valueSuffix: '%'}
                      };
                
              this.$nextTick(()=>{
                this.option8.series = seriesOptions;
                HighCharts.chart(this.id8, this.option8);
              });
            }
            
          }
          
        })
      },

      initMFNavLineData(){
        this.getMFNavLineData(this.radio2.code);
      },


      //货币基金收益走势
      mfDetail(){
       
        this.$httpPost('/pc/publicFundDetail/increase',{windcode:this.$route.query.fundcode}).then(res=>{
          if(res){
            this.increaseinfo.qjlist = res.qjzf;
          }
          
        })
        setTimeout(()=>{
          this.$httpPost('/pc/publicFundDetail/getQuarterMFPerformanceHtmlNew',{windcode:this.$route.query.fundcode}).then(res=>{
            if(res){
              this.increaseinfo.jdlist = res;
            }
            
          })
       },200);
        
        setTimeout(()=>{
           this.$httpPost('/pc/publicFundDetail/getYearMFPerformanceHtmlNew',{windcode:this.$route.query.fundcode}).then(res=>{
            this.loading_increase = false;
            if(res){
              this.increaseinfo.ndlist = res;
            }
            
          })
       },400);
       
      },

      divendData(){
        this.$httpPost('/pc/publicFundDetail/getDividendData',{windcode:this.$route.query.fundcode}).then(res=>{
          this.loading_divend = false;
          if(res){
            if(res.dividend_page!=null){             
              this.divendinfo.dividend_page.dividend_page.push({'dd_cumulative':res.dividend_page.dd_cumulative==null?'--':Number(res.dividend_page.dd_cumulative).toFixed(2),'dd_count':res.dividend_page.dd_count,'dd_new_date':res.dividend_page.dd_new_date});
            }
            if(res.dividend_page.dd_dividends!=null){
              this.divendinfo.dividend_page.dd_dividends = res.dividend_page.dd_dividends;
            }
            if(res.cmf_dataList!=null){
              this.divendinfo.cmf_dataList = res.cmf_dataList;
            }
            if(res.dividend_dataList!=null){
              this.divendinfo.dividend_dataList = res.dividend_dataList;
            }
          }
          
        })
      },

      initReport(){
        this.getReportList(1);
      },

      getReportList(pageIndex){
        var typeCode = this.radio3.code;
        this.$httpPost('/pc/publicCompanyDetail/getPublicFundNotice',{pageIndex: pageIndex+"",fund_id:this.$route.query.fundcode,notice_type:typeCode,limit:10+""}).then(res=>{
          this.loading_report = false;
          if(res){
            if(res.noticeList!=null){
              this.reportinfo.noticeList = res.noticeList;
              this.reportinfo.total = res.listCount;
            }
          }
        });
      },

      selectReportType(){
        this.getReportList(1);
      },

      handleRepotCurrentChange(val){
        this.reportinfo.CurrentPage = val;
        this.getReportList(val);
      },

    openDiviendReport(row, column, event){
      this.$router.push({
        path: '../fundAnno', 
        query: { 
          newsId: row.object_id
        }
      });
    },

    getMFundIncomeLineData(){
      // this.mfLine=new Array();
      if(this.radio4.code=='1'){
        this.$httpPost('/pc/publicFundDetail/getData4Unityield',{windcode:this.$route.query.fundcode,flag:this.radio5.code,ctype:this.radio5.ctype,between:this.radio5.between})
            .then(res=>{
                if(res){
                  if(res.length>0){
                    this.mfLine = res;
                      var seriesOptions = [];
                      seriesOptions[0] = {
                                    name: '万份收益',
                                    data: res,
                                    tooltip : {valueDecimals : 4,valueSuffix: '元'}
                                };
                        this.$nextTick(()=>{
                        this.option9.series = seriesOptions;
                        HighCharts.chart(this.id9, this.option9);
                      })
                  }
                  
                }
            });
      }else if(this.radio4.code=='2'){
        this.$httpPost('/pc/publicFundDetail/getData4Yearlyroe',{windcode:this.$route.query.fundcode,flag:this.radio5.code,ctype:this.radio5.ctype,between:this.radio5.between})
            .then(res=>{
                if(res){
                  if(res.length>0){
                    this.mfLine = res;
                      var seriesOptions = [];
                      seriesOptions[0] = {
                                    name: '七日年化收益率',
                                    data: res,
                                    tooltip : {valueDecimals : 4,valueSuffix: '%'}
                                };
                        this.$nextTick(()=>{
                        this.option9.series = seriesOptions;
                        HighCharts.chart(this.id9, this.option9);
                      })
                  }
                }
            });
      }else{
        this.$httpPost('/pc/publicFundDetail/getData4RankingChart',{windcode:this.$route.query.fundcode,flag:this.radio5.code,ctype:this.radio5.ctype,between:this.radio5.between})
            .then(res=>{
                if(res){
                  if(res.length>0){
                    this.mfLine = res;
                      var seriesOptions = [];
                      seriesOptions[0] = {
                                    name: '排名率',
                                    data: res,
                                    tooltip : {valueDecimals : 4,valueSuffix: ''}
                                };
                        this.$nextTick(()=>{
                        this.option9.series = seriesOptions;
                        HighCharts.chart(this.id9, this.option9);
                      })
                  }
                }
            });
      }

      if(this.radio5.code=='1m'){
        if(this.mfundincomeinfo.m1!=null){
          var temp = this.mfundincomeinfo.m1[0].tlpm.split('/');
          this.mfundincomeinfo.mfundperformace = new Array();
          this.mfundincomeinfo.mfundperformace.push( {syl:this.mfundincomeinfo.m1[0].syl,tlpj:this.mfundincomeinfo.m1[0].tlpj,tlpm:this.mfundincomeinfo.m1[0].tlpm,sfw:Number(temp[0])/Number(temp[1])});
        }else{
          this.mfundincomeinfo.mfundperformace = new Array();
        }
      }else if(this.radio5.code=='3m'){
        if(this.mfundincomeinfo.m3!=null){
          var temp = this.mfundincomeinfo.m3[0].tlpm.split('/');
          this.mfundincomeinfo.mfundperformace = new Array();
          this.mfundincomeinfo.mfundperformace.push( {syl:this.mfundincomeinfo.m3[0].syl,tlpj:this.mfundincomeinfo.m3[0].tlpj,tlpm:this.mfundincomeinfo.m3[0].tlpm,sfw:Number(temp[0])/Number(temp[1])});
        }else{
          this.mfundincomeinfo.mfundperformace = new Array();
        }
      }else if(this.radio5.code=='6m'){
        if(this.mfundincomeinfo.m3!=null){
          var temp = this.mfundincomeinfo.m6[0].tlpm.split('/');
          this.mfundincomeinfo.mfundperformace = new Array();
          this.mfundincomeinfo.mfundperformace.push( {syl:this.mfundincomeinfo.m6[0].syl,tlpj:this.mfundincomeinfo.m6[0].tlpj,tlpm:this.mfundincomeinfo.m6[0].tlpm,sfw:Number(temp[0])/Number(temp[1])});
        }else{
          this.mfundincomeinfo.mfundperformace = new Array();
        }
      }else if(this.radio5.code=='1y'){
        if(this.mfundincomeinfo.y1!=null){
          var temp = this.mfundincomeinfo.y1[0].tlpm.split('/');
          this.mfundincomeinfo.mfundperformace = new Array();
          this.mfundincomeinfo.mfundperformace.push( {syl:this.mfundincomeinfo.y1[0].syl,tlpj:this.mfundincomeinfo.y1[0].tlpj,tlpm:this.mfundincomeinfo.y1[0].tlpm,sfw:Number(temp[0])/Number(temp[1])});
        }else{
          this.mfundincomeinfo.mfundperformace = new Array();
        }
      }else if(this.radio5.code=='3y'){
        if(this.mfundincomeinfo.y3!=null){
          var temp = this.mfundincomeinfo.y3[0].tlpm.split('/');
          this.mfundincomeinfo.mfundperformace = new Array();
          this.mfundincomeinfo.mfundperformace.push( {syl:this.mfundincomeinfo.y3[0].syl,tlpj:this.mfundincomeinfo.y3[0].tlpj,tlpm:this.mfundincomeinfo.y3[0].tlpm,sfw:Number(temp[0])/Number(temp[1])});
        }else{
          this.mfundincomeinfo.mfundperformace = new Array();
        }
      }else if(this.radio5.code=='ty'){
        if(this.mfundincomeinfo.ty!=null){
          var temp = this.mfundincomeinfo.ty[0].tlpm.split('/');
          this.mfundincomeinfo.mfundperformace = new Array();
          this.mfundincomeinfo.mfundperformace.push( {syl:this.mfundincomeinfo.ty[0].syl,tlpj:this.mfundincomeinfo.ty[0].tlpj,tlpm:this.mfundincomeinfo.ty[0].tlpm,sfw:Number(temp[0])/Number(temp[1])});
        }else{
          this.mfundincomeinfo.mfundperformace = new Array();
        }
      }else if(this.radio5.code=='sf'){
        if(this.mfundincomeinfo.sf!=null){
          var temp = this.mfundincomeinfo.sf[0].tlpm.split('/');
          this.mfundincomeinfo.mfundperformace = new Array();
          this.mfundincomeinfo.mfundperformace.push( {syl:this.mfundincomeinfo.sf[0].syl,tlpj:this.mfundincomeinfo.sf[0].tlpj,tlpm:this.mfundincomeinfo.sf[0].tlpm,sfw:Number(temp[0])/Number(temp[1])});
        }else{
          this.mfundincomeinfo.mfundperformace = new Array();
        }
      }
    },

    mFundperformaceData(){
      this.$httpPost('/pc/publicFundDetail/getData4Performance',{windcode:this.$route.query.fundcode}).then(res=>{
        if(res){
          this.mfundincomeinfo = res;
          if(res.m1!=null){
            var temp = res.m1[0].tlpm.split('/');
            this.mfundincomeinfo.mfundperformace = new Array();
            this.mfundincomeinfo.mfundperformace.push( {syl:res.m1[0].syl,tlpj:res.m1[0].tlpj,tlpm:res.m1[0].tlpm,sfw:Number(temp[0])/Number(temp[1])});
          }
        }
      })
    },

    selectMFundIncomeDate(){
        this.mfundincomeinfo.CurrentPage = 1;
        this.getMFundIncomeData();
      },

    handleMFundIncomeCurrentChange(val) {
        this.mfundincomeinfo.CurrentPage = val;
        this.getMFundIncomeData();

    },

    getMFundIncomeData(){
        var beginDate = '2016-01-01';
        var endDate = '';
        if(this.mfundincomeinfo.dateValue!=null && this.mfundincomeinfo.dateValue.length>0){
          beginDate = this.mfundincomeinfo.dateValue[0];
          endDate = this.mfundincomeinfo.dateValue[1];
        }
        this.$httpPost('/pc/publicFundDetail/lishishouyi',
             {windcode:this.$route.query.fundcode,pagenum:this.mfundincomeinfo.CurrentPage+"",begindate:beginDate,enddate:endDate})
             .then(res=>{
          this.loading_mincome = false;
          this.mFundIncomeList = res.dataList;
          this.mfundincomeinfo.pagesize = res.condition.pagesize;
          this.mfundincomeinfo.total = res.Listcount;
        })
      },
//tab点击事件
      tabClick(key){
        if(this.activeName=='compData'){
          this.compData();
        }else if(this.activeName =='managerData'){
          this.beforeManager();
        }else if(this.activeName =='assetData'){
          this.assetData();
        }else if(this.activeName =='bondData'){
          if(this.$route.query.fundtype=='1'){
            this.bondData()
          }
          if(this.$route.query.fundtype!='1' && this.$route.query.fundtype!='2' && this.$route.query.fundtype!='9'){
            this.indData();
          }
        }else if(this.activeName =='stockData'){
            this.stockData();
        }else if(this.activeName =='mStockData'){
            this.mStockData();
        }else if(this.activeName=='scaleData'){
          this.scaleData();
        }else if(this.activeName == 'ownData'){
          this.ownData();
        
        }else if(this.activeName=='navData'){
          this.selectNavDate();
          this.initNavLineData();
        
        }else if(this.activeName == 'increaseData'){
          this.mfDetail();
        }else if(this.activeName == 'incomeData'){
          this.initMFNavLineData();
        }else if(this.activeName == 'shareData'){
          this.divendData();
        }else if(this.activeName == 'mIncomeData'){
          this.getMFundIncomeLineData();
          this.mFundperformaceData();
          this.selectMFundIncomeDate();
        }else if(this.activeName=='reportData'){
          this.initReport();
        }
      },

      jumpToBuy(){
        var buyAmount = this.$refs.buyAmount.value;
				this.$router.push({
					path: 'purchase', 
					query: {
						fundcode: this.fundinfo.fundbaseinfo.front_code, 
            business: '22'
						}
				});
			},
			//点击定投
			jumpToInvest(){
				this.$router.push({
					path: 'invest', 
					query: { 
						fundcode: this.fundinfo.fundbaseinfo.front_code
						}
				});
      },
      
      jumpToRegister(){
				this.$router.push({
					path: 'register'
				});
			},

      funWatch(){
        this.activeName='baseData';
        this.loading_base=true;
        this.loading_nav=true;
        this.loading_report=true;
        this.loading_increase=true;
        this.loading_divend=true;
        this.loading_mincome=true;
        this.loading_comp=true;
        this.loading_manager=true;
        this.loading_asset=true;
        this.loading_bond=true;
        this.loading_stock=true;
        this.loading_own=true;
        this.loading_scale=true;
        this.loading_income=true;
        this.routeKey='';
        this.input='';
        this.tabPosition='left';
        this.fundinfo={fundbaseinfo:{publicFundInfo:{},compInfo:{},transaction_status:{},managerBaseInfo:{},mfIncome:{}},rateMap:{}};
        this.beformanagerinfo=[];
        this.compinfo={fundbaseinfo:{compInfo:{}}};
        this.comparray=[];
        this.mfundfee=[];
        this.assetalloinfo={assetData:[]};
        this.bondalloinfo={bondData:[]};
        this.fundindinfo={fundIndList:[]};
        this.stockinfo={fundbaseinfo:{fundStockList:{ness_list:[]}}};
        this.mstockinfo={tabledata:[],season_str:''};
        this.scaleinfo={assetarray:[{}],scalearray:[{}]};
        this.ownerinfo={titleData:[],tableData:[]};
        this.radio1={value:'近1月',code:'1m'};
        this.navDateValue=[];
        this.navinfo={CurrentPage:'1',navlist:[],total:0,pagesize:0},
        this.navLineinfo=[];
        this.radio2={value:'近1月',code:'1m'};
        this.mfnavinfo=[];
        this.mfnavlineinfo=[];
        this.increaseinfo={qjlist:[],jdlist:[],ndlist:[]};
        this.divendinfo={dividend_page:{dividend_page:[],dd_dividends:[]},cmf_dataList:[],dividend_dataList:[]};
        this.radio3={value:'全部',code:'0'},
        this.reportinfo={total:0, noticeList:[], CurrentPage:1};
        this.radio4={value:'7日年化收益走势图',code:'2'},
        this.radio5={value:'近1月',code:'1m',ctype:'month',between:-1};
      
        this.mfundincomeinfo={total:0,pagesize:0,CurrentPage:1,dateValue:[],mfundperformace:[]};
        this.mFundIncomeList=[];
        this.mfLine = [];
        if(this.$refs.assetsPie!=null){
          this.$refs.assetsPie.innerHTML='';
        }
        if(this.$refs.industryPie!=null){
          this.$refs.industryPie.innerHTML='';
        }
        if(this.$refs.heavyPie!=null){
          this.$refs.heavyPie.innerHTML='';
        }
        if(this.$refs.assetsLine!=null){
          this.$refs.assetsLine.innerHTML='';
        }
        if(this.$refs.shareColumn!=null){
          this.$refs.shareColumn.innerHTML='';
        }
        if(this.$refs.handColumn!=null){
          this.$refs.handColumn.innerHTML='';
        }
        if(this.$refs.historyLine!=null){
          this.$refs.historyLine.innerHTML='';
        }
        if(this.$refs.fundLine!=null){
          this.$refs.fundLine.innerHTML='';
        }
        if(this.$refs.mincomeLine!=null){
          this.$refs.mincomeLine.innerHTML='';
        }
        
        this.baseData();

      }
   
  },
	mounted(){          
       this.baseData();
       
  },
   watch: {
  '$route' (to,from) {
    if (this.$route.name === 'funddetails') {
       this.funWatch();
    }
  }
}
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '@/assets/styles/vars.scss';
  @import '~@/assets/icon/iconfont.css';
  .shopdetails{
    padding-top: 20px;
    padding-bottom: 30px;

    .shop-details-top{
      width: 1140px;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 20px 0px;
      background-color: #fff;
      border: 1px solid $color-back-second;

      .shop-details-top-bar{
        border-right: 1px dashed $color-back-second;
      }
      .shop-detail-title{
        font-size: 18px;
        color: $color-font-first;
        padding-left: 50px;
        padding-top: 10px;
      }
      .shop-detail-title-desc{
        font-size: 14px;
        color: $color-font-third;
        padding-left: 50px;
        padding-top: 10px;

        b{
          font-weight: normal;
          color: $color-font-fourth;
          margin: 0 10px;
        }
        span{
          color: $color-font-second;
        }
      }
      .shop-detail{
        background-color: $color-primary-back;
        padding: 10px 0;
        margin: 20px 0;

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
      .shop-detail-small{
        font-size: 12px;
        color: $color-font-second;

        .el-col{
          padding-bottom: 10px;
        }
        span{
          margin-left: 5px;
        }
        a{
          margin-left: 5px;
          text-decoration: underline;
          &:hover{
            color: $color-primary;
          }
        }
      }
      .title-topright{
        font-size: 14px;
        padding-top: 30px;
        color: $color-font-second;

        span{
          margin-right: 30px;
          
          &:first-child b{
            background-color: $color-primary;
            font-weight: normal;
            color: #fff;
            padding: 3px 10px;
            margin-left: 5px;
            border-radius: 3px;
          }
          &:last-child b{
            font-weight: normal;
            color: $color-primary;
            margin-left: 5px;
          }
        }
      }
      .top-inputbox{
        padding-top: 35px;

        >p{
          font-size: 14px;
          color: $color-font-second;
          padding-bottom: 5px;
        }
        .el-input{
          width: 280px; 
        }
        .top-inputbox-small{
          font-size: 14px;
          color: $color-font-third;
          padding-top: 30px;

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
    .shop-details-bottom{
      width: 1140px;
      margin: 0 auto;
      margin-top: 30px;
      border: 1px solid $color-back-second;
      background-color: #fff;
      padding: 20px 0;
      
      .shop-details-tabs{
        padding: 0 20px;
        padding-right: 50px;

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
          padding: 5px 10px;

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
    .fundD-title{
      font-size: 14px;
      line-height: 32px;
      color:$color-font-second;
    }
    .fund-noData{
			text-align: center;
			padding-top: 30px;
			i{
				font-size: 100px;
				color: $color-font-fourth;
			}
			h4{
				color: $color-font-third;
				padding-top: 20px;
				font-weight: normal;
				padding-right: 20px;
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
.stop-buy .el-input-group__append {
  background-color: #ffb380;
  border-color: #ffb380;
  color: #fff;
}

  
.shop-details-tabs .el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: rgba(255, 102, 0, 0.1) !important;
}
</style>
