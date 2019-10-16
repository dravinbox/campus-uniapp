<template>
	<view>
		<view v-if="detail&&check">
			<cu-custom bgColor="bg-gradual-white" :isBack="true">
				<block slot="backText" >首页</block>
				<view slot="content" >
					<view class="new-content justify-center">
						<view class="backImg">
							<image :src='detail.user.userChartInfo.headImage'></image>
						</view>
						<view class="new-backText">{{detail.user.userChartInfo.nickName||''}} </view>
					</view>
				</view>
			</cu-custom>	
			<!-- 栏目 -->
			<scroll-view scroll-x class="bg-white nav new-solids-bottom" >
				<view class="cu-item new-cu-item"    :data-id="0">
					<view class="new-text-black">转发{{TabCur}}</view>
				</view>
				<view class="cu-item new-cu-item"  :data-id="1">
					<view class="new-text-black new-border">评论{{detail.comment||0}}</view>
				</view>
				<view class="cu-item new-cu-item new-float"   :data-id="2">
					<view class="new-text-black">赞{{detail.liked||0}}</view>
				</view>
			</scroll-view>

			<!-- 评论内容 -->
			<view class="uni-padding-wrap bg-white">
				
				<!-- 评论区 start -->
				<view class="uni-comment">
					<view class="uni-comment-list" v-for="(item,index) in commentList" :key="index">
						<view class="uni-comment-face"><image :src="item.user.userChartInfo.headImage" lazy-load mode="widthFix"></image></view>
						<view class="uni-comment-body new-border-bottom">
							<view class="uni-comment-top">
								<text>{{item.user.userChartInfo.nickName||''}} </text>
							</view>
						
							<view class="uni-comment-content" @tap='toReply(item)'>{{item.content}}
								<text class="first-left" v-if="item.commented"> 共{{item.commented}}条回复 </text>
								<text class="cuIcon-right" v-if="item.commented"></text>
							</view>
							<view class="uni-comment-date">
								<text>{{item.createTime|formatTime}}</text>
								<view class=" uni-comment-replay-btn " >
									<text class="cuIcon-message" @tap="tabSelect('评论',item.id)"></text>
									<text class="cuIcon-appreciate" :class="item.userLikeComment?'new-text-red':''" @tap='likeComment(item.id,index)'>
										<text class="liked">{{item.liked}}</text>
									</text>
								</view>
							</view>
						</view>
					</view>
					
				</view>
				<!-- 评论区 end -->
			</view>

			<!-- 评论框	 -->
			<view class="mpcommot-content bg-white shadow" v-if="commentCheck">
				<input class="uni-input" v-model="commentParams.content"   adjust-position='false' placeholder="评论" focus type="text" @blur="tabSelect('失效')" />
				<button  type="primary" disabled="none" v-if="!commentParams.content"  size="mini">发送</button>
				<button  type="primary"  v-if="commentParams.content" @tap="commentEvent" size="mini">发送</button>
			</view>

			<view class="cu-tabbar-height"></view>

			<!-- 底部 -->
			<view class="cu-bar tabbar bg-white shadow foot nav">
				<view class="flex text-center new-detailfooter">
					<view class="flex-sub new-class-sub cuIcon-appreciate new-class-right"  :class="detail.userLikePost!= null?'new-text-red':'new-text-grey'"   :data-id="0">
						<text class="new-text-grey new-text-padding">  {{detail.liked||0}} </text>
					</view>
					<view class="flex-sub new-class-sub cuIcon-forward new-class-right"  :class="2==TabCur?'new-text-red':'new-text-grey'" :data-id="2">
						<text class="new-text-grey new-text-padding"> {{detail.comment||0}}</text>
					</view>
					<view class="flex-sub new-class-sub cuIcon-message"  :class="3==TabCur?'new-text-red':'new-text-grey'" @tap="tabSelect('帖子',0)"  :data-id="3">
						<text class="new-text-grey new-text-padding"> {{detail.comment||0}}</text>
					</view>
				</view>
			</view>	
		</view>	
	</view>
</template>

<script>
	import { discoverApi } from '../../component/api/discover.js';
	export default {
		data() {
			return {
				PageCur: 'dynamic',
				TabCur: 1,
				modalName: null,
				radio: 'radio1',
				newParam:{
					classItem:'',
					postId:null,
				},
				total:null,
				isNextPage:true,
				cateList:['文字匹配','语音匹配','关注','文字匹配','语音匹配','关注'],
				detail:null,
				check:false,
				commentList:[],
				params:{
					"pageNum": 1,
  					"pageSize": 20
				},
				commentParams:{
					"content": "",
  					"pid": ''
				},
				type:'帖子',
				commentCheck:false,
			}
		},
		onLoad(option) {
			this.newParam.postId = Number(option.postId);
			//console.log(this.newParam)
			//var pages = getCurrentPages();
			//console.log(pages)
			if(this.newParam.postId){
				this.getPostDetail(this.newParam.postId);
				this.getPostComment(this.newParam.postId);
			}
		},
		onPullDownRefresh(){
			console.log('下拉刷新')
			this.params.pageNum = 1;
			this.params.pageSize = 20;
			this.isNextPage = true;
			this.getPostComment(this.newParam.postId);
			this.getPostDetail(this.newParam.postId);
		},
		onReachBottom(){
			if(this.commentList.length>0){
				//console.log(this.isNextPage)
				if(this.isNextPage){
					this.getPostComment(this.newParam.postId);
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
			tabSelect(falg,id) {
				
				if(falg=='失效'){
					setTimeout(()=>{
						this.commentCheck = false;
					},310)
				}else {
					this.commentParams.content= '';
					this.commentCheck = true;
					this.type = falg;
					if(this.type=='评论'){
						this.commentParams.pid = id;
					}else{
					}
				}
				
			},

			commentEvent(){
				if(this.type=='帖子'){
					this.commentPost()
				}else{
					this.commentComment()
				}
			},

			getPostDetail(postId){//帖子详情
				discoverApi.getPostDetail('/'+postId,{},(res)=>{
					//console.log(res)
					if(res.data.code == 200){
						this.detail = res.data.data;
						this.check = true;
					}
					
				})
				setTimeout(()=>{
					this.check = true;
				},1300)
			},

			commentPost(){//评论某个帖子
				let data = {
					"content": this.commentParams.content,
  					"postId": this.newParam.postId
				}
				//console.log(data)
				discoverApi.commentPost(data,(res)=>{
					//console.log(res)
					if(res.data.code == 200){
						this.commentParams.content = '';
						this.commentCheck = false;
						this.params.pageNum = 1 ;
						this.params.pageSize = 20 +this.commentList.length;
						this.getPostComment(this.newParam.postId);
						this.getPostDetail(this.newParam.postId);
					}
					
				})
			},

			commentComment(){//评论某个评论
				let data = {
					"content": this.commentParams.content,
  					"pid": this.commentParams.pid
				}
				discoverApi.commentComment(data,(res)=>{
					//console.log(res)
					if(res.data.code == 200){
						this.commentParams.content = '';
						this.commentCheck = false;
						this.params.pageNum = 1 ;
						this.params.pageSize = 20 +this.commentList.length;
						this.getPostComment(this.newParam.postId);
					}
					
				})
			},

			getPostComment(postId){//获取某个帖子的评论
				discoverApi.getPostComment('/'+postId,this.params,(res)=>{
					//console.log(res)
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

			
			toReply(item){//去回复页面
				uni.setStorageSync('comment', JSON.stringify(item));
				uni.navigateTo({
					url: '../category/reply?commentId='+item.id
				});
			}
		},
		
	}
</script>

<style scoped>
.new-content{
	height: 60rpx !important;
	overflow: hidden;
	margin: 0 auto;
	display: flex;
}
.backImg{
	display: inline-block;
	overflow: hidden;
}
.backImg image{
	width: 60rpx !important;
	height: 60rpx !important;
	border-radius: 50%;
	-webkit-border-radius: 50%;	
}
.new-backText{
	height: 60rpx !important;
	display: inline-block;
	line-height: 60rpx !important;
	max-width: 250rpx;
	text-indent: 10rpx;
}
.new-solids-bottom {
    position: relative;
    border-bottom: 1px solid #eee !important;
}
.new-border{
	height: 90upx;
	box-sizing: border-box ;
	-webkit-box-sizing: border-box ;
	border-bottom:1px solid #eb4350; 
	border-radius: 3upx;
	-webkit-border-radius: 3upx; 
}
.new-cu-item{
	padding: 0 20rpx;
}
.new-float{
	float: right;
}
.action .new-text-black{
	font-size: 32rpx !important;
}
.new-text-padding{
	padding: 0upx 10upx;
}
.new-detailfooter{
	width: 100%;
}
.new-class-sub{
	width: 33%;
	overflow: hidden;
	height: 80rpx;
	line-height: 80rpx;
	font-size: 34rpx;
	box-sizing: border-box;
	
}
.new-class-right{border-right: 1px solid #b9b9b9;}
.new-class-sub text{font-size: 24rpx;}
.new-text-red{
    color: #ec0d1b;
}
.new-text-grey{
	color: #acacac;
}
.new-border-bottom{
	border-bottom:1px solid #ededed;
	padding-bottom: 10rpx;
}
.uni-padding-wrap{
	width:750rpx;
	padding:0 30rpx;
}
.uni-comment{padding:5rpx 0; display: flex; flex-grow:1; flex-direction: column;}
.uni-comment-list{flex-wrap:nowrap; padding:10rpx 0; margin:10rpx 0; width:100%; display: flex;}
.uni-comment-face{width:80upx; height:80upx; border-radius:100%; margin-right:20upx; flex-shrink:0; overflow:hidden;}
.uni-comment-face image{width:100%;height: 100% !important; background: #f3f3f3;}
.uni-comment-body{width:100%;}
.uni-comment-top{line-height:1.5em; justify-content:space-between;}
.uni-comment-top text{color:#000000; font-size:30rpx;line-height: 80rpx; font-weight: bold;}
.uni-comment-date{line-height:50rpx; flex-direction:row; justify-content:space-between; display:flex !important; flex-grow:1; padding-top: 10rpx;}
.uni-comment-date view{color:#b8b8b8; font-size:26rpx; line-height:50rpx;}
.uni-comment-content{line-height:1.6em; font-size:30rpx; padding:8rpx 8rpx; background: #f4f2f3;color:#000000;border-radius:10rpx;}
.uni-comment-content .first-left{padding-left: 50rpx;}
.uni-comment-replay-btn{background:#FFF; font-size:34rpx !important; line-height:28upx;  border-radius:30upx; color:#b8b8b8; margin:0 10upx;}
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
</style>
