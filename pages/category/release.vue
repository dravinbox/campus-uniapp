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
                <button class="round" @tap='backPage'>取消</button> 
            </view>
            <view>
                <button class="round new-border" @tap='releaseEvent'>发布</button>
            </view>  
        </view>
	    <view class="release-content">
            <textarea show-confirm-bar='false'  placeholder="分享故事......" v-model="params.content"  maxlength='-1' cursor='10'/>

            <view class="grid flex-sub padding-lr-lm margin-top col-3 grid-square"  >
                <view class="bg-img "  v-for="(item,index) in params.imagesJsonList" :key="index">
                    <view></view>
                    <image  lazy-load :src='item.url'></image>
                </view>
                <view class="bg-img "  v-if="params.videoGif">
                    <view></view>
                    <image  lazy-load :src='params.videoGif'></image>
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
            <view class="action" @tap='cameraEvent'>
				<text class="cuIcon-camerafill new-text-black"></text>
			</view>
            <view class="action" @tap='videoEvent'>
				<text class="cuIcon-videofill new-text-black"></text>
			</view>
            <view class="action">
				<text class="new-size new-text-black">@</text>
			</view>
			<view class="action  open-state">
				<!-- <text class="new-text-black">公开</text>
                <text class="cuIcon-unfold text-grey"></text> -->
                <view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input" v-if="array[index]=='公开  (所有人可见)'">公开 <text class="cuIcon-unfold text-grey"></text></view>
                        <view class="uni-input" v-if="array[index]=='主页可见'"> 主页 <text class="cuIcon-unfold text-grey"></text></view>
                        <view class="uni-input" v-if="array[index]=='私密 (仅自己可见)'">私密 <text class="cuIcon-unfold text-grey"></text></view>
					</picker>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    import { uploadApi } from '../../component/api/upload.js';
    import { discoverApi } from '../../component/api/discover.js';
	export default {
        name: 'release',
		data() {
			return {
                InputBottom: 0,
                params:{
                    "content": "",
                    "imagesJsonList": [],
                    "oneCate": 0,
                    "title": "",
                    "twoCate": 0,
                    "video": "",
                    "videoGif": "",
                    "voice": "",
                    "weather": 0,
					"onlyMe":false,
					"showArea":0
                },
                array: ["公开  (所有人可见)",'主页可见','私密 (仅自己可见)'],
				index: 0,
			};
        },
        onLoad(option) {
            if(option.cateId){
                this.params.oneCate =  Number(option.cateId);
            }
			//var pages = getCurrentPages();
			console.log(this.params.oneCate)
		},
        mounted(){
            console.log('dgfugdfu')
        },
		methods: {
            backPage() {
				var pages = getCurrentPages();
				console.log(pages)
				//return
				uni.navigateBack({
					delta: 1
				});
            },
            bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value
				console.log(this.index)
				if(this.index==0){
					this.params.onlyMe=false
					this.params.showArea=0
				}else if(this.index==1){
					this.params.onlyMe=false
					this.params.showArea=1
				}else {
					this.params.onlyMe=true
					this.params.showArea=1
				}
			},

            releaseEvent(){//发布
                let data = JSON.parse(JSON.stringify(this.params));
                data.imagesJsonList = JSON.stringify(data.imagesJsonList)
                if(!data.voice){
                    delete data.voice
                }
                 if(!data.voice){
                    delete data.voice
                }
                discoverApi.sendAPost(data,(res) => {
                    if(res.data.code == 200){
                        console.log(res.data)
                    }
                });
            },

            picEvent(){
                uni.chooseImage({
                    count: 1, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], //从相册选择
                    success:  (res)=> {
                        console.log(res);
                        let tempFilePaths = res.tempFilePaths
                        //console.log(JSON.stringify(res.tempFilePaths));
                        uploadApi.uploadImage(tempFilePaths[0],(res) => {
                            console.log(res.data)
                            let data = JSON.parse(res.data)
                            if(data.code == 200){
                                this.params.imagesJsonList.push({url:data.data});
                                console.log(data.data)
                            }
                        })
                    }
                });
            },
            
            voiceEvent(){
                uploadApi.uploadVoice(tempFilePaths[0],(res) => {
                    console.log(res.data)
                    let data = JSON.parse(res.data)
                    if(data.code == 200){
                        console.log(data.data)
                    }
                })
            },

            cameraEvent(){
                uni.chooseImage({
                    count: 1, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['camera'], //从相册选择
                    success:  (res)=> {
                        console.log(res);
                        let tempFilePaths = res.tempFilePaths
                        //console.log(JSON.stringify(res.tempFilePaths));
                        uploadApi.uploadImage(tempFilePaths[0],(res) => {
                            console.log(res.data)
                            let data = JSON.parse(res.data)
                            if(data.code == 200){
                                this.params.imagesJsonList.push({url:data.data});
                                console.log(data.data)
                            }
                        })
                    }
                });
            },

            videoEvent(){
                uni.chooseVideo({
                    count: 1,
                    sourceType: ['camera', 'album'],
                    success:(res)=>{
                        console.log(res.tempFilePath)
                        console.log(res)
                        uploadApi.uploadVideo(res.tempFilePath,(res) => {
                            console.log(res.data)
                            let data = JSON.parse(res.data)
                            if(data.code == 200){
                                this.params.videoGif = data.data.gifUrl
                                this.params.video = data.data.videoUrl
                                console.log(data.data.videoUrl)
                            }
                        })
                    }
                });
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
    font-size: 26rpx;
}
.cuIcon-unfold.text-grey{
    font-size: 28rpx !important;
}
</style>>