<template>
	<view>
		<mainpage v-if="PageCur=='mainpage'"></mainpage>
		<me v-if="PageCur=='me'"></me>
		
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action " :class="PageCur=='mainpage'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="mainpage" >
				<view :class="PageCur=='mainpage'?'cuIcon-homefill':'cuIcon-home'"></view> 
				<view>首页</view>
			</view>
			<view class="action" :class="PageCur=='discover'?'new-text-blue':'new-text-black'" @tap='secondEvent(1)'  data-cur="discover" >
				<view :class="PageCur=='discover'?'cuIcon-friendfill':'cuIcon-friend'"></view>
				<view >那些人</view>
				<view class="new-text" :class="second==1?'active':''">
					<view @tap="openRun(1)">文字匹配</view>
					<view @tap="openRun(1)">语音匹配</view>
					<text class="new-index-cuIcon"></text>
				</view>
			</view>
			<view class="action " :class="PageCur=='mainpagge'?'new-text-blue':'new-text-black'"  @click="openRun(3)"  data-cur="maignpage" >
				<view :class="PageCur=='mainpgage'?'cuIcon-messagefill':'cuIcon-message'"></view> 
				<view>那些话</view>
			</view>
			<view class="action" :class="PageCur=='errands'?'new-text-blue':'new-text-black'" @click="openRun(2)" data-cur="errands" >
				<view :class="PageCur=='errands'?'cuIcon-goodsnewfill':'cuIcon-goodsnew'">
					<!-- <view class="cu-tag badge">99</view> -->
				</view>
				跑腿
			</view>
			<view class="action" :class="PageCur=='message'?'new-text-blue':'new-text-black'" @tap='secondEvent(2)' data-cur="message" >
				<view :class="PageCur=='message'?'cuIcon-shopfill':'cuIcon-shop'"></view>
				<view >商城</view>
				<view class="new-shop new-text" :class="second==2?'active':''">
					<view>拍卖城</view>
					<view>购物城</view>
					<text class="new-index-cuIcon"></text>
				</view>
			</view>
			
			<view class="action" :class="PageCur=='me'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="me" >
				<view :class="PageCur=='me'?'cuIcon-circlefill':'cuIcon-circle'">
					<!-- <view class="cu-tag badge"></view> -->
				</view>
				<view >分类</view>
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'mainpage',
				modalName: null,
				radio: 'radio1',
				second:0,
			}
		},
		onShow(){
			console.log('dfff')
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur;
				this.second = 0;
			},
			openRun(ev){
				if(ev==1){
					uni.navigateTo({
						url: '/pages/message/good-friend-list'
					});
				}else if(ev==2){
					uni.navigateTo({
						url: '/pages/errands/index'
					});	
				}else if(ev==3){
					uni.navigateTo({
						url: '/pages/message/home'
					});	
				}
							
			},
			secondEvent(index){
				this.second = index;
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
		},
		// onReachBottom(){
		// 	console.log("index==========")
		// }
		
	}
</script>

<style scoped>
.cu-bar.tabbar{
	bottom: calc(var(--window-bottom))
}
.new-text{
	position: absolute;
	top: -195rpx;
	left: 0rpx;
	width: 150rpx;
	height: 160rpx;
	background: #fff;
	z-index: 100000;
	border-radius: 20rpx;
	-webkit-border-radius: 20rpx;
	border: 1px solid #f3f3f3;
	display: none;
	color: #000;
}
.new-text.active{
	display: block;
}
.new-text view{
	width: 130rpx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	margin:  0 auto;
} 
.new-index-cuIcon{
	position: absolute;
	bottom: -18rpx;
	left: 35rpx;
	width: 0;
    height: 0;
	border-top: 20rpx solid #f3f3f3;
	border-left: 20rpx solid transparent;
	border-right: 20rpx solid transparent; 
	
}
.new-text view:first-of-type{
	border-bottom: 1px solid #f3f3f3;
}
</style>
