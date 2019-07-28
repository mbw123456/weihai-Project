<template>
  <div class="innovation-detail">
    <!-- 这是根节点 -->

    <div class="project-list">
      <div class="project-list-inner">
        <div class="article">
          <h4>CSS3 块级元素，文本溢出操作 -webkit-line-clamp</h4>
          <h5>
            大家经常用的css3属性text-overflow是针对单行文本溢出的操作，那块级元素的文本溢出要怎样处理呢？
            需要用到-webkit-line-clamp:
            说明：
            限制在一个块元素显示的文本的行数。
            -webkit-line-clamp 是一个 不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。
            为了实现该效果，它需要组合其他外来的WebKit属性。常见结合属性：
            display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
            -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
            text-overflow，可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。
          </h5>
          <h5>
            -webkit-line-clamp
            默认值： ? ?表示不清楚；
            适用于：块元素
            继承性：无
            动画性：否
            计算值：指定的值
            取值：
            块元素显示的文本的行数。
            * CSS3新增属性可能存在描述错误及变更，仅供参考，持续更新
            兼容性：
            支持版本\类型
            IE
            Firefox
            Safari
            Chrome
            Opera
            桌面 no no yes yes yes(webkit)
            移动端 no no yes yes ?
            ?表示不清楚
            对应的firefox可以使用 -moz-appearance属性
            iOS 2.0及更高版本的Safari浏览器可用
            Android尚不明确
          </h5>
        </div>

        <h2 class="comment-title">评论区</h2>
        <div class="comment">
          
          <div class="content" v-for="(item,key) in dataBox" :key="key">
            <img :src="item.imgUrl" alt="">
            <div>
              <h4>{{item.userName}}<span>{{item.time}}</span></h4>
              <h5>{{item.content}}</h5>
              <el-button @click="commentMe(item.userName)" type="text">回复</el-button>
            </div>

            <div v-if="item.children" style="background-color:#eee; margin-left:50px; padding-left:20px; margin-bottom:10px;">
              <div style="padding:0; padding-bottom:15px; border-bottom:1px dashed #ddd;" v-for="(children,index) in item.children" :key="index">
                <h5>{{children.content}}</h5>
                <h4> --  {{children.userName}}<span>{{children.time}}</span></h4>
              </div>
            </div>
          </div>

          <div class="inputArea">
            <div>
              <img src="/img/account-back_03.png" alt="">
              <el-input
              ref="textarea"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6}"
                :placeholder="placeholder"
                v-model="textarea"
                maxlength="100"
                rows="5"
                show-word-limit
              >
              </el-input>
            </div>
            <div style="text-align:right; padding-top:15px;">
              <el-button @click="placeholder = '请输入评论';textarea = ''" style="float:left; margin-left:50px;">回复楼主</el-button>
              <el-button @click="addComment" type="primary">发布评论</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "innovation-list",
  //   components:{
  // 	  VueEvent,
  //   },
  data() {
    return {
      textarea:'',
      placeholder:'请输入评论',
      myImgUrl:'/img/account-back_03.png',
      myName:'mbw',
      myTime:'2018年09月17日',

      commentName:'',

      dataBox:[
        {
          imgUrl:'/img/account-back_03.png',
          userName:'mabowen',
          time:'2018年09月17日',
          content:'写得真的很好，很全面，而且还会附上参考的文章，作者有心了，非常感谢',
          children:[
            {
              imgUrl:'/img/account-back_03.png',
              userName:'aaaabbbb',
              time:'2018年09月17日',
              content:'非常感谢',
            }
          ]
        },
        {
          imgUrl:'/img/account-back_03.png',
          userName:'abc',
          time:'2018年09月17日',
          content:'写得真的很好，很全面，而且还会附上参考的文章，作者有心了，非常感谢',
          children:[],
        },
        {
          imgUrl:'/img/account-back_03.png',
          userName:'www',
          time:'2018年09月17日',
          content:'写得真的很好，很全面，而且还会附上参考的文章，作者有心了，非常感谢',
          children:[],
        }
      ]
    };
  },
  methods: {
    addComment(){
      if(this.placeholder == '请输入评论'){
        this.dataBox = [
          ...this.dataBox,
          {
            imgUrl:this.myImgUrl,
            userName:this.myName,
            time:this.myTime,
            content:this.textarea,
            children:[]
          }
        ]
      }else{
        this.dataBox.forEach(element => {
          if(element.userName == this.commentName){
            console.log(element);
            element.children = [
              ...element.children,
              {
                imgUrl:this.myImgUrl,
                userName:this.myName,
                time:this.myTime,
                content:this.textarea,
              }
            ];
          }
        });
      }
      
    },
    commentMe(name){
      console.log(name);
      this.commentName = name;
      this.placeholder = `回复${name}:`;
      this.$refs['textarea'].focus();
      console.log(this.$root.$children[0].$refs['scrollbar'].wrap.scrollTop);
      this.$root.$children[0].$refs['scrollbar'].wrap.scrollTop = document.documentElement.clientHeight;
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.innovation-detail {
  border-top: 1px solid $color-back-second;
  // min-height: 900px;
  .project-list {
    width: 100%;
    min-height: 700px;
    margin-top: 40px;
    padding-bottom: 30px;

    .project-list-inner {
      width: 1140px;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 15px 25px;
      background-color: #fff;

      .article {
        h4 {
          font-size: 17px;
          margin-bottom: 20px;
        }
        h5 {
          font-weight: normal;
          font-size: 15px;
          color: $color-font-second;
          padding-bottom: 10px;
          text-indent: 2em;
          line-height: 25px;
        }
      }
      .comment-title{
        font-size: 16px;
        margin-top: 40px;
        margin-bottom: 15px;
      }
      .comment {
        border-top:1px solid $color-back-first;

        .content{
          padding-top: 15px;
          position: relative;
          border-bottom: 1px solid $color-back-second;

          img{
            width: 32px;
            height: 32px;
            display: block;
            float: left;
            border-radius: 50%;
          }
          div{
            padding-left: 50px;

            h4{
              font-size: 13px;
              color: $color-primary;
              font-weight: normal;

              span{
                color: $color-font-third;
                margin-left: 15px;
              }
            }
            h5{
              font-size: 14px;
              font-weight: normal;
              color: $color-font-first;
              padding: 15px 0;
              padding-bottom: 5px;
            }

          }
          
        }
        .inputArea{
          background-color: #FAFAFA;
          padding:15px;
          padding-top: 30px;

          div{
            overflow: hidden;
            position: relative;

            img{
              width: 32px;
              height: 32px;
              display: block;
              border-radius: 50%;
              position: absolute;
              left: 0;
              top: 0;

            }
            .el-textarea{
              box-sizing: border-box;
              padding-left: 50px;
            }
          }

        }
      }
    }
  }
}
</style>

