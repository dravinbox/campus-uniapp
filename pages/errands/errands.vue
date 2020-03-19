<template>
	<view>
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">跑腿</block>
		</cu-custom>
		<view>

			<view class="new-text-blue location">
				需要什么帮忙？
			</view>
			<!-- 功能板  cuIconList绑定的数据 gridCol行个数 gridRow多少行 gridBorder是否要带边框  -->
			<navigation-list :cuIconList='cuIconList'></navigation-list>


			<view class="new-margin-top  cu-list menu-avatar">
				<view class="cu-item" >
					<view class="cu-avatar round ly" style="background-image:url(http://image.uczzd.cn/10786026896486406429.jpg?id=0&from=export);"></view>
					<view class="content">
						<view class="new-text-black ">冬天</view>
						<view class="money-content text-sm flex">
							<view class="text-cut">
								<text class="errand-type type-first">代买跑腿</text>
								<!-- <text class="errand-type type-second">取件跑腿</text> -->
							</view> 
							<view class="text-cut">
								<text class="errand-money">赏金：￥3元</text>
							</view> 
							<view class="text-cut">
								<text class="new-text-black">未接单</text>
								<!-- <text class="new-gray">已接单</text> -->
								<!-- <text class="new-state">预约单</text> -->
							</view> 
						</view>
					</view>
					<view class="action">
						<!-- <view class="old-border" >接单</view> -->
						<view class="old-border new-border" >接单</view>
					</view>
				</view>

				<view class="cu-item" >
					<view class="cu-avatar round ly" style="background-image:url(http://image.uczzd.cn/10786026896486406429.jpg?id=0&from=export);"></view>
					<view class="content">
						<view class="new-text-black ">冬天</view>
						<view class="money-content text-sm flex">
							<view class="text-cut">
								<!-- <text class="errand-type type-first">代买跑腿</text> -->
								<text class="errand-type type-second">取件跑腿</text>
							</view> 
							<view class="text-cut">
								<text class="errand-money">赏金：￥3元</text>
							</view> 
							<view class="text-cut">
								<!-- <text class="new-text-black">未接单</text> -->
								<text class="new-gray">已接单</text>
								<!-- <text class="new-state">预约单</text> -->
							</view> 
						</view>
					</view>
					<view class="action">
						<view class="old-border" >接单</view>
						<!-- <view class="old-border new-border" >接单</view> -->
					</view>
				</view>

				<view class="cu-item" >
					<view class="cu-avatar round ly" style="background-image:url(http://image.uczzd.cn/10786026896486406429.jpg?id=0&from=export);"></view>
					<view class="content">
						<view class="new-text-black ">冬天</view>
						<view class="money-content text-sm flex">
							<view class="text-cut">
								<!-- <text class="errand-type type-first">代买跑腿</text> -->
								<text class="errand-type type-second">取件跑腿</text>
							</view> 
							<view class="text-cut">
								<text class="errand-money">赏金：￥3元</text>
							</view> 
							<view class="text-cut">
								<!-- <text class="new-text-black">未接单</text> -->
								<!-- <text class="new-gray">已接单</text> -->
								<text class="new-state">预约单</text>
							</view> 
						</view>
					</view>
					<view class="action">
						<!-- <view class="old-border" >接单</view> -->
						<view class="old-border new-border" >接单</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-tabbar-height "></view>
	</view>
</template>

<script>
	import navigationList from './../../colorui/components/navigation-list.vue'
	export default {
		components: {navigationList},
		data() {
			return {
				PageCur: 'dynamic',
				modalName: null,
				radio: 'radio1',
				cuIconList: [
					{
						cuIcon: 'cardboardfill',
						color: 'red',
						badge: 0,
						name: '取件',
						url: '/pages/message/chat'
					}, 
					{
						cuIcon: 'recordfill',
						color: 'orange',
						badge: 0,
						name: '寄件',
						url: '/pages/errands/running'
					},
					{
						cuIcon: 'picfill',
						color: 'yellow',
						badge: 0,
						name: '超市'
					},
					{
						cuIcon: 'noticefill',
						color: 'olive',
						badge: 0,
						name: '外卖'
					},
				
					{
						cuIcon: 'questionfill',
						color: 'mauve',
						badge: 0,
						name: '复印'
					}, 
					{
						cuIcon: 'commandfill',
						color: 'purple',
						badge: 0,
						name: '代买'
					}, 
					{
						cuIcon: 'brandfill',
						color: 'mauve',
						badge: 0,
						name: '其它任意'
					}
				],
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

<style scoped>
.location{
	height: 90rpx ;
	line-height: 90rpx;
	font-size: 32rpx;
	padding-left: 60rpx;
	background: #ffffff;
}
.cu-list.menu-avatar>.cu-item .content{
	left: 120rpx ;
	width: calc(100% - 120rpx - 130rpx - 20rpx);
}
.cu-list.menu-avatar>.cu-item .action{
	width: 130rpx ;
	margin-right: 10rpx;
}
.money-content{
	height: 45rpx;
	margin-top: 10rpx;
}
.errand-type{
	padding: 9rpx 12rpx;
	font-size: 24rpx;
	color: #fff;
	 border-radius: 8rpx;
	-webkit-border-radius: 8rpx; 
	margin-right: 20rpx;
}
.type-first{
	background: #38cfe7;
}
.type-second{
	background: #3495fe;
}
.errand-money{
	color: #fe1817;
	font-size: 32rpx;
	margin-right: 20rpx;
}
.old-border{
    width: 130rpx;
    height: 50rpx;
    line-height: 52rpx;
    font-size: 24rpx;
    text-align: center;
    background: #aeaeae;
	border: none;
    color: #ffffff;
    border-radius: 50rpx;
	-webkit-border-radius: 50rpx; 
} 
.new-gray{
	color: #aeaeae;
}
.new-state{
	color: #39cfe8;
}
.old-border.new-border{
    line-height: 52rpx;
	background: #39cfe8;
	
}
</style>>
