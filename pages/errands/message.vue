<template>
    <view>
        <cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">消息</block>
		</cu-custom>
        <view>
            <view class="cu-list menu-avatar">
				<view class="cu-item" >
					<view class="cu-avatar round ly" style="background-image:url(http://image.uczzd.cn/10786026896486406429.jpg?id=0&from=export);"></view>
					<view class="content">
						<view class="new-text-black ">冬天</view>	
					</view>
				</view>
                <view class="cu-item" >
					<view class="cu-avatar round ly" style="background-image:url(http://image.uczzd.cn/10786026896486406429.jpg?id=0&from=export);"></view>
					<view class="content">
						<view class="new-text-black ">冬天</view>	
					</view>
				</view>
                <view class="cu-item" >
					<view class="cu-avatar round ly" style="background-image:url(http://image.uczzd.cn/10786026896486406429.jpg?id=0&from=export);"></view>
					<view class="content">
						<view class="new-text-black ">冬天</view>	
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
