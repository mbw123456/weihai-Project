<template>
  <div class="risk"><!-- 这是根节点 -->
	<div class="risk-inner">
		<h3 class="risk-title">风险测评</h3>
		<h4 class="risk-desc"></h4>
		<el-alert
			title="本问卷旨在了解您对投资风险的承受意愿及能力*以下题目均为单选题"
			type="warning"
			close-text="知道了">
		</el-alert>

		<el-form :model="form" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="risk-questions">

			<el-form-item :label="(index+1)+'、'+q.Question" :prop="'question[' + index + ']' " v-for="(q,index) in tableData" :key="index">
                <el-radio-group v-model="form.question[index]">
                    <el-radio v-for="(item,key) in q.Answer" :key="key" :label="item.title +'. '+ item.body"></el-radio>
                </el-radio-group>
            </el-form-item>


			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')" :loading="btnloading">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>



	</div>


	

  </div>
</template>

<script>


export default {
	name: 'Risk',
	data(){
		return {
			btnloading:false,
			form:{
                question:{}
            },
			rules: {
				question: [
					{ required: true, message: '请选择一个选项', trigger: 'change' },
					{ required: true, message: '请选择一个选项', trigger: 'change' },
					{ required: true, message: '请选择一个选项', trigger: 'change' },
					{ required: true, message: '请选择一个选项', trigger: 'change' },
					{ required: true, message: '请选择一个选项', trigger: 'change' },
					{ required: true, message: '请选择一个选项', trigger: 'change' },
					{ required: true, message: '请选择一个选项', trigger: 'change' },
					{ required: true, message: '请选择一个选项', trigger: 'change' },
					{ required: true, message: '请选择一个选项', trigger: 'change' },
					{ required: true, message: '请选择一个选项', trigger: 'change' },
					{ required: true, message: '请选择一个选项', trigger: 'change' },
					{ required: true, message: '请选择一个选项', trigger: 'change' },
				],
			},
			tableData:[{
				"Question": "您的主要收入来源是：",
				"vModel":"question0",
				"Answer": [{ 
					"title": "A",
					"body" : "工资、劳务报酬",
					},{ 
					"title": "B",
					"body" : "生产经营所得",
					},{ 
					"title": "C",
					"body" : "利息、股息、转让证券等金融性资产收入",
					},{ 
					"title": "D",
					"body" : "出租、出售房地产等非金融性资产收入",
					},{ 
					"title": "E",
					"body" : "无固定收入",
				}]
			},{
				"Question": "您的家庭可支配年收入为（折合人民币）？",
				"Answer": [{ 
					"title": "A",
					"body" : "50 万元以下",
					},{ 
					"title": "B",
					"body" : "50—100 万元",
					},{ 
					"title": "C",
					"body" : "100—500 万元",
					},{ 
					"title": "D",
					"body" : "500—1000 万元",
					},{ 
					"title": "E",
					"body" : "1000 万元以上",
				}]
			},{
				"Question": "在您每年的家庭可支配收入中，可用于金融投资（储蓄存款除外）的比例为？",
				"Answer": [{ 
					"title": "A",
					"body" : "小于 10%",
					},{ 
					"title": "B",
					"body" : "10%至 25%",
					},{ 
					"title": "C",
					"body" : "25%至 50%",
					},{ 
					"title": "D",
					"body" : "大于 50%",
				}]
			},{
				"Question": "您是否有尚未清偿的数额较大的债务，如有，其性质是",
				"Answer": [{ 
					"title": "A",
					"body" : "没有",
					},{ 
					"title": "B",
					"body" : "有，住房抵押贷款等长期定额债务",
					},{ 
					"title": "C",
					"body" : "有，信用卡欠款、消费信贷等短期信用债务",
					},{ 
					"title": "D",
					"body" : "有，亲戚朋友借款",
				}]
			},{
				"Question": "您的投资知识可描述为：",
				"Answer": [{ 
					"title": "A",
					"body" : "有限：基本没有金融产品方面的知识",
					},{ 
					"title": "B",
					"body" : "一般：对金融产品及其相关风险具有基本的知识和理解",
					},{ 
					"title": "C",
					"body" : "丰富：对金融产品及其相关风险具有丰富的知识和理解",
				}]
			},{
				"Question": "您的投资经验可描述为：",
				"Answer": [{ 
					"title": "A",
					"body" : "除银行储蓄外，基本没有其他投资经验",
					},{ 
					"title": "B",
					"body" : "购买过债券、保险等理财产品",
					},{ 
					"title": "C",
					"body" : "参与过股票、基金等产品的交易",
					},{ 
					"title": "D",
					"body" : "参与过权证、期货、期权等产品的交易",
				}]
			},{
				"Question": "您有多少年投资基金、股票、信托、私募证券或金融衍生产品等风险投资品的经验？",
				"Answer": [{ 
					"title": "A",
					"body" : "没有经验",
					},{ 
					"title": "B",
					"body" : "少于 2 年",
					},{ 
					"title": "C",
					"body" : "2 至 5 年",
					},{ 
					"title": "D",
					"body" : "5 至 10 年",
					},{ 
					"title": "E",
					"body" : "10 年以上",
				}]
			},{
				"Question": "您计划的投资期限是多久？",
				"Answer": [{ 
					"title": "A",
					"body" : "1 年以下",
					},{ 
					"title": "B",
					"body" : "1 至 3 年",
					},{ 
					"title": "C",
					"body" : "3 至 5 年",
					},{ 
					"title": "D",
					"body" : "5 年以上",
				}]
			},{
				"Question": "您打算重点投资于哪些种类的投资品种？",
				"Answer": [{ 
					"title": "A",
					"body" : "债券、货币市场基金、债券基金等固定收益类投资品种",
					},{ 
					"title": "B",
					"body" : "股票、混合型基金、股票型基金等权益类投资品种",
					},{ 
					"title": "C",
					"body" : "期货、期权等金融衍生品",
					},{ 
					"title": "D",
					"body" : "其他产品或者服务",
				}]
			},{
				"Question": "以下哪项描述最符合您的投资态度？",
				"Answer": [{ 
					"title": "A",
					"body" : "厌恶风险，不希望本金损失，希望获得稳定回报",
					},{ 
					"title": "B",
					"body" : "保守投资，不希望本金损失，愿意承担一定幅度的收益波动",
					},{ 
					"title": "C",
					"body" : "寻求资金的较高收益和成长性，愿意为此承担有限本金损失",
					},{ 
					"title": "D",
					"body" : "希望赚取高回报，愿意为此承担较大本金损失",
				}]
			},{
				"Question": "假设有两种投资：投资 A 预期获得 10%的收益，可能承担的损失非常小；投资 B 预期获得 30%的收益，但可能承担较大亏损。您会怎么支配您的投资：",
				"Answer": [{ 
					"title": "A",
					"body" : "全部投资于收益较小且风险较小的 A",
					},{ 
					"title": "B",
					"body" : "同时投资于 A 和 B，但大部分资金投资于收益较小且风险较小的 A",
					},{ 
					"title": "C",
					"body" : "同时投资于 A 和 B，但大部分资金投资于收益较大且风险较大的 B",
					},{ 
					"title": "D",
					"body" : "全部投资于收益较大且风险较大的 B",
				}]
			},{
				"Question": "您认为自己能承受的最大投资损失是多少？",
				"Answer": [{ 
					"title": "A",
					"body" : "10%以内",
					},{ 
					"title": "B",
					"body" : "10%-30%",
					},{ 
					"title": "C",
					"body" : "30%-50%",
					},{ 
					"title": "D",
					"body" : "超过 50%",
				}]
			}],
		}
	},
	methods:{
		 getPointByQue(index, radioValue){
	
			if(index == "0"){
				if(radioValue == "A"){
					return "10";
				} else if (radioValue == "B") {
					return "8";
				} else if (radioValue == "C") {
					return "4";
				} else if (radioValue == "D") {
					return "4";
				} else if (radioValue == "E") {
					return "0";
				}
			}
			
			if(index == "1"){
				if(radioValue == "A"){
					return "2";
				} else if (radioValue == "B") {
					return "4";
				} else if (radioValue == "C") {
					return "6";
				} else if (radioValue == "D") {
					return "8";
				} else if (radioValue == "E") {
					return "10";
				}
			}
			
			if(index == "2"){
				if(radioValue == "A"){
					return "2";
				} else if (radioValue == "B") {
					return "4";
				} else if (radioValue == "C") {
					return "6";
				} else if (radioValue == "D") {
					return "8";
				}
			}
			
			if(index == "3"){
				if(radioValue == "A"){
					return "8";
				} else if (radioValue == "B") {
					return "6";
				} else if (radioValue == "C") {
					return "4";
				} else if (radioValue == "D") {
					return "0";
				}
			}
			
			if(index == "4"){
				if(radioValue == "A"){
					return "2";
				} else if (radioValue == "B") {
					return "4";
				} else if (radioValue == "C") {
					return "6";
				}
			}
			
			if(index == "5"){
				if(radioValue == "A"){
					return "2";
				} else if (radioValue == "B") {
					return "4";
				} else if (radioValue == "C") {
					return "7";
				} else if (radioValue == "D") {
					return "8";
				}
			}
			
			if(index == "6"){
				if(radioValue == "A"){
					return "0";
				} else if (radioValue == "B") {
					return "2";
				} else if (radioValue == "C") {
					return "4";
				} else if (radioValue == "D") {
					return "7";
				} else if (radioValue == "E") {
					return "10";
				}
			}
			
			if(index == "7"){
				if(radioValue == "A"){
					return "2";
				} else if (radioValue == "B") {
					return "4";
				} else if (radioValue == "C") {
					return "6";
				} else if (radioValue == "D") {
					return "8";
				}
			}
			
			if(index == "8"){
				if(radioValue == "A"){
					return "2";
				} else if (radioValue == "B") {
					return "4";
				} else if (radioValue == "C") {
					return "6";
				} else if (radioValue == "D") {
					return "8";
				}
			}
			
			
			if(index == "9"){
				if(radioValue == "A"){
					return "2";
				} else if (radioValue == "B") {
					return "4";
				} else if (radioValue == "C") {
					return "6";
				} else if (radioValue == "D") {
					return "8";
				}
			}
			
			if(index == "10"){
				if(radioValue == "A"){
					return "2";
				} else if (radioValue == "B") {
					return "4";
				} else if (radioValue == "C") {
					return "6";
				} else if (radioValue == "D") {
					return "8";
				}
			}
			
			if(index == "11"){
				if(radioValue == "A"){
					return "2";
				} else if (radioValue == "B") {
					return "4";
				} else if (radioValue == "C") {
					return "6";
				} else if (radioValue == "D") {
					return "8";
				}
			}
		},
		submitForm(formName) {
			this.btnloading = true;
			var checkFlag = true;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log("valid...:"+valid);
					var strArr = ["001","002","003","004","005","006","007","008","009","0010","0011","0012"];
	
					var answer = "";
	
					var pointList = "";

					for(var i = 0; i< 12; i++){
						var anw = this.form.question[i].substr(0,1);
						console.log("que..." + anw);
						answer += strArr[i]+":"+anw;
						pointList += this.getPointByQue(i,anw);
						if(i != 11){
							answer += "|";
							pointList += "|";
						}
					}
					console.log("answer... : " + answer);
					console.log("pointList... : " + pointList);

					this.$refs[formName].validate((valid) => {
						if (valid) {
							this.$httpPost('pc/myaccount/searchriskresult',{papercode:'005',invtp:'1',iscontinue:'1',answer:answer,pointList:pointList,}).then(res=>{
								console.log("res...:" + JSON.stringify(res));
								if(res.isValid === 'true'){
									this.$message({
										message: '恭喜你提交成功',
										type: 'success',
										center: true
									});
									this.$store.commit('changeRiskResult',res.custrisk_result);
									this.$store.commit('changeRiskTime',res.riskTime);
									this.$store.commit('changeRiskType','yes');
									this.$router.go(-1);
									this.btnloading = false;
								}
							}).catch(err=>{
								this.btnloading = false;
								console.log("error submit");
							});
							
						} else {
							this.btnloading = false;
							console.log('no validate !!');
							return false;
							
						}
					});
					
				} else {
					this.btnloading = false;
					this.$message({
						message: '有未完成的选项',
						type: 'error',
						center: true
					});
					return false;
				}
			});

		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	},
	mounted() {
	},
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/styles/vars.scss';
@import '~@/assets/icon/iconfont.css';
.risk{
	.risk-inner{
		width: 1140px;
		margin: 20px auto;
		background-color: #fff;
		box-sizing: border-box;
		padding: 15px;

		.risk-title{
			font-weight: normal;
			font-size: 17px;
			padding: 10px;
		}
		.risk-questions{
			margin-top: 10px;

			.el-radio{
				margin-bottom: 15px;
				
				.el-radio__label{
					color: $color-font-second;
				}
			}
		}
	}
}

</style>
<style>
.risk-questions .el-radio__label{
	color: #909399;
}
</style>
