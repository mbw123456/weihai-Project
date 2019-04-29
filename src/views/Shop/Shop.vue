<template>
  <div class="shop"><!-- 这是根节点 -->
		<div class="shop-search">
			<div class="shop-search-inner">
				<div class="search-tag">
					<el-tag>全部</el-tag>
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
						<el-col :span="2" class="search-title">基金类型:</el-col>
						<el-col :span="22">
							<el-radio-group v-model="radio0" size="small" @change="((item)=>{changeFundType(item, 0)})">
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
						<el-col :span="2" class="search-title">基金业绩:</el-col>
						<el-col :span="22">
							<!-- <el-radio-group v-model="radio1" size="small" @change="((item)=>{changeFundAchievement(item, 0)})">
								<el-radio-button 
								:label="item" 
								border 
								v-for="(item,key) in dataGood"
								:key="key">
								{{item}}
								</el-radio-button>
							</el-radio-group> -->
							<div style="margin-top:6px;">
								<el-dropdown v-for="(item,key) in dataGood" :key="key" size="small" class="el-dropdown-link" @command="((a)=>{changeFundAchievement(a,item,key)})">
									<span :class="{colorAdd:key == activeClass}">
										{{item}}<i class="el-icon-arrow-down el-icon--right"></i>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item command="前1/10">前1/10</el-dropdown-item>
										<el-dropdown-item command="前1/4">前1/4</el-dropdown-item>
										<el-dropdown-item command="前1/3">前1/3</el-dropdown-item>
										<el-dropdown-item command="前1/2">前1/2</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</div>
						</el-col>
					</el-row>

					<el-row class="search-part">
						<el-col :span="2" class="search-title">基金规模:</el-col>
						<el-col :span="22">
							<el-radio-group v-model="radio2" size="small" @change="((item)=>{changeFundScale(item, 0)})">
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

					<el-row class="search-part">
						<el-col :span="2" class="search-title">成立年限:</el-col>
						<el-col :span="22">
							<el-radio-group v-model="radio3" size="small" @change="((item)=>{changeFundYears(item, 0)})">
								<el-radio-button 
								:label="item" 
								border 
								v-for="(item,key) in dataYear"
								:key="key">
								{{item}}
								</el-radio-button>
							</el-radio-group>
						</el-col>
					</el-row>

					<el-row class="search-part">
						<el-col :span="2" class="search-title">基金公司:</el-col>
						<el-col :span="22">
							<el-radio-group v-model="radio4" size="small" @change="companyLetter" fill="#909399">
								<el-radio-button 
								:label="item" 
								border 
								v-for="(item,key) in letter"
								:key="key">
								{{item}}
								</el-radio-button>
							</el-radio-group>
							<div class="private-search-box" v-loading="loading1">
								<el-scrollbar :native="false">
									<!--以下是要滚动的内容-->
									<el-radio-group v-model="radio5" size="mini" @change="((item)=>{changeFundCompany(item, 0)})" class="company-btn" style="padding:5px;">
										<el-radio-button 
										:label="item.comp_sname" 
										border
										v-for="(item,key) in companyInLetter"
										:key="key">
										{{item.comp_sname}}
										</el-radio-button>
									</el-radio-group>
										
								</el-scrollbar>
								
						</div>
						</el-col>
					</el-row>

					<!-- <el-row class="search-part">
						<el-col :span="2" class="search-title">搜索基金:</el-col>
						<el-col :span="22">
								<el-autocomplete
									popper-class="my-autocomplete"
									class="my-input"
									v-model="state"
									:fetch-suggestions="querySearch"
									placeholder="请输入基金代码/名称/简拼"
									@select="handleSelect">
									<template slot-scope="{ item }">
										<div class="name">{{ item.value }}</div>
										<span class="addr">{{ item.address }}</span>
									</template>
									<el-button slot="append" icon="el-icon-search"></el-button>
								</el-autocomplete>
						</el-col>
					</el-row> -->


				</div>
			</div>
		</div>


		
		
		<div class="private-list">
			<template>
				<el-table
					v-loading="loading"
					stripe
					:data="tableData"
					style="width: 1140px; margin: 0 auto;"
					max-height="650"
					@row-click="openDetails"
					:row-style="{cursor:'pointer'}"
					@sort-change="handleSortChange"
					>

					<el-table-column
						fixed
						prop="f_info_name"
						label="基金名称"
						width="200">
					</el-table-column>

					<el-table-column
						prop="f_info_firstinvesttype"
						label="基金类型"
						width="150"
						>
						<template slot-scope="scope">
							<span v-if="scope.row.f_info_firstinvesttype=='货币市场型'">货币型</span>
							<span v-else>{{scope.row.f_info_firstinvesttype}}</span>
						</template>
					</el-table-column>

					<!-- <el-table-column
						prop="fund_unit_total_show"
						label="基金规模(亿元)"
						sortable = "custom"
						width="150"
						>
					</el-table-column> -->

					<el-table-column
						prop="f_nav_unit_show"
						label="最新净值"
						sortable = "custom"
						width="120"
						>
					</el-table-column>

					<!-- <el-table-column
						label="基金经理"
						width="150"
						>
						<template slot-scope="scope">
							<span v-for="(item,key) in scope.row.mangers" :key="key">
								{{item.f_info_fundmanager}}
								<span v-if="key<item.length-1">、</span>
								</span>
						</template>
					</el-table-column> -->

					<!-- <el-table-column
						label="费率"
						width="100"
						>
						<template slot-scope="scope">
							<span >{{scope.row.feeratio}}
								<span v-if="(scope.row.feeratio!=''&&scope.row.feeratio!=null)||scope.row.feeratio==0">%</span>
								<span v-else>--</span>
							</span>
						</template>
					</el-table-column> -->

					<el-table-column
						label="日增长率"
						prop="f_avgreturn_day"
						sortable = "custom"
						width="100"
						>
						<template slot-scope="scope">
							<span :class="Number(scope.row.f_avgreturn_day) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.f_avgreturn_day}}
								<span v-if="(scope.row.f_avgreturn_day!=''&&scope.row.f_avgreturn_day!=null)||scope.row.f_avgreturn_day==0">%</span>
								<span v-else>--</span>
							</span>
						</template>
					</el-table-column>

					<el-table-column
						label="近1周"
						prop="f_avgreturn_week"
						sortable = "custom"
						width="100"
						>
						<template slot-scope="scope">
							<span :class="Number(scope.row.f_avgreturn_week) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.f_avgreturn_week}}
								<span v-if="(scope.row.f_avgreturn_week!=''&&scope.row.f_avgreturn_week!=null)||scope.row.f_avgreturn_week==0">%</span>
								<span v-else>--</span>
							</span>
						</template>
					</el-table-column>

					<el-table-column
						label="近1月"
						prop="f_avgreturn_month"
						sortable = "custom"
						width="100"
						>
						<template slot-scope="scope">
							<span :class="Number(scope.row.f_avgreturn_month) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.f_avgreturn_month}}
								<span v-if="(scope.row.f_avgreturn_month!=''&&scope.row.f_avgreturn_month!=null)||scope.row.f_avgreturn_month==0">%</span>
								<span v-else>--</span>
							</span>
						</template>
					</el-table-column>

					<el-table-column
						label="近3月"
						prop="f_avgreturn_quarter"
						sortable = "custom"
						width="100"
						>
						<template slot-scope="scope">
							<span :class="Number(scope.row.f_avgreturn_quarter) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.f_avgreturn_quarter}}
								<span v-if="(scope.row.f_avgreturn_quarter!=''&&scope.row.f_avgreturn_quarter!=null)||scope.row.f_avgreturn_quarter==0">%</span>
								<span v-else>--</span>
							</span>
						</template>
					</el-table-column>

					<el-table-column
						label="近6月"
						prop="f_avgreturn_halfyear"
						sortable = "custom"
						width="100"
						>
						<template slot-scope="scope">
							<span :class="Number(scope.row.f_avgreturn_halfyear) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.f_avgreturn_halfyear}}
								<span v-if="(scope.row.f_avgreturn_halfyear!=''&&scope.row.f_avgreturn_halfyear!=null)||scope.row.f_avgreturn_halfyear==0">%</span>
								<span v-else>--</span>
							</span>
						</template>
					</el-table-column>

					<el-table-column
						label="近1年"
						prop="f_avgreturn_year"
						sortable = "custom"
						width="100"
						>
						<template slot-scope="scope">
							<span :class="Number(scope.row.f_avgreturn_year) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.f_avgreturn_year}}
								<span v-if="(scope.row.f_avgreturn_year!=''&&scope.row.f_avgreturn_year!=null)||scope.row.f_avgreturn_year==0">%</span>
								<span v-else>--</span>
							</span>
						</template>
					</el-table-column>

					<el-table-column
						label="近3年"
						prop="f_avgreturn_threeyear"
						sortable = "custom"
						width="100"
						>
						<template slot-scope="scope">
							<span :class="Number(scope.row.f_avgreturn_threeyear) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.f_avgreturn_threeyear}}
								<span v-if="(scope.row.f_avgreturn_threeyear!=''&&scope.row.f_avgreturn_threeyear!=null)||scope.row.f_avgreturn_threeyear==0">%</span>
								<span v-else>--</span>
								</span>
						</template>
					</el-table-column>

					<el-table-column
						label="今年来"
						prop="f_avgreturn_thisyear"
						sortable = "custom"
						width="100"
						>
						<template slot-scope="scope">
							<span :class="Number(scope.row.f_avgreturn_thisyear) >= 0 ? 'letter-red' : 'letter-green'">{{scope.row.f_avgreturn_thisyear}}
								<span v-if="(scope.row.f_avgreturn_thisyear!=''&&scope.row.f_avgreturn_thisyear!=null)||scope.row.f_avgreturn_thisyear==0">%</span>
								<span v-else>--</span>
							</span>
						</template>
					</el-table-column>

					<!-- <el-table-column
						prop="minbuyamount"
						label="起购金额(元)"
						width="100"
						>
					</el-table-column> -->

					<el-table-column
						fixed="right"
						label="操作"
						width="100">
						<template slot-scope="scope">
							<el-button @click.stop="jumpToBuy(scope.row)" type="text" size="small">申购</el-button>
							<el-button type="text" size="small" @click.stop="jumpToInvest(scope.row)">定投</el-button>
						</template>
					</el-table-column>
				</el-table>
				

				<el-pagination
					style="width: 1140px; margin: 30px auto; text-align: center;"
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="cur_page"
					:page-size="10"
					layout="total, prev, pager, next, jumper"
					:total="totalnum">
				</el-pagination>
				
			</template>
		</div>
	
  </div>
</template>

<script>
// import VueEvent from '@/model/VueEvent.js'

export default {
  name: 'Shop',
//   components:{
// 	  VueEvent,
//   },
  data(){
	  return {
			//获取public路径
			publicPath: process.env.BASE_URL,
			//tag
			dynamicTags: [],
			//基金类型
			radio0:[],
			dataType:['股票型','债券型','混合型','指数型','货币型','QDII','其他'],
			//基金业绩
			radio1:[],
			activeClass:'-1',
			dataGood:['近3年','近1年','今年来','近6月','近3月','近1月','近1周'],
			//基金规模
			radio2:[],
			dataSize:['≤10亿','10-20亿','20-50亿','50-100亿','>100亿'],
			//成立年限
			radio3:[],
			dataYear:['≤1年','1-2年','2-3年','3-5年','>5年'],
			//基金公司
			radio4:[],
			radio5:[],
			letter:[],
			dataCompany:[],
			//搜索
			state: '',
			restaurants: [],
			//else
			loading:true,
			loading1:true,
			tableData:[],

			cur_page: 1,
			//字母公司
			companyAll:[],
			companyInLetter:[],
			quanbu:[],
			//查询条件
			type:null,
			risk:null,
			unit:null,
			totalunit:null,
			starlevel:null,
			achievementtime:null,
			rank:null,
			comp_id:null,
			code:null,
			sortType:null,
			sort:null,
			jjpf:null,
			year:null,
			totalnum:1,
			// pramfundtype:0
	  }
  },
  methods:{
			//关闭tag
			handleClose(tag) {
				this.loading= true;
				// let num = this.dynamicTags.indexOf(tag);
				this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
				// console.log('radio'+num);
				// this['radio'+num] = '';
				if(this.radio0 == tag){
					this.radio0 = [];
					//基金类型删tag
					this.type = null;
					this.cur_page = 1;

				}else if( this.radio1 == tag ){
					this.radio1 = [];
					//基金业绩删tag
					this.achievementtime = null;
					this.rank = null;
					this.cur_page = 1;
					this.activeClass = '-1';
				}else if( this.radio2 == tag ){
					this.radio2 = [];
					//基金规模删tag
					this.totalunit = null;
					this.cur_page = 1;

				}else if( this.radio3 == tag ){
					this.radio3 = [];
					//基金年限删tag
					this.year = null;
					this.cur_page = 1;

				}else if( this.radio5 == tag ){
					this.radio5 = [];
					//基金公司删tag
					this.comp_id = null;
					this.cur_page = 1;
				}
				this.queryfund();
			},
			//点击tab增加tag
			getLabel(){
				this.loading= true;
				this.dynamicTags= [];
				this.dynamicTags = this.dynamicTags.concat(this.radio0,this.radio1,this.radio2,this.radio3,this.radio5);
			},
			//业绩点击tab增加tag
			handleCommand(command,item,key) {
				this.loading= true;
				this.activeClass = key;
				this.radio1 = [item+'--'+command];
				this.dynamicTags= [];
				this.dynamicTags = this.dynamicTags.concat(this.radio0,this.radio1,this.radio2,this.radio3,this.radio5);
			},
			//基金公司字母
			companyLetter(val){
				
				if(val=="A"){
					this.radio5 = this.companyAll.A;
					this.companyInLetter = this.companyAll.A;
				}else if(val=="B"){
					this.companyInLetter = this.companyAll.B;
				}else if(val=="C"){
					this.companyInLetter = this.companyAll.C;
				}else if(val=="D"){
					this.companyInLetter = this.companyAll.D;
				}else if(val=="E"){
					this.companyInLetter = this.companyAll.E;
				}else if(val=="F"){
					this.companyInLetter = this.companyAll.F;
				}else if(val=="G"){
					this.companyInLetter = this.companyAll.G;
				}else if(val=="H"){
					this.companyInLetter = this.companyAll.H;
				}else if(val=="I"){
					this.companyInLetter = this.companyAll.I;
				}else if(val=="J"){
					this.companyInLetter = this.companyAll.J;
				}else if(val=="K"){
					this.companyInLetter = this.companyAll.K;
				}else if(val=="L"){
					this.companyInLetter = this.companyAll.L;
				}else if(val=="M"){
					this.companyInLetter = this.companyAll.M;
				}else if(val=="N"){
					this.companyInLetter = this.companyAll.N;
				}else if(val=="O"){
					this.companyInLetter = this.companyAll.O;
				}else if(val=="P"){
					this.companyInLetter = this.companyAll.P;
				}else if(val=="Q"){
					this.companyInLetter = this.companyAll.Q;
				}else if(val=="R"){
					this.companyInLetter = this.companyAll.R;
				}else if(val=="S"){
					this.companyInLetter = this.companyAll.S;
				}else if(val=="T"){
					this.companyInLetter = this.companyAll.T;
				}else if(val=="U"){
					this.companyInLetter = this.companyAll.U;
				}else if(val=="V"){
					this.companyInLetter = this.companyAll.V;
				}else if(val=="W"){
					this.companyInLetter = this.companyAll.W;
				}else if(val=="X"){
					this.companyInLetter = this.companyAll.X;
				}else if(val=="Y"){
					this.companyInLetter = this.companyAll.Y;
				}else if(val=="Z"){
					this.companyInLetter = this.companyAll.Z;
				}else{
					this.companyInLetter = this.quanbu;
				}
			},
			//分页
			handleSizeChange(val) {
			  console.log('每页 ${val} 条');
			},
			handleCurrentChange(val) {
			console.log('当前页: ${val}');
					this.cur_page = val;
					this.queryfund();
					this.loading= true;
			},
			initFundShopPage(){
				this.tableData = [];
				this.letter = [];
				this.$httpGet("/pc/fundmarket/initfundmarketpage").then(res => {
					if(res) {
						//基金列表
						if(res.resultData.fundList) {
							this.tableData = res.resultData.fundList;
						}

						//基金公司字母列表
						if(res.resultData.compMap.compLetters) {
							this.letter = res.resultData.compMap.compLetters;
						}

						this.companyInLetter = res.resultData.compAll;
						this.companyAll = res.resultData.compMap;
						this.totalnum = res.resultData.cpage;
						this.quanbu = res.resultData.compAll;
						this.loading1= false;
						this.loading = false;
					}
				// eslint-disable-next-line no-unused-vars
				}).catch(err => {
					//错误的回调
					// eslint-disable-next-line no-console
					console.log("访问接口失败");
				});
			},
			queryfund(){
				this.$httpPost("/pc/fundmarket/queryfund",
				{
					page: this.cur_page,
					type: this.type,
					risk: this.risk,
					unit: this.unit,
					totalunit: this.totalunit,
					starlevel: this.starlevel,
					time: this.achievementtime,
					rank: this.rank,
					comp_id: this.comp_id,
					code: this.code,
					sortType: this.sortType,
					sort: this.sort,
					jjpf: this.jjpf,
					year: this.year
				}).then(res => {
					console.log(res);
					if(res) {
						//基金列表
						if(res.resultData.fundList) {
							this.tableData = res.resultData.fundList;
						}
						this.cur_page = res.resultData.page;
						this.totalnum = res.resultData.cpage;
						
						this.loading= false;
					}
				// eslint-disable-next-line no-unused-vars
				}).catch(err => {
					//错误的回调
					// eslint-disable-next-line no-console
					console.log("访问接口失败");
				});
			},
			changeFundType(item){
				this.type = item;
				this.cur_page = 1;
				this.getLabel();
				this.queryfund();
			},

			changeFundAchievement(command,item,key){
				
				if(item=="近3年"){
					this.achievementtime = "a.f_avgreturn_threeyear";
				}else if(item=="近1年"){
					this.achievementtime = "a.f_avgreturn_year";
				}else if(item=="今年来"){
					this.achievementtime = "a.f_avgreturn_thisyear";
				}else if(item=="近6月"){
					this.achievementtime = "a.f_avgreturn_halfyear";
				}else if(item=="近3月"){
					this.achievementtime = "a.f_avgreturn_quarter";
				}else if(item=="近1月"){
					this.achievementtime = "a.f_avgreturn_month";
				}else if(item=="近1周"){
					this.achievementtime = "f_avgreturn_week";
				}else{
					this.achievementtime = null;
				}

				if(command=="前1/10"){
					this.rank = 10;
				}else if(command=="前1/4"){
					this.rank = 4;
				}else if(command=="前1/3"){
					this.rank = 3;
				}else if(command=="前1/2"){
					this.rank = 2;
				}else{
					this.rank = null;
				}
				
				this.cur_page = 1;
				this.handleCommand(command,item,key);
				this.queryfund();
			},
			changeFundScale(item){
				if(item=="≤10亿"){
					this.totalunit = 1;
				}else if(item=="10-20亿"){
					this.totalunit = 2;
				}else if(item=="20-50亿"){
					this.totalunit = 3;
				}else if(item=="50-100亿"){
					this.totalunit = 4;
				}else if(item==">100亿"){
					this.totalunit = 5;
				}else{
					this.totalunit = null;
				}
				this.cur_page = 1;
				this.getLabel();
				this.queryfund();
			},
			changeFundYears(item){
				if(item=="≤1年"){
					this.year = 1;
				}else if(item=="1-2年"){
					this.year = 2;
				}else if(item=="2-3年"){
					this.year = 3;
				}else if(item=="3-5年"){
					this.year = 4;
				}else if(item==">5年"){
					this.year = 5;
				}else{
					this.year = null;
				}
				this.cur_page = 1;
				this.getLabel();
				this.queryfund();
			},
			changeFundCompany(item){
				
				this.cur_page = 1;
				this.comp_id = item;
				this.getLabel();
				this.queryfund();
			},
			changeFundName(){

			},
  			//页面跳转加参数
			openDetails(row, column, event){
				this.pramfundtype = row.pramfundtype;
				// VueEvent.$emit('shop_pramfundtype',this.pramfundtype);
				// this.$router.push('funddetails/'+ row.f_info_windcode +'');
				this.$router.push({
					path: 'funddetails', 
					query: { 
						fundcode: row.f_info_windcode, 
						fundtype: row.pramfundtype
						}
				});
			},
			//点击申购
			jumpToBuy(row){
				this.$router.push({
					path: 'purchase', 
					query: {
						fundcode: row.f_info_windcode, 
						business: '22'
						}
				});
			},
			//点击定投
			jumpToInvest(row){
				this.$router.push({
					path: 'invest', 
					query: { 
						fundcode: row.f_info_windcode
						}
				});
			},
			handleSortChange(column){
				this.loading= true;
				if(column.prop){

					if(column.prop=="fund_unit_total_show"){
						this.sort = "(tab.fund_unit_total+0)";
					}else if(column.prop=="f_nav_unit_show"){
						this.sort = "(tab.f_nav_unit+0)";
					}else{
						this.sort = "(tab."+column.prop+"+0)";
					}
				}else{
					this.sort = null;
				}
				
				if(column.order=="ascending"){
					this.sortType = "asc";
				}else if(column.order=="descending"){
					this.sortType = "desc";
				}else{
					this.sortType = null;
				}
				this.cur_page = 1;
				this.queryfund();
			}
			
  },
	mounted(){
			this.initFundShopPage();
			
	},
  props:[]
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '@/assets/styles/vars.scss';
	.shop{
			border-top: 1px solid $color-back-second;
			// min-height: 900px;
			
			.shop-search{
				background-color: #fff;
				margin-bottom: 10px;
				padding-bottom: 15px;

				.shop-search-inner{
						width: 1140px;
						margin: 0 auto;

						.search-tag{
							padding: 10px 0;
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
			}
			.private-list{
					width: 100%;
					min-height: 700px;
					background-color: #fff;
					
					
			}
			
	}
	.my-autocomplete {
		
				li {
					.name {
						padding-top: 5px;
						line-height: 25px;
						text-overflow: ellipsis;
						overflow: hidden;
					}
					.addr {
						padding-bottom: 5px;
						line-height: 15px;
						font-size: 12px;
						color: #b4b4b4;
						display: block;
					}
					.highlighted .addr {
						color: #ddd;
					}
					
				}
			
			}
</style>
<style>
.private-search-box .el-scrollbar{
	height: 100%;
}
.private-search-box .el-scrollbar .el-scrollbar__wrap{
	overflow: scroll;
	overflow-x:auto;
}
.company-btn .el-radio-button__inner
{
	border: none 0;
	margin: 2px;
}
.company-btn .el-radio-button:first-child .el-radio-button__inner{
	border-radius: 0;
	border: none 0;
}
.company-btn .el-radio-button:last-child .el-radio-button__inner{
	border-radius: 0;
	border: none 0;
}
</style>

