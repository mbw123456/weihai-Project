<template>
  <div class="legal" v-loading="loading">
    <!-- 这是根节点 -->
    <ul class="legal-list">
      <li v-for="(item,key) in legalList" :key="key">
        <el-row>
          <el-col :span="18">
            <p>{{item.title}}</p>
          </el-col>
          <el-col :span="6" style="text-align:right;">
            <el-button type="primary" plain size="mini" @click="downloadFile(item)">下载</el-button>
            <el-button type="primary" plain size="mini" @click="showLegal(key)">查看</el-button>
          </el-col>
        </el-row>
      </li>
    </ul>
    
    <div class="legal-bottom">
      <h4>反洗钱举报</h4>
      <h5>基金投资人也可通过书信、传真、电子邮件等方式，向中国证监会和中国证券投资基金业协会投诉。</h5>
      <img src="@/assets/img/legal-1.png">
      <h5>中国证券监督管理委员会
<br>地址:中国北京西城区金融大街19号富凯大厦
<br>邮编(Zip):100033
<br>信访投诉电话:010－66210182、66210166</h5>
      <h5>中国证券监管管理委员会大连监管局
<br>举报、投诉电话：0411-88008567
<br>联 系 人：王澎涛
<br>邮政编码：116001
<br>通讯地址：大连市中山区中山路136号希望大厦15层</h5>
    <img src="@/assets/img/legal-2.png">
    <h5>中基协
<br>私募基金咨询热线：400-017-8200
<br>地址：北京市西城区金融大街20号交通银行大厦B座9层 中国基金业协会</h5>
    <h5>大连市基金业协会
<br>联系电话：0411-39053707
<br>联系地址：西岗区PE万达大厦1102室</h5>
    </div>


		
    <el-dialog  fullscreen :visible.sync="item.dialogVisible" v-for="(item,key) in legalList" :key="key">
      <div class="legal-dialog">
         <h3 style="text-align:center">{{item.title}}</h3>
        <h6 v-html="item.newsContent"></h6>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" style="margin-top:20px;"  @click="item.dialogVisible = false">我已阅读</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Legal",
  data(){
    return {
      legalList:[],
      loading:true
    }
  },
  methods:{
    showLegal(key){
			this.legalList[key].dialogVisible = true;
    },
    
    getData(){
      this.$httpGet('/pc/document/hjy_legal').then(res=>{
        this.loading = false;
         if(res){
           this.legalList = res.tbFundNewsList_FLFG;
         }
      })
    },

    downloadFile(item){
      axios({
            method: 'get',
            url: '/pc/document/downLoad',
            params: {
                id: item.id
            },
            responseType: 'blob'
        }).then(response => {
            this.download(response)
        }).catch((error) => {

        })
    },

    download (data) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data.data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        let fileName = decodeURIComponent(data.headers.realname);
        console.log(fileName);
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
    }

  },

  mounted(){
    this.getData();
  },

   watch: {
    '$route' (to,from) {
      if (this.$route.name === 'legal') {
        this.legalList = new Array();
        this.loading = true;
        this.getData();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.legal{
  .legal-list{
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
  .legal-bottom{
    padding-top: 30px;
    padding-left: 10px;
    h4{
      font-size: 17px;
      color: $color-font-second;
      font-weight: normal;
    }
    h5{
      font-size: 14px;
      color: $color-font-third;
      font-weight: normal;
      padding: 10px 0;
    }
  }
  .legal-dialog{
    h4{
      font-size: 17px;
      font-weight: normal;
      margin-top: 10px;
    }
    h5{
      font-size: 14px;
      font-weight: normal;
      color: $color-font-third;
      margin: 8px;
    }
    h6{
      font-size: 14px;
      font-weight: normal;
      margin-top: 10px;
    }
  }
}
</style>
