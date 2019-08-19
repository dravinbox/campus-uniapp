<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">注册</block>
		</cu-custom>
		
		<form>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="输入11位手机号码" name="input"></input>
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
				<input placeholder="输入6位验证码" name="input"></input>
				<button class='cu-btn bg-green shadow' v-bind:disabled="dis" @click="getVerifyCode" v-text="verifyText"></button>
			</view>
			<view class="padding-xl">
				<button class="cu-btn block bg-blue margin-tb-sm lg">注册</button>
			</view>
			
			<view class="padding-sm" >
				<view class="text-center text-blue" @click="jumpToLogin">
					已有帐号？去登录
				</view>
			</view>
			
		</form>
	</view>
	
	
</template>

<script>
	export default {
		data() {
			return {
				dis: false,
				intervalId: null,
				timeOutId: null,
				verifyText: '验证码',
				waitingSeconds: 60
			}
			
		},methods:{
			jumpToLogin(){
				uni.navigateBack({})
			},
			getVerifyCode(){
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
			console.log("register hide");
		},
		onUnload() {
			console.log("register unload");
			this.recover()
		}
	}
	
	
</script>

<style>
</style>
