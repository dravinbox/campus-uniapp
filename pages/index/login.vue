<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" >
			<block slot="content">登录</block>
		</cu-custom>
		
		<form>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="输入11位手机号码" name="input" v-model="mobile"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			
			<view class="cu-form-group">
				<view class="title">验证码</view>
				<input placeholder="输入6位验证码" name="input" v-model="vcode"></input>
				<button class='cu-btn bg-green shadow' v-bind:disabled="dis" @click="getVerifyCode" v-text="verifyText"></button>
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
				vcode:''
			}
			
		},methods:{
			login(){
			
				console.log("login...",loginApi)
				// console.log(loginApi.getName())
				loginApi.login(this.mobile,this.vcode,(res)=>{
					console.log("hhh",res)
				},(res)=>{
					console.log("login fail",res)
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
