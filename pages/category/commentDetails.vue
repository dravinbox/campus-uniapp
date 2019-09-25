<template>
	<view>
		<view v-if="detail&&check">
			<cu-custom bgColor="bg-gradual-white" :isBack="true">
				<block slot="backText" >首页</block>
				<view slot="content" >
					<view class="new-content justify-center">
						<view class="backImg">
							<image :src='detail.user.userInfo.headImage'></image>
						</view>
						<view class="new-backText">{{detail.user.userInfo.nickName||''}} </view>
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

			<view class="uni-padding-wrap bg-white">
				<!-- 评论区 start -->
				<view class="uni-comment">
					<view class="uni-comment-list" v-for="(item,index) in commentList" :key="index">
						<view class="uni-comment-face"><image :src="item.user.userInfo.headImage" mode="widthFix"></image></view>
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
								<view class="cuIcon-appreciate uni-comment-replay-btn">
									<text>{{item.liked}}</text>
								</view>
							</view>
						</view>
					</view>
					
				</view>
				<!-- 评论区 end -->
			</view>



			<view class="cu-tabbar-height"></view>

			<view class="cu-bar tabbar bg-white shadow foot nav">
				<view class="flex text-center new-detailfooter">
					<view class="flex-sub new-class-sub cuIcon-appreciate "  :class="detail.userLikePost!= null?'new-text-red':'new-text-grey'"   :data-id="0">
						<text class="new-text-grey new-text-padding">  {{detail.liked||0}} </text>
					</view>
					<view class="flex-sub new-class-sub cuIcon-forward"  :class="2==TabCur?'new-text-red':'new-text-grey'" :data-id="2">
						<text class="new-text-grey new-text-padding"> {{detail.comment||0}}</text>
					</view>
						<view class="flex-sub new-class-sub cuIcon-message"  :class="3==TabCur?'new-text-red':'new-text-grey'"   :data-id="3">
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
				cateList:['文字匹配','语音匹配','关注','文字匹配','语音匹配','关注'],
				detail:null,
				check:false,
				commentList:[],
			}
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中'
			});
			console.log(option.classItem); //打印出上个页面传递的参数。
			console.log(option.cateId); //打印出上个页面传递的参数
			this.newParam.classItem = option.classItem;
			this.newParam.postId = Number(option.postId);
			console.log(this.newParam)
			var pages = getCurrentPages();
			console.log(pages)
			if(this.newParam.postId){
				this.getPostDetail(this.newParam.postId);
				this.getPostComment(this.newParam.postId);
				//this.commentPost(this.newParam.postId);
				this.commentComment(37)
			}
			
			//console.log(this.$mp.query)
		},
		filters: {
			formatTime(date) {
				//console.log(date,'参数')
				// console.log(date)
				// let oldDate  = new Date(date.replace(/-/g, '/'));
				var data = date.substr(0, 19); //'2019-08-09T18:23:27'
				var oldDate = new Date(data.replace(/T/g, ' ').replace(/-/g, '/'));
				let y = oldDate.getFullYear();
				let m = oldDate.getMonth() + 1 < 10 ? '0' + (oldDate.getMonth() + 1) : oldDate.getMonth() + 1; // 获取当前月份的日期，不足10补0
				let d = oldDate.getDate() < 10 ? '0' + oldDate.getDate() : oldDate.getDate(); // 获取当前几号，不足10补0
				let h =  oldDate.getHours() < 10 ? '0' + oldDate.getHours() : oldDate.getHours(); // 获取当前几点，不足10补0
				let minute =  oldDate.getMinutes() < 10 ? '0' + oldDate.getMinutes() : oldDate.getMinutes(); // 获取当前几分，不足10补0
				return y + '-' + m + '-' + d +'  '+h+':'+minute;
			},
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				// this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			getPostDetail(postId){//帖子详情
				discoverApi.getPostDetail('/'+postId,{},(res)=>{
					console.log(res)
					if(res.data.code == 200){
						this.detail = res.data.data;
						this.check = true;
						uni.hideLoading()
					}
					
				})
				setTimeout(()=>{
					
					if(!this.check){
						uni.hideLoading()
						this.check = true;
					}
					
				},1300)
			},
			commentPost(postId){//评论某个帖子
				let data = {
					"content": "沙发"+new Date().getTime(),
  					"postId": postId
				}
				discoverApi.commentPost(data,(res)=>{
					console.log(res)
					if(res.data.code == 200){
					}
					
				})
			},
			commentComment(pid){//评论某个评论
				let data = {
					"content": "沙发",
  					"pid": pid
				}
				discoverApi.commentComment(data,(res)=>{
					console.log(res)
					if(res.data.code == 200){
					}
					
				})
			},
			getPostComment(postId){//获取某个帖子的评论
				let data = {
					"pageNum": 1,
  					"pageSize": 100
				}
				discoverApi.getPostComment('/'+postId,data,(res)=>{
					console.log(res)
					if(res.data.code == 200){
						this.commentList = res.data.data.list
					}
					
				})
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
	box-sizing: border-box;
}
.new-text-red{
    color: #ec0d1b;
}
.new-text-grey{
	color: #acacac;
}
.new-border-bottom{
	border-bottom:1px solid #ededed;
	padding-bottom: 26rpx;
}
.uni-padding-wrap{
	width:750urx;
	padding:0 30rpx;
}
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
.uni-comment-replay-btn{background:#FFF; font-size:34rpx !important; line-height:28upx; padding:5rpx 0upx 5rpx; border-radius:30upx; color:#b8b8b8; ; margin:0 10upx;}
.uni-comment-replay-btn text{font-size:26rpx !important; padding: 10upx;}
</style>
