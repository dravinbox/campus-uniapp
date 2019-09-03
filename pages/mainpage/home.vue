<template name="mainpage">
	<view>
		
		<!-- 标题 -->
		<cu-custom bgColor="bg-gradual-pink" >
			<block slot="content">APP</block>
		</cu-custom>
		<!-- 轮播图 -->
		<swiper-list :swiperList='swiperDataList'></swiper-list>
		
		<!-- 功能板 -->
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']" v-if="cuIconList.length<gridCol*gridRow">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index"  @click="jumpTo(item.url)">
				<view :class="[ item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		
		<!-- 热门 -->
		<view class="cu-card case" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="image">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="widthFix"></image>
					<view class="cu-tag bg-blue">史诗</view>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。</text></view>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view class="text-grey">正义天使 凯尔</view>
							<view class="text-gray text-sm flex justify-between">
								十天前
								<view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
									<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
									<text class="cuIcon-messagefill margin-lr-xs"></text> 30
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-card case" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="image">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg"
					 mode="widthFix"></image>
					<view class="cu-tag bg-blue">史诗</view>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。</text></view>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg);"></view>
						<view class="content flex-sub">
							<view class="text-grey">正义天使 凯尔</view>
							<view class="text-gray text-sm flex justify-between">
								十天前
								<view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
									<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
									<text class="cuIcon-messagefill margin-lr-xs"></text> 30
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>


		<view class="cu-card case" :class="isCard?'no-card':''" v-for="(item,index) in hotList" :key="index">
			<view class="cu-item shadow">

				<view class="image" >
					<view v-if="item.imagesJsonList">
						<image  :src="index%2==0?'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg':'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'"
						mode="widthFix"></image>
					</view>
					<view class="uni-center" style="height:175px;width:600upx; margin:0 auto;" v-if="item.voice">
							<audio style="text-align: left" :src="item.voice" :poster="current.poster" :name="item.title" :author="current.author"
							:action="audioAction" controls></audio>
					</view>
					<view v-if="item.video">
						<video id="myVideo" :show-fullscreen-btn='false' objectFit='cover' style="width:690upx;font-size:14px;" :src="item.video" controls></video>
					</view>
					<view class="cu-tag bg-blue">{{item.oneCategory?item.oneCategory.oneCateName:'史诗'}}</view>
					<!-- <view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{item.title}}</text></view> -->
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" >
							<image :src="item.user.headImage?item.user.headImage:'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'" ></image>
						</view>
						<view class="content flex-sub">
							<view class="text-grey">{{item.user?item.user.nickName:'正义天使 凯尔'}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{ item.createTime | formatTime }}
								<view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
									<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.liked}}
									<text class="cuIcon-messagefill margin-lr-xs"></text> {{item.comment}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>		
		
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import {indexApi} from '../../component/api/index.js'
	import swiperList from './../../colorui/components/swiper-list.vue'
	export default {
		components: {swiperList},
		name: "mainpage",
		data() {
			return {
				isCard: false,
				cardCur: 0,
				swiperDataList: [],
				
				towerStart: 0,
				direction: '',
				
				
				
				cuIconList: [
					{
						cuIcon: 'cardboardfill',
						color: 'red',
						badge: 120,
						name: 'VR',
						url: '/pages/message/chat'
					}, 
					{
						cuIcon: 'recordfill',
						color: 'orange',
						badge: 1,
						name: '录像'
					},
					{
						cuIcon: 'picfill',
						color: 'yellow',
						badge: 0,
						name: '图像'
					},
					{
						cuIcon: 'noticefill',
						color: 'olive',
						badge: 22,
						name: '通知'
					},
					{
						cuIcon: 'upstagefill',
						color: 'cyan',
						badge: 0,
						name: '排行榜'
					}, 
					{
						cuIcon: 'clothesfill',
						color: 'blue',
						badge: 0,
						name: '皮肤'
					},
					{
						cuIcon: 'discoverfill',
						color: 'purple',
						badge: 0,
						name: '发现'
					}, 
					{
						cuIcon: 'questionfill',
						color: 'mauve',
						badge: 0,
						name: '帮助'
					}, 
					{
						cuIcon: 'commandfill',
						color: 'purple',
						badge: 0,
						name: '问答'
					}, 
					{
						cuIcon: 'brandfill',
						color: 'mauve',
						badge: 0,
						name: '版权'
					}
				],
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
				}
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
			}
		},
		mounted() {
			//获取轮播图
			indexApi.getSwiper((res)=>{
				this.swiperDataList = res.data.data;
				console.log("get swiper:  ",this.swiperDataList);
			})
			//获取导航栏
			indexApi.getNavigation((res)=>{
				//this.cuIconList = res.data.data;
				//console.log("get navigation:  ",this.cuIconList);
			})
			//获取热门帖子
			indexApi.getHotPost(this.hotdData,(res)=>{
				this.hotList = res.data.data.list;
				res.data.data.list.forEach((item,index) => {
					console.log(typeof(item.imagesJsonList))

						console.log(JSON.parse(item.imagesJsonList))
						item.imagesJsonList = JSON.parse(item.imagesJsonList)
					
					
				});
				console.log("get hotPost:  ",this.hotList);
			})
		}
	}
</script>

<style  scoped>

.cu-avatar image{
	width: 100%;
	height: 100%;
	border-radius: 50%;
	-webkit-border-radius: 50%;
}
</style>>
   
