<template>
  <div class="about">
    <!-- 这是根节点 -->
    <div class="about-inner">  
      <el-row>
        <el-col :span="4">
          <AboutHeader/>
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
import AboutHeader from '@/components/AboutHeader.vue';

export default {
  name: "About",
  components:{ AboutHeader }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.about{
  .about-inner{
    width: 1140px;
    margin: 20px auto;
    min-height: 600px;
    
    .about-rightbox{
      background-color: #fff;
      box-sizing: border-box;
      padding: 15px;
      box-shadow: 0 3px 5px rgba($color: #000000, $alpha: 0.1);
      border-radius: 5px;
      min-height: 500px;
    }
  }
}
</style>
