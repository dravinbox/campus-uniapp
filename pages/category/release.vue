<template>
	<view style="background:#ffffff;">

        <!-- #ifdef MP-WEIXIN -->
	    <cu-custom bgColor="bg-gradual-newblue" :isBack="true">
			<block slot="content">发布</block>
		</cu-custom>
        <!-- #endif -->

        <!-- #ifdef APP-PLUS -->  
		<view class="status_bar">  
			<view class="top_view"></view>  
		</view>  
		<!-- #endif -->

        <view class="new-title">
	        <view>
                <button class="round" >取消</button> 
            </view>
            <view>
                <button class="round new-border" >发布</button>
            </view>  
        </view>
	    <view class="release-content">
            <textarea show-confirm-bar='false'  placeholder="分享故事......"  maxlength='-1' cursor='10'/>

            <view class="grid flex-sub padding-lr-lm margin-top col-3 grid-square"  >
                <view class="bg-img "  v-for="(item,index) in params.imagesJsonList" :key="index">
                    <!-- <image  lazy-load :src='item.url'></image> -->
                </view>
            </view>
        </view>
        <view class="cu-bar  input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action" style="padding-left:20rpx;" @tap='picEvent'>
				<text class="cuIcon-pic new-text-black"></text>
			</view>
			<view class="action">
				<text class="cuIcon-voicefill new-text-black"></text>
			</view>
            <view class="action">
				<text class="cuIcon-camerafill new-text-black"></text>
			</view>
            <view class="action">
				<text class="cuIcon-videofill new-text-black"></text>
			</view>
            <view class="action">
				<text class="new-size new-text-black">@</text>
			</view>
			 <view class="action  open-state">
				<text class="new-text-black">公开</text>
                <text class="cuIcon-unfold text-grey"></text>
			</view>
		</view>
	</view>
</template>

<script>
    import { uploadApi } from '../../component/api/upload.js';
	export default {
        name: 'release',
		data() {
			return {
                InputBottom: 0,
                imagesJsonList:[],
                params:{
                    "content": "",
                    "imagesJsonList": [],
                    "oneCate": 0,
                    "title": "",
                    "twoCate": 0,
                    "video": "",
                    "videoGif": "",
                    "voice": "",
                    "weather": 0
                    }
			};
        },
        mounted(){
            console.log('dgfugdfu')
        },
		methods: {
            picEvent(){
                uni.chooseImage({
                    count: 1, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], //从相册选择
                    success: function (res) {
                        console.log(res);
                        let tempFilePaths = res.tempFilePaths
                        //console.log(JSON.stringify(res.tempFilePaths));
                        uploadApi.uploadImage(tempFilePaths[0],(res) => {
                            console.log(res.data.code)
                            if(res.data.code == 200){
                                console.log(res.data)
                            }
                        })
                        //  uni.uploadFile({
                        //     url: '/api/v1/upload/uploadImage', //仅为示例，非真实的接口地址
                        //     header:{
                        //         "Authorization":"Bearer "+uni.getStorageSync('token')
                        //     },
                        //     filePath: tempFilePaths[0],
                        //     name: 'file',
                        //     formData: {
                        //         'file': tempFilePaths[0]
                        //     },
                        //     success: (res) => {
                        //         console.log(res.data);
                        //     }
                        // });
                    }
                });
            },
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
    min-height: 580rpx;
    padding: 20rpx 20rpx;
    font-size: 30rpx;
    line-height: 2em;
    border-bottom: 1px solid #eeeeee;
    background: #ffffff;
}
.release-content textarea{
    width: 710rpx;
    min-height: 300rpx;
    font-size: 26rpx;
}
.new-size{
    font-size: 32rpx;
    font-weight: bold;
}
.open-state{
    border: 1px solid #dddddd;
    width: 130rpx;
    height: 50rpx;
    border-radius: 50rpx;
}
.cuIcon-unfold.text-grey{
    font-size: 28rpx !important;
}
</style>>