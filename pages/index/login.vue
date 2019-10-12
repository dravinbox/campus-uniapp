<template>
	<view>
		<cu-custom bgColor="bg-gradual-newblue" isBack="true">
			<block slot="content">登录</block>
		</cu-custom>
		
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">邮件</view>
				<input  placeholder="请输入邮箱" v-model="params.email" />
			</view>
			<view class="cu-form-group">
				<view class="title">账号名</view>
				<input placeholder="请输入账号名" v-model="params.name" name="input"/>
			</view>
			<view class="cu-form-group">
				<view class="title">用户昵称</view>
				<input placeholder="请输入用户昵称" v-model="params.nickName" name="input"/>
			</view>
			<view class="cu-form-group">
				<view class="title">密码</view>
				<input placeholder="请输入密码" v-model="params.password" password='true' name="input"/>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="请输入手机号" v-model="params.phone" name="input" />
			</view>
			<view class="padding-xl">
				<button class="cu-btn block bg-blue margin-tb-sm lg" @click="login">登录</button>
			</view>
			
			<view class="padding-sm" >
				<view class="text-center text-blue" @click="jumpToRegister">
					没帐号？去注册
				</view>
			</view>
			
		</form>
	</view>
	
	
</template>

<script>
	import {loginApi} from '../../component/api/login.js'
	
	export default {
		data() {
			return {
				dis: false,
				intervalId: null,
				timeOutId: null,
				verifyText: '验证码',
				waitingSeconds: 60,
				mobile:'',
				vcode:'',
				params:{
					"email": "12@21.com",
					"name": "",
					"nickName": "",
					"password": "",
					"phone": "13012341234"
				}
			}
			
		},methods:{
			login(){
			
				console.log("login...",loginApi)
				// console.log(loginApi.getName())
				loginApi.loginUser(this.params,(res)=>{
					if(res.data.code == 200){
						//console.log(res.data.data)
						try {
							uni.setStorageSync('token', res.data.data.token);
							this.getCategory()
						} catch (error) {
							console.log(error)
							// error
						}
					}
				})
				
			},
			jumpToRegister(){
				this.recover()
				uni.navigateTo({
					url: 'register'
				})
			},
			getVerifyCode(){
				loginApi.getVCode(this.mobile);
				this.dis=true
				this.intervalId = setInterval(()=>{
					this.waitingSeconds--
					this.verifyText = this.waitingSeconds + "秒"
					
				},1000)
				this.timeOutId = setTimeout(()=>{
					
					this.recover()
				},60000)
			},
			recover(){
				clearInterval(this.intervalId)
				this.verifyText ='验证码'
				this.waitingSeconds= 60
				this.dis = false
				clearTimeout(this.timeOutId)
				console.log("clear interval id:",this.intervalId,"clear timeout id:",this.timeOutId)
				
			},
			
			
		},
		onHide() {
			console.log("login hide")
		}
	}
	
	
</script>

<style>
</style>
