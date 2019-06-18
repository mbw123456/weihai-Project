<template>
  <div class="base-detail">
      <div class="base-detail-inner">
          <h1>零的突破！机器人加工量产在即！页面id:{{this.$route.params.id}}</h1>
          <h2>2019-05-30</h2>
          <h3>中国5G将与世界分享
　　<br><br>曾经，3G时代，中国移动通讯国际标准跟跑世界，实现了从无到有的突破；4G时代，中国主导的国际标准首次成为主流，与世界并跑从边缘到主流；5G时代，中国在技术、标准、产业、应用方面呈引领态势，领跑世界由主流到主导。
　　5月22日，英国主要电信运营商之一EE公司宣布，5月30日会首先在英国6个主要城市开通5G服务，这也是英国首个正式启用的5G服务。该公司重申，将继续在其部分5G网络基础设施中采用华为设备。除了EE，另一家英国运营商沃达丰已宣布将从7月初开始，在伦敦等7个英国城市开通5G服务，并且部分使用华为设备。
    <br><br>在西班牙，华为已与多家电信运营商签署5G部署协议；在韩国，华为建立全球首个开放式5G服务开发中心……
　　截至目前，在欧洲、中东、亚洲和美洲已经有多个国家的企业与华为、中兴等中国高科技企业签署了5G商用合作。
　　中国推进5G的过程，始终以开放的态度与外界合作。2013年，中国成立了IMT-2020（5G）推进组，爱立信、诺基亚、高通、英特尔、罗德与施瓦茨等多家知名国外企业都是推进组成员单位。基于推进组平台，国内外企业联合开展技术研究、技术试验和产品测试验证，共同制定技术规范和测试规范，并积极参与测试。
　　通过全球系统设备、芯片、终端、测试仪表等企业相互合作、共同促进，再结合企业自主创新，目前，中国5G开发进度居国际领先水平，已建立竞争优势。
　　当前，全球5G正在进入商用部署的关键期，全球产业界共同参与制定的5G统一国际标准，中国声明的标准必要专利占比超过30%。在各方共同努力下，中国5G技术和产品日趋成熟，系统、芯片、终端等产业链主要环节已基本达到商用水平，中国5G已经具备商用基础。
　　今年4月，美国国防部旗下咨询部门国防创新委员会发布名为《5G生态系统：国防部的风险和机遇》报告，指出中国在5G发展方面已经处于领先地位，目前5G基站建设数量达到约35万个，相当于美国的10倍。其中，作为行业领军者的华为，已向海外供应超过1万个基站，且“版图”还在持续扩大中。
　　工信部近日表示，中国一如既往地欢迎国内外企业积极参与中国5G网络建设和应用推广，共同分享中国5G发展成果。多年来，中国企业积极参与全球通信标准组织、网络建设和产业推动，为全球移动通信产业的发展持续作出贡献。</h3>
      </div>

  </div>
</template>

<script>

export default {
  name: "base-detail",
  data() {
    return {
      //获取public路径
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
    },
  },
  mounted() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.base-detail {
  position: relative;
  padding-top: 20px;

  .base-detail-inner{
      width: 1140px;
      margin: 0 auto;
      border-top: 2px solid $color-primary;
      background-color: #fff;
      box-sizing: border-box;
      padding:20px 15px;
      margin-bottom: 30px;
      min-height: 500px;

      h1{
          font-size: 18px;
          text-align: center;
          font-weight: normal;
          color: $color-font-first;
      }
      h2{
          font-size: 14px;
          color: $color-font-third;
          font-weight: normal;
          text-align: right;
          padding-right: 20px;
      }
      h3{
          padding: 15px;
          font-weight: normal;
          font-size: 15px;
          color: $color-font-second;
          line-height: 25px;
      }
  }
}
</style>
