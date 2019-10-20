<template>
	<view>
		<cu-custom bgColor="bg-gradual-newblue" >
			<block slot="content">登录</block>
		</cu-custom>

		<form>
			<view class="cu-form-group">
				<view class="title">账号名</view>
				<input placeholder="请输入账号名" v-model="params.name" name="input" />
			</view>

			<view class="cu-form-group">
				<view class="title">密码</view>
				<input placeholder="请输入密码" v-model="params.password" password='true' name="input" />
			</view>

			<view class="padding-xl">
				<button class="cu-btn block bg-blue margin-tb-sm lg" @click="login">登录</button>
			</view>
			<view class="padding text-sl text-center text-green">
				<text class="cuIcon-weixin" @click="wxLogin"></text>
			</view>
			

			<view class="padding-xl">
				<view class="text-center text-blue" @click="jumpToRegister">
					没帐号？去注册
				</view>
			</view>

		</form>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">登录失败</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					帐号或密码错误
				</view>
			</view>
		</view>

	</view>


</template>

<script>
	import {
		loginApi
	} from '../../component/api/login.js'

	export default {
		data() {
			return {
				dis: false,
				intervalId: null,
				timeOutId: null,
				verifyText: '验证码',
				waitingSeconds: 60,
				mobile: '',
				vcode: '',
				params: {
					"name": "",
					"password": "",
				},
				modalName: null,
				wxLoginRes: {
					access_token: "26_ApGeD6wzsFrQTCs4TBxSBuY9Q76ddtxImeyZrR8mmVUoym86IN-TNd-bgUwrszHRvbAhFwqTWP8OX2eCi-SmOZV5NziXxIMbaoKYw-8nINg",
					expires_in: 7200,
					refresh_token: "26_2cVIwca212G3aioWbyB4WdGpK-kVtBqp6N4YwU2_xFCkAAVKhYzUnrILcL_7wE6xBn17AoxYWnWBV8ExMUgzrdmGjDcVOuUa81ySIVw6Qpo",
					openid: "oRrdQt8SVe2KLNutP002xfEf0tIc",
					scope: "snsapi_userinfo",
					unionid: "oU5Yyt2mu5NDFK73nn_5VlVyRiBQ",
				},
				wxUserInfo: {
					openId: "oRrdQt58u8N13bKyV_hr2tAQizj0",
					nickName: "dravin",
					gender: 0,
					city: "",
					province: "",
					country: "",
					avatarUrl: "http://thirdwx.qlogo.cn/mmopen/vi_32/8icsV5p0BwlxkualsT0Hf5T3KadlOP91WpbIFJOsibIY1fZb5xhlOEHoicjmY784mw4s5pKNd1BicmXLCWMUTSL8PQ/132",
					unionId: "oU5Yytx6vqTyaMuqRIENy5ak6SoI"
				},
			}

		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
							this.modalName = null
			},
			login() {
				
				loginApi.loginUser(this.params, (res) => {
					if (res.data.code == 200) {
						try {
							uni.setStorageSync('token', res.data.data.token);
							uni.redirectTo({
								url: './index'
							});
						} catch (error) {
							console.log(error)
						}
					}
				}, (res) => {
					console.log("登录失败", res)
					this.modalName = "Modal"
				})

			},
			wxLogin(){
				
				let _this = this
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    console.log(loginRes.authResult);
					//保存授权信息
					 _this.wxLoginRes = loginRes.authResult
					 //请求用户微信信息，并且保存
					 uni.getUserInfo({
					       provider: 'weixin',
					       success: function (infoRes) {
					 		  console.log(infoRes)
							 _this.wxUserInfo = infoRes.userInfo
					 		
					       }
					     })
					 
					 //发起服务器的微信登录请求
					 loginApi.wxLogin(_this.wxLoginRes.openid,(res)=>{
					 	console.log("通过微信登录接口登录成功",res)
						uni.setStorageSync('token', res.data.data.token);
						uni.navigateTo({
							url: 'index'
						})
					 },(res)=>{
					 	console.log("通过微信登录接口登录失败,进行静默注册",res)
						// 静默注册 todo
						let register_data = {
							name: _this.randomString(11),
							nickName: _this.wxUserInfo.nickName,
							password: _this.randomString(11),
							openid: _this.wxLoginRes.openid,
							unionid: _this.wxLoginRes.unionid,
						}
						console.log("注册参数",register_data)
						loginApi.signUser(register_data,(res)=>{
							console.log("静默注册成功",res)
							uni.navigateTo({
								url: 'index'
							})
						},(res)=>{
							console.log("静默注册失败",res)
						})
						
					 })
				  }
				});
			},
			randomString(len) {
			　　len = len || 32;
			　　let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
			　　let maxPos = $chars.length;
			　　let pwd = '';
				let i = 0;
			　　for (i = 0; i < len; i++) {
			　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
			　　}
			　　return pwd;
			},
			jumpToRegister() {
				this.recover()
				uni.navigateTo({
					url: 'register'
				})
			},
			getVerifyCode() {
				loginApi.getVCode(this.mobile);
				this.dis = true
				this.intervalId = setInterval(() => {
					this.waitingSeconds--
					this.verifyText = this.waitingSeconds + "秒"

				}, 1000)
				this.timeOutId = setTimeout(() => {

					this.recover()
				}, 60000)
			},
			recover() {
				clearInterval(this.intervalId)
				this.verifyText = '验证码'
				this.waitingSeconds = 60
				this.dis = false
				clearTimeout(this.timeOutId)
				console.log("clear interval id:", this.intervalId, "clear timeout id:", this.timeOutId)

			},


		},
		onHide() {
			console.log("login hide")
		}
	}
</script>

<style>
</style>
