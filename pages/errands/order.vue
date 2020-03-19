<template>
    <view>
        <cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">详情</block>
		</cu-custom>
        <view>
            <view class="cu-list menu-avatar">
				<view class="cu-item" >
					<view class="cu-avatar round ly" style="background-image:url(http://image.uczzd.cn/10786026896486406429.jpg?id=0&from=export);"></view>
					<view class="content">
						<view class="new-text-black ">冬天</view>	
					</view>
                    
				</view>
                <view class="padding-left-sm padding-right-sm bg-white ">
                    <view class="flex">
                        <view class="flex-sub new-text-black padding-sm  radius">需垫付: 无</view>
                        <view class="flex-sub new-text-black  padding-sm  radius">物品个数:1</view>
                    </view>
                    <view class="flex new-text-black">
                        <view class="flex-sub  padding-sm text-cut  radius">物品重量：9kg</view>
                        <view class="flex-sub  padding-sm  radius">本单赏金：￥10</view>
                    </view>
                    <view class="flex new-border new-text-black">
                        <view class="flex-sub  padding-sm  radius">需求：无</view>
                    </view>
                </view>

                <view class="padding-left-sm padding-right-sm bg-white ">
                    <view class="flex">
                        <view class="flex-sub new-text-black padding-sm  radius"> <text class="padding-right-sm cuIcon-time"></text> 时间： 立即出发/预约时间</view>
                    </view>
                    <view class="flex new-text-black">
                        <view class="flex-sub  padding-sm  radius"> <text class="text-red padding-right-sm cuIcon-locationfill"></text> 前往：世界之窗</view>
                    </view>
                    <view class="flex  new-text-black">
                        <view class="flex-sub  padding-left-sm padding-top-sm  radius"> <text class="text-blue padding-right-sm cuIcon-locationfill"></text> 到达：</view>
					    <view class="flex-four padding-top-sm padding-bottom-sm radius">

                            <view>张三 （13988888888）</view>
                            <view>地址：2号楼五单元090</view>
                        </view>
                    </view>
                </view>

                <view class="bg-white">
                    <view class="flex solid-bottom padding-right-sm padding-top-xs padding-bottom-sm justify-end">
                        <view class="solid padding-xs new-text-black radius">在线联系</view>
                        <view class="solid padding-xs margin-left text-blue  radius">电话联系</view>
                    </view>
                </view>
			</view>

            <view class="cu-list menu-avatar">
				<view class="cu-item" >
					<view class="cu-avatar round ly" style="background-image:url(http://image.uczzd.cn/10786026896486406429.jpg?id=0&from=export);"></view>
					<view class="content">
						<view class="new-text-black ">冬天</view>	
					</view>
                    
				</view>
                <view class="padding-left-sm padding-right-sm bg-white ">
                    <view class="flex">
                        <view class="flex-sub new-text-black padding-sm  radius">需垫付: 无</view>
                        <view class="flex-sub new-text-black  padding-sm  radius">物品个数:1</view>
                    </view>
                    <view class="flex new-text-black">
                        <view class="flex-sub  padding-sm text-cut  radius">物品重量：9kg</view>
                        <view class="flex-sub  padding-sm  radius">本单赏金：￥10</view>
                    </view>
                    <view class="flex new-border new-text-black">
                        <view class="flex-sub  padding-sm  radius">需求：无</view>
                    </view>
                </view>

                <view class="padding-left-sm padding-right-sm bg-white ">
                    <view class="flex">
                        <view class="flex-sub new-text-black padding-sm  radius"> <text class="padding-right-sm cuIcon-time"></text> 时间： 立即出发/预约时间</view>
                    </view>
                    <view class="flex new-text-black">
                        <view class="flex-sub  padding-sm  radius"> <text class="text-red padding-right-sm cuIcon-locationfill"></text> 前往：世界之窗</view>
                    </view>
                    <view class="flex  new-text-black">
                        <view class="flex-sub  padding-left-sm padding-top-sm  radius"> <text class="text-blue padding-right-sm cuIcon-locationfill"></text> 到达：</view>
					    <view class="flex-four padding-top-sm padding-bottom-sm radius">

                            <view>张三 （13988888888）</view>
                            <view>地址：2号楼五单元090</view>
                        </view>
                    </view>
                </view>

                <view class="bg-white">
                    <view class="flex solid-bottom padding-right-sm padding-top-xs padding-bottom-sm justify-end">
                        <view class="solid padding-xs new-text-black radius">在线联系</view>
                        <view class="solid padding-xs margin-left text-blue  radius">电话联系</view>
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
.cu-list.menu-avatar>.cu-item:after{
    content: ' ';
    border-bottom: none;
}
.cu-list.menu-avatar>.cu-item .content{
	left: 120rpx ;
	width: calc(100% - 120rpx - 20rpx);
}
.new-border{
    border-bottom: 1px solid #f3f3f3;
}
</style>
