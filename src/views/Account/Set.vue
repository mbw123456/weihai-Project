<template>
  <div class="set"><!-- 这是根节点 -->
	<div class="set-inner" v-loading="loading">
		<h4 class="set-title">个人资料<span>个人信息发生变更时请及时修改账户信息</span></h4>
		<el-row class="set-row">
			<el-col :span="5">姓名</el-col>
			<el-col :span="18" :offset="1">{{custName}}</el-col>
		</el-row>
		<el-row class="set-row">
			<el-col :span="5">身份证号</el-col>
			<el-col :span="18" :offset="1">{{certificateno_show}}</el-col>
		</el-row>
		<el-row class="set-row">
			<el-col :span="5">手机号码</el-col>
			<el-col :span="15" :offset="1">{{mobileno}}</el-col>
			<el-col :span="3">
				<el-button type="primary" size="mini" round @click="dialogFormVisible = true">修改</el-button>
			</el-col>
		</el-row>
		<!-- 修改手机号码 -->
		<el-dialog title="修改手机号码" :visible.sync="dialogFormVisible">
			<el-form :model="form" :rules="rules" status-icon label-width="100px" ref="ruleForm" class="phoneChange-ruleForm">
				<el-form-item label="原手机号码" :label-width="formLabelWidth">
					<el-input autocomplete="off" v-model="form.mobileno" disabled></el-input>
				</el-form-item>
				<el-form-item label="新手机号码" prop="newPhone" :label-width="formLabelWidth">
					<el-input v-model="form.newPhone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="验证码" prop="checkCode" :label-width="formLabelWidth">
					<el-input v-model="form.checkCode" autocomplete="off" style="width:350px;"></el-input>
					<el-button type="primary" @click="sendCode('ruleForm')" :disabled="timeDisable" style="float:right; width:135px;">{{timeText}}</el-button>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('ruleForm')">取 消</el-button>
				<el-button type="primary" :loading="btnLoading" @click="submitForm('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>

		<el-row class="set-row">
			<el-col :span="5">密码</el-col>
			<el-col :span="15" :offset="1">{{password}}</el-col>
			<el-col :span="3">
				<el-button type="primary" size="mini" round @click="dialogFormPasswordVisible = true">修改</el-button>
			</el-col>
		</el-row>
		<!-- 修改密码 -->
		<el-dialog title="修改密码" :visible.sync="dialogFormPasswordVisible">
			<el-form :model="form" :rules="rules" status-icon label-width="100px" ref="passwordForm" class="phoneChange-ruleForm">
				<el-form-item label="原密码" prop="oldPassword" :label-width="formLabelWidth">
					<el-input v-model="form.oldPassword" autocomplete="off" placeholder="请输入密码" show-password></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="newPassword" :label-width="formLabelWidth">
					<el-input v-model="form.newPassword" autocomplete="off" placeholder="请输入新密码" show-password></el-input>
				</el-form-item>
				<el-form-item label="新密码重复" prop="newPasswordAgain" :label-width="formLabelWidth">
					<el-input v-model="form.newPasswordAgain" autocomplete="off" placeholder="请再次输入新密码" show-password></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('passwordForm')">取 消</el-button>
				<el-button type="primary" :loading="btnLoading" @click="submitPasswordForm('passwordForm')">确 定</el-button>
			</div>
		</el-dialog>


		<el-row class="set-row">
			<el-col :span="5">联系地址</el-col>
			<el-col :span="15" :offset="1">{{address}}</el-col>
			<el-col :span="3" style="float:right;">
				<el-button type="primary" size="mini" round @click="dialogFormAddressVisible = true">修改</el-button>
			</el-col>
		</el-row>
		<!-- 联系地址 -->
		<el-dialog title="修改联系地址" :visible.sync="dialogFormAddressVisible">
			<el-form :model="form" :rules="rules" status-icon label-width="100px" ref="addressForm" class="phoneChange-ruleForm">
				<el-form-item label="联系地址" prop="user_address" :label-width="formLabelWidth">
					<el-input v-model="form.user_address" autocomplete="off" placeholder="请输入联系地址"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('addressForm')">取 消</el-button>
				<el-button type="primary" :loading="btnLoading" @click="submitAddressForm('addressForm')">确 定</el-button>
			</div>
		</el-dialog>


		<el-row class="set-row">
			<el-col :span="5">职业</el-col>
			<el-col :span="15" :offset="1">{{act}}</el-col>
			<el-col :span="3" style="float:right;">
				<el-button type="primary" size="mini" round @click="dialogFormActVisible = true">修改</el-button>
			</el-col>
		</el-row>
		<!-- 职业 -->
		<el-dialog title="修改联系地址" :visible.sync="dialogFormActVisible">
			<el-form :model="form" :rules="rules" status-icon label-width="100px" ref="actForm" class="phoneChange-ruleForm">
				<el-form-item label="联系地址" prop="user_act" :label-width="formLabelWidth">
					<el-input v-model="form.user_act" autocomplete="off" placeholder="请输入职业"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('actForm')">取 消</el-button>
				<el-button type="primary" :loading="btnLoading" @click="submitActForm('actForm')">确 定</el-button>
			</div>
		</el-dialog>



	</div>

	<div class="set-inner">
		<h4 class="set-title">风险评估</h4>
		<el-row class="set-row">
			<el-col :span="5">风险等级</el-col>
			<el-col :span="15" :offset="1">
				<el-popover
					placement="top-start"
					width="250"
					trigger="hover"
					>
					<h3 class="set-riskTitle">特点:<span>具备丰富的股票市场投资经验, 投资期限偏重长期, 在投资收入和长期资本增值之间更倾向于资本增值, 希望在风险适中的情况下获得可观的收益回报。</span></h3>
					<h3 class="set-riskTitle">适合投资的基金产品:<span>不适合高风险的基金产品, 但适合投资于中高风险、中风险、中低风险和低风险基金产品。</span></h3>
					<a @click="dialogFXPCVisible = true" class="set-riskLink">《风险评测说明》</a>
					<span slot="reference">{{this.$store.state.RISK_RESULT}}</span>
				</el-popover>
				<i>上次测评时间:{{this.$store.state.riskTime}}</i>
				
			</el-col>
			<el-col :span="3">
				<el-button type="primary" size="mini" round @click="jumpTo('risk')">修改</el-button>
			</el-col>
		</el-row>
		<!-- 《风险评测说明》 -->
		<el-dialog title="风险评测说明" fullscreen :visible.sync="dialogFXPCVisible">
			<div class="set-riskDialog">
				<h4>一、设立风险控制系统的目的</h4>
				<h5>为了贯彻落实中国证监会发出的《证券投资基金销售适用性指导意见》，把合适的产品卖给合适的投资人，切实保障投资人的权益，我公司特别引进了基金销售适用性方案， 为投资人提供风险承受能力评估服务，通过问卷形式了解投资人的投资目的、投资期限、投资经验、财务状况、短期及长期风险承受水平等信息， 从而对投资人的风险承受能力进行多角度全面化的分析，帮助投资人选择合适的投资产品。 请投资者在进行基金投资前认真填写风险承受能力评估问卷，以便获得客观的风险承受能力评价，方便您进行基金投资。</h5>
				<h4>二、风险等级划分</h4>
				<h5>风险等级分类：激进型、积极型、稳健型、保守型、安逸型。每类风格的投资者特征如下：</h5>
				<h6>1、激进型</h6>
				<h5>激进型投资者：具备股票市场投资经验和长期投资目标； 无需从投资中获得稳定的现金流以支付生活费用； 渴望较高的投资收益, 并愿意为此承担较大的风险。</h5>
				<h6>2、积极型</h6>
				<h5>积极型投资者：具备丰富的股票市场投资经验, 投资期限偏重长期, 在投资收入和长期资本增值之间更倾向于资本增值, 希望在风险适中的情况下获得可观的收益回报。</h5>
				<h6>3、稳健型</h6>
				<h5>稳健型投资者： 具备一定的股票市场投资经验, 投资期限偏重中长期, 注重稳定的投资收入和长期资本增值之间的平衡, 希望在风险较小的情况下获得一定回报。</h5>
				<h6>4、保守型</h6>
				<h5>保守型投资者：仅具备有限的股票市场投资经验, 投资期限偏重短中期, 希望从投资中获得稳定的现金流； 最关心投资的账面价值是否受损, 对投资回报的要求不高。</h5>
				<h6>5、安逸型</h6>
				<h5>安逸型投资者：不具备或仅具备较少的股票市场投资经验, 投资期限偏重短期, 希望从投资中获得较少的投资收益； 最关心投资资金的安全性, 对投资收益的要求低。</h5>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" style="margin-top:20px;" :loading="btnLoading" @click="dialogFXPCVisible = false">确 定</el-button>
				</div>
			</div>
		</el-dialog>



		<el-row class="set-row">
			<el-col :span="5">类型</el-col>
			<el-col :span="15" :offset="1">普通投资者</el-col>
			<el-col :span="3">
				<el-button size="mini" round @click="open">详情</el-button>
			</el-col>
		</el-row>
	</div>

	<div class="set-inner">
		<h4 class="set-title">银行卡<el-button style="float:right; margin-right:35px;" type="primary" size="mini" round @click="jumpTo('bankcard')">添加银行卡</el-button></h4>
		<el-row class="set-rowBottom">
			<el-col :span="21" :offset="3" class="set-bank">
				<el-row class="set-bankcard" v-for="(item,key) in this.$store.state.BANK_CARD" :key="key">
					<el-col :span="20">
						<p><img :src="'/img/bank_icon/'+item.img_name">{{item.bankname}}<span>{{item.bankaccount}}</span></p>
						<el-alert
							:title="item.bankLimit"
							type="warning"
							:closable="false"
							style="width:300px;"
							show-icon>
						</el-alert>
					</el-col>
					<el-col :span="4">
						<el-button @click="changeCard(item)" type="primary" size="mini" round style="display:block; margin:0; margin-left:20px;">修改</el-button>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>

	<div class="set-inner">
		<h4 class="set-title">身份证件</h4>
		<el-row class="set-rowBottom">
			<el-col :span="8" :offset="3" class="set-bank">
					<el-upload
						drag
						action="/hjy_pc_interface/api/pc/myaccount/imgUploadA"
						multiple
						accept="image/*"
						:limit="imgLimit"
						:file-list="productImgsA"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemoveA"
						:on-success="handleAvatarSuccessA"
						:before-upload="beforeAvatarUpload"
						:on-exceed="handleExceed"
						:on-error="imgUploadError"
						:show-file-list="showFileListA"
						>
						<img style="width:100%;height:100%;" v-if="imageUrlA&&showImgA" :src="imageUrlA" class="avatar">
						<i v-if="imageUrlA" class="el-icon-success"></i>
						<i v-else class="el-icon-upload"></i>
						<div  v-if="imageUrlA"  class="el-upload__text">已上传身份证正面</div>
						<div v-else class="el-upload__text">将身份证<em>正面</em>拖到此处，或<em>点击上传</em></div>
						
					</el-upload>
			</el-col>
			<el-col :span="8" :offset="1" class="set-bank">
					<el-upload
						ref="uploadA"
						class="upload-id"
						drag
						action="/hjy_pc_interface/api/pc/myaccount/imgUploadB"
						multiple
						accept="image/*"
						:limit="imgLimit"
						:file-list="productImgsB"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemoveB"
						:on-success="handleAvatarSuccessB"
						:before-upload="beforeAvatarUpload"
						:on-exceed="handleExceed"
						:on-error="imgUploadError"
						:show-file-list="showFileListB"
						>
						<img v-if="imageUrlB&&showImgB" :src="imageUrlB" class="avatar">
						<i v-if="imageUrlB" class="el-icon-success"></i>
						<i  v-else class="el-icon-upload"></i>
						<div v-if="imageUrlB" class="el-upload__text">已上传身份证反面</div>
						<div v-else class="el-upload__text">将身份证<em>反面面</em>拖到此处，或<em>点击上传</em></div>
						
					</el-upload>
			</el-col>
		</el-row>
		<h4 class="set-title" style="margin-top:20px;">拍摄照片示例</h4>
		<el-row class="set-error" :gutter="40">
			<el-col :span="6">
				<img src="@/assets/img/account-bac_03.png">
				<el-alert
					title="标准拍摄"
					type="success"
					center
					:closable="false"
					show-icon>
				</el-alert>
			</el-col>
			<el-col :span="6">
				<img src="@/assets/img/account-bac_05.png">
				<el-alert
					title="边框缺失"
					type="error"
					center
					:closable="false"
					show-icon>
				</el-alert>
			</el-col>
			<el-col :span="6">
				<img src="@/assets/img/account-bac_07.png">
				<el-alert
					title="照片模糊"
					type="error"
					center
					:closable="false"
					show-icon>
				</el-alert>
			</el-col>
			<el-col :span="6">
				<img src="@/assets/img/account-bac_09.png">
				<el-alert
					title="闪光强烈"
					type="error"
					center
					:closable="false"
					show-icon>
				</el-alert>
			</el-col>
		</el-row>
	</div>
	
  </div>
</template>

<script>

import axios from 'axios';
import sessionStorage from '@/model/sessionStorage.js';
export default {
	name: 'Set',
	data(){
		var samePassword = (rule, value, callback) => {
			if (value == this.form.oldPassword) {
				callback(new Error('新密码不能与原密码相同'));
			} else {
				callback();
			}
		};
		var validatePassword = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.form.newPassword) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		// var validateCheck = (rule, value, callback) => {
		// 	if (this.form.newPhone == '') {
		// 
		// 	} else {
		// 		callback();
		// 	}
		// };
		return {
			idCardUrl_A:false,
			idCardUrl_B:false,
			showImgB:false,
			showImgA:false,
			imageUrlA:false,
			imageUrlB:false,
			dialogImageUrl: '',
			dialogVisible: false,
			productImgsA: [],
			productImgsB: [],
			showFileListA:true,
			showFileListB:true,
			isMultiple: true,
			imgLimit:1,
			custName:'',
			certificateno:'',
			certificateno_show:'',
			mobileno:'.',
			password:'*******',
			address:'',
			act:'',
			btnLoading:false,
			form: {
				newPhone:'',
				checkCode:'',
				user_address:'',
				user_act:'',
				oldPassword:'',
				newPassword:'',
				newPasswordAgain:'',
			},
			//phone
			dialogFormVisible: false,
			formLabelWidth: '100px',
			time:'0',
			timeText:'发送验证码',
			timeDisable:false,
			//password
			dialogFormPasswordVisible:false,
			//联系地址
			dialogFormAddressVisible:false,
			//职业
			dialogFormActVisible:false,
			//风险测评
			dialogFXPCVisible:false,
			//all rules
			rules: {
				newPhone:[
					{required: true, len:11, message: '手机号格式不正确',trigger: 'blur' }
				],
				oldPassword: [
					{ required: true, message: '密码不能为空', trigger: 'blur' },
					{ min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
				],
				newPassword: [
					{ required: true, message: '密码不能为空', trigger: 'blur' },
					{validator: samePassword, trigger: 'blur' }
				],
				newPasswordAgain: [
					{validator: validatePassword, trigger: 'blur' }
				],
				user_address: [
					{ required: true, message: '请输入联系地址', trigger: 'change' }
				],
				// date1: [
				// 	{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				// ],
				// date2: [
				// 	{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }
				// ],
				// type: [
				// 	{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
				// ],
				// resource: [
				// 	{ required: true, message: '请选择活动资源', trigger: 'change' }
				// ],
				// desc: [
				// 	{ required: true, message: '请填写活动形式', trigger: 'blur' }
				// ]
			},
		

			loading:true,
		}
	},
	methods:{	
		// async handleChangeA(){
		// 	if (!await this.checkUpload()) {
		// 		console.log("submit");
		// 		this.$refs.uploadA.submit();
		// 	}else{
		// 		console.log("change...");
		// 	}
		// },
		handleRemoveA(file, fileList) {//移除图片
			if(this.idCardUrl_A){
				this.imageUrlA = true;
				this.showImgA = false;
			}else{
				this.imageUrlA = false;
			}
			this.productImgsA = [];
			console.log(file, fileList);
		},
		handleRemoveB(file, fileList) {//移除图片
			if(this.idCardUrl_B){
				this.imageUrlB = true;
				this.showImgB = false;
			}else{
				this.imageUrlB = false;
			}
			console.log(file, fileList);
		},
		handlePictureCardPreview(file) {//预览图片时调用
			console.log(file);
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		async checkUpload(){
			var upload_flag = true;
			await axios({
				method: 'post',
				url: 'pc/myaccount/checkUpload',
				params: {
				},
			}).then(res => {
				if(!res.upload_flag){
					upload_flag = false;
				}
			}).catch((error) => {

			});
			console.log("checkUpload...: " + upload_flag);
			return upload_flag;
		},
		beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
			// console.log(file);
			// const isJPG = true;
			// const isJPG = file.type === 'image/jpeg';
			const isLt10M = file.size / 1024 / 1024 < 10;
	
			// if (!isJPG) {
			//   this.$message.error('上传头像图片只能是 JPG 格式!');
			// }
			// if (!isLt10M) {
			// 	this.$message.error('上传图片大小不能超过 10MB!');
			// }

			// var upload_flag = this.checkUpload();

			// console.log("beforeAvatarUpload... : " + upload_flag);

			// return isLt10M && upload_flag;
			var upload_flag = true;

			if (isLt10M) {
				var params = {
				fileType: 0
				}
				// return new Promise((resolve, reject) => {
				// 	axios({
				// 		method: 'post',
				// 		url: 'pc/myaccount/checkUpload',
				// 		params: {
				// 		},
				// 	}).then(res => {
				// 		if(!res.upload_flag){
				// 			upload_flag = false;
				// 		}
				// 		console.log("upload_flag...:	" + upload_flag);
				// 		resolve(upload_flag);
				// 	}).catch((error) => {
				// 		console.log("error...:	" + error);
				// 		reject(false)
				// 	});
				// });
				var count = this.$store.state.idCard_upload;
				if(count >= 6){
					this.$message({
						message: '已超出今日最大上传次数，请明日再试.',
						type: 'error',
						center: true
					});
					return false;
				}else{
					return true;
				}
			} else {
				Message.error('上传图片大小不能超过 10MB!')
				return false
			}
		},
		handleAvatarSuccessA(res, file) {//图片上传成功
			// console.log("上传成功");
			// console.log(res);
			// console.log(file);
			if(res.has_upload == 1){
				this.$message({
					message: res.msg,
					type: 'error',
					center: true
				});
			}else{
				this.$message({
					message: res.msg,
					type: 'success',
					center: true
				});
				this.imageUrlA = URL.createObjectURL(file.raw);
				this.showImgA = true;
				this.$store.commit('changeIdCardUpload',res.idCard_upload);
			}
		},
		handleAvatarSuccessB(res, file) {//图片上传成功
			// console.log(res);
			// console.log(file);
			if(res.has_upload == 1){
				this.$message({
					message: res.msg,
					type: 'error',
					center: true
				});
			}else{
				this.$message({
					message: res.msg,
					type: 'success',
					center: true
				});
				this.imageUrlB = URL.createObjectURL(file.raw);
				this.showImgB = true;
				this.$store.commit('changeIdCardUpload',res.idCard_upload);
			}
		},
		handleExceed(files, fileList) {//图片上传超过数量限制
			this.$message.error('上传图片不能超过1张!');
			// console.log(file, fileList);
		},
		imgUploadError(err, file, fileList){//图片上传失败调用
			// console.log(err)
			this.$message.error('上传图片失败!');
		},
		//手机号修改提交
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$httpPost("/pc/myaccount/checkMobileCodeForChangeMobile",{mobileno:this.form.newPhone}).then(res => {
						if(res.isValid === "true"){
							this.btnLoading = true;
							setTimeout(()=>{ //为了展示按钮加载中动画。。。
								this.btnLoading = false;
								//关闭弹窗
								this.dialogFormVisible = false;
								//页面传值
								this.mobileno = this.form.newPhone;

								this.$refs['ruleForm'].resetFields();
								this.$message({
									message: '恭喜你，成功修改手机号',
									type: 'success',
									center: true
								});
							},1000);
						}else{
							this.$message({
								showClose: true,
								type: 'error',
								customClass:'register-error',
								center:true,
								message: res.msg
							});
						}
					}).catch(err => {
						//错误的回调
						// eslint-disable-next-line no-console
					});
				} else {
					console.log('error submit!!');
					return false;
					
				}
			});
		},
		//密码修改提交
		submitPasswordForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.btnLoading = true;
					this.$httpPost("/pc/myaccount/changePwd",{oldpwd:this.form.oldPassword,newpwd:this.form.newPassword}).then(res => {
						if(res.isValid === "true"){
							console.log("this.btnLoading..."+ this.btnLoading);
							setTimeout(()=>{ //为了展示按钮加载中动画。。。
								this.btnLoading = false;
								//关闭弹窗
								this.dialogFormPasswordVisible = false;
								this.$refs['passwordForm'].resetFields();
								this.$message({
									message: '恭喜你，成功修改密码',
									type: 'success',
									center: true
								});
							},1000);
						}else{
							setTimeout(()=>{ //为了展示按钮加载中动画。。。
								this.btnLoading = false;
								this.$message({
									showClose: true,
									type: 'error',
									customClass:'register-error',
									center:true,
									message: res.msg
								});
							},1000);
							
						}
					}).catch(err => {
						this.btnLoading = false;
						//错误的回调
						// eslint-disable-next-line no-console
					});
					
				} else {
					console.log('error submit!!');
					return false;
					
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.dialogFormVisible = false;
			this.dialogFormPasswordVisible = false;
			this.dialogFormAddressVisible = false;
			this.dialogFormActVisible = false;
		},
		sendCode(formName){
			this.$refs[formName].validateField('newPhone',(validMessage) => {
				if (validMessage) {
					this.$httpPost("/pc/myaccount/changeMobileSendCode",{mobileno:this.form.newPhone}).then(res => {
						if(res.isValid === "true"){
							this.time = 60;
							this.disabled = true;
							this.timer();
						}else{
							this.$message({
								showClose: true,
								type: 'error',
								customClass:'register-error',
								center:true,
								message: res.msg
							});
						}
					}).catch(err => {
						//错误的回调
						// eslint-disable-next-line no-console
					});
					
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		timer(){
			if( this.time > 0){
				this.time--;
				this.timeText = this.time + "s后重新获取";
				setTimeout(this.timer, 1000);
				this.timeDisable = true;
			}else{
				this.timeText = '发送验证码';
				this.timeDisable = false;
			}
		},
		jumpTo(key){
			// VueEvent.$emit('oldcard',this.user);
			this.$router.push('/'+key);
		},
		init(){
			this.queryUserDetails();
			this.getIdCardPic();
		},
		getIdCardPic(){
			this.$httpPost('pc/myaccount/getIdCardPic',{flag:'address',tb_address:this.form.user_address}).then(res=>{
				if(res.isValid === 'true'){
					if(res.idCardUrl_A != ""){
						this.imageUrlA = true;
						this.idCardUrl_A = true;
					}
					if(res.idCardUrl_B != ""){
						this.imageUrlB = true;
						this.idCardUrl_B = true;
					}
					this.$store.commit('changeIdCardUpload',res.upload_count);
				}
			}).catch(err=>{
				console.log("error submit");
			});
		},
		changeCard(item){
			this.$httpPost('pc/myaccount/chgBankCardCheck',{moneyaccount:item.moneyaccount}).then(res=>{
				if(res.code == "0000" && res.isValid == "true") {
					sessionStorage.set('oldCardDetails',item);
					this.$router.push('/changebankcard');
				}else{
					this.$message({
						showClose: true,
						type: 'error',
						customClass:'register-error',
						center:true,
						message: res.msg
					});
				}
			}).catch(err=>{
				console.log("error submit");
			});
			// console.log("item..:"+JSON.stringify(item));
		},
		submitAddressForm(formName){
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$httpPost('pc/myaccount/changeUserInformation',{flag:'address',tb_address:this.form.user_address}).then(rec=>{
						if(rec.isValid === 'true'){
							this.btnLoading = true;
							setTimeout(()=>{ //为了展示按钮加载中动画。。。
								this.btnLoading = false;
								//关闭弹窗
								this.dialogFormAddressVisible = false;
								//页面传值
								this.address = this.form.user_address;
								this.$refs['addressForm'].resetFields();
								this.$message({
									message: '恭喜你，成功修改联系地址',
									type: 'success',
									center: true
								});
							},1000);
						}
					}).catch(err=>{
						console.log("error submit");
					});
					
				} else {
					console.log('no validate !!');
					return false;
					
				}
			});
		},
		submitActForm(formName){
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$httpPost('pc/myaccount/changeUserInformation',{flag:'vocation',tb_address:this.form.user_act}).then(rec=>{
						if(rec.isValid === 'true'){
							this.btnLoading = true;
							setTimeout(()=>{ //为了展示按钮加载中动画。。。
								this.btnLoading = false;
								//关闭弹窗
								this.dialogFormActVisible = false;
								//页面传值
								this.act = this.form.user_act;
								this.$refs['actForm'].resetFields();
								this.$message({
									message: '恭喜你，成功修改职业',
									type: 'success',
									center: true
								});
							},1000);
						}
					}).catch(err=>{
						console.log("error submit");
					});
					
				} else {
					console.log('no validate !!');
					return false;
					
				}
			});
		},
		queryUserDetails(){
				this.$httpPost("/pc/myaccount/queryUserDetails").then (res=>{
					if(res.isValid == "redirect"){
						//  this.$store.commit('changeAutoLogin','0'); //修改登录状态
						this.$router.push('/login');
					}else{
						this.loading = false;
						this.custName = res.custName;
						this.certificateno_show = res.certificateno_show;
						this.certificateno = res.certificateno;
						this.mobileno = res.mobileno;
						this.form.mobileno = res.mobileno;
						this.address = res.user_address;
						this.act = res.user_vocation;
						this.$store.commit('changeRiskResult',res.custrisk_result);
						this.$store.commit('changeRiskTime',res.custriskTime);
						// this.$store.state.RISK_RESULT = res.custrisk_result;
						// this.$store.state.riskTime = res.custriskTime;
						// this.custriskTime = res.custriskTime;
						this.$store.commit('setBankCard',res.cardList);
					}
				}).catch(err =>{
					//错误的回调
					console.log("访问接口失败"+err);
				});
		},
		open() {
			this.$alert('根据《证券期货投资者适当性管理办法》规定，同时符合下列条件的自然人可认证为专业投资者：金融资产≥500万元；或最近3年个人年均收入≥50万元；具有2年以上证券、基金、期货、黄金、外汇等投资经历，或具有2年以上金融产品设计、投资、风险管理及相关工作经历。具体申请认证条件及办理流程详情咨询客服。', '投资者说明', {
			confirmButtonText: '我已了解',
			callback: action => {
				// this.$message({
				// type: 'info',
				// message: `action: ${ action }`
				// });
			}
			});
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
	.set{
		.set-inner{
			background-color: #fff;
			box-sizing: border-box;
			padding: 15px;
			box-shadow: 0 3px 5px rgba($color: #000000, $alpha: 0.2);
			border-radius: 5px;
			margin-bottom: 20px;
			// min-height: 500px;
			.set-row{
				line-height: 45px;
				border-bottom: 1px dotted $color-back-first;

				.el-col{
					font-size: 14px;
					color: $color-font-third;

					&:first-child{
						text-align: right;
						color:$color-font-first;
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
					span{
						text-decoration: underline;
						cursor: pointer;
					}
					i{
						font-size: 14px;
						color: $color-font-fourth;
						margin-left: 40px;
						font-style: normal;
					}
					
				}
				&:last-child{
					border: none 0;
				}
			}
			.set-title{
				font-weight: normal;
				padding: 10px;
				padding-bottom: 20px;

				span{
					font-size: 14px;
					color: $color-font-fourth;
					margin-left: 10px;
				}
				
			}
			.set-rowBottom{
				.set-bank{
					text-align: left;
					.set-bankcard{
						padding-top: 20px;
						padding-bottom: 20px;
						border-bottom: 1px dotted $color-back-first;

						&:last-child{
							border: none 0;
						}
						p{
						margin-bottom: 7px;
						font-size: 14px;
						}
						img{
							width: 30px;
							vertical-align: -8px;
							margin-right: 5px;
						}
						span{
							color: $color-font-second;
							margin-left: 10px;
						}
						&:first-child{
							padding-top: 0;
						}

					}
				}
			}
			.set-error{
				padding: 0 60px;
				text-align: center;
			}
			
		}
		.phoneChange-ruleForm{
			padding-right: 30px;
		}
		.el-upload-dragger .el-icon-success {
			font-size: 55px;
			color: #c0c4cc;
			margin: 40px 0 16px;
			line-height: 50px;
		}
		
	}
	.set-riskTitle{
		font-size: 14px;
		color: $color-font-first;
		font-weight: normal;
		padding: 5px 0;

		span{
			color: $color-font-third;
			font-size: 12px;
		}
		
	}
	.set-riskLink{
		font-size: 13px;
		color: $color-primary;
		margin-left: 0px;
		font-style: normal;
		cursor: pointer;
	}
	.set-riskDialog{
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
</style>
<style lang="scss">
.set-bank .el-upload-dragger{
	width: 250px;
	background: url(~@/assets/img/personID_03.png) no-repeat center center;
	background-size:240px;
	background-color:#edf1f7;
}
.upload-id .el-upload-dragger{
	width: 250px;
	background: url(~@/assets/img/personID_05.png) no-repeat center center;
	background-size:240px;
	background-color:#edf1f7;
}
</style>
