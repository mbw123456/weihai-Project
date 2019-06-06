<template>
  <div class="base">
    <!-- 这是根节点 -->
    <!-- banner -->
    <div>
      <el-carousel height="540px">
        <el-carousel-item v-for="(item,key) in bannerList" :key="key">
          <div class="banner-box" :style="{backgroundImage: 'url('+publicPath+'img/' + item+ ')'}"></div>
        </el-carousel-item>
      </el-carousel>
      <div class="login-box">
        <div class="login-picBox">
          <div class="login-pic">
            <img :src="loginPic">
          </div>
          <p>{{loginName}}</p>
          <div v-if="this.$store.state.autoLogin != null">
            <el-button plain round size="medium" @click="goToLogin()">注册</el-button>
            <el-button type="primary" plain round size="medium" @click="goToRegister()">登录2</el-button>
          </div>
          <div v-else>
            <el-button type="primary" plain round size="medium" @click="goToRegister()">我的账户</el-button>
          </div>
        </div>

        <div class="login-box-bar">
          <p>平台指数</p>
          <h3>
            {{platform_num}}
            <span>位</span>
          </h3>
          <h4>累计专家数量</h4>
        </div>
        <el-row :gutter="10">
          <el-col class="login-box-icon" :span="8">
            <div>
              <img src="@/assets/img/weihai_index2_03.png">
            </div>
            <p>技术共享</p>
          </el-col>
          <el-col class="login-box-icon" :span="8">
            <div style="background-color:#fbe3ce;">
              <img src="@/assets/img/weihai_index2_05.png">
            </div>
            <p>服务转化</p>
          </el-col>
          <el-col class="login-box-icon" :span="8">
            <div style="background-color:#d8d4f6;">
              <img src="@/assets/img/weihai_index2_07.png">
            </div>
            <p>免费对接</p>
          </el-col>
        </el-row>
        <div class="login-box-contact">
          <img src="@/assets/img/weihai_index1_12.png">
          <p>热线服务时间：周一至周五 8:30-17:00</p>
        </div>
      </div>
      <div class="login-box-left">
          <div v-for="(item,key) in requireTitle" :key="key">
              <h3>{{item.name}}>></h3>
              <h4>
                  <a v-for="(item,num) in item.desc" :key="num">{{item}}</a>
              </h4>
          </div>
      </div>
    </div>

    <div class="base-bigTitle">
        <h2>最新<b>需求</b></h2>
        <h4><span>latest demand</span></h4>
    </div>

    <div class="base_newBox">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="最新需求" name="first">
                <a href="" class="more">更多1>></a>
                <el-row :gutter="15">
                    <el-col :span="8" v-for="(item,key) in newBoxList" :key="key">
                        <div class="newbox-style">
                            <h4>
                                <span 
                                :style="{backgroundColor:(item.desc=='个人'? '#e4ebf9':null),color:(item.desc=='个人'? '#3172f4':null)}"
                                >
                                {{item.desc}}
                                </span>
                                {{item.title}}
                            </h4>
                            <h3>
                                <span>{{item.name}}</span>
                                <b>{{item.phone}}</b>
                                <em>{{item.way}}</em>
                            </h3>
                            <div>
                                <span class="el-icon-location-outline"></span>
                                <b>{{item.address}}</b>
                                <b>{{item.day}}</b>
                                <el-button type="text">{{item.button}}</el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="新材料" name="second">
                <a href="" class="more">更多>></a>
            </el-tab-pane>
            <el-tab-pane label="海洋生物" name="third">海洋生物</el-tab-pane>
            <el-tab-pane label="自动化" name="fourth">自动化</el-tab-pane>
        </el-tabs>
    </div>

    <div class="base-bigTitle">
        <h2>成功<b>案例</b></h2>
        <h4><span>success case</span></h4>
    </div>

    <div class="base-bigDesc">
        <span>申报成功案例，积累信用积分，推荐优先接单</span>
        <a>立即申报>></a>
    </div>

    <div class="base-caseBox">
        <div class="base-caseTitle">
            <span>案例精选</span>
            <a>往期查看更多>></a>
        </div>

        <el-row :gutter="15">
            <el-col :span="12" v-for="(item,key) in newCaseList" :key="key">
                <el-row class="base-case">
                    <el-col :span="10" style="height:140px;">
                        <img :src="item.url">
                    </el-col>
                    <el-col :span="13" :offset="1">
                        <p>{{item.title}}</p>
                        <div>
                            <span>周期:{{item.day}}天</span>
                            <span>交易金额:<b>{{item.count}}</b>万</span>
                        </div>
                        <el-button type="text">查看详情>></el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>




  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";

export default {
  name: "Base",
  data() {
    return {
      //获取public路径
      publicPath: process.env.BASE_URL,
      loading: true,
      //banner
      bannerList: ["weihai_index_06.png"],
      loginPic: "/img/weihai_index1_08.png",
      loginName: "Hi，您好",
      platform_num: "42245",
      requireTitle:[
        { 
            name: "新材料", 
            desc:['特种金属','高分子材料','复合材料','无机非金属','结构材料']
        },
        { 
            name: "海洋生物", 
            desc:['水产养殖','冷冻冷藏','食品加工']
        },
        { 
            name: "自动化", 
            desc:['组装装配','生产线','机械设计','上下料','焊接','非标设备']
        },
        { 
            name: "船舶制造及配套", 
            desc:['船体下料','动力装置','舾装设备','推进装置']
        },
        { 
            name: "精密机械", 
            desc:['数控机床','数控车床','数控磨床','数控电加工机床']
        },
        { 
            name: "其他", 
        },
      ],
      activeName: 'first',
      newBoxList:[
          { 
            title: "新材料新材料新材料新材料新材料新材料新材料新材料新材料新材料", 
            desc:"企业",
            name:"赵**",
            phone:"13112445671",
            way:"面议",
            address:"环翠区",
            day:"今天发布",
            button:"立即参与"
          },
          { 
            title: "新材料新材料新材料新材料新材料新材料新材料新材料新材料新材料", 
            desc:"个人",
            name:"赵**",
            phone:"13112445671",
            way:"面议",
            address:"环翠区",
            day:"今天发布",
            button:"立即参与"
          },
          { 
            title: "新材料新材料新材料新材料新材料新材料新材料新材料新材料新材料", 
            desc:"企业",
            name:"赵**",
            phone:"13112445671",
            way:"面议",
            address:"环翠区",
            day:"今天发布",
            button:"立即参与"
          },
          { 
            title: "新材料新材料新材料新材料新材料新材料新材料新材料新材料新材料", 
            desc:"企业",
            name:"赵**",
            phone:"13112445671",
            way:"面议",
            address:"环翠区",
            day:"今天发布",
            button:"立即参与"
          },
      ],
      newCaseList:[
          { 
            url:'/img/weihai_base_13.png',
            title: "高浓度盐水处理新技术", 
            day:"120",
            count:"180",
          },
          { 
            url:'/img/weihai_base_13.png',
            title: "高浓度盐水处理新技术", 
            day:"120",
            count:"180",
          },
          { 
            url:'/img/weihai_base_13.png',
            title: "高浓度盐水处理新技术", 
            day:"120",
            count:"180",
          },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
    },
    goToLogin() {
        this.$router.push("/login");
    },
    goToRegister() {
        this.$router.push("/register");
    },
    goToAccount() {
        this.$router.push("/account");
    }
  },
  mounted() {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.base {
  position: relative;

  .banner-box {
    height: 540px;
    background-position: center top;
    background-repeat: repeat-x;
  }

  .login-box {
    box-sizing: border-box;
    position: absolute;
    width: 280px;
    height: 540px;
    background-color: #fff;
    right: 50%;
    margin-right: -570px;
    top: 0px;
    z-index: 101;
    border-top: 1px solid $color-back-first;
    // box-shadow: 0 5px 15px rgba($color: #000000, $alpha: 0.3);
    padding: 15px 25px;

    .login-picBox {
      text-align: center;

      .login-pic {
        width: 75px;
        height: 75px;
        margin: 0 auto;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        font-size: 14px;
        color: $color-font-second;
        margin-bottom: 10px;
        margin-top: 5px;
      }
      .el-button {
        margin: 0 10px;
      }
    }
    .login-box-bar {
      height: 120px;
      background-color: $color-back-second;
      margin: 15px 0;
      border-radius: 5px;
      overflow: hidden;

      p {
        position: relative;
        text-align: center;
        margin-top: 15px;
        color: $color-font-second;

        &::before {
          content: "";
          position: absolute;
          display: block;
          width: 40px;
          left: 20px;
          top: 10px;
          height: 1px;
          background-color: $color-primary;
        }
        &::after {
          content: "";
          position: absolute;
          display: block;
          width: 40px;
          right: 20px;
          top: 10px;
          height: 1px;
          background-color: $color-primary;
        }
      }
      h3 {
        text-align: center;
        font-size: 22px;
        margin-top: 15px;

        span {
          font-weight: normal;
          font-size: 14px;
          color: $color-font-third;
          margin-left: 5px;
        }
      }
      h4 {
        font-weight: normal;
        color: $color-font-third;
        font-size: 14px;
        text-align: center;
        margin-top: 10px;
      }
    }
    .login-box-icon {
      text-align: center;
      padding-top: 5px;

      div {
        text-align: center;
        box-sizing: border-box;
        width: 50px;
        padding-top: 10px;
        height: 50px;
        margin: 0 auto;
        border-radius: 50%;
        background-color: #d3e0f7;
      }
      p {
        font-size: 14px;
        margin-top: 5px;
        color: $color-font-second;
      }
    }
    .login-box-contact {
      padding-top: 5px;

      img {
        width: 100%;
      }
      p {
        font-size: 13px;
        color: $color-font-third;
        text-align: center;
      }
    }
  }
  .login-box-left {
    box-sizing: border-box;
    position: absolute;
    width: 220px;
    height: 540px;
    background-color:$color-font-first;
    left: 50%;
    margin-left: -570px;
    top: 0px;
    z-index: 101;
    // box-shadow: 0 5px 15px rgba($color: #000000, $alpha: 0.3);
    padding: 15px 25px;

    div{
        padding-bottom: 15px;
        h3{
            font-size: 14px;
            color: #fff;
            font-weight: normal;
            padding-top: 5px;
            padding-bottom: 5px;
            border-bottom: 1px solid $color-font-second;
            cursor: pointer;
        }
        h4{
            padding: 5px 0;
            a{
                font-size: 12px;
                color: #fff;
                font-weight: normal;
                padding-top: 5px;
                border-right: 1px solid $color-font-second;
                padding: 0 5px;

                &:first-child{
                    padding-left: 0;
                }
                &:last-child{
                    border: none 0;
                }

            }
        }

    }



  }
  .base_newBox{
    width: 1140px;
    margin: 0 auto;
    margin-top: 20px;      
    
    .newbox-style{
        border: 3px solid $color-back-first;
        box-sizing: border-box;
        padding: 15px 15px;
        height: 150px;
        margin-bottom: 15px;

        h4{
            white-space: nowrap; 
            text-overflow:ellipsis;
            overflow:hidden; 
            font-weight: normal;
            font-size: 16px;
            line-height: 25px;

            span{
                font-size: 13px;
                padding: 3px 10px;
                border-radius: 3px;
                background-color: #cef4eb;
                color: #1fd295;
                margin-right: 5px;
            }
        }
        h3{ 
            margin: 5px 0;
            font-size: 16px;
            font-weight: normal;
            text-align: left;
            border-bottom:1px solid $color-back-first;
            padding: 15px 0;

            span{
                margin-right: 10px;
            }
            b{
                color: $color-primary;
            }
            em{
                float: right;
                font-style: normal;
                color: #ffa92a;
            }
        }
        div{
            color: $color-font-third;
            font-size: 14px;
            span{
                margin-top: 10px;
            }
            b{
                font-weight: normal;
                padding: 0 10px;
                border-right: 1px solid $color-back-first;

                &:last-child{
                    border: none 0;
                }
            }
            .el-button{
                float: right;
                padding-top: 9px;

            }
        }
    }
    .more{
        position: absolute;
        right: 15px;
        top: -44px;
        z-index: 100;
        font-size: 14px;
        color: $color-font-second;

        &:hover{
            color: $color-primary;
        }
    }
  }
  .base-bigTitle{
      padding-top: 50px;
      width: 380px;
      margin: 0 auto;
      border-bottom: 1px solid $color-back-first;
      text-align: center;
      padding-bottom: 10px;

      h2{
          font-weight: normal;
          font-size: 26px;
          color: $color-font-first;
      }
      h4{
          color: $color-font-third;
          font-weight: normal;
          padding-top: 5px;
          font-size: 14px;
          text-transform: Uppercase;
          
          span{
              padding: 0 15px;
              padding-bottom: 9px;
              border-bottom: 3px solid $color-primary;
          }
      }
  }
  .base-bigDesc{
      height: 50px;
      border-radius: 150px;
      width: 1140px;
      margin: 20px auto;
      background: url(~@/assets/img/weihai_index_09.png) no-repeat center center;
      text-align: center;
      line-height: 50px;

      span{
          color: #fff;
          font-size: 20px;
          font-weight: bold;
      }
      a{
          color: #fff;
          font-size: 20px;
          margin-left: 260px;
      }
  }
  .base-caseBox{
      width: 1140px;
      margin: 30px auto;
      .base-caseTitle{
          border-bottom: 1px solid $color-back-first;
          line-height: 40px;
          margin-bottom: 30px;

          span{
              color: $color-font-second;
          }
          a{
              float: right;
              color: $color-font-second;
              font-size: 14px;

              &:hover{
                  color: $color-primary;
              }
          }
      }
      .base-case{
          border: 1px solid $color-back-first;
          margin-bottom: 15px;
          padding: 10px;
          height: 160px;
          box-sizing: border-box;
          padding-right: 15px;
          
          .el-col{
            img{
                width: 100%;
                height: 100%;
            }
            p{
                color: $color-font-second;
                padding-top: 5px;
            }
            div{
                padding-top: 30px;
                border-bottom: 1px solid $color-back-first;
                padding-bottom: 10px;

                span{
                    font-size: 14px;
                    color: $color-font-second;

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
  }
}
</style>
<style lang="scss">
@import "@/assets/styles/vars.scss";
.base{
    .el-tabs__content{
        overflow:inherit;
    }
    .el-tabs__nav-scroll{
        background-color: $color-back-first;
    }
    .el-tabs__item.is-active{
        background-color: $color-primary;
        color: #fff !important;
    }
    .el-tabs__active-bar{
        background-color:transparent;
    }
    .el-tabs--top .el-tabs__item.is-top:nth-child(2){
        padding-left:20px;
    }
    .el-tabs--top .el-tabs__item.is-top:last-child{
        padding-right:20px;
    }
}
</style>
