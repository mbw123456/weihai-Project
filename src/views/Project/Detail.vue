<template>
  <div class="project-detail">
    <!-- 这是根节点 -->
    <div class="shop-search">
      <div class="shop-search-inner">
        <div class="desc">待合作</div>
        <p class="title">金属表面喷涂技术<span>需求编码:Aa001</span></p>
        <div class="tags">
          <el-tag
            size="small"
            v-for="item in tags"
            :key="item"
            type="warning">
            {{item}}
          </el-tag>
        </div>
        <el-row class="center">
          <el-col :span="18" style="border-right:1px dotted #ddd;">
            <div class="center-left">
              <h4>15<span>万</span></h4>
              <h5>计划投入(元)</h5>
            </div>
            <div class="center-left">
              <h4>3<span>个月</span></h4>
              <h5>解决期限</h5>
            </div>
            <div class="center-left">
              <h6>联合攻关</h6>
              <h5>解决方式</h5>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="padding-bottom:10px; margin-top:-10px; text-align:center;">
              <el-button type="primary" size="medium" style="width:150px;">咨询</el-button>
            </div>
            <div style="text-align:center;">
              <el-button type="warning" size="medium" style="width:150px;">关注</el-button>
            </div>
          </el-col>
        </el-row>
        <div class="footer">
          <i class="el-icon-location-outline"></i>环翠区
          <i class="el-icon-time"></i>发布时间:2019-05-10
        </div>
      </div>
    </div>

    <div class="project-list">
      <div class="project-list-inner">
        <el-row>
          <el-col :span="18">
            <div class="need">
              <h3>需求说明</h3>
              <div class="need-detail">
                <h4><i class="el-icon-notebook-2"></i>需求摘要</h4>
                <h5>曾经，3G时代，中国移动通讯国际标准跟跑世界，实现了从无到有的突破；4G时代，中国主导的国际标准首次成为主流，与世界并跑从边缘到主流；5G时代，中国在技术、标准、产业、应用方面呈引领态势，领跑世界由主流到主导。</h5>
                <h4><i class="el-icon-document"></i>需求详情</h4>
                <h5>曾经，3G时代，中国移动通讯国际标准跟跑世界，实现了从无到有的突破；4G时代，中国主导的国际标准首次成为主流，与世界并跑从边缘到主流；5G时代，中国在技术、标准、产业、应用方面呈引领态势，领跑世界由主流到主导。</h5>
                <h4><i class="el-icon-set-up"></i>合作方式</h4>
                <h5>曾经，3G时代，中国移动通讯国际标准跟跑世界，实现了从无到有的突破；4G时代，中国主导的国际标准首次成为主流，与世界并跑从边缘到主流；5G时代，中国在技术、标准、产业、应用方面呈引领态势，领跑世界由主流到主导。</h5>
                <h4><i class="el-icon-paperclip"></i>需求附件</h4>
                <h5>
                  <el-button type="text" style="text-decoration:underline;">金属表面喷涂技术.pdf</el-button>
                  <el-button type="text" style="text-decoration:underline;">项目其他资料.zip</el-button>
                </h5>
                <swiper :options="swiperOption" ref="mySwiper" >
                  <!-- slides -->
                  <swiper-slide>
                    <img src="@/assets/img/indexElse_24.png" alt="">
                  </swiper-slide>
                  <swiper-slide>
                    <img src="@/assets/img/indexElse_03.png" alt="">
                  </swiper-slide>
                  <swiper-slide>
                    <img src="@/assets/img/indexElse_24.png" alt="">
                  </swiper-slide>
                  <swiper-slide>
                    <img src="@/assets/img/indexElse_24.png" alt="">
                  </swiper-slide>
                  <swiper-slide>
                    <img src="@/assets/img/indexElse_24.png" alt="">
                  </swiper-slide>
                  <swiper-slide>
                    <img src="@/assets/img/indexElse_24.png" alt="">
                  </swiper-slide>
                  <swiper-slide>
                    <img src="@/assets/img/indexElse_03.png" alt="">
                  </swiper-slide>
                  <!-- Optional controls -->
                  <div class="swiper-button-prev" slot="button-prev"></div>
                  <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
              </div>
            </div>
          </el-col>

          <el-col :span="5" :offset="1">
            <div class="hot">
              <h3>热门推荐</h3>
              <el-card v-for="(item,key) in 5" :key="key">
                <p>电梯轨道全自动化生产线</p>
                <h5><i class="el-icon-location-information"></i>环翠区 | 自动化</h5>
              </el-card>
            </div>
          </el-col>
        </el-row>
          
				
      </div>
    </div>



  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: "project-detail",
  components:{
    swiper,
    swiperSlide
  },
  data() {
    return {
      //获取public路径
      publicPath: process.env.BASE_URL,
      //专题分类
      tags:['自动化','强粘合性','需耐腐蚀'],
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 55,
        slidesPerGroup: 1,
        // loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    changeFundType(item) {
      console.log(item);
    },
    //页面跳转加参数
    // openDetails(row, column, event) {
    //   this.pramfundtype = row.pramfundtype;
    //   // VueEvent.$emit('shop_pramfundtype',this.pramfundtype);
    //   // this.$router.push('funddetails/'+ row.f_info_windcode +'');
    //   this.$router.push({
    //     path: "funddetails",
    //     query: {
    //       fundcode: row.f_info_windcode,
    //       fundtype: row.pramfundtype
    //     }
    //   });
    // },
    // sendCodeValid(formName) {
    //   this.sendCode(formName);
    // },
    // sendCode(formName) {
    //   if (this.timeDisable == false) {
    //     this.time = 60;
    //     this.timeDisable = true;
    //     this.timer();
    //   }
    // },
    // timer() {
    //   if (this.time > 0) {
    //     this.time--;
    //     this.timeText = this.time + "s后重新获取";
    //     setTimeout(this.timer, 1000);
    //     this.timeDisable = true;
    //   } else {
    //     this.timeText = "发送验证码";
    //     this.timeDisable = false;
    //   }
    // },
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       this.$message({
    //         showClose: true,
    //         type: 'success',
    //         center:true,
    //         message: 'submit!'
    //       });
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
        
		// 	});
			
		// },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.project-detail {
  border-top: 1px solid $color-back-second;
  // min-height: 900px;
  .shop-search {
    background-color: #fff;
    margin-bottom: 10px;
    padding-bottom: 15px;

    .shop-search-inner {
      width: 1140px;
      margin: 0 auto;
      padding: 20px 0;
      padding-bottom: 0px;
      position: relative;
      overflow: hidden;

      .desc{
        position: absolute;
        right:-40px;
        top:-10px;
        padding:10px 40px;
        padding-top: 25px;
        font-size: 12px;
        color: #fff;
        background-color: $color-back-first;
        transform:rotate(45deg);
        -ms-transform:rotate(45deg); 	/* IE 9 */
        -moz-transform:rotate(45deg); 	/* Firefox */
        -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
        -o-transform:rotate(45deg);
      }
      .title{
        color: $color-primary;
        font-size: 17px;

        span{
          font-size: 14px;
          color: $color-font-third;
          margin-left: 10px;
        }
      }
      .tags{
        margin: 10px 0;

        .el-tag{
          margin-right: 5px;
        }
      }
      .center{
        padding: 5px 0;

        .center-left{
          width: 33%;
          float: left;
          text-align: center;

          h4{
            line-height: 40px;
            height: 40px;
            font-size: 30px;
            color: $color-primary;
            font-style: italic;
            span{
              font-size: 14px;
              font-weight: normal;
              font-style: normal;
              margin-left: 5px;
            }
          }
          h5{
            font-size: 14px;
            font-weight: normal;
            color: $color-font-third;
          }
          h6{
            line-height: 40px;
            height: 40px;
            font-size: 20px;
            color: $color-primary;
          }
        }
      }
      .footer{
        font-size: 14px;
        color: $color-font-third;

        i{
          margin-right: 5px;
          color: $color-primary;
          font-size: 16px;
          font-weight: bold;
          vertical-align: -1px;

          &:last-child{
            margin-left: 20px;
          }
        }
      }
      
    }
  }
  .project-list {
    width: 100%;
    min-height: 700px;
    margin-top: 40px;
    padding-bottom: 30px;

    .project-list-inner {
      width: 1140px;
      margin: 0 auto;

      .need{
        background-color: #fff;
        border-top: 2px solid $color-primary;
        padding-bottom: 15px;

        h3{
          color: $color-primary;
          padding: 0px 15px;
          font-size: 15px;
          line-height: 47px;
          border-bottom: 1px solid $color-back-second;
        }
        .need-detail{
          padding: 15px;

          h4{
            color: $color-primary;
            font-size: 15px;
            font-weight: normal;

            i{
              font-size: 16px;
              margin-right: 5px;
              font-weight: bold;
            }
          }
          h5{
            font-weight: normal;
            font-size: 14px;
            color: $color-font-third;
            padding: 10px 0;
            margin-bottom: 15px;
          }
        }

      }
      .hot{
        background-color: #fff;
        border-top: 2px solid $color-primary;
        padding-bottom: 15px;

        h3{
          color: $color-primary;
          padding: 0px 15px;
          font-size: 15px;
          line-height: 47px;
          border-bottom: 1px solid $color-back-second;
        }
        .el-card{
          margin: 15px 15px;

          p{
            color: $color-primary;
            font-size: 14px;
            span{
              font-size: 12px;
              padding: 3px 10px;
              background-color: $color-primary-second;
              margin-left: 5px;
              vertical-align: 2px;
              border-radius: 4px;
              img{
                width: 12px;
                vertical-align: -3px;
              }
            }
          }
          h5{
            padding-top: 5px;
            font-weight: normal;
            color: $color-font-third;
            font-size: 12px;

          }
        }
        
      }

    }
  }
}
</style>
<style lang="scss">
@import "@/assets/styles/vars.scss";
.private-search-box .el-scrollbar{
	height: 100%;
}
.private-search-box .el-scrollbar .el-scrollbar__wrap{
	overflow: scroll;
	overflow-x:auto;
}
.project-detail {
  .swiper-container {
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0 50px;
    z-index: 1;

    img{
      width:100%;
      height:140px;
    }
  }
  .el-radio-button {
    position: relative;
    b {
      position: absolute;
      right: -15px;
      color: $color-font-fourth;
    }
  }
  .el-radio-button__inner {
    border: none 0;
    border-radius: 4px;
    padding: 8px 15px;
    margin: 0 15px;
  }
  .industry .is-active .el-radio-button__inner{
    transition: opacity 2s linear;
    position: relative;
    &:before{
      content:'';
      position: absolute;
      left: 50%;
      margin-left:-5px;
      bottom:-10px;
      display:block;
      width: 0; 
      height: 0;
      border-width: 5px;
      border-style: solid;
      border-color:$color-primary transparent transparent transparent;
      transition: opacity 2s linear;
    }
  }
  .el-radio-button:first-child .el-radio-button__inner {
    border: none 0;
    border-radius: 4px;
  }
  .el-radio-button:last-child .el-radio-button__inner {
    border: none 0;
    border-radius: 4px;
  }
}
</style>

