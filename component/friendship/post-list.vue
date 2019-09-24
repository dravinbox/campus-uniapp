<template name="dynamic">
		<!-- 动态 -->
	<view>
		<view class="cu-card dynamic no-card" :class="newIndex===0?'':'new-margin-top'"  v-for="(newItem,newIndex) in itemList" :key="newIndex">
			<view class="cu-item shadow" @tap='openIndex' >
				<view class="cu-list menu-avatar new-overflow" >
					<view class="cu-item new-cu-item">
						<view class="cu-avatar round lm" 
						:style="[{backgroundImage:'url('+newItem.user.userInfo.headImage||''+')'}]">
						</view>
						<view class="content flex-sub">
							<view class="new-text-black">{{newItem.user.userInfo.nickName||''}} 
								<text class="new-text-background text-center" v-if="hotNotes">HOT</text>
							</view>
							<view class="text-gray text-sm flex justify-between">
								{{newItem.createTime|formatTime}}
							</view>                          
						</view>
                        <view style="padding-right:34upx;" >
                        	<view class="new-follow text-center" v-if="false">关注</view>
							<view class="cuIcon-more text-center new-text-gray" @tap.stop="controlFollowCheck(newIndex)">
								<view class="new-cate-class radius  bg-white" v-if="followCheck==newIndex" >
									<view class="text-center" v-if="!newItem.fan" @tap.stop='followEvent(newItem.userId,false,newIndex)'>关注</view>
									<view class="text-center" v-else @tap.stop='followEvent(newItem.userId,true,newIndex)'>取消关注</view>
									<view class="text-center">私聊</view>
									<view class="text-center">举报</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="text-content new-text-black" style="padding:0 24rpx;" >
					<text class="new-text-red" style="padding-right:24rpx;">{{newItem.oneCategory.oneCateName||''}}</text> 
                    {{newItem.content||''}}
				</view>
				<view class="text-content"  style="padding:0 24upx;" v-if="newItem.voice">
					<view class="audio-content text-white flex">
					
						<view class="flex-sub" v-if="audioPaused==newIndex"  @tap='audioStop(newIndex)'>
							<text class="cuIcon-stop padding-left" style="font-size:50rpx;"></text>
						</view>
						<view class="flex-sub" v-else  @tap='audioStart(newItem.voice,newIndex)'>
							<text class="cuIcon-playfill padding-left"></text>
						</view>
						<view class="flex-sub text-right" >
							<text class="padding-right" >{{newItem.voice|timerDuration}}</text>
						</view>
					</view>
				</view>		
				<view class="text-content new-video" style="padding:0 24rpx;" v-if="newItem.video&&newItem.videoPaused" >
					<video :id="'myVideo'+newIndex"  
						@play="videoPlay(0,newIndex)" @pause='videoPlay(1,newIndex)' 
					 style="width:702upx;height:225px;" class="radius" :show-fullscreen-btn='false' objectFit='fill'
					  :src="newItem.video"  controls>
					  <!-- <cover-view style="width:702upx;height:232px;" class="controls-title bg-white">简单的自定义 controls</cover-view> -->
					 </video>
				</view>
				<view class="text-content" style="padding:0 24rpx;" v-if="newItem.video&&!newItem.videoPaused">
					<view :id="'myVideo'+newIndex"   :show-fullscreen-btn='false' style="width:702upx;height:232px;" class="radius" >
						<!-- <cover-view style="width:702upx;height:232px;" class="controls-title bg-white">简单的自定义 controls</cover-view> -->
					</view>
				</view>
				<view class="grid flex-sub padding-lr-lm margin-bottom"  :class="newItem.imagesJsonList.length>1?'col-3 grid-square':'col-1'">
					<view class="bg-img" :class="isCard?'':'only-img'" 
					 v-for="(item,index) in newItem.imagesJsonList" :key="index">
                     <image :src='item.url'></image>
					</view>
				</view>
				
                <scroll-view scroll-x class="bg-white nav" style="padding:0 24rpx;">
                    <view class="flex text-center">
                        <view class="flex-sub new-class-sub cuIcon-appreciate text-left"  :class="newItem.userLikePost!= null?'new-text-red':'new-text-grey'"  @tap="likePostEvent(newItem.id,newIndex)" :data-id="0">
                            <text class="new-text-grey new-text-padding">  {{newItem.liked||0}} </text>
                        </view>
                        <view class="flex-sub new-class-sub cuIcon-favor" :class="newItem.userCollectPost?'new-text-red':'new-text-grey'"  @tap="collectionEvent(newItem.id,newIndex)" :data-id="1">
                            <text class="new-text-grey new-text-padding"> {{newItem.collected||0}}</text>
                        </view>
                        <view class="flex-sub new-class-sub cuIcon-forward"  :class="2==TabCur?'new-text-red':'new-text-grey'"  @tap="tabSelect" :data-id="2">
                            <text class="new-text-grey new-text-padding"> {{newItem.comment||0}}</text>
                        </view>
                         <view class="flex-sub new-class-sub cuIcon-message text-right"  :class="3==TabCur?'new-text-red':'new-text-grey'"  @tap="commentEvent(newItem.id)" :data-id="3">
                            <text class="new-text-grey new-text-padding"> {{newItem.comment||0}}</text>
                        </view>

                    </view>
                </scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import { contollerApi } from '../api/contoller.js';
	import { discoverApi } from '../api/discover.js';
	export default {
        name: "postlist",
        props: {
			itemList:{//数据
				type:Array,
				default:[]
			},
			hotNotes:{//是否是热帖
				type:Boolean,
				default:false
			}

		},
		data() {
			return {
				isCard: true,
				TabCur:0,
				innerAudioContext:null,
				audioPaused:null,
				duration:'',//音频长度
				followCheck:null,//控制右边的三个点内容的现实
				videoContext:null,
				recordVideoIndex:null,
			};
		},
		filters: {
			formatTime(date) {
				//console.log(date,'参数')
				// console.log(date)
				// let oldDate  = new Date(date.replace(/-/g, '/'));
				var data = date.substr(0, 19); //'2019-08-09T18:23:27'
				var oldDate = new Date(data.replace(/T/g, ' ').replace(/-/g, '/'));
				if(false){
					let oldTime = oldDate.getTime();
					let newDate = new Date();
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
				}else{
					
					let y = oldDate.getFullYear();
					let m = oldDate.getMonth() + 1 < 10 ? '0' + (oldDate.getMonth() + 1) : oldDate.getMonth() + 1; // 获取当前月份的日期，不足10补0
					let d = oldDate.getDate() < 10 ? '0' + oldDate.getDate() : oldDate.getDate(); // 获取当前几号，不足10补0
					let h =  oldDate.getHours() < 10 ? '0' + oldDate.getHours() : oldDate.getHours(); // 获取当前几点，不足10补0
					let minute =  oldDate.getMinutes() < 10 ? '0' + oldDate.getMinutes() : oldDate.getMinutes(); // 获取当前几分，不足10补0
					return y + '-' + m + '-' + d +'  '+h+':'+minute;
				}
				
			},
			timerDuration(voiceSrc){
				let innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = false;
				innerAudioContext.src = voiceSrc;
				//console.log(innerAudioContext.duration,innerAudioContext)
				// return Math.floor(innerAudioContext.duration);
			}
		},
		methods: {
			tabSelect(e) {//点赞 收藏 转发 评论
				this.TabCur = e.currentTarget.dataset.id;
				console.log( e.currentTarget)
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60

			},
			commentEvent(id){
				uni.navigateTo({
					url: '../category/commentDetails?postId='+id
				});
			},

			likePostEvent(postId,index){//点赞或取消点赞某个帖子
				discoverApi.likePost('/'+postId,{},(res)=>{
					console.log(res.data.data)
					if(res.data.code == 200){
						if(res.data.data){
							uni.showToast({
								title: '点赞成功',
								mask:true,
								icon:'none',
								duration: 2000
							});	
							this.itemList[index].userLikePost = {}
							this.itemList[index].liked++;
						}else{
							this.itemList[index].liked--;
							this.itemList[index].userLikePost = null;
							
							uni.showToast({
								title: '已取消',
								mask:true,
								icon:'none',
								duration: 2000
							});
						}		
					}else if(res.data.code ==405){
						uni.showToast({
							title: res.data.data,
							mask:true,
							icon:'none',
							duration: 2000
						});
					}
				})
			},

			controlFollowCheck(index){//控制右边的三个点 
				if(index == this.followCheck){
					this.followCheck = null;
				}else{
					this.followCheck = index;
				}
				
				console.log(this.followCheck)
			},

			followEvent(userId,check = false,index){//关注和取消关注
				if(check){
					contollerApi.unSubcribeUser('/'+userId,{},(res)=>{
						//console.log(res.data)
						if(res.data.code == 200){
							this.itemList.forEach((item,indx) => {
								if(item.userId==userId){
									item.fan = null;
								}
							});
							uni.showToast({
								title: '已取消',
								mask:true,
								icon:'none',
								duration: 2000
							});
						}
						//console.log('取消关注',userId)
						
					})
				}else{
					contollerApi.subcribeUser('/'+userId,{},(res)=>{
						console.log(res.data)
						//console.log('关注',userId)
						if(res.data.code == 200){
							this.itemList.forEach((item,indx) => {
								if(item.userId==userId){
									item.fan ={}
								}
							});
							uni.showToast({
								title: '关注成功',
								mask:true,
								icon:'none',
								duration: 2000
							});
						}else if(res.data.code ==405){
							uni.showToast({
								title: res.data.data,
								mask:true,
								icon:'none',
								duration: 2000
							});
						}
						
					})
				}
				this.followCheck = null;
									
			},

			collectionEvent(postId,index){
				console.log(postId,index)
				discoverApi.collectPost('/'+postId,{},(res)=>{
					console.log(res.data.data)
					if(res.data.code == 200){
						if(res.data.data){
							//
							uni.showToast({
								title: '收藏成功',
								mask:true,
								icon:'none',
								duration: 2000
							});
							this.itemList[index].userCollectPost = {}
							this.itemList[index].collected++;
						}else{
							this.itemList[index].userCollectPost = null
							this.itemList[index].collected--;
							uni.showToast({
								title: '已取消收藏',
								mask:true,
								icon:'none',
								duration: 2000
							});
						}
					}else if(res.data.code ==405){
						uni.showToast({
							title: res.data.data,
							mask:true,
							icon:'none',
							duration: 2000
						});
					}
				})
			},

			openIndex(){
				if(this.followCheck != null){
					this.followCheck = null;
					console.log('open index')
				}
				
			},
			navToMsgPage(){
				uni.navigateTo({
				    url: '../message/home'
				});
			},

			videoPlay(index,newIndex){
				//console.log('之前', document.body.scrollHeight)
				if(index==0){
					console.log('新的开始')
					if(this.recordVideoIndex!=null &&newIndex != this.recordVideoIndex){
						let num  = this.recordVideoIndex;
						console.log(this.recordVideoIndex)
						this.itemList[this.recordVideoIndex].videoPaused=false;
						console.log('关闭之前的',this.itemList[this.recordVideoIndex].videoPaused)
						//console.log('之前', document.body.scrollHeight)
						setTimeout(()=>{
							  this.itemList[num].videoPaused=true;
							// console.log('之后', document.body.scrollHeight)//
						},200)
						
					}else{
						console.log('false',this.recordVideoIndex)
					}
					this.recordVideoIndex = newIndex;
				}else{
					this.videoContext = null;
					console.log('暂停')
				}
				
			},

			audioStart(voiceSrc,index){//音频的开始播放
				
				try {
					this.audioStop()
					this.innerAudioContext.destroy()
				} catch (error) {
					this.innerAudioContext = null;
				}
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.autoplay = true;
				this.innerAudioContext.src = voiceSrc;
				console.log(voiceSrc);
				this.audioPaused = index;
				this.innerAudioContext.onPlay(() => {
					console.log('开始播放');
					console.log(this.innerAudioContext.duration,this.innerAudioContext)
					this.duration = Math.round(this.innerAudioContext.duration)
				});
				//console.log(JSON.stringify(this.innerAudioContext))
				// this.innerAudioContext.onTimeUpdate(() =>{//音频播放进度更新事件
				// 	console.log(this.innerAudioContext.currentTime)
				// })
				this.innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
					this.audioPaused = null;
				});
				this.innerAudioContext.onEnded(() => {
					console.log('音频结束');
					this.audioPaused = null;
					this.innerAudioContext.destroy()
				});
				
			},

			audioStop(){//音频的开始播放
				try {
					this.innerAudioContext.stop();
					this.innerAudioContext.destroy()
					console.log('停止');
					this.innerAudioContext.onStop(() => {
						console.log('音频停止');
					});
					this.audioPaused = null;
					this.innerAudioContext.onError((res) => {
						console.log(res.errMsg);
						console.log(res.errCode);
					});
				} catch (error) {
					this.audioPaused = null;
				}
			}
		},
		mounted() {
		
		},
		beforeDestroy(){
			try {
				this.audioStop();
				this.innerAudioContext.destroy();
			} catch (error) {
				this.innerAudioContext = null;
			}
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
	position: relative;
	z-index: 99;
}
.new-video{
	position: relative;
	z-index: 90
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
	border-radius: 12rpx;
	-webkit-border-radius: 12rpx;
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
.bg-img image{
	width: 100%;
	will-change: transform;
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
   
