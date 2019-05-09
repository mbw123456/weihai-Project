<template>
  <div class="case">
    <!-- 这是根节点 -->
    <div class="about-inner">  
      <div class="need-breadcrumb-inner">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>成功案例</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="4">
          <CaseHeader/>
        </el-col>
        <el-col :span="19" :offset="1" class="about-rightbox">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-col>
      </el-row>
      

      
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import CaseHeader from '@/components/CaseHeader.vue';

export default {
  name: "Case",
  components:{ CaseHeader }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.case{
  .about-inner{
    width: 1140px;
    margin: 20px auto;
    margin-top:0;

    .need-breadcrumb-inner{
      padding: 15px 0;
    }
    
  }
}
</style>
