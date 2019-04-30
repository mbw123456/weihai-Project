<template>
  <div class="header">
    <!-- 这是根节点 -->
    <div class="el-header">
      <div class="header-top">
        <el-row :gutter="0">
          <el-col :span="12">
            <div class="header-top-left">
              威海市总工会首页
              <span>|</span>网址导航
            </div>
          </el-col>
          <el-col :span="12" :offset="0">
            <div class="header-top-right" v-if="this.$store.state.autoLogin != null">
              <!-- <el-button @click="inClick">点击存储为登录状态</el-button>
							<el-button @click="outClick">点击存储为退出状态</el-button>
              <el-button>{{this.$store.state.autoLogin}}</el-button>-->
              您好,
              <router-link to="/login">去登录</router-link>
              <router-link to="/register">免费注册</router-link>
              <router-link to="/register" style="color:#606266;">帮助中心</router-link>
              <span>
                <i class="el-icon-phone"></i>咨询热线：1500000000
              </span>
            </div>
            <div class="header-top-right" v-else>
              <router-link to="/account">{{this.$store.state.custName}}</router-link>
              <router-link to="/register" style="color:#606266;">帮助中心</router-link>
              <a @click="outClick">退出</a>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="header-center">
        <el-row :gutter="0">
          <el-col :span="10">
            <img src="@/assets/img/weihai_index1_03.png" alt>
          </el-col>
          <el-col :span="10">
            <el-autocomplete
              popper-class="my-autocomplete"
              class="my-input"
              v-model="state"
              :fetch-suggestions="querySearch"
              :placeholder="holder"
              @select="handleSelect2"
            >
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="搜需求" value="0"></el-option>
                <el-option label="搜需求" value="1"></el-option>
              </el-select>
              <el-button slot="append">搜索</el-button>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">{{ item.address }}</span>
              </template>
            </el-autocomplete>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button class="header-button" type="primary">免费发布需求</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="header-bottom">
        <div class="header-bottom-inner">
          <el-menu
            :default-active="onRoutes"
            class="el-menu-demo"
            mode="horizontal"
            :router="true"
            @select="handleSelect"
          >
            <div>热门需求</div>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/shop">找需求</el-menu-item>
            <el-menu-item index="/about">找服务</el-menu-item>
            <el-menu-item index="/about1">成功案例</el-menu-item>
            <el-menu-item index="/account">个人中心</el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const holderArr = ["请输入基金代码/名称/简拼", "请输入基金公司名称"];

export default {
  name: "Header",
  data() {
    return {
      activeIndex: "/",
      name: "",
      restaurants: [], //search
      state: "",
      select: "0",
      holder: holderArr[0],
      compsList: []
    };
  },
  watch: {
    select(val) {
      //TODO: 清空文本框内容
      this.state = "";
      if (val == 0) {
        this.holder = holderArr[0];
      } else {
        this.holder = holderArr[1];
        this.restaurants = this.compsList;
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
    },

    handleSelect2(key, keyPath) {
      // if (this.select == 0) {
      //   this.$router.push({
      //     path: "/funddetails",
      //     query: {
      //       fundcode: key.fundcode,
      //       fundtype: key.fundtype
      //     }
      //   });
      // } else {
      //   this.$router.push({
      //     path: "/companydetails/" + key.comp_id
      //   });
      // }
    },

    // getFundList(str, cb) {
    //   this.$httpGet("/index/fundsList", { code: str }).then(res => {
    //     let arr = res.fundsList;
    //     let _fundsList = arr.map(function(item) {
    //       let obj = {};
    //       obj.value = item.f_name;
    //       obj.fundcode = item.f_windcode;
    //       obj.fundtype = item.f_type;
    //       obj.address = item.f_comp_name;
    //       return obj;
    //     });
    //     cb(_fundsList);
    //   });
    // },

    //search
    querySearch(queryString, cb) {
      if (this.select == 0) {
        // this.getFundList(queryString, cb);
      } else {
        var results = queryString
          ? this.restaurants.filter(this.createFilter(queryString))
          : this.restaurants; //restaurants.filter(this.createFilter)为正常函数。加括号是为了传参，但同时也执行了函数，所以createFilter函数需要返回一个函数。返回的函数才是需要调用的函数。restaurant接收的是restaurants
        // 调用 callback 返回建议列表的数据
        cb(results);
      }
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
        );
      };
    },
    inClick() {
      this.$store.commit("changeAutoLogin", "1");
    },
    outClick() {
      this.$store.commit("changeAutoLogin", "0");
      if (
        this.$route.name == "asset" ||
        this.$route.name == "plan" ||
        this.$route.name == "detail" ||
        this.$route.name == "invite" ||
        this.$route.name == "set" ||
        this.$route.name == "risk" ||
        this.$route.name == "bankcard" ||
        this.$route.name == "purchase" ||
        this.$route.name == "invest"
      ) {
        this.$router.push("/");
      }
    }
  },
  mounted() {
    console.log(this.$store.state.autoLogin);
    //刷新页面的时候，导航正确高亮
    // this.activeIndex=this.$route.fullPath;
    // console.log(this.$route.matched[1].path);
    // this.activeIndex=this.$route.matched[1].path;
    //this.restaurants = this.loadAll();
    this.$httpGet("/index/compsList")
      .then(res => {
        this.compsList = res.compsList;
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log("访问接口失败" + err);
      });
  },
  computed: {
    onRoutes() {
      // this.$route.path
      // console.log(this.$route.name);
      if (this.$route.name == "") {
        return "/";
      } else if (
        this.$route.name == "shop" ||
        this.$route.name == "funddetails" ||
        this.$route.name == "companydetails" ||
        this.$route.name == "fundAnno"
      ) {
        return "/shop";
      } else if (
        this.$route.name == "about_root" ||
        this.$route.name == "about_anno" ||
        this.$route.name == "about_annoDetail" ||
        this.$route.name == "about_legal" ||
        this.$route.name == "about_document" ||
        this.$route.name == "about_help" ||
        this.$route.name == "about_investorEducation" ||
        this.$route.name == "about_optionGuide" ||
        this.$route.name == "about_complain"
      ) {
        return "/about";
      } else if (
        this.$route.name == "asset" ||
        this.$route.name == "plan" ||
        this.$route.name == "detail" ||
        this.$route.name == "invite" ||
        this.$route.name == "set" ||
        this.$route.name == "risk" ||
        this.$route.name == "bankcard" ||
        this.$route.name == "purchase" ||
        this.$route.name == "invest"
      ) {
        return "/account";
      } else {
        return "/";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.el-header {
  padding: 0;
  background-color: #fff;

  .header-top {
    width: 100%;
    background-color: $color-back-third;
    border-bottom: 1px solid $color-back-second;

    .el-row {
      width: 1140px;
      margin: 0 auto;

      .header-top-left {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: $color-font-second;

        span {
          margin: 0 10px;
          color: $color-back-first;
        }
      }

      .header-top-right {
        height: 30px;
        line-height: 30px;
        text-align: right;
        font-size: 12px;
        color: $color-font-second;

        a {
          padding: 3px 10px;
          border-right: 1px solid $color-back-second;
          color: red;

          &:last-child {
            border: none 0;
            color: $color-font-second;
          }
          &:hover {
            opacity: 0.5;
          }
        }
        span {
          padding: 3px 10px;
          color: $color-font-third;
        }
      }
    }
  }
  .header-center {
    width: 1140px;
    margin: 0 auto;
    height: 110px;
    box-sizing: border-box;
    padding-top: 30px;

    .el-autocomplete {
      width: 400px;
      float: right;
      margin-top: 15px;
    }

    .el-select .el-input {
      width: 130px;
      
    }
    .el-input-group__prepend {
      background-color: #fff;
    }
    .header-button {
      margin-top: 15px;
    }
  }
  .header-bottom {
    height: 50px;

    .header-bottom-inner {
      width: 1140px;
      margin: 0 auto;

      .el-menu.el-menu--horizontal {
        border: none 0;
      }
      .el-menu--horizontal > .el-menu-item.is-active{
          color: $color-primary;
          border-width: 4px;
      }
      .el-menu-item {
        font-size: 16px;
        height: 50px;
        margin-left: 70px;
        line-height: 50px;
      }
      div {
        float: left;
        width: 220px;
        line-height: 50px;
        background-color: $color-primary;
        color: #fff;
        text-align: center;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
    }
  }
}

.my-autocomplete {
  li {
    .name {
      padding-top: 5px;
      line-height: 25px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      padding-bottom: 5px;
      line-height: 15px;
      font-size: 12px;
      color: #b4b4b4;
      display: block;
    }
    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/styles/vars.scss";
.my-input .el-select .el-input {
  width: 90px;
}
.my-input .el-input-group__prepend {
  background-color: #fff;
  border-color:$color-primary;
}
.my-input .el-input__inner {
  background-color: #fff;
  border-color:$color-primary;

  &:hover{
    border-color:$color-primary;
  }
}
.my-input .el-input-group__append {
  background-color: $color-primary;
  border-color:$color-primary;
  color:#fff;
}
</style>
