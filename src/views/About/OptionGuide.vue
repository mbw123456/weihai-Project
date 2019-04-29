<template>
  <div class="optionGuide">
    <!-- 这是根节点 -->
    <h4 class="optionGuide-title">线上机构业务操作指引</h4>
    <div class="optionGuide-inner">
      <h4>一、开户</h4>
      <h5>1、准备开户资料</h5>
      <h6>投资者提交如下资料的原件扫描件，填写相应申请表并提交相应扫描件： 
<br>（1）《营业执照》副本、《税务登记证》、《组织机构代码证》原件； 
<br>（注：如果三证合一提供《营业执照》副本） 
<br>（2）客户及交易所用银行账户的开户证明原件，若绑定为一般户无银行开户证明则提供绑定账户的流水或者网银开立证明等资料的原件； 
<br>（3）在有效期内（有效期半年及半年以上）的法定代表人的身份证件正反面原件； 
<br>（4）法定代表人或组织机构负责人证明书（下载填写加盖公章）； 
<br>（5）在有效期内（有效期半年及半年以上）的代理人的身份证件原件； 
<br>（6）《投资者基本信息表（机构）》(下载填写并加盖公章及授权经办人签字）； 
<br>（7）《授权委托书》 （下载填写并加盖公章及法人章）； 
<br>（8）《业务印鉴卡》 （下载填写并加盖公章及法人章）； 
<br>（9）公司章程复印件（直接或者间接拥有超过25%公司股权或者表决权的自然人，需提供相应股东的身份证复印件--加盖公章）---加盖公章; 
<br>（10）《基金投资者风险测评问卷（机构版）》(下载填写并加盖公章及授权经办人签字，注：承受的风险等级处请先空出，待柜台受理完成后根据风评回执进行填写); 
<br>（11）《直接认定专业投资者承诺书》（下载并加盖公章及授权经办人签字，注：符合条件的可以进行填写并提供相应证明资料加盖公章）； 
<br>（12）《投资人权益须知》（下载填写并加盖公章及法人章）； 
<br>（13）《机构税收居民身份声明文件》(下载填写并加盖公章及授权经办人签字）； 
<br>（14）《机构版-开放式基金远程交易协议书》（下载填写并加盖公章及法人章，注一式两份）。 
<br>资料审核通过后好基友工作人员会短信或电话通知机构授权经办人进行双录认证，具体见步骤2。</h6>
      <h5>2、双录认证</h5>
      <h6>资料审核通过，好基友工作人员短信或电话通知授权人添加QQ：3354261616，备注企业全称，开始做双录认证。 
<br>认证内容：授权经办人手持本人身份证原件对准摄像头3秒，回答三个问题：Q1:是否经***公司授权，在我司办理贵司开户及交易相关业务；Q2：身份证后四位；Q3：生肖。</h6>
      <h5>3、柜台复核</h5>
      <h6>双录认证后，柜台方可对客户的开户及风评进行柜台系统录入并打印回执加盖柜台业务章，通知客户，客户接到通知并收到回执单后加盖公章，并由授权经办人签字后，将其扫描件回传至柜台。柜台收到回执后方可进行复核，此处开户完成。开户完成后客户可以进行交易。</h6>
    
      <h4>二、交易</h4>
      <h5>1、填写业务申请表</h5>
      <h6>下载并填写《开放式基金交易业务申请表（机构版）》--加盖公章及授权经办人签字同时提交经办人身份证复印件并加盖公章。 
<br>注意：如果客户所购买的产品的风险等级与客户本身的风险测试结果相匹配，则需要填写《投资者风险匹配告知书及投资者确认函》；如果客户所购买的产品的风险等级与客户本身的风险测试结果不匹配，并且需要继续购买此产品，则需要填写《风险不匹配警示函及投资者确认书》及《购买不匹配产品申请书》。符合并认定为专业投资者的客户可以忽略以上内容。</h6>
      <h5>2、柜台审核</h5>
      <h6>《开放式基金交易业务申请表（机构版）》审核无误后，柜台系统录入并打印回执加盖柜台业务章，通知客户，客户接到通知并收到回执单后加盖公章并由授权经办人签字的扫描件回传至柜台，同时进行打款操作并上传转账凭条。 
<br>注：申购款资金15点之前划出的单据（可以是电子扫屏）必须在15点前传至好基友交易柜台。</h6>

      <h5>3、交易复核</h5>
      <h6>收到款项后柜台复核人员复核此笔交易，交易完成短信通知客户。</h6>
      <h3>注：办理业务时可将一和二中涉及的所有资料上传至ziliaojieshou@taichengcaifu.com邮箱，并于业务受理完成后五个工作日内将所有需提供原件资料的复印件加盖公章以及将所有下载填写的表格的原件邮寄至柜台；准备资料的过程中如有任何问题，烦请拨打柜台电话：0411-88891212-119。</h3>

      <h4>资料附件：</h4>
      <ul class="optionGuide-list" v-loading="loading">
        <li>
          <el-row>
            <el-col :span="18">
              <p>《投资者基本信息表（机构）》</p>
            </el-col>
            <el-col :span="6" style="text-align:right;">
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/投资者基本信息表（机构）.docx')">下载</el-button>
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/投资者基本信息表（机构）案例).docx')">示例</el-button>
            </el-col>
          </el-row>
        </li>

        <li>
          <el-row>
            <el-col :span="18">
              <p>《法人代表证明书》</p>
            </el-col>
            <el-col :span="6" style="text-align:right;">
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/法人代表证明书.docx')">下载</el-button>
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/法人代表证明书（案例）.docx')">示例</el-button>
            </el-col>
          </el-row>
        </li>

        <li>
          <el-row>
            <el-col :span="18">
              <p>《风险不匹配警示函及投资者确认书》</p>
            </el-col>
            <el-col :span="6" style="text-align:right;">
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/风险不匹配警示函及投资者确认书.docx')">下载</el-button>
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/风险不匹配警示函及投资者确认书（案例）.docx')">示例</el-button>
            </el-col>
          </el-row>
        </li>


        <li>
          <el-row>
            <el-col :span="18">
              <p>《购买不匹配产品申请书》</p>
            </el-col>
            <el-col :span="6" style="text-align:right;">
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/购买不匹配产品申请书.docx')">下载</el-button>
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/购买不匹配产品申请书（案例）.docx')">示例</el-button>
            </el-col>
          </el-row>
        </li>


        <li>
          <el-row>
            <el-col :span="18">
              <p>《机构版-开放式基金远程交易协议书》</p>
            </el-col>
            <el-col :span="6" style="text-align:right;">
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/机构版-开放式基金远程交易协议书.doc')">下载</el-button>
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/机构版-开放式基金远程交易协议书（案例）.doc')">示例</el-button>
            </el-col>
          </el-row>
        </li>


        <li>
          <el-row>
            <el-col :span="18">
              <p>《机构税收居民身份声明文件》</p>
            </el-col>
            <el-col :span="6" style="text-align:right;">
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/机构税收居民身份声明文件.doc')">下载</el-button>
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/机构税收居民身份声明文件（案例）.doc')">示例</el-button>
            </el-col>
          </el-row>
        </li>


        <li>
          <el-row>
            <el-col :span="18">
              <p>《基金投资者风险测评问卷（机构版）》</p>
            </el-col>
            <el-col :span="6" style="text-align:right;">
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/基金投资者风险测评问卷（机构版）.doc')">下载</el-button>
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/基金投资者风险测评问卷（机构版）（案例）.doc')">示例</el-button>
            </el-col>
          </el-row>
        </li>


        <li>
          <el-row>
            <el-col :span="18">
              <p>《开放式基金交易业务申请表（机构版）》</p>
            </el-col>
            <el-col :span="6" style="text-align:right;">
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/开放式基金交易业务申请表（机构版）.docx')">下载</el-button>
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/开放式基金交易业务申请表（机构版）（案例）.docx')">示例</el-button>
            </el-col>
          </el-row>
        </li>



        <li>
          <el-row>
            <el-col :span="18">
              <p>《开放式基金业务印鉴卡》</p>
            </el-col>
            <el-col :span="6" style="text-align:right;">
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/开放式基金业务印鉴卡.doc')">下载</el-button>
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/开放式基金业务印鉴卡（案例）.doc')">示例</el-button>
            </el-col>
          </el-row>
        </li>


        <li>
          <el-row>
            <el-col :span="18">
              <p>《投资人权益须知》</p>
            </el-col>
            <el-col :span="6" style="text-align:right;">
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/投资人权益须知.doc')">下载</el-button>
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/投资人权益须知（案例）.doc')">示例</el-button>
            </el-col>
          </el-row>
        </li>


        <li>
          <el-row>
            <el-col :span="18">
              <p>《投资者风险匹配告知书及投资者确认函》</p>
            </el-col>
            <el-col :span="6" style="text-align:right;">
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/投资者风险匹配告知书及投资者确认函.docx')">下载</el-button>
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/投资者风险匹配告知书及投资者确认函（案例）.docx')">示例</el-button>
            </el-col>
          </el-row>
        </li>


        <li>
          <el-row>
            <el-col :span="18">
              <p>《业务授权委托书》</p>
            </el-col>
            <el-col :span="6" style="text-align:right;">
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/业务授权委托书.doc')">下载</el-button>
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/业务授权委托书（案例）.doc')">示例</el-button>
            </el-col>
          </el-row>
        </li>


        <li>
          <el-row>
            <el-col :span="18">
              <p>《直接认定专业投资者承诺书》</p>
            </el-col>
            <el-col :span="6" style="text-align:right;">
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/直接认定专业投资者承诺书.docx')">下载</el-button>
              <el-button type="primary" plain size="mini" @click="downloadFile('/file/直接认定专业投资者承诺书（案例）.docx')">示例</el-button>
            </el-col>
          </el-row>
        </li>

      </ul>


      <h4>三、其他</h4>
      <h5>1、办理业务时间</h5>
      <h6>一般确认收到相关资料并符合开户要求的，柜台在14：00前收到则于当日办理相关业务；在14：00后收到则于下一个交易日办理相关业务。</h6>
      <h5>2、好基友平台打款账户信息</h5>
      <h6>银行户名：泰诚财富基金销售（大连）有限公司 
<br>银行账号：691651677 
<br>开户行名称：中国民生银行股份有限公司大连马栏广场支行</h6>
      <h5>3、远程业务资料邮寄地址等相关信息</h5>
      <h6>（1）邮寄地址：辽宁省大连市沙河口区星海中龙园3号泰诚财富基金销售（大连）有限公司 
<br>（2）邮编：116000 
<br>（3）传真号：0411-84396536 
<br>（4）收件人：柜台运营室 电话：0411-88891212</h6>
    
    
    
    </div>
  </div>
</template>

<script>
export default {
  name: "OptionGuide",
  data(){
    return {
      optionGuideList:[
        {"title":"《投资者基本信息表（机构）》"},
      ],
      loading:false
    }
  },
  methods:{

    downloadFile(item){
      var url = window.location.href;
      var currentPath = this.$route.path;
      url = url.replace(currentPath,'');
      window.location.href=url+"/hjy_pc_interface"+item;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.optionGuide{
  .optionGuide-title{
    font-size: 15px;
    padding-bottom: 10px;
    padding-top: 5px;
    font-weight: normal;
    border-bottom: 1px solid $color-back-second;
  }
  .optionGuide-inner{
    h4{
      padding-top: 15px;
      font-size: 14px;
    }
    h5{
      padding-top: 10px;
      font-weight: normal;
      font-size: 14px;
    }
    h6{
      padding-top: 5px;
      font-weight: normal;
      font-size: 14px;
      color: $color-font-third;
    }
    h3{
      font-weight: normal;
      font-size: 14px;
      padding:10px 20px;
      color: $color-primary;
      margin-top: 10px;
      background-color: $color-primary-back;
    }
    .optionGuide-list{
      padding: 0 10px;
      li{
        border-bottom: 1px solid $color-back-first;
        padding: 12px 0;
        p{
          font-weight: normal;
          font-size: 14px;
          line-height: 28px;
          color: $color-font-first;
        }
      }
    }
  }
}
</style>
