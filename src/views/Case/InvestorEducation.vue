<template>
  <div class="investorEducation" v-loading="loading">
    <!-- 这是根节点 -->
    <ul class="document-list">
      <li v-for="(item,key) in documentList" :key="key">
        <el-row>
          <el-col :span="18">
            <p v-if="item.id == '0c34c91d-af67-4c4a-8b9c-379b32dc04c9'">{{item.title}}（来源：中国证券业协会）</p>
            <p v-else-if="item.id == '99e8b90a-1927-43e0-b3a9-82f208981980'">{{item.title}}（来源：中国基金业协会）</p>
            <p v-else>{{item.title}}</p>
          </el-col>
          <el-col :span="6" style="text-align:right;">
            <el-button type="primary" plain size="mini" @click="downloadFile(item)">下载</el-button>
            <el-button type="primary" plain size="mini" @click="showLegal(key)" :disabled="true" >查看</el-button>
          </el-col>
        </el-row>
      </li>
    </ul>
    


    <el-dialog :title="item.title" fullscreen :visible.sync="item.dialogVisible" v-for="(item,key) in documentList" :key="key">
      <div class="document-dialog">
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
  name: "InvestorEducation",
  data(){
    return {
      documentList:[],
      loading:true
    }
  },
  methods:{
    showLegal(key){
			this.documentList[key].dialogVisible = true;
    },
    
    getData(){
      this.$httpGet('/pc/document/hjy_investorEducation').then(res=>{
        this.loading = false;
         if(res){
           this.documentList = res.tbFundNewsList_FWTK;
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
      if (this.$route.name === 'investorEducation') {
        this.documentList = new Array();
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
.investorEducation{
  .document-list{
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
  .document-dialog{
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
