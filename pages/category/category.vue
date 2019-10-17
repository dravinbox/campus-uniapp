<template>
	<view>
		<dynamic-list v-if="PageCur=='dynamic'"  :parameter='newParam'></dynamic-list>

		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" :class="PageCur=='dynamic'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="dynamic" >
				<view :class="PageCur=='dynamic'?'cuIcon-homefill':'cuIcon-home'"></view>
				<view >首页</view>
			</view>
			<view class="action " :class="PageCur=='release'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="release" >
				<view :class="PageCur=='release'?'cuIcon-discoverfill':'cuIcon-send'"></view> 
				<view>发布</view>
			</view>			
			<view class="action" :class="PageCur=='me'?'new-text-blue':'new-text-black'" @click="NavChange" data-cur="me" >
				<view :class="PageCur=='me'?'cuIcon-myfill':'cuIcon-my'">
					
				</view>
				<view >我的</view>
			</view>
			
		</view>		
	</view>
</template>

<script>
	import dynamicList from '../../component/friendship/dynamic-list.vue'
	export default {
		components: {dynamicList},
		data() {
			return {
				PageCur: 'dynamic',
				modalName: null,
				radio: 'radio1',
				newParam:{
					classItem:'',
					cateId:null,
				}
			}
		},
		onLoad(option) {
			console.log(option.classItem); //打印出上个页面传递的参数。
			console.log(option.cateId); //打印出上个页面传递的参数
			this.newParam.classItem = option.classItem;
			this.newParam.cateId = Number(option.cateId);
			console.log(this.newParam)
			var pages = getCurrentPages();
			console.log(pages)
			//console.log(this.$mp.query)
		},
		methods: {
			NavChange: function(e) {
				let PageCur = e.currentTarget.dataset.cur
				if(PageCur=='me'){
					uni.navigateTo({
						url: '../me/personal?classItem=me'
					});
				}else if(PageCur=='release'){
					uni.navigateTo({
						url: '../category/release?cateId='+this.newParam.cateId
					});
				}
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
