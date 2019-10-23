<template>
	<view>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" :class="PageCur=='errands'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="errands" >
				<view :class="PageCur=='errands'?'cuIcon-homefill':'cuIcon-home'"></view>
				<view>首页</view>
			</view>
			<view class="action " :class="PageCur=='message'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="message" >
				<view :class="PageCur=='message'?'cuIcon-remind':'cuIcon-remind'"></view> 
				<view>我的提醒</view>
			</view>
			<view class="action" :class="PageCur=='order'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="order" >
				<view :class="PageCur=='order'?'cuIcon-send':'cuIcon-send'">
				</view>
				<view>我要发布</view>			 
			</view>
			
			<view class="action" :class="PageCur=='mine'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="mine" >
				<view :class="PageCur=='mine'?'cuIcon-myfill':'cuIcon-my'">
					<!-- <view class="cu-tag badge"></view> -->
				</view>
				<view>我的拍卖</view>
			</view>
			
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur: 'errands',
				modalName: null,
                radio: 'radio1',
                
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
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
	}
</script>

<style>

</style>
