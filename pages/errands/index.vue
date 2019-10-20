<template>
	<view>
        <errands v-if="PageCur=='errands'"></errands>
		<message v-if="PageCur=='message'"></message>
		<order v-if="PageCur=='order'"></order>
        <mine v-if="PageCur=='mine'"></mine>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" :class="PageCur=='errands'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="errands" >
				<view :class="PageCur=='errands'?'cuIcon-homefill':'cuIcon-home'"></view>
				<view>跑腿</view>
			</view>
			<view class="action " :class="PageCur=='message'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="message" >
				<view :class="PageCur=='message'?'cuIcon-markfill':'cuIcon-mark'"></view> 
				<view>消息</view>
			</view>
			<view class="action" :class="PageCur=='order'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="order" >
				<view :class="PageCur=='order'?'cuIcon-newshotfill':'cuIcon-newshot'">
				</view>
				<view>订单</view>			 
			</view>
			
			<view class="action" :class="PageCur=='me'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="mine" >
				<view :class="PageCur=='me'?'cuIcon-myfill':'cuIcon-my'">
					<!-- <view class="cu-tag badge"></view> -->
				</view>
				<view>我的</view>
			</view>
			
		</view>	
	</view>
</template>

<script>
    import errands from './errands.vue'
	import mine from './mine.vue'
	import message from './message.vue'
	import order from './order.vue'
	export default {
        components: {errands,mine,message,order},
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
