<template name="mainpage">
	<view>
		
		<!-- 标题 -->
		<!-- #ifdef MP-WEIXIN -->
		<!-- <view class="mpheader-content">  
			<view class="">坦白校缘</view>  
		</view> -->
		<cu-custom bgColor="bg-gradual-newblue" >
			<block slot="content">坦白校缘</block>
		</cu-custom>
		<!-- #endif -->

		<!-- #ifdef APP-PLUS -->  
		<view class="status_bar">  
			<view class="top_view"></view>  
		</view>  
		<!-- #endif -->

		<!-- #ifdef APP-PLUS|| H5 -->  
		<!-- <view class="header-content bg-gradual-newblue">  
			<view class="bg-gradual-newblue">xin</view>  
		</view>  -->
		<!-- #endif -->

		<!-- 轮播图 -->
		<swiper-list :swiperList='swiperDataList' :heightClass="'new-swiper'" ></swiper-list>
		
		<!-- 功能板  cuIconList绑定的数据 gridCol行个数 gridRow多少行 gridBorder是否要带边框  -->
		<!-- <navigation-list></navigation-list> -->
		
		<!-- 热门  -->
		<view class="text-content new-text-black more-list" style="padding:0 24rpx;" >
			实时动态
		</view>
		<view >
			<post-list  :itemList='hotList' :hotNotes='true' ></post-list>
		</view>
		
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import {indexApi} from '../../component/api/index.js'
	import swiperList from './../../colorui/components/swiper-list.vue'
	import navigationList from './../../colorui/components/navigation-list.vue'
	import postList from './../../component/friendship/post-list.vue'
	export default {
		components: {swiperList,postList,navigationList},
		name: "mainpage",
		data() {
			return {
				isCard: true,
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
				gridRow: 2,
				gridBorder: false,
				hotdData:{
					"pageNum": 1,
					"pageSize": 10
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
		created(){
			try {
				const res = uni.getSystemInfoSync();
				console.log('model',res.model);
				console.log('pixelRatio',res.pixelRatio);
				console.log(res.windowWidth);
				console.log(res.windowHeight);
				console.log('language',res.language);
				console.log('version',res.version);
				console.log(res.platform);
			} catch (e) {
				// error
			}
			
			switch(uni.getSystemInfoSync().platform){

				case 'android':

				console.log('运行Android上')

				break;

				case 'ios':

				console.log('运行iOS上')

				break;

				default:

				console.log('运行在开发者工具上')

				break;

			}
			uni.setTabBarItem({
				index: 0,
				text: '',
				iconPath: '',
				selectedIconPath: ''
			})
			uni.setTabBarBadge({
				index: 0,
				text: '1'
			})
		},
		mounted() {
			//获取轮播图
			indexApi.getSwiper((res)=>{
				if(res.data.code==200){
					this.swiperDataList = res.data.data;
					console.log("get swiper:  ",this.swiperDataList);
				}
				
			})
			console.log('this.$http',this.$http)
			//获取导航栏
			// indexApi.getNavigation((res)=>{
			// 	//this.cuIconList = res.data.data;
			// 	//console.log("get navigation:  ",this.cuIconList);
			// })
			//获取热门帖子
			indexApi.getHotPost(this.hotdData,(res)=>{
				if(this.hotdData.pageNum==1){
					this.hotList = []
				}
				if(res.data.code == 200){
					if(res.data.data.list){
						res.data.data.list.forEach((item,index) => {
							//console.log(typeof(item.imagesJsonList))
							item.videoPaused = true;
							// item.video = 'https://toss.paycore.cc/ts/video/1566288960116.mp4';
							//console.log(JSON.parse(item.imagesJsonList))
							if(JSON.parse(item.imagesJsonList)!=null){
								item.imagesJsonList = JSON.parse(item.imagesJsonList);
								
							}else{
								item.imagesJsonList = []
							}
							this.hotList.push(item);
							
						});
					}
				}
				
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

.more-list {
    font-size: 36rpx;
	line-height: 100rpx;
	height: 100rpx;
    font-weight: bold;
    color: #1a1a1a;
    text-indent: 20rpx;
    position: relative;
	background: #ffffff;
  }
  .more-list:after {
      content: "";
      display: block;
      width: 9rpx;
      height: 40rpx;
      background: #37cfe6;
      position: absolute;
      left: 24rpx;
      top: 50%;

      transform: translateY(-50%);
	}
/* .status_bar {  
    height: var(--status-bar-height);  
    width: 100%;  
    background-color: #F8F8F8;  
}  
.top_view {  
    height: var(--status-bar-height);  
    width: 100%;  
    position: fixed;  
    background-color: #F8F8F8;  
    top: 0;  
    z-index: 999;  
} */
.header-content{
	width: 100%;  
	height: 90rpx;  
	position: fixed;  
    background-color: #F8F8F8;  
    top: var(--status-bar-height);    
    z-index: 99900; 
}
.mpheader-content{
	width: 100%;  
	height: 110px; 
	padding-top:64px;
	position: fixed;  
    /* background-image: linear-gradient(45deg, #3cd5e7, #2cade6);
	color: #ffffff; */
    top:0rpx;    
    z-index: 99900; 
}

</style>>
   
