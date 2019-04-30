<template>
  <div class="aboutus">
    <!-- 这是根节点 -->
    <h4 class="aboutus-title">公司介绍</h4>
    <div class="aboutus-inner">
      <img src="">
      <h4>泰诚财富基金销售（大连）有限公司致力于好基友基金网、精品门店、基金销售等多位一体为发展格局，连接财富管理机构的同时，为各层级群体客户资产提供优质服务。泰诚财富主要涉及公募基金销售、专户销售、私募基金销售、定制产品销售等领域，为客户提供全面、专业、综合的理财服务。</h4>
      <h4>泰诚财富以金融人才为基础搭建核心体系，成员均来自国内知名公募基金、信托、银行、大型国有资产管理公司、保险和创投等领域，具有多年的金融从业经验；公司人员总体通过SAC职业资格证书，销售人员持AFP、CFP等职业资格证从业，为客户提供优质、专业、成熟的理财服务。 2014年，泰诚财富通过证监会审核批准，成为东北首家、全国第49家获得证券投资基金销售业务资格的独立基金销售机构，可以依法开展公募基金销售等业务。目前，泰诚财富旗下的基金销售网站“好基友”基金网（www.haojiyoujijin.com）已经开始运营，平台充分整合上游金融机构资源，针对重点公募基金产品集中销售，泰诚财富旨在将“好基友”基金网打造成为“中国公募基金定投业的第一选择”。与此同时，泰诚财富针对高端客户，以“私人定制”理念为核心，从客户的需求出发，实现真正的高端理财定制管理和服务。</h4>
      <h4>泰诚财富目前与包括天弘基金、广发基金、国泰基金等在内的公募基金公司进行长期合作，成立以来已销售理财产品逾百支，是市场领先的独立理财机构，专注于为中国各领域客户提供全方位的理财规划和顾问服务。</h4>
      <h4>展望未来，公司将继续以信仰、勇气、责任、荣耀为核心价值观，为投资者提供专业周全的金融服务。目前，泰诚财富全面开启全区域全行业布局新篇章，努力成为中国金融资本市场最有价值、最具权威和最受尊敬的综合型品牌公司。</h4>
      <el-row class="aboutus-topimg">
        <el-col :span="11">
          <img src="@/assets/img/about-9.png">
          <span>2014年成为全国第49家独立基金销售机构</span>
        </el-col>
        <el-col :span="6">
          <img src="@/assets/img/about-7.png">
          <span>总部位于大连</span>
        </el-col>
        <el-col :span="6">
          <img src="@/assets/img/about-8.png">
          <span>2015年好基友正式上线</span>
        </el-col>
      </el-row>
    </div>
    <h4 class="aboutus-title">平台资质</h4>
    <div class="aboutus-inner">
      <el-row class="aboutus-centerimg" :gutter="20">
        <el-col :span="11" :offset="1">
          <img src="@/assets/img/about-2.png">
          <img style="margin-top:10px;" src="@/assets/img/about-3.png">
        </el-col>
        <el-col :span="11">
          <img src="@/assets/img/about-4.png">
        </el-col>
      </el-row>
    </div>
    <h4 class="aboutus-title">联系我们</h4>
    <div class="aboutus-inner">
      <div class="aboutus-bottomimg">
        <p>大连总部地址：<span>辽宁省大连市沙河口区星海中龙园3号</span></p>
        <img src="@/assets/img/about-5.png">
        <p>上海分部地址：<span>上海市徐汇区中山南二路107号美奂大厦裙楼</span></p>
        <img src="@/assets/img/about-6.png">
      </div>
    </div>
    <h4 class="aboutus-title">客户服务</h4>
    <div class="aboutus-inner">
      <div class="aboutus-bottomimg">
        <p>客服热线：<b>400-0411-001（服务时间：工作日 09:00-21:00）</b></p>
        <p>客服邮箱：<b>kefu@haojiyoujijin.com</b></p>
        <p>客户服务传真：<b>0411-84395650</b></p>
        <p>人员公示：<a href="http://www.taichengcaifu.com/tccf/index.php?m=about&a=zgml" target="_blank">查看更多详情></a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aboutus"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.aboutus{
  .aboutus-title{
    font-size: 15px;
    padding-bottom: 10px;
    padding-top: 5px;
    font-weight: normal;
    border-bottom: 1px solid $color-back-second;
  }
  .aboutus-inner{
    padding-top: 10px;

    &>img{
      display: block;
      width: 100%;
    }
    h4{
      text-indent: 2em;
      font-weight: normal;
      font-size: 14px;
      color: $color-font-third;
      padding-top: 15px;
      line-height: 20px;
    }
    .aboutus-topimg{
      padding-top: 25px;
      padding-bottom:20px;

      img{
        width: 50px;
        margin-right: 10px;
        vertical-align: -18px;
      }
      span{
        font-size: 14px;
        color: $color-font-second;
      }
    }
    .aboutus-centerimg{
      padding-top: 25px;
      padding-bottom:20px;

      img{
        display: block;
        width: 100%;
      }
    }
    .aboutus-bottomimg{
      padding-bottom:20px;

      img{
        display: block;
        width: 100%;
        margin-bottom: 10px;
      }
      p{
        padding: 10px 0;
        font-size: 14px;
        color: $color-font-second;

        span{
          color: $color-font-third;
        }
        b{
          color: $color-primary;
          font-weight: normal;
        }
        a{
          color: $color-primary;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
