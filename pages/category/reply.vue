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
							<view class=" uni-comment-replay-btn " v-if="index==0">
								<text class="cuIcon-message" ></text>
								<text class="cuIcon-appreciate" @tap='likeComment(item.id,index)' :class="item.userLikeComment?'new-text-red':''" >
									<text class="liked">{{item.liked}}</text>
								</text>
							</view>
							<view class=" uni-comment-replay-btn " v-if="index>0">
								<text class="cuIcon-appreciate" @tap='likeCommentComment(item.id,index)' :class="item.userLikeCommentComment?'new-text-red':''" >
									<text class="liked">{{item.liked}}</text>
								</text>
							</view>
						</view>
					
						
						<view class="uni-comment-date">
							<text>{{item.createTime|formatTime}}</text>
						</view>
						<view class="uni-comment-content">
							{{item.content}}
						</view>
					</view>
				</view>
				
			</view>
			<!-- 评论区 end -->
		</view>

		<view class="cu-tabbar-height"></view>
		<!-- 评论框	 -->
		<view class="mpcommot-content bg-white shadow" >
			<input class="uni-input" v-model="commentParams.content"   adjust-position='false' placeholder="评论"  type="text"  />
			<button  type="primary" disabled="none" v-if="!commentParams.content"  size="mini">发送</button>
			<button  type="primary"  v-if="commentParams.content" @tap="commentComment" size="mini">发送</button>
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
				commentParams:{
					"content": "",
  					"pid": ''
				},
				isNextPage:true,
				commentList:[],
				first:{},
			}
		},
		onLoad(option) {
			this.newParam.commentId = Number(option.commentId);
			this.commentList = [];
			try {	
				console.log(JSON.parse(uni.getStorageSync('comment')))
				this.first = JSON.parse(uni.getStorageSync('comment'))
			} catch (e) {
				// error
			}
			//console.log(this.newParam)
			//var pages = getCurrentPages();
			//console.log(pages)
		},
		mounted(){
			
			
			if(this.newParam.commentId){
				this.getCommentComment(this.newParam.commentId)
			}
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
							this.commentList = []
							this.commentList.push(this.first);
							uni.stopPullDownRefresh()
						}
						res.data.data.list.forEach((item,index) => {
							this.commentList.push(item);
						});
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

			likeCommentComment(commentId,index){//点赞或取消点赞 某个二级评论
				discoverApi.likeCommentComment('/'+commentId,{},(res)=>{
					console.log(res)
					if(res.data.code == 200){
						if(res.data.code == 200){
						if(res.data.data){
							uni.showToast({
								title: '点赞成功',
								mask:true,
								icon:'none',
								duration: 2000
							});	
							this.commentList[index].userLikeCommentComment = {}
							this.commentList[index].liked++;
						}else{
							this.commentList[index].liked--;
							this.commentList[index].userLikeCommentComment = null;
							
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
					}
					
				})
			},

			likeComment(commentId,index){//点赞或取消点赞 某个评论
				discoverApi.likeComment('/'+commentId,{},(res)=>{
					console.log(res)
					if(res.data.code == 200){
						if(res.data.code == 200){
						if(res.data.data){
							uni.showToast({
								title: '点赞成功',
								mask:true,
								icon:'none',
								duration: 2000
							});	
							this.commentList[index].userLikeComment = {}
							this.commentList[index].liked++;
						}else{
							this.commentList[index].liked--;
							this.commentList[index].userLikeComment = null;
							
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
					}
					
				})
			},

			commentComment(){//评论某个评论
				let data = {
					"content": this.commentParams.content,
  					"pid": this.newParam.commentId
				}
				discoverApi.commentComment(data,(res)=>{
					//console.log(res)
					if(res.data.code == 200){
						this.commentParams.content = '';
						this.commentCheck = false;
						this.params.pageNum = 1 ;
						this.params.pageSize = 20 +this.commentList.length;
						this.getCommentComment(this.newParam.commentId);
					}
					
				})
			},
		},
		
	}
</script>

<style scoped>
.uni-padding-wrap{width:750rpx;padding:0 30rpx;}
.new-border-bottom{border-bottom:1px solid #ededed;padding-bottom: 0rpx;}
.uni-comment{padding:5rpx 0; display: flex; flex-grow:1; flex-direction: column;}
.uni-comment-list{flex-wrap:nowrap; padding:10rpx 0; margin:0rpx 0; width:100%; display: flex;}
.uni-comment-face{width:80upx; height:80upx; border-radius:100%; margin-right:20upx; flex-shrink:0; overflow:hidden;}
.uni-comment-face image{width:100%;height: 100% !important; }
.uni-comment-body{width:100%;}
.uni-comment-top{line-height:1.5em; justify-content:space-between; flex-direction:row; justify-content:space-between; display:flex !important; flex-grow:1; padding-top: 10rpx;}
.uni-comment-top>text{color:#000000; font-size:30rpx; font-weight: bold;}
.uni-comment-date{ flex-direction:row; justify-content:space-between; display:flex !important; flex-grow:1; padding-top: 10rpx;}
.uni-comment-date text{color:#aaaaaa; font-size:26rpx; }
.uni-comment-content{line-height:1.6em; font-size:30rpx; padding:8rpx 0rpx; color:#000000;border-radius:10rpx;}
.uni-comment-content .first-left{padding-left: 50rpx}
.uni-comment-replay-btn{background:#FFF; font-size:34rpx !important; line-height:28rpx;  border-radius:30rpx; color:#b8b8b8;}
.uni-comment-replay-btn .new-text-red{color: #ec0d1b;}
.uni-comment-replay-btn text{padding: 0rpx 10rpx; color:#b8b8b8;}
.uni-comment-replay-btn .liked{font-size:24rpx !important;padding: 0rpx 5rpx;}
.mpcommot-content{
	width: 100%;  
	height: 100rpx; 
	position: fixed;  
    bottom:0rpx;    
	z-index: 99000; 
	padding:0rpx 20rpx;
	border-top: 1px solid #ededed;
	flex-direction:row; justify-content:space-between; display:flex !important; flex-grow:1;
}
.mpcommot-content input{	
	height: 60rpx ;
	width: 80%;
	border: 1px solid #c7c7c7;
	border-radius:5px;
	font-size: 26rpx;
	text-indent: 20rpx;
	margin: 20rpx 0px ;
	padding:0rpx 10rpx;
	-webkit-appearance: none;
}
.mpcommot-content button{
	border: none;
	margin: 20rpx 0px ;
	height: 60rpx;
}
.mpcommot-content .bg-green{
	background:green;
}
</style>>

