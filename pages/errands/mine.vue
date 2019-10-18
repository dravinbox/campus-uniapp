<template>
	<view >
		<view>	
			<cu-custom bgColor="bg-person-newblue "   :isBack="true">
				<block slot="content"></block>
			</cu-custom>
			<view  class="new-yu-blue bg-person-newblue">	
				<view class="text-center head-portrait">
					<image v-if="user.userChartInfo" lazy-load :src='user.userChartInfo.headImage'></image>
				</view>
				<view class="text-center head-name">
					<text v-if="user.userChartInfo">{{user.userChartInfo.nickName}}</text>
				</view>
			</view>	
			<view class="homepage-content">
				<view class="cu-list menu sm-border"  >
                    <view class="cu-item arrow new-height"  >
                        <view class="content new-text-black" >
                            我的金库
                            <text class="text-grey new-cate new-size">  (可提现到微信零钱) </text>
                        </view>
                    </view>
                    <view class="cu-item arrow new-height"  >
                        <view class="content new-text-black" >
                            我的消息
                        </view>
                    </view>
                    <view class="cu-item arrow new-height"  >
                        <view class="content new-text-black" >
                            我的地址
                            <view class="cuIcon-add text-grey new-cate fr"><text>新增</text></view>
                        </view>
                    </view>
                    <view class="new-cu-item" >
                        <view class="content">
                            <view class="text-sm flex">
                                <view class="text-cut">
                                    <text class="errand-type type-second">地址地址地了进口发动机了酷酷酷酷酷酷酷酷酷酷酷酷址地址</text>
                                </view>
                                <view class="old-border cuIcon-writefill"> <text>修改</text> </view> 
                                <view class="old-border cuIcon-deletefill"> <text>删除</text> </view> 
                            </view>
                        </view>
                        <view class="content">
                            <view class="text-sm flex">
                                <view class="text-cut">
                                    <text class="errand-type type-second">地址地址地了进口发动机了酷酷酷酷酷酷酷酷酷酷酷酷址地址</text>
                                </view>
                                <view class="old-border cuIcon-writefill"> <text>修改</text> </view> 
                                <view class="old-border cuIcon-deletefill"> <text>删除</text> </view> 
                            </view>
                        </view>
				    </view>
                </view>
			</view>
		</view>	
		<view class="cu-tabbar-height "></view>
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
	height: 230rpx;
}
.head-portrait{
	height: 70px;
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
.homepage-content .cu-list.menu .new-height{
    height: 111rpx;
}
.new-cate{
    padding-left: 10rpx;
}
.new-size{
    font-size: 24rpx;
}
.new-cu-item{
  
    color: #999999;
    font-size: 24rpx;
    padding: 0rpx 30rpx;
}
.new-cu-item .content{
    height: 90rpx;
    line-height: 90rpx;
}
.new-cu-item .text-cut{
    width: calc(100% - 230rpx);
}
.new-cu-item .old-border{
    width: 110rpx;
    text-align: center;
}
.new-cu-item .content:last-of-type{
    border-bottom: 1px solid #dddddd;
}
</style>

