<template>
  <div class="base">
    <!-- 这是根节点 -->
    <!-- banner -->
    <el-row  style="width:1140px; margin:20px auto; ">
      <el-col :span="19" style="padding-right:20px;">
        <el-carousel height="500px">
          <el-carousel-item v-for="(item,key) in bannerList" :key="key">
            <div class="banner-box" :style="{backgroundImage: 'url('+publicPath+'img/' + item+ ')'}"></div>
          </el-carousel-item>
        </el-carousel>
        <div class="login-box-left">
            <p>热门需求</p>
            <div v-for="(item,key) in requireTitle" :key="key">
                <h3>{{item.name}}>></h3>
                <h4>
                    <a v-for="(item,num) in item.desc" :key="num">{{item}}</a>
                </h4>
            </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="login-box-right">
          <el-card>
            <img src="@/assets/img/indexElse_03.png" alt="">
            <span>技术共享</span>
          </el-card>
          <el-card>
            <img src="@/assets/img/indexElse_06.png" alt="">
            <span>服务转化</span>
          </el-card>
          <el-card>
            <img src="@/assets/img/indexElse_08.png" alt="">
            <span>免费对接</span>
          </el-card>
          <div class="login-box-phone">
            <h4><i class="el-icon-phone"></i>0411-88892323</h4>
            <h5>热线服务时间</h5>
            <h6>8:30~17:00工作日</h6>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="index-topIcon">
      <div style="width:1140px;margin:0 auto;">
        <el-row>
          <el-col :span="6">
            <img src="@/assets/img/indexElse_11.png" alt="">
            <h4>专家 <span>{{val}}</span> 位</h4>
          </el-col>
          <el-col :span="6">
            <img src="@/assets/img/indexElse_13.png" alt="">
            <h4>高技能人才 <span>{{val}}</span> 位</h4>
          </el-col>
          <el-col :span="6">
            <img src="@/assets/img/indexElse_15.png" alt="">
            <h4>企业 <span>{{val}}</span> 家</h4>
          </el-col>
          <el-col :span="6">
            <img src="@/assets/img/indexElse_17.png" alt="">
            <h4>科研机构 <span>{{val}}</span> 家</h4>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="base-newNeed">
      <div style="width:1140px;margin:0 auto;">
        <p class="base-newNeed-title"><span>最新需求</span></p>

        <el-row class="base-newNeed-inner" :gutter="20">
          <el-col v-for="(item,key) in newBoxList" :key="key" :span="6">
            <div class="box">
              <h6>{{item.status}}</h6>
              <h4>{{item.title}}</h4>
              <h3>
                <el-tag
                  size="small"
                  v-for="item1 in item.tags"
                  :key="item1"
                  type="warning">
                  {{item1}}
                </el-tag>
              </h3>
              <div class="box-inner">
                <div>
                  <p><span>{{item.money}}</span>万</p>
                  <h5>计划投入</h5>
                </div>
                <div>
                  <p><span>{{item.day}}</span>天</p>
                  <h5>解决期限</h5>
                </div>
              </div>
              <el-button type="primary" round>查看详情</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>


    <div class="base-newNeed-two">
      <div style="width:1140px;margin:0 auto;">
        <p class="base-newNeed-title"><span>专家推荐</span></p>

        <el-row class="base-newNeed-inner" :gutter="20">
          <el-col v-for="(item,key) in newBoxList" :key="key" :span="12">
            <el-card>
              <el-row>
                <el-col :span="10" class="imgbox">
                  <img src="@/assets/img/indexElse_24.png" alt="">
                </el-col>
                <el-col :span="13" :offset="1">
                  <p>庞博士<span>专家<img src="@/assets/img/indexElse_11.png" alt=""></span></p>
                  <h4>工作经验<span>11</span>年</h4>
                  <h4>擅长行业<span>自动化</span></h4>
                  <h5>所属机构：<span>烟台东方威智电子科技有限公司</span></h5>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="base-newNeed-three">
      <div style="width:1140px;margin:0 auto;">
        <p class="base-newNeed-title"><span>科研机构</span></p>

        <el-row :gutter="20">
          <el-col v-for="(item,key) in 8" :key="key" :span="6">
            <div class="box">
              <img src="@/assets/img/account-back_03.png" alt="">
              <span>方硕电子科技</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="base-newNeed-fourth">
      <div style="width:1140px;margin:0 auto;">
        <el-row :gutter="50">
          <el-col :span="12">
            <div class="box">
              <p class="base-newNeed-title">
                <span>政策咨询</span>
                <el-button type="text">查看更多>></el-button>
              </p>

              <div v-for="(item,key) in 5" :key="key">
                <el-button type="text" @click="goToDetail(key)">加大高端制造业及技术改造投资</el-button>
                <span>2019-05-12</span>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="box">
              <p class="base-newNeed-title"><span>科研机构</span></p>
            </div>
          </el-col>
        </el-row>
        

      </div>
    </div>

    <!-- <div class="base-bigTitle">
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
    </div> -->

    <!-- <div class="base-bigTitle">
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
    </div> -->




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
      val:234,
      tags:[1,2,3,4],
      //banner
      bannerList: ["weihai_index_06.png","weihai_index_06.png"],
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
            name: "其他", 
        },
      ],
      activeName: 'first',
      newBoxList:[
          { 
            title: "金属表面喷涂技术", 
            tags:['自动化','强粘和性','需耐磨蚀'],
            money:35,
            day:90,
            status:'进行中'
          },
          { 
            title: "金属表面喷涂技术", 
            tags:['自动化','强粘和性','需耐磨蚀'],
            money:35,
            day:90,
            status:'进行中'
          },
          { 
            title: "金属表面喷涂技术", 
            tags:['自动化','强粘和性','需耐磨蚀'],
            money:35,
            day:90,
            status:'进行中'
          },
          { 
            title: "金属表面喷涂技术", 
            tags:['自动化','强粘和性','需耐磨蚀'],
            money:35,
            day:90,
            status:'进行中'
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
    goToDetail(index) {
      console.log(index);
        this.$router.push({
        name: "base-detail",
        params: {
          id: index,
        }
      });
    },
    // goToLogin() {
    //     this.$router.push("/login");
    // },
    // goToRegister() {
    //     this.$router.push("/register");
    // },
    // goToAccount() {
    //     this.$router.push("/account");
    // },
    getList(){
				this.$httpGet("/tbRegisterUser/userList").then(res => {
					console.log(res);
				// eslint-disable-next-line no-unused-vars
				}).catch(err => {
					//错误的回调
					// eslint-disable-next-line no-console
					console.log("访问接口失败");
				});
			}
  },
  mounted() {
    // this.getList();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.base {
  position: relative;

  .banner-box {
    height: 500px;
    background-position: center top;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .login-box-right {
    box-sizing: border-box;
    .el-card{
      margin-bottom: 15px;
      &:first-child{
         background: url(~@/assets/img/wh_back_01.png) no-repeat center center;
         background-color: #fff;
      }
      &:nth-child(2){
         background: url(~@/assets/img/wh_back_02.png) no-repeat center center;
         background-color: #fff;
      }
      &:nth-child(3){
         background: url(~@/assets/img/wh_back_03.png) no-repeat center center;
         background-color: #fff;
      }
      
      img{
        width:50px;
      }
      span{
        float: right;
        font-size: 17px;
        color: $color-font-second;
        line-height: 50px;
        padding-right: 20px;
      }
    }
    .login-box-phone{
      box-sizing: border-box;
      border: 1px solid #eee;
      height: 170px;
      background-color: #fff;
      width: 100%;
      padding: 15px;

      h4{
        font-size: 20px;
        font-style: italic;
        color: $color-primary;
        padding: 20px 0;
        border-bottom: 1px dotted $color-primary;
      }
      h5{
        padding-top: 20px;
        font-size: 16px;
        color: $color-primary;
        font-weight: normal;
      }
      h6{
        font-size: 14px;
        color: $color-font-second;
        font-weight: normal;
      }
    }
  }
  .login-box-left {
    box-sizing: border-box;
    position: absolute;
    width: 220px;
    height: 500px;
    overflow: hidden;
    background-color:$color-font-first;
    left: 50%;
    margin-left: -570px;
    top: 0px;
    z-index: 101;
    // box-shadow: 0 5px 15px rgba($color: #000000, $alpha: 0.3);
    padding: 15px 25px;
    opacity: .9;
    p{
      width: 150px;
      margin: 0 auto;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 50px;
      background-color: $color-primary;
      color: #fff;
    }
    div{
        padding-bottom: 15px;
        h3{
            font-size: 16px;
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
  .index-topIcon{
    width: 100%;
    padding: 20px 0;
    margin: 0 auto;
    background-color: #fff;

    .el-col{
      text-align: center;
      h4{
        color: $color-font-second;
        font-weight: normal;
        span{
          font-size: 25px;
          color: $color-primary;
          font-weight: bold;
          font-style: italic;
        }
      }
    }
  }
  .base-newNeed{
    width: 100%;
    height: 470px;
    box-sizing: border-box;
    padding: 40px 0;
    background: url(~@/assets/img/weihai-indexback_02.png) no-repeat center center;

    .base-newNeed-title{
      span{
        border-bottom: 4px solid $color-primary;
        font-size: 20px;
        color: $color-primary;
        font-weight: bold;
        padding-bottom: 5px;
      }
    }
    .base-newNeed-inner{
      text-align: center;
      margin-top: 40px;
      .box{
        background-color: #fff;
        box-sizing: border-box;
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 15px;
        padding-bottom: 40px;
        overflow: hidden;
        position: relative;

        h6{
          position: absolute;
          right:-40px;
          top:-10px;
          padding:10px 40px;
          padding-top: 25px;
          font-size: 12px;
          color: $color-primary;
          background-color: $color-primary-second;
          transform:rotate(45deg);
          -ms-transform:rotate(45deg); 	/* IE 9 */
          -moz-transform:rotate(45deg); 	/* Firefox */
          -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
          -o-transform:rotate(45deg);
        }
        h4{
          white-space: nowrap; 
          text-overflow:ellipsis;
          overflow:hidden; 
          font-weight: normal;
          font-size: 18px;
          line-height: 25px;
          color: $color-primary;
          margin-top: 20px;
          text-align: center;
        }
        h3{
          padding: 10px 0;
          text-align: center;
          .el-tag{
            margin: 0 5px;
            font-weight: normal;
          }
        }
        .box-inner{
          overflow: hidden;
          box-sizing: border-box;
          padding: 50px 0;
          div{
            float: left;
            width: 50%;
            text-align: center;
            color: $color-primary;
            box-sizing: border-box;
            
            &:last-child{
              border-left: 1px solid #c1cce1;
            }
          }
          p{
            font-size: 17px;
            span{
              font-size: 28px;
              font-style: italic;
              margin-right: 5px;
            }
          }
          h5{
            color: $color-font-third;
            font-weight: normal;
          }
        }
        .el-button{
          width: 200px;
        }
      }
    }
  }
  .base-newNeed-two{
    width: 100%;
    box-sizing: border-box;
    padding: 40px 0;
    background-color: #fff;

    .base-newNeed-title{
      margin-bottom: 40px;
      span{
        border-bottom: 4px solid $color-primary;
        font-size: 20px;
        color: $color-primary;
        font-weight: bold;
        padding-bottom: 5px;
      }
    }
    .el-card{
      margin-bottom: 15px;
      .imgbox{
        img{
          width: 100%;
          height: 100%;
        }
      }
      p{
        font-size: 18px;
        font-weight: bold;
        color: $color-primary;
        margin-bottom: 30px;
        margin-top: 10px;

        span{
          background-color: $color-primary-second;
          font-size: 14px;
          font-weight: normal;
          padding: 3px 10px;
          margin-left: 10px;
          border-radius: 4px;
          vertical-align: 1px;
          img{
            width: 14px;
            vertical-align: -3px;
          }
        }
      }
      h4{
        font-size: 14px;
        font-weight: normal;
        color: $color-font-second;
        margin-bottom: 5px;

        span{
          margin-left: 15px;
          font-size: 15px;
          color: $color-primary;
          font-weight: bold;
        }
      }
      h5{
        border-top: 1px dashed $color-primary;
        font-weight: normal;
        color: $color-primary;
        margin-top: 10px;
        padding-top: 10px;
      }
    }
  }

  .base-newNeed-three{
    width: 100%;
    box-sizing: border-box;
    padding: 40px 0;

    .base-newNeed-title{
      margin-bottom: 40px;
      span{
        border-bottom: 4px solid $color-primary;
        font-size: 20px;
        color: $color-primary;
        font-weight: bold;
        padding-bottom: 5px;
      }
    }
    .box{
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 10px 15px;
      margin-bottom: 15px;
      border: 1px solid #eee;
      border-radius: 10px;
      img{
        width: 50px;
        height: 50px;
      }
      span{
        vertical-align: 17px;
        margin-left: 40px;
        font-size: 17px;
        color: $color-primary;
      }
    }
  }

  .base-newNeed-fourth{
    width: 100%;
    box-sizing: border-box;
    padding: 40px 0;
    background-color: #fff;

    .base-newNeed-title{
      margin-bottom: 20px;
      border-bottom: 2px solid $color-primary;
      padding-bottom: 10px;
      span{
        
        font-size: 20px;
        color: $color-primary;
        font-weight: bold;
        
      }
      .el-button{
        float: right;
      }
    }
    .box{
      div{
        .el-button{
          padding: 5px 0;
          font-size: 15px;
        }
        span{
          float: right;
          font-size: 15px;
          color: $color-font-third;
          line-height: 27px;
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
