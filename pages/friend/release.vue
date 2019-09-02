<template>
	<view style="background:#ffffff;">
	    <cu-custom bgColor="new-bg-gradual-white" > </cu-custom>
        <view class="new-title">
	        <view>
                <button class="round" >取消</button> 
            </view>
            <view>
                <button class="round new-border" >发布</button>
            </view>  
        </view>
	    <view class="release-content">
            <textarea  auto-height />
            <!-- <input class="uni-input"  placeholder="分享故事......" /> -->
        </view>
        <view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
			 @focus="InputFocus" @blur="InputBlur"> </input>
			<view class="action">
				<text class="cuIcon-emoji text-grey"></text>
			</view>
            <view class="action">
				<text class="cuIcon-emoji text-grey"></text>
			</view>
			<button class="cu-btn bg-green shadow">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
        name: 'release',
		data() {
			return {
				InputBottom: 0
			};
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		}
	}
</script>

<style scoped>
.bg-gradual-white{
    border-bottom: none !important;
}
.new-title{
    height: 86rpx;
    padding: 18rpx 20rpx 0rpx 20rpx;
    background: #ffffff;
    display: flex;
    justify-content:  space-between ;
    border-bottom: 1px solid #eeeeee;
}
.new-title .round{
    width: 110rpx;
    height: 50rpx;
    line-height: 52rpx;
    font-size: 24rpx;
    text-align: center;
    background: #f9f9f9;
    color: #9a9a9a;
}
.new-title .round.new-border{
    line-height: 50rpx;
    background: #2ad0ea;
    color: #ffffff;
    border: 1px solid #1ccce8;
    border-radius: 50rpx;
	-webkit-border-radius: 50rpx; 
}
.new-title .round::after{
    border: none ;
}
.release-content{
    height: 480rpx;
    padding: 0rpx 20rpx;
    font-size: 30rpx;
    line-height: 2em;
    border-bottom: 1px solid #eeeeee;
    background: #ffffff;
}
</style>>