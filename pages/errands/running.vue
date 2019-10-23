<template>
    <view>
        <cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">跑腿发布</block>
		</cu-custom>
        <view>
            <view>
                <input class="uni-input"  placeholder="说明我的跑腿需求" />
            </view>
            <view class="cu-list menu sm-border"  >
                <view class="cu-item  new-height"  >
                    <view class="content new-text-black" >
                        我的金库
                        <text class="text-grey new-cate new-size">  (可提现到微信零钱) </text>
                    </view>
                </view>
                <view class="cu-item  new-height"  >
                    <view class="content new-text-black" >
                        我的消息
                    </view>
                </view>
            </view>
        </view>
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


</style>
