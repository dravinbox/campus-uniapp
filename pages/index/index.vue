<template>
	<view>
		<mainpage v-if="PageCur=='mainpage'"></mainpage>
		<discover v-if="PageCur=='discover'"></discover>
		<message v-if="PageCur=='message'"></message>
		<me v-if="PageCur=='me'"></me>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" :class="PageCur=='mainpage'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="mainpage" >
				<view :class="PageCur=='mainpage'?'cuIcon-homefill':'cuIcon-home'"></view>
				<view >那些人</view>
			</view>
			<view class="action " :class="PageCur=='discover'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="discover" >
				<view :class="PageCur=='discover'?'cuIcon-discoverfill':'cuIcon-discover'"></view> 
				<view>那些话</view>
			</view>
			<view class="action" :class="PageCur=='message'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="errands" >
				<view :class="PageCur=='message'?'cuIcon-messagefill':'cuIcon-message'">
					<view class="cu-tag badge">99</view>
				</view>
				跑腿
			</view>
			<view class="action" :class="PageCur=='message'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="message" >
				<view :class="PageCur=='message'?'cuIcon-messagefill':'cuIcon-message'">
					<view class="cu-tag badge">99</view>
				</view>
				商城
			</view>
			
			<view class="action" :class="PageCur=='me'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="me" >
				<view :class="PageCur=='me'?'cuIcon-myfill':'cuIcon-my'">
					<view class="cu-tag badge"></view>
				</view>
				<view >分类</view>
			</view>
			
		</view>
		
		<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in 5" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">Item {{index +1}}</view>
								<radio class="round" :class="radio=='radio' + index?'checked':''" :checked="radio=='radio' + index?true:false"
								 :value="'radio' + index"></radio>
							</label>
						</view>
					</view>
				</radio-group>
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
