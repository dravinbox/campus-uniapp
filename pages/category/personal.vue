<template>
	<view >
		<view>	
			<cu-custom bgColor="bg-person-newblue "   :isBack="true">
				<block slot="content">个人主页</block>
			</cu-custom>
			<view  class="new-yu-blue bg-person-newblue">	
				<view class="text-center head-portrait">
					<image v-if="user.userChartInfo" lazy-load :src='user.userChartInfo.headImage'></image>
				</view>
				<view class="text-center head-name">
					<text v-if="user.userChartInfo">{{user.userChartInfo.nickName}}</text>
				</view>
				<view class="flex text-center new-height">
					<view class="cu-item flex-sub new-class-right"   :data-id="0">
						我的帖子
					</view>
					<view class="cu-item flex-sub new-class-right"   :data-id="1">
						我的粉丝
					</view>
					<view class="cu-item flex-sub new-class-right"   :data-id="2">
						我的关注
					</view>
					<view class="cu-item flex-sub"   :data-id="3">
						我的收藏
					</view>
				</view>
			</view>	
			<view class="homepage-content">
				<view class="cu-timeline">
					<view class="cu-time "></view>
					<view class="cu-item cur cuIcon-newll new-bottom" v-for="(item,index) in commentList" :key="index">
						<view class="content bg-white new-contont">
							<text>{{item.content}}</text>
							<view class="grid flex-sub padding-lr-lm margin-bottom"  :class="item.imagesJsonList.length>1?'col-3 grid-square':'col-3 grid-square'">
								<view class="bg-img"  
								v-for="(imgUrl,index2) in item.imagesJsonList" :key="index2">
								<image  lazy-load :src='imgUrl.url'></image>
								</view>
							</view>
							<view>{{item.createTime|formatTime}}</view>
						</view>
						
					</view>
				</view>

			</view>
		</view>	
		
	</view>
</template>

<script>
	import { userApi } from '../../component/api/user.js';
	export default {
		data() {
			return {
				TabCur:0,
				PageCur: 'dynamic',
				modalName: null,
				radio: 'radio1',
				newParam:{
					classItem:'',
					otherUserId:null,
				},
				scrollHeight:0,
				user:{},
				params:{
					"pageNum": 1,
  					"pageSize": 10
				},
				isNextPage:true,
				commentList:[],
			}
		},
		onLoad(option) {
			//console.log(option.classItem); //打印出上个页面传递的参数。
			//console.log(option.cateId); //打印出上个页面传递的参数
			this.newParam.classItem = option.classItem;
			this.newParam.otherUserId = Number(option.otherUserId);
			if(this.newParam.otherUserId){
				console.log('查看别人的主页')
			}
			//console.log(this.newParam)
			var pages = getCurrentPages();
			//console.log(pages)
			//console.log(this.$mp.query)
		},
		onPullDownRefresh(){
			console.log('下拉刷新')
			this.params.pageNum = 1;
			this.isNextPage = true;
			this.getMyPostHistory()
		},
		onReachBottom(){
			if(this.commentList.length>0){
				//console.log(this.isNextPage)
				if(this.isNextPage){
					this.getMyPostHistory()
				}
			}	
		},
		mounted(){
			this.getInfoEvent();
			this.getMyPostHistory()
			uni.getLocation({
				type: 'wgs84',
				geocode:true,
				success: function (res) {
					console.log(res)
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
				}
			});
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
			getInfoEvent(){//获取用户基本信息
				userApi.getInfo({},(res)=>{
					if(res.data.code ==200){
						this.user =  res.data.data;
						console.log(res.data,this.user)
					}
				})
			},
			getMyPostHistory(){//获取本人的个人主页动态列表
				userApi.getMyPostHistory(this.params,(res)=>{
					if(res.data.code ==200){
						if(this.params.pageNum==1){
							this.commentList = []
							uni.stopPullDownRefresh()
						}
						res.data.data.list.forEach((item,index) => {
							if(item.imagesJsonList){
								console.log(item.imagesJsonList)
								try {
									item.imagesJsonList = JSON.parse(item.imagesJsonList);
								} catch (error) {
									item.imagesJsonList = []
								}	
							}else{
								item.imagesJsonList = []
							}
							this.commentList.push(item);
						});
						if(res.data.data.list.length>=this.params.pageSize){
							this.isNextPage = true;
							this.params.pageNum++;
						}else{
							this.isNextPage = false;
						}
						
						console.log(this.commentList)
						console.log(res.data)
					}
				})
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
		},
		
	}
</script>

<style scoped>
.new-yu-blue{
	height: 170px;
}
.head-portrait{
	height: 75px;
}
.head-name{
	height: 20px;overflow: hidden;padding: 0px 20px;
	margin: 20rpx 0px 60rpx 0px ;
}
.head-name text{font-size: 34rpx;}
.head-portrait image{
	margin-top: 10px;
	width: 55px;
	height: 55px;
	border: 5px solid #5dd0eb;
	border-radius: 50%;
}
.homepage-content{
	/* min-height: 200rpx; */
	background: #ffffff;
}
.new-contont{
	border-radius: none !important;
	padding: 0px 0rpx  20rpx 10rpx !important;
	border-bottom: 20rpx solid #f3f3f3;
}
.new-height{height: 30px;line-height: 18px;padding: 6px 0px; color: rgba(255, 255, 255, .8);}
.new-class-right{border-right: 1px solid rgba(255, 255, 255, .8);}
/* .cu-timeline>.cu-item[class*="cuIcon-newll"]::before {
	background-image: url('./../../static/icon_home.png');
	background-color: #fff;
	background-repeat: no-repeat;
	background-size: cover;
	-webkit-background-size: cover;
	-o-background-size: cover;
	background-position: center 0;
} */
.cuIcon-newll::before {
	content: ' ';
	background-image: url('./../../static/icon_home.png');
	background-color: #fff;
	background-repeat: no-repeat;
	background-size: cover;
	-webkit-background-size: cover;
	-o-background-size: cover;
	background-position: center 0;
}
</style>

