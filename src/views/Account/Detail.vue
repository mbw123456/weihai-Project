<template>
  <div class="detail"><!-- 这是根节点 -->
		<div class="search-tag">
			<el-tag v-if="if_quanbu">全部</el-tag>
			<el-tag
				:key="tag"
				v-for="tag in dynamicTags"
				closable
				:disable-transitions="true"
				@close="handleClose(tag)">
				{{tag}}
			</el-tag>
		</div>
		<div class="search-box">
			<el-row class="search-part">
				<el-col :span="2" class="search-title">交易类型:</el-col>
				<el-col :span="22">
					<el-radio-group v-model="radio0" size="small" @change="((item)=>{changeType(item, 0)})">
						<el-radio-button 
						:label="item" 
						border 
						v-for="(item,key) in dataType"
						:key="key">
						{{item}}
						</el-radio-button>
					</el-radio-group>
				</el-col>
			</el-row>

			<el-row class="search-part">
				<el-col :span="2" class="search-title">交易时间:</el-col>
				<el-col :span="22">
					<el-radio-group v-model="radio1" size="small" @change="((item)=>{changeDateType(item, 0)})">
						<el-radio-button 
						:label="item" 
						border 
						v-for="(item,key) in dataGood"
						:key="key">
						{{item}}
						</el-radio-button>
					</el-radio-group>
				</el-col>
			</el-row>

			<el-row class="search-part">
				<el-col :span="2" class="search-title">交易状态:</el-col>
				<el-col :span="22">
					<el-radio-group v-model="radio2" size="small" @change="((item)=>{changeDealType(item, 0)})">
						<el-radio-button 
						:label="item" 
						border 
						v-for="(item,key) in dataSize"
						:key="key">
						{{item}}
						</el-radio-button>
					</el-radio-group>
				</el-col>
			</el-row>
		</div>

		<el-table
            size="medium"
            :data="tableData"
            border
            style="width: 100%; text-align:center; margin-top:20px;"
            v-loading="loading">
            <el-table-column
              fixed
              prop="business_show"
							width="100px"
							align="center"
              label="交易类型">
            </el-table-column>
            <el-table-column
              align="center"
              prop="spellstr"
              width="150px"
              label="基金简称">
            </el-table-column>
            <el-table-column
              align="center"
              prop="operdate"
              width="200px"
              label="交易日期">
            </el-table-column>
			<el-table-column
              align="center"
              prop="number_show_jin"
              label="交易金额(元)">
            </el-table-column>
            <el-table-column
              align="center"
              prop="number_show_fen"
              label="交易份额(份)">
            </el-table-column>
			<el-table-column
              align="center"
              prop="status_show"
              width="100px"
              label="交易状态">
            </el-table-column>
		</el-table>

		<el-pagination
			style="text-align: center; margin-top:20px;"
			background
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="cur_page"
			:page-size="10"
			layout="prev, pager, next"
			:total="totalnum">
		</el-pagination>
  </div>
</template>

<script>


export default {
	name: 'Detail',
	data(){
		return {
			//tag
			dynamicTags: [],
			//基金类型
			radio0:[],
			dataType:['买入','卖出','定投','其他'],
			//基金业绩
			radio1:[],
			activeClass:'-1',
			dataGood:['当日','近1周','近1月','近3月','近1年'],
			//基金规模
			radio2:[],
			dataSize:['处理中'],
			if_quanbu:true,
			loading:true,
			cur_page: 1,
			totalnum:1,
			pagesize:10,
			pagenum:1,
			listtype:'ALL',
			businesscode:'ALL',
			dateType:'year',
			tableData:[],
		}
	},
	methods:{
		//关闭tag
		handleClose(tag) {
			// this.loading= true;
			// let num = this.dynamicTags.indexOf(tag);
			this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			// console.log('radio'+num);
			// this['radio'+num] = '';
			if(this.radio0 == tag){
				this.radio0 = [];
				this.businesscode = 'ALL';
			}else if( this.radio1 == tag ){
				this.radio1 = [];
				this.dateType = 'year';
				//基金业绩删tag
			}else if( this.radio2 == tag ){
				this.radio2 = [];
				this.listtype = 'ALL';
			}

			if(this.radio0.length==0 && this.radio1.length==0 && this.radio2.length==0){
				this.if_quanbu = true;
			}else{
				this.if_quanbu = false;
			}
			// console.log(this.if_quanbu);
			// console.log(this.radio0.length);
			this.cur_page = 1;
			this.queryDealList();
		},
		//点击tab增加tag
		getLabel(){
			// this.loading= true;
			this.dynamicTags= [];
			this.dynamicTags = this.dynamicTags.concat(this.radio0,this.radio1,this.radio2);
			if(this.radio0.length==0 && this.radio1.length==0 && this.radio2.length==0){
				this.if_quanbu = true;
			}else{
				this.if_quanbu = false;
			}
		},
		changeType(item){
			if(item == '买入'){
				this.businesscode = '22,20';
			}else if(item == '卖出'){
				this.businesscode = '24,98';
			}else if(item == '定投'){
				this.businesscode = '59,61,G1,G2,60,39';
			}else if(item == '其他'){
				this.businesscode = '29,36,25,43,44,45';
			}
			this.cur_page = 1;
			this.queryDealList();
			this.getLabel();
		},
		changeDateType(item){
			if(item == '当日'){
				this.dateType = 'today';
			}else if(item == '近1周'){
				this.dateType = 'week';
			}else if(item == '近1月'){
				this.dateType = 'month';
			}else if(item == '近3月'){
				this.dateType = 'three_month';
			}else if(item == '近1年'){
				this.dateType = 'year';
			}
			this.cur_page = 1;
			this.queryDealList();
			this.getLabel();
		},
		changeDealType(item){
			if(item == '处理中'){
				this.listtype = 'P';
			}else{
				this.listtype = 'ALL';
			}
			this.cur_page = 1;
			this.queryDealList();
			this.getLabel();
		},
		handleCurrentChange(val) {
			// console.log('当前页: ${val}');
					this.cur_page = val;
					this.queryDealList();
					// this.loading= true;
			},
		handleSizeChange(){
			// console.log('当前页: ${val}');
		},
		queryDealList(){
			this.loading = true;
			this.$httpPost("/pc/account/searchTradeRecord",
				{
					businesscode: this.businesscode,
					pagenum:this.cur_page,
					pagesize:this.pagesize,
					listtype:this.listtype,
					dateType:this.dateType
				}).then(res => {
				this.loading = false;
				this.tableData = res.data;
				if(isNaN(res.total_num)){
					this.totalnum = 1;
				}else{
					if(res.total_num < 1){
						this.totalnum = 1;
					}else{
						this.totalnum = res.total_num;
					}
				}
				
				// console.log('res.total_num:' + res.total_num);
			}).catch(err=> {
				this.loading = false;
				console.log("访问接口失败"+err);
				//错误的回调
				// eslint-disable-next-line no-console
				// console.log("访问接口失败");
			});
		},
		init(){
			this.queryDealList();
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
	.detail{
		background-color: #fff;
		box-sizing: border-box;
		padding: 15px;
		box-shadow: 0 3px 5px rgba($color: #000000, $alpha: 0.2);
		border-radius: 5px;
		min-height: 500px;
		.search-tag{
			padding-bottom: 10px;
			border-bottom: 1px solid $color-back-second;
			.el-tag + .el-tag {
				margin-left: 10px;
			}
		}
		.search-box{
			.search-part{
				padding-top: 15px;

				.search-title{
					font-size: 14px;
					line-height: 32px;
					color: $color-font-second;
				}
				.private-search-box{
					width: 100%;
					height: 100px;
					border: 1px solid $color-back-first;
					padding-right: 0;
					margin-top: -1px;
					overflow: hidden;
					
				}
				
				// a{
				// 	font-size: 14px;
				// 	padding: 6px 15px;
				// 	color: $color-font-second;
				// 	border-radius: 3px;
				// 	border: 1px solid #fff;
				// 	margin-left: 5px;

				// 	&:hover{
				// 		color:$color-primary;
				// 	}
				// 	&.add{
				// 		background-color: $color-primary-back;
				// 		color: $color-primary;
				// 		border: 1px solid $color-primary-border;
				// 	}
				// }
			}
			.el-dropdown-link{
				span{
					cursor: pointer;
					color: $color-font-second;
					font-size: 12px;
					padding: 8px 14px;
					border: 1px solid #dcdfe6;
					border-right: none 0;
					box-sizing: border-box;
					transition: all .3s;

					&.colorAdd{
						background-color: $color-primary;
						color: #fff;
						border-color: $color-primary;
						transition: all .3s;
					}
				}
				&:first-child span{
					border-radius: 4px 0 0 4px;
				}
				&:last-child span{
					border-radius: 0 4px 4px 0;
					border-right: 1px solid #dcdfe6;
				}
			}
		}
	}
</style>