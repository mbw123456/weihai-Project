<template>
  <div class="need-publish">
    <h1 class="project-title">我的成果</h1>
    <h2 class="project-title-small"><span>基础信息</span></h2>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="width:500px;" class="demo-ruleForm">
      <el-form-item label="成果名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="输入成果名称"></el-input>
      </el-form-item>

      <el-form-item label="成果所属" prop="name">
        <el-input v-model="ruleForm.name" placeholder="输入成果所属人或机构"></el-input>
      </el-form-item>

      <el-form-item label="所属行业" prop="region">
        <el-select v-model="ruleForm.region" placeholder="输入成果所属行业" style="width:100%;">
          <el-option v-for="(item,key) in optionDemo" :key="key" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="联系人" prop="name">
        <el-input v-model="ruleForm.name" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="联系方式" prop="name">
        <el-input v-model="ruleForm.name" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="专利类型" prop="region">
        <el-select v-model="ruleForm.region" placeholder="" style="width:100%;">
          <el-option v-for="(item,key) in optionDemo" :key="key" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="技术成熟度" prop="region">
        <el-select v-model="ruleForm.region" placeholder="" style="width:100%;">
          <el-option v-for="(item,key) in optionDemo" :key="key" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="成果标签">
        <el-input v-model="inputValue" placeholder="为项目加上最重要的需求标签，最多3个" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
      </el-form-item>
      <div class="tag" v-if="this.dynamicTags.length !== 0">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          size="medium"
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
      </div>


      <h2 class="project-title-small"><span>成果详情</span></h2>

      <el-form-item label="需求详情" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" rows="5" placeholder="例如：1、需要解决焊接易脱落问题；2、系统稳定性问题；"></el-input>
      </el-form-item>


      <h2 class="project-title-small"><span>成果附件</span></h2>

      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="handleChange"
        :file-list="fileList">
        <el-button size="small" type="primary" style="width:480px; height:40px;" icon="el-icon-link">添加附件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>


      <el-form-item style="margin-top:50px;">
        <el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
        <el-button @click="resetForm('ruleForm')">保存草稿</el-button>
      </el-form-item>
    </el-form>



  </div>
</template>

<script>

export default {
  name: "need-publish",
  data() {
    return {
      //获取public路径
      publicPath: process.env.BASE_URL,
      dynamicTags: [],
      inputValue: '',
      optionDemo:['15万~20万','25万~30万','35万~40万'],
      select: '',
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],


      ruleForm: {
        name: '',
        region: '',
        region1: [],
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        day:''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        region1: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        day: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }

    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputValue = '';
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    }

  },
  mounted() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.need-publish {
  position: relative;
  background: url(~@/assets/img/weihai-center_07.png) no-repeat 700px 70px;
  background-size: 150px;
  background-color: #fff;
  min-height: 590px;
  box-sizing: border-box;
  border: 1px solid $color-back-second;

  .project-title{
    font-size: 16px;
    color: $color-primary;
    line-height: 50px;
    padding: 0 15px;
    border-bottom: 1px solid $color-back-second;
    background: url(~@/assets/img/weihai-center_03.png) no-repeat 800px center;
    background-size: 40px;
  }
  .project-title-small{
    font-size: 15px;
    padding: 15px 20px;

    span{
      border-bottom:2px solid $color-primary;
      padding-bottom: 5px;
    }
  }
  .tag{
    padding-left:100px;
    margin-top: -15px;
    margin-bottom: 10px;
  }
  .upload-demo{
    margin-left: 20px;
  }
  
}
</style>
<style lang="scss">
.need-publish {
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .day .el-select .el-input {
      width: 80px;
    }
}
</style>

