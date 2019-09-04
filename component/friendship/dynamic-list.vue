<template name="dynamic">
	<view>
		
		<!-- 标题 -->
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
            <!-- <block slot="backText">返回</block> -->
			<block slot="content">动态</block>
		</cu-custom>
		
		<!-- 动态 -->
		<view >
			<post-list  :itemList='list' ></post-list>
		</view>

		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import postList from './post-list.vue'
	import { discoverApi } from '../api/discover.js';
	export default {
        components: {postList},
		name: "dynamic",
		data() {
			return {
				isCard: true,
				list:[],
				params:{
					"oneCateId": 1,
					"pageNum": 1,
					"pageSize": 10,
					"pullLast": false,
				},
			};
		},
		methods: {
		},
		mounted() {
			//获取帖子列表
			discoverApi.getPostList(this.params,(res)=>{
				console.log("get tPostList:  ",res.data.data);
				this.list = [];
				if(res.data.code == 200){
					if(res.data.data.list){
						res.data.data.list.forEach((item,index) => {
							console.log(typeof(item.imagesJsonList));
							console.log(JSON.parse(item.imagesJsonList));
							item.videoPaused = false;
							if(JSON.parse(item.imagesJsonList)!=null){
								item.imagesJsonList = JSON.parse(item.imagesJsonList);
								
							}else{
								item.imagesJsonList = []
							}
							this.list.push(item);
							
						});
					}
				}
				
				console.log(this.list)
			})
		}
	}
</script>

<style  scoped>
.cu-list.menu-avatar>.cu-item>.cu-avatar {
    left: 24upx !important;
}
.cu-list.menu-avatar>.cu-item .content{
    left: 126upx !important;
}
.cu-avatar image{
	width: 100%;
	height: 100%;
	border-radius: 50%;
	-webkit-border-radius: 50%;
}
.new-overflow{
	overflow: visible !important;
}
.audio-content{
	width: 465upx;
	height: 72upx;
	line-height: 72upx;
	background: #2ad0ea;
	border-radius: 72upx;
	-webkit-border-radius: 72upx;
	font-size: 36upx;
}
.new-follow{
	width: 110upx;
	height: 50upx;
	line-height: 50upx;
	background: #2ad0ea;
	border-radius: 50upx;
	-webkit-border-radius: 50upx;
	font-size: 24upx;
	color: #ffffff;
	
}
.new-text-gray{
	font-size:40rpx;
	padding:0 6rpx;
	position: relative;
	color: #666666;
}
.new-cate-class{
	position: absolute;
	top: 50rpx;
	left: -75rpx;
	width: 133rpx;
	height: 188rpx;
	padding-top: 10rpx;
	border: 1px solid #f3f3f3;
	z-index: 10000;
	box-shadow: #e8e8e8 0px 0px 5px 1px ;
}
.new-cate-class:before{
	box-sizing: content-box;
	width: 0px;
	height: 0px;
	position: absolute;
	top: -30rpx;;
	right:16rpx;
	padding:0;
	border-bottom:16rpx solid #FFFFFF;
	border-top:16rpx solid transparent;
	border-left:16rpx solid transparent;
	border-right:16rpx solid transparent;
	display: block;
	content:'';
	z-index: 12;
}
.new-cate-class:after{
	box-sizing: content-box;
	width: 0px;
	height: 0px;
	position: absolute;
	top: -34rpx;
	right:14rpx;
	padding:0;
	border-bottom:18rpx solid #f3f3f3;
	border-top:18rpx solid transparent;
	border-left:18rpx  solid transparent;
	border-right:18rpx  solid transparent;
	display: block;
	content:'';
	z-index:10
    }
.new-cate-class .text-center{
	font-size: 30rpx;
	color: #000000;
	height: 58rpx;
	line-height: 58rpx;
}
.new-text-background{
	width: 56rpx;
	height: 28rpx;
	line-height: 30rpx;
	background: #ec0d1b;
	border-radius:10rpx;
	-webkit-border-radius: 10rpx;
	font-size: 16rpx;
	color: #ffffff;
	margin: 0px 15rpx;
}
.new-text-red{
    color: #ec0d1b;
}
.new-text-grey{
	color: #acacac;
}
.new-text-padding{
	padding: 0upx 10upx;
}
.new-class-sub{
	width: 25%;
	overflow: hidden;
	height: 80rpx;
	line-height: 80rpx;
	box-sizing: border-box;
}
</style>>
   
