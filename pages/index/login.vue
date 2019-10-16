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

			<view class="padding-sm">
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
							uni.navigateTo({
								url: '/'
							})
						} catch (error) {
							console.log(error)
						}
					}
				}, (res) => {
					console.log("登录失败", res)
					this.modalName = "Modal"
				})

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
