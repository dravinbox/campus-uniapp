<template>
    <view>
        <cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">消息</block>
		</cu-custom>
        <view>
            <view class="cu-list menu-avatar">
				<view class="cu-item" >
					<view class="cu-avatar round ly" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
					<view class="content">
						<view class="new-text-black ">凯尔</view>	
					</view>
				</view>
                <view class="cu-item" >
					<view class="cu-avatar round ly" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
					<view class="content">
						<view class="new-text-black ">凯尔</view>	
					</view>
				</view>
                <view class="cu-item" >
					<view class="cu-avatar round ly" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
					<view class="content">
						<view class="new-text-black ">凯尔</view>	
					</view>
				</view>
			</view>
        </view>
        <view class="cu-tabbar-height "></view>
    </view>
</template>

<script>
    export default {
		data() {
			return {
                
			}
		},
		methods: {
			
		},
		
	}
</script>

<style scoped>
.cu-list.menu-avatar>.cu-item .content{
	left: 120rpx ;
	width: calc(100% - 120rpx - 20rpx);
}
</style>
