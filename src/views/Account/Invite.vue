<template>
  <div class="invite"><!-- 这是根节点 -->
		<div class="invite-top" v-loading="loading">
			<el-row class="invite-row">
				<el-col :span="5">邀请码</el-col>
				<el-col :span="18" :offset="1">{{code}}</el-col>
			</el-row>
			<el-row class="invite-row">
				<el-col :span="5">邀请码链接</el-col>
				<el-col :span="15" :offset="1"><b>{{inviteCode}}</b></el-col>
				<el-col :span="3">
					<el-button 
						type="primary" 
						size="mini" 
						round 
						v-clipboard:copy="inviteCode"
						v-clipboard:success="onCopy"
						v-clipboard:error="onError">
					复制
					</el-button>
				</el-col>
			</el-row>
			<el-row class="invite-row">
				<el-col :span="5">邀请二维码</el-col>
				<el-col :span="18" :offset="1"><div><img v-show="imgShow" :src="`${srcUrl}`"></div></el-col>
			</el-row>
		</div>
		<div class="invite-bottom" v-loading="loadingList">
			<h4 class="invite-title">已邀请的好友<span>({{totalnum}}人)</span></h4>
			
			<el-table
				size="medium"
				:data="tableData"
				style="width: 100%; text-align:center; margin-top:20px;"
				>
				<el-table-column
				fixed
				align="center"
				prop="invent_cust_name"
				label="姓名">
				</el-table-column>
				<el-table-column
				align="center"
				prop="opendata"
				label="注册日期">
				</el-table-column>
				<el-table-column
				align="center"
				prop="state"
				label="状态">
				</el-table-column>
			</el-table>

			<el-pagination
				style="text-align: center; margin-top:20px;"
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="cur_page"
				:page-size="10"
				layout="total, prev, pager, next, jumper"
				:total="totalnum">
			</el-pagination>

		</div>
  </div>
</template>

<script>


export default {
	name: 'Invite',
	data(){
		return {
			//获取public路径
			publicPath: process.env.BASE_URL,

			srcUrl:'',
			code:'',
			inviteCode:'.',
			loading:false,
			loadingList:false,
			tableData:[],
			totalnum:0,
			cur_page: 1,
			imgShow:false,
		}
	},
	methods:{
		onCopy(e){
			console.log(e.text);
			this.$message({
				message: '恭喜你，成功复制',
				type: 'success',
				center: true
			});
		},
		onError(e){
			console.log(e.text);
			this.$message({
				message: '复制失败',
				type: 'error',
				center: true
			});
		},
		//分页
		handleSizeChange(val) {
			console.log('每页 ${val} 条');
		},
		handleCurrentChange(val) {
			console.log('当前页: ${val}');
			this.cur_page = val;
			this.loadingList= true;
			console.log("val..:	"+ val);
			this.tableData = [];
			this.$httpPost('pc/myaccount/searchinvitationForshare',{pageNum:val,pageSize:10}).then(res=>{
				this.loadingList= false;
				if(res.data) {
					this.tableData = res.data;
					this.cur_page = val;
					this.totalnum = res.cpage;
				}
			}).catch(err=>{
				this.loadingList= false;
				console.log("error submit");
			});
		},
		init(){
			this.getInvite();
			this.getInvitePages();
		},
		getInvitePages(){
			this.loadingList= true;
			this.$httpPost('pc/myaccount/searchinvitationForshare',{pageNum:this.cur_page,pageSize:10}).then(res=>{
				this.loadingList= false;
				if(res.data) {
					this.tableData = res.data;
					this.cur_page = this.cur_page;
					this.totalnum = res.cpage;
				}
			}).catch(err=>{
				this.loadingList= false;
				console.log("error submit");
			});
		},
		getInvite(){
			// this.loading = true;	
			this.$httpPost('pc/myaccount/share_details').then(res=>{
				// console.log("res...:" + JSON.stringify(res));
				if(res.share_data.isValid === 'true'){
					this.loading = false;
					this.code = res.share_data.data[0].invitationcode;
					this.inviteCode = res.share_data.data[0].inventurl
					var url = window.location.href;
					var currentPath = this.$route.path;
					url = url.replace(currentPath,'');
					this.srcUrl = url+'/hjy_pc_interface/temp/qcode/' + res.share_data.data[0].imgname;
					this.imgShow = true;
					// console.log("邀请连接" + res.share_data.data[0].imgname);
					// console.log("二维码" + res.share_data.data[0].inventurl);
					// console.log("invest: " + res.share_data.data[0].invitationcode);
					// console.log("size...:" + res.invitation_size);
				}
			}).catch(err=>{
				console.log("error submit");
			});
		},
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
	.invite{
		.invite-top{
			background-color: #fff;
			box-sizing: border-box;
			padding: 15px;
			box-shadow: 0 3px 5px rgba($color: #000000, $alpha: 0.2);
			border-radius: 5px;
			// min-height: 500px;
			.invite-row{
				line-height: 40px;
				border-bottom: 1px dotted $color-back-first;

				.el-col{
					font-size: 15px;

					&:first-child{
						text-align: right;
					}
					&:last-child{
						color: $color-font-third;
					}
					b{
						font-weight: normal;
						color: $color-primary;
					}
					img{
						display: block;
						width: 100px;
						margin: 7px 0;
					}
				}
				&:last-child{
					border: none 0;
				}
			}
		}
		.invite-bottom{
			background-color: #fff;
			box-sizing: border-box;
			padding: 15px;
			box-shadow: 0 3px 5px rgba($color: #000000, $alpha: 0.2);
			border-radius: 5px;
			min-height: 200px;
			margin-top: 20px;

			.invite-title{
				font-weight: normal;
				padding: 10px;

				span{
					color: $color-primary;
					margin-left: 5px;
				}
			}
		}
	}
</style>