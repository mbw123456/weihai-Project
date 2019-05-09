<template>
  <div class="asset"><!-- 这是根节点 -->
	<div class="asset-top">
		<el-row>
			<el-col :span="4">
				<div class="asset-top-img"><img :src="headUrl"></div>
			</el-col>
			<el-col :offset="1" :span="16">
				<div class="asset-top-main">
					<h4>{{company}}<i class="iconfont-hjy icon-hjyqiyerenzheng"></i></h4>
					<p>所属行业:<span v-for="(item,key) in tag" :key="key">{{item}}</span></p>
					<p>地址：<b>{{address}}</b></p>
				</div>
			</el-col>
			<el-col :span="3" style="text-align:right;">
				 <el-button type="primary">去认证</el-button>
			</el-col>
		</el-row>
		<div class="asset-top-bottom">
			<p>账号认证：<span><i class="el-icon-warning"></i>未认证<b>尊敬的用户，请尽快完成实名认证，可享受更好的服务，一键发布需求，直接进行投标等！</b></span></p>
			<el-button type="primary" plain size="mini">立即认证</el-button>
		</div>
	</div>

	<div class="asset-tab">
		<div class="asset-tab-title">
			<span></span>我发布的需求
			<el-button type="text" >查看更多>></el-button>
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
				align="center"
              label="需求编号">
            </el-table-column>
            <el-table-column
              align="center"
              prop="spellstr"
              label="需求标题">
            </el-table-column>
            <el-table-column
              align="center"
              prop="operdate"
              label="金额(元)">
            </el-table-column>
			<el-table-column
              align="center"
              prop="number_show_jin"
              label="发布时间">
            </el-table-column>
            <el-table-column
              align="center"
              prop="number_show_fen"
              label="状态">
            </el-table-column>
			<el-table-column
              align="center"
              prop="status_show"
              label="任务类型">
            </el-table-column>
			<el-table-column
              align="center"
              prop="status_show"
              label="操作">
            </el-table-column>
			<template slot="empty">
				<i>您暂时还没有发布需求哦~</i>
				<el-button type="text">去发布！>></el-button>
			</template>
		</el-table>


	</div>


	<div class="asset-tab">
		<div class="asset-tab-title">
			<span></span>我发布的需求
			<el-button type="text" >查看更多>></el-button>
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
				align="center"
              label="需求编号">
            </el-table-column>
            <el-table-column
              align="center"
              prop="spellstr"
              label="需求标题">
            </el-table-column>
            <el-table-column
              align="center"
              prop="operdate"
              label="金额(元)">
            </el-table-column>
			<el-table-column
              align="center"
              prop="number_show_jin"
              label="发布时间">
            </el-table-column>
            <el-table-column
              align="center"
              prop="number_show_fen"
              label="状态">
            </el-table-column>
			<el-table-column
              align="center"
              prop="status_show"
              label="任务类型">
            </el-table-column>
			<el-table-column
              align="center"
              prop="status_show"
              label="操作">
            </el-table-column>
			<template slot="empty">
				<i>您暂时还没有发布需求哦~</i>
				<el-button type="text">去发布！>></el-button>
			</template>
		</el-table>


	</div>

	
  </div>
</template>

<script>


export default {
	name: 'Asset',
	data(){
		return {
			headUrl:'/img/weihai-asset_03.png',
			company:'威海市光绘科技有限公司',
			tag:['非标自动化','工业互联'],
			address:'桃源街道朱光路第二工业去景辉物业四楼',
			loading:false,
		}
	},
	methods:{
	},
	mounted() {
	},
	watch: {
		// '$route' (to,from) {
		// 	if (this.$route.name === 'asset') {
		// 		this.getRiskType();
		// 	}
			
		// }
	}
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '@/assets/styles/vars.scss';
	@import '~@/assets/icon/iconfont.css';
	.asset{
		.asset-top{
			background-color: #fff;
			padding: 30px;
			padding-bottom: 10px;

			.asset-top-img{
				box-sizing: border-box;
				padding: 20px;
				width: 120px;
				height: 120px;
				border-radius: 4px;
				overflow: hidden;
				box-shadow: 0px 0px 15px rgba($color: #000000, $alpha: 0.2);

				img{
					width: 100%;
					height: 100%;
				}
			}
			.asset-top-main{
				h4{
					padding-top: 10px;
					font-size: 16px;
					margin-bottom: 20px;

					i{
						font-weight: normal;
						color: $color-font-fourth;
						font-size: 25px;
						margin-left: 10px;
						vertical-align: -3px;
					}
				}
				p{
					font-size: 14px;
					color: $color-font-third;
					margin-top: 10px;

					span{
						color: #00b371;
						border: 1px solid #00b371;
						padding: 2px 10px;
						border-radius: 3px;
						margin-left: 10px;
					}
					b{
						margin-left: 10px;
						font-weight: normal;
						color: $color-font-second;
					}
				}
			}
			.asset-top-bottom{
				height: 40px;
				border-top: 1px solid $color-back-first;
				margin-top: 20px;
				color: $color-font-second;
				p{
					float: left;
					font-size: 14px;
					line-height: 40px;
				}
				span{
					margin-left: 10px;
				}
				i{
					color: #f6be05;
					margin-right: 5px;
				}
				b{
					font-weight: normal;
					margin-left: 10px;
					color: $color-font-third;
				}
				.el-button{
					float: right;
					margin-top: 7px;
				}
			}
		}
		.asset-tab{
			background-color: #fff;
			padding: 15px 30px;
			margin-top: 15px;

			.asset-tab-title{

				span{
					border-left: 5px solid $color-primary;
					margin-right: 10px;
				}
				.el-button{
					float: right;
					margin-top: -9px;
				}
				
			}
		}
	}
</style>
