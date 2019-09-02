<template name="dynamic">
		<!-- 动态 -->
		<view class="cu-card dynamic " :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar new-overflow" >
					<view class="cu-item new-cu-item">
						<view class="cu-avatar round lm" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
						<view class="content flex-sub">
							<view class="new-text-black">凯尔 
								<text class="new-text-background text-center">HOT</text>
							</view>
							<view class="text-gray text-sm flex justify-between">
								{{itemContent.createTime}}
							</view>                          
						</view>
                        <view style="padding-right:24upx;" >
                        	<view class="new-follow text-center" v-if="false">关注</view>
							<view class="cuIcon-more text-center new-text-gray" >
								<view class="new-cate-class radius  bg-white" v-if="followCheck==0">
									<view class="text-center">关注</view>
									<view class="text-center">私聊</view>
									<view class="text-center">举报</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="text-content new-text-black" style="padding:0 24rpx;" >
					<text class="new-text-red" style="padding-right:24rpx;">{{itemContent.oneCategory.oneCateName?itemContent.oneCategory.oneCateName:''}}</text> 
                    {{itemContent.title}}
				</view>
                <view class="text-content new-text-black" style="padding:0 24rpx;" >
                    {{itemContent.content}}
				</view>
				<view class="text-content"  style="padding:0 24upx;" @tap='audioStart'>
					<view class="audio-content text-white flex">
						<view class="flex-sub" v-if="audioPaused" >
							<text class="cuIcon-playfill padding-left"></text>
						</view>
						<view class="flex-sub" v-else @tap='audioStop'>
							<text class="cuIcon-stop padding-left"></text>
						</view>
						<view class="flex-sub text-right" v-if="false">
							<text class="padding-right" >12</text>
						</view>
					</view>
				</view>
				<view class="text-content" style="padding:0 24rpx;">
					<video id="myVideo" :show-fullscreen-btn='false'  @fullscreenchange='videoPlay(0)'  @play="videoPlay(0)" @pause='videoPlay(1)' style="width:702upx;" src="https://toss.paycore.cc/ts/video/1566288960116.mp4" controls></video>
				</view>
				<view class="grid flex-sub padding-lr-lm " :class="isCard?'col-3 grid-square':'col-1'">
					<view class="bg-img" :class="isCard?'':'only-img'" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"
					 v-for="(item,index) in isCard?9:1" :key="index">
                     <image src='https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'></image>
					</view>
				</view>
                <scroll-view scroll-x class="bg-white nav" style="padding:0 24rpx;">
                    <view class="flex text-center">
                        <view class="flex-sub new-class-sub cuIcon-appreciate text-left"  :class="0==TabCur?'new-text-red':'new-text-grey'"  @tap="tabSelect" :data-id="0">
                            <text class="new-text-grey new-text-padding">  3220</text>
                        </view>
                        <view class="flex-sub new-class-sub cuIcon-favor" :class="1==TabCur?'new-text-red':'new-text-grey'"  @tap="tabSelect" :data-id="1">
                            <text class="new-text-grey new-text-padding">  5441</text>
                        </view>
                        <view class="flex-sub new-class-sub cuIcon-forward"  :class="2==TabCur?'new-text-red':'new-text-grey'"  @tap="tabSelect" :data-id="2">
                            <text class="new-text-grey new-text-padding">  6646</text>
                        </view>
                         <view class="flex-sub new-class-sub cuIcon-message text-right"  :class="3==TabCur?'new-text-red':'new-text-grey'"  @tap="tabSelect" :data-id="3">
                            <text class="new-text-grey new-text-padding"> 9563</text>
                        </view>

                    </view>
                </scroll-view>
			</view>
		</view>
</template>

<script>
	export default {
        name: "postlist",
        props: {
			itemContent: {
				type: Object,
				default:  {}
            },
		},
		data() {
			return {
				isCard: true,
				cardCur: 0,
				swiperDataList: [],
				
				towerStart: 0,
				direction: '',
				PageCur:'',
				TabCur:0,
				gridCol: 4,
				gridRow: 3,
				gridBorder: false,
				hotdData:{
					"pageNum": 1,
					"pageSize": 5
				},
				hotList:[],
				current: {
					poster: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
					name: '致爱丽丝',
					author: '暂无',
					src: 'https://toss.paycore.cc/ts/voice/1566290016520.mp3',
				},
				audioAction: {
					method: 'pause'
				},
				innerAudioContext:null,
				audioPaused:true,
				followCheck:1,//控制右边的三个点内容的现实
			};
		},
		filters: {
			formatTime(date) {
				console.log(date,'参数')
				// if (typeof date !== 'object') {
				// 	date = date.replace(/-/g, '/');
				// }
				// console.log(date)
				let oldDate = new Date(date);
				let newDate = new Date();
				let oldTime = oldDate.getTime();
				let newTime = newDate.getTime();
				let times = newTime - oldTime;
				let day=0,hour=0,minute=0,second=0;//时间默认值
				if(times > 0){
					day = Math.floor(times/1000 / (60 * 60 * 24));
					hour = Math.floor(times/1000 /(60 * 60)%24);
					minute = Math.floor(times/1000 /60%60);
					second = Math.floor(times/1000%60);
				}
				if(day){
					console.log(day)
					return day + "天前";
				}else if(hour){
					return hour + "小时前";
				}else if(minute){
					return minute + "分钟前";
				}else{
					return second + '秒前';
				}
			}
		},
		methods: {
			jumpTo(url){
				console.log(url);
				if(url != undefined && url != null){
					uni.navigateTo({
						url: url
					})
				}
			},
			openIndex(){
				console.log('open index')
			},
			navToMsgPage(){
				uni.navigateTo({
				    url: '../message/home'
				});
			},
			videoPlay(index){
				if(index==0){
					console.log('开始')
				}else{
					console.log('暂停')
				}
				
			},
			audioStart(){//音频的开始播放
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.autoplay = true;
				this.innerAudioContext.src = 'https://toss.paycore.cc/ts/voice/1566290016520.mp3';
				
				this.innerAudioContext.onPlay(() => {
					console.log('开始播放');
					console.log(this.innerAudioContext.paused)
				});
				this.audioPaused = false;
				
				this.innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
				this.innerAudioContext.onEnded(() => {
					console.log('音频结束');
					this.audioPaused = true;
					this.innerAudioContext.destroy()
				});
				
			},

			audioStop(){//音频的开始播放
				this.innerAudioContext.pause();
				this.innerAudioContext.onPause((res) => {
					console.log('音频暂停',res);
					this.audioPaused = true;
					console.log(this.innerAudioContext.paused)
				});
				this.innerAudioContext.onStop((res) => {
					this.audioPaused = true;
					console.log('音频停止',res);
				});
				this.audioPaused = true;
				this.innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
			}
		},
		mounted() {
		
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
   
