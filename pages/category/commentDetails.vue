<template>
	<view>
		<view v-if="detail&&check">
			<cu-custom bgColor="bg-white" :isBack="true">
				<block slot="backText" >首页</block>
				<view slot="content" >
					<view class="new-content justify-center">
						<view class="backImg">
							<image :src='detail.user.userInfo.headImage'></image>
						</view>
						<view class="new-backText">{{detail.user.userInfo.nickName||''}} </view>
					</view>
				</view>
			</cu-custom>	
		</view>	
	</view>
</template>

<script>
	import { discoverApi } from '../../component/api/discover.js';
	export default {
		data() {
			return {
				PageCur: 'dynamic',
				modalName: null,
				radio: 'radio1',
				newParam:{
					classItem:'',
					postId:null,
				},
				detail:null,
				check:false
			}
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中'
			});
			console.log(option.classItem); //打印出上个页面传递的参数。
			console.log(option.cateId); //打印出上个页面传递的参数
			this.newParam.classItem = option.classItem;
			this.newParam.postId = Number(option.postId);
			console.log(this.newParam)
			var pages = getCurrentPages();
			console.log(pages)
			if(this.newParam.postId){
				this.getPostDetail(this.newParam.postId);
			}
			
			//console.log(this.$mp.query)
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
			getPostDetail(postId){
				discoverApi.getPostDetail('/'+postId,{},(res)=>{
					console.log(res)
					if(res.data.code == 200){
						this.detail = res.data.data;
						
					}
					
				})
				setTimeout(()=>{
					this.check = true;
					uni.hideLoading()
				},2000)
			}
		},
		
	}
</script>

<style scoped>
.new-content{
	height: 60rpx !important;
	overflow: hidden;
	margin: 0 auto;
	display: flex;
}
.backImg{
	display: inline-block;
	overflow: hidden;
}
.backImg image{
	width: 60rpx !important;
	height: 60rpx !important;
	border-radius: 50%;
	-webkit-border-radius: 50%;	
}
.new-backText{
	height: 60rpx !important;
	display: inline-block;
	line-height: 60rpx !important;
	max-width: 250rpx;
	text-indent: 10rpx;
}
</style>
