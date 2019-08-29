<template >
    <view class="cu-list menu-avatar " >
        <view class="cu-item" @click="openMsg">
            <view class="cu-avatar new-cu-avatar radius lg" :style="[{backgroundImage:'url('+ src +')'}]"></view>
            <view class="content">
                <view class="text-pink"><view class="text-cut">莫甘娜</view></view>
                <view class="text-gray text-sm flex"> <view class="text-cut">凯尔，你被自己的光芒变的盲目！</view></view>
            </view>
            <view class="action">
                <view class="text-grey text-xs">22:20</view>
                <view class="cu-tag round bg-red sm">5</view>
            </view>
        </view>
        <view class="cu-item grayscale" @click="openMsg">
            <view class="cu-avatar new-cu-avatar radius lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81007.jpg)'}]"></view>
            <view class="content">
                <view><view class="text-cut">伊泽瑞尔</view>
                    <view class="cu-tag round bg-orange sm">断开连接...</view>
                </view>
                <view class="text-gray text-sm flex"> <view class="text-cut"> 等我回来一个打十个</view></view>
            </view>
            <view class="action">
                <view class="text-grey text-xs">22:20</view>
                <view class="cu-tag round bg-red sm">5</view>
            </view>
        </view>
        <view class="cu-item cur" @click="openMsg">
            <view class="cu-avatar new-cu-avatar radius lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg)'}]">
                <view class="cu-tag badge"></view>
            </view>
            <view class="content">
                <view>
                    <view class="text-cut">瓦罗兰大陆-睡衣守护者-新手保护营</view>
                    <view class="cu-tag round bg-orange sm">6人</view>
                </view>
                <view class="text-gray text-sm flex">
                    <view class="text-cut"> 伊泽瑞尔：<text class="cuIcon-locationfill text-orange margin-right-xs"></text> 传送中...</view></view>
            </view>
            <view class="action">
                <view class="text-grey text-xs">22:20</view>
                <view class="cuIcon-notice_forbid_fill text-gray"></view>
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
                    modalName: null,
                    src:'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
                }
		},
		methods: {
            openMsg(){

			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		},
		
	}
</script>

<style>

</style>