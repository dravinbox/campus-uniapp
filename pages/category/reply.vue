<template>
	<view >
        <cu-custom bgColor="bg-gradual-newblue" :isBack="true">
			<block slot="content">回复</block>
		</cu-custom>
		<!-- 评论内容 -->
			<view class="uni-padding-wrap bg-white">
				
				<!-- 评论区 start -->
				<view class="uni-comment">
					<view class="uni-comment-list" v-for="(item,index) in commentList" :key="index">
						<view class="uni-comment-face"><image :src="item.user.userInfo.headImage" lazy-load mode="widthFix"></image></view>
						<view class="uni-comment-body new-border-bottom">
							<view class="uni-comment-top">
								<text>{{item.user.userInfo.nickName||''}} </text>
							</view>
						
							<view class="uni-comment-content">{{item.content}}
								<text class="first-left" v-if="item.commented"> 共{{item.commented}}条回复 </text>
								<text class="cuIcon-right" v-if="item.commented"></text>
							</view>
							<view class="uni-comment-date">
								<text>{{item.createTime|formatTime}}</text>
								<view class=" uni-comment-replay-btn " >
									<text class="cuIcon-message" ></text>
									<text class="cuIcon-appreciate" :class="item.userLikeComment?'new-text-red':''" >
										<text class="liked">{{item.liked}}</text>
									</text>
								</view>
							</view>
						</view>
					</view>
					
				</view>
				<!-- 评论区 end -->
			</view>
	</view>
</template>

<script>
	import { discoverApi } from '../../component/api/discover.js';
	export default {
		data() {
			return {
				PageCur: 'dynamic',
				modalName: null,
				radio: 'radio1',
				newParam:{
					classItem:'',
					commentId:null,
				},
				params:{
					"pageNum": 1,
  					"pageSize": 20
				},
				isNextPage:true,
				commentList:[],
			}
		},
		onLoad(option) {
			this.newParam.commentId = Number(option.commentId);
			if(this.newParam.commentId){
				this.getCommentComment(this.newParam.commentId)
			}
			//console.log(this.newParam)
			//var pages = getCurrentPages();
			//console.log(pages)
		},
		onPullDownRefresh(){
			console.log('下拉刷新')
			this.params.pageNum = 1;
			this.isNextPage = true;
			this.getCommentComment(this.newParam.commentId)
		},
		onReachBottom(){
			if(this.commentList.length>0){
				//console.log(this.isNextPage)
				if(this.isNextPage){
					this.getCommentComment(this.newParam.commentId)
				}
			}	
		},
		filters: {
			formatTime(date) {
				//console.log(date,'参数')
				//#ifdef H5 || MP-WEIXIN
				let oldDate  = new Date(date);
				//#endif

				//#ifdef APP-PLUS
				let dd = new Date()
				var nd = dd.getTimezoneOffset();
				let timeDifference =Math.abs(Math.floor(nd*60*1000));
				var data = date.substr(0, 19); //'2019-08-09T18:23:27'
				var oldDate = new Date(data.replace(/T/g, ' ').replace(/-/g, '/'));
				let oldTime = timeDifference + oldDate.getTime();
				var oldDate = new Date(oldTime)
				//#endif

				let y = oldDate.getFullYear();
				let m = oldDate.getMonth() + 1 < 10 ? '0' + (oldDate.getMonth() + 1) : oldDate.getMonth() + 1; // 获取当前月份的日期，不足10补0
				let d = oldDate.getDate() < 10 ? '0' + oldDate.getDate() : oldDate.getDate(); // 获取当前几号，不足10补0
				let h =  oldDate.getHours() < 10 ? '0' + oldDate.getHours() : oldDate.getHours(); // 获取当前几点，不足10补0
				let minute =  oldDate.getMinutes() < 10 ? '0' + oldDate.getMinutes() : oldDate.getMinutes(); // 获取当前几分，不足10补0
				return y + '-' + m + '-' + d +'  '+h+':'+minute;
			},
		},
		methods: {
			getCommentComment(commentId){
				discoverApi.getCommentComment('/'+commentId,this.params,(res)=>{
					if(res.data.code == 200){
						this.total = res.data.data.total;
					
						if(this.params.pageNum==1){
							this.commentList = res.data.data.list;
							uni.stopPullDownRefresh()
						}else{
							res.data.data.list.forEach((item,index) => {
								this.commentList.push(item);
							});
						}
						if(res.data.data.list.length>=this.params.pageSize){
							this.isNextPage = true;
							this.params.pageNum++;
						}else{
							this.isNextPage = false;
						}
						//console.log(this.commentList)
					}
				})
			},
		},
		
	}
</script>

<style scoped>
.uni-padding-wrap{width:750rpx;padding:0 30rpx;}
.new-border-bottom{border-bottom:1px solid #ededed;padding-bottom: 10rpx;}
.uni-comment{padding:5rpx 0; display: flex; flex-grow:1; flex-direction: column;}
.uni-comment{padding:5rpx 0; display: flex; flex-grow:1; flex-direction: column;}
.uni-comment-list{flex-wrap:nowrap; padding:10rpx 0; margin:10rpx 0; width:100%; display: flex;}
.uni-comment-face{width:80upx; height:80upx; border-radius:100%; margin-right:20upx; flex-shrink:0; overflow:hidden;}
.uni-comment-face image{width:100%;height: 100% !important; }
.uni-comment-body{width:100%;}
.uni-comment-top{line-height:1.5em; justify-content:space-between;}
.uni-comment-top text{color:#000000; font-size:30rpx;line-height: 80rpx; font-weight: bold;}
.uni-comment-date{line-height:50rpx; flex-direction:row; justify-content:space-between; display:flex !important; flex-grow:1; padding-top: 10rpx;}
.uni-comment-date view{color:#b8b8b8; font-size:26rpx; line-height:50rpx;}
.uni-comment-content{line-height:1.6em; font-size:30rpx; padding:8rpx 8rpx; background: #f4f2f3;color:#000000;border-radius:10rpx;}
.uni-comment-content .first-left{padding-left: 50rpx}
.uni-comment-replay-btn{background:#FFF; font-size:34rpx !important; line-height:28upx;  border-radius:30upx; color:#b8b8b8; margin:0 10upx;}
.uni-comment-replay-btn .new-text-red{color: #ec0d1b;}
.uni-comment-replay-btn text{padding: 0rpx 10rpx; color:#b8b8b8;}
.uni-comment-replay-btn .liked{font-size:24rpx !important;padding: 0rpx 5rpx;}
</style>>

