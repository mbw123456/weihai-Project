<template>
  <div class="plan"><!-- 这是根节点 -->
		<el-radio-group v-model="radio3" size="small" style="margin-bottom:20px;" @change="((item)=>{queryType(item, 0)})">
			<el-radio-button 
			:label="item" 
			border 
			v-for="item in dataType3"
			:key="item">
			{{item}}
			</el-radio-button>
		</el-radio-group>

		<div style="min-height:400px;" v-loading="loading" v-show="!noData">
			<div class="plan-list" v-for="(item,key) in planList" :key="key" >
				<h4>{{item.spellstr}}<span>{{item.fundcode}}</span></h4>
				<el-row>
					<el-col :span="4">
						<p>{{item.firstinvestamount}}</p>
						<span>{{item.isfixedquota_str}}</span>
					</el-col>
					<el-col :span="4">
						<p>{{item.periodremark}}</p>
						<span>定投周期</span>
					</el-col>
					<el-col :span="4">
						<p>{{item.nextinvestdate}}</p>
						<span>下一扣款日</span>
					</el-col>
					<el-col :span="5">
						<p>{{item.buyplanpaytype_str}}</p>
						<span>交易方式</span>
					</el-col>
					<el-col :span="4">
						<p>{{item.status_show}}</p>
						<span>状态</span>
					</el-col>
					<el-col :span="3">
						<el-popover
							popper-class="download-popover"
							placement="top"
							width="120"
							trigger="click"
							>
							<div style="text-align: center; margin: 0">
								<img src="@/assets/img/header_phone_ewm.png">
							</div>
							<el-button type="primary" round slot="reference">详情</el-button>
						</el-popover>
					</el-col>
				</el-row>
			</div>
		</div>
		<div v-show="noData" class="asset-nothing">
			<i class="iconfont-hjy icon-hjyqueshengye"></i>
			<h4>暂无定投计划</h4>
		</div>
  </div>
</template>

<script>
export default {
	name: 'Plan',
	data(){
		return {
			//获取public路径
			publicPath: process.env.BASE_URL,

			noData:false,
			title:'',
			loading:true,
			planList:[],
			radio3:'全部',
			dataType3:['全部','执行中','已暂停'],
			type:'ALL',
		}
	},
	methods:{
		queryType(key_type){
			if(key_type == '全部'){
				this.type = 'ALL';
			}else if(key_type == '执行中'){
				this.type = 'N';
			}else if(key_type == '已暂停'){
				this.type = 'P';
			}
			this.queryPlanByType();
		},
		queryPlanByType(){
			this.loading = true;
			this.$httpPost("/pc/account/plan",{type: this.type}).then(res => {
					if(res.data && res.data.length>0){
						this.loading = false;
						this.planList = res.data;
						this.noData = false;
					}else{
						this.loading = false;
						this.noData = true;
					}
					
				// eslint-disable-next-line no-unused-vars
				}).catch(err => {
					//错误的回调
					// eslint-disable-next-line no-console
					console.log("访问接口失败");
				});
		},
		init(){
			this.queryPlanByType();
		}
	},
	mounted() {
		this.init();
	},
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '@/assets/styles/vars.scss';
	@import '~@/assets/icon/iconfont.css';
	.plan{
		background-color: #fff;
		box-sizing: border-box;
		padding: 15px;
		box-shadow: 0 3px 5px rgba($color: #000000, $alpha: 0.2);
		border-radius: 5px;
		min-height: 500px;
		
		.plan-list{
			padding: 15px;
			border-bottom: 1px dotted $color-back-first;

			h4{
				color: $color-font-first;

				span{
					color: $color-font-third;
					font-weight: normal;
					font-size: 14px;
					margin-left: 10px;
				}
			}
			.el-row{
				padding-top: 20px;

				p{
					text-align: center;
					height: 21px;
					line-height: 21px;
					font-size: 16px;
				}
				span{
					display: block;
					text-align: center;
					font-size: 13px;
					padding-top: 5px;
					color: $color-font-third;
				}
				.el-button{
					width: 100px;
				}
			}
			
		}
		.asset-nothing{
			text-align: center;
			padding-top: 70px;
			i{
				font-size: 100px;
				color: $color-font-fourth;
			}
			h4{
				color: $color-font-third;
				padding-top: 20px;
				font-weight: normal;
				padding-right: 20px;
			}
		}
	}
</style>