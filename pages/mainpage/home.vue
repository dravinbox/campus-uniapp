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
		<view class="weather-big" :style="[{backgroundImage:'url('+ backgroundUrl||''+')'}]">
			<view class="weather-first text-white" v-if="weather"> 
				<text class="lg"> {{weather.basic.city}} </text>
				<text class="lg padding-pg"> {{weather.now.tmp}}° </text>
				<text class="lg ">  {{weather.now.txt}}</text>
				<text class="lg padding-pg"> {{weather.forecast.forecast[0].tmp_min}}°/{{weather.forecast.forecast[0].tmp_max}}° </text>
			</view>
			<!-- <view class="weather-moddle text-white cuIcon-locationfill">
				<view class="fl"> 天气</view>
				<view class="fr">
					<view class="trd">今天</view>  
					<view class="trd">明天</view>  
					<view class="trd">后天</view>  
				</view>
			</view>
			<view class="weather-end text-white"> 数据来源于天气网 </view> -->
		</view>
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
	import {cities} from '../../component/friendship/city.js'
	export default {
		components: {swiperList,postList,navigationList},
		name: "mainpage",
		data() {
			return {
				isCard: true,
				cardCur: 0,
				backgroundUrl:'https://apip.weatherdt.com/view/static/images/bg_00d.png',
				swiperDataList: [
					{
						url:'http://image.uczzd.cn/13744673152884262658.jpg?id=0&from=export',
						type:'image'
					},
					{
						url:'http://image.uczzd.cn/7338690865420014518.jpg?id=0&from=export',
						type:'image'
					},
					{
						url:'http://image.uc.cn/s/wemedia/s/upload/2020/1bd875ab0a55881cc7028d6383ca456a.jpg',
						type:'image'
					},
					{
						url:'http://image.uczzd.cn/3195761498505781708.jpg?id=0&from=export',
						type:'image'
					},
				],
				weather:{},
				towerStart: 0,
				direction: '',			
				cuIconList: [
					{
						cuIcon: 'cardboardfill',
						color: 'red',
						badge: 0,
						name: 'VR',
						url: '/pages/message/chat'
					}, 
					{
						cuIcon: 'recordfill',
						color: 'orange',
						badge: 0,
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
						badge: 0,
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
				hotList:[
					{
						user:{
							userChartInfo:{
								nickName:'新的开始',
								headImage:'http://image.uczzd.cn/7338690865420014518.jpg?id=0&from=export'
							}
						},
						id:1,
						createTime:'2019-11-22 12:24',
						userId:'45',
						oneCategory:{
							oneCateName:'分享',
						},
						content:'人生一世，折磨我们的不是贫穷，而是这样和那样的贪欲！沉湎于物质的追求，会产生对财富的贪欲，拥有慈悲的心怀，会更多的救人以水火。人不是所拥有的越多，越引以为自豪，越向他人展示自己存在感，优越性。这样会步入歧途，也会为自己招来灾祸。懂得如何花钱，才是正道，才会迎来更好的命运和福报！',
						imagesJsonList:[
							{url:'http://image.uczzd.cn/7006771521299926169.jpg?id=0&from=export'},
							{url:'http://image.uczzd.cn/875274798047883341.jpg?id=0&from=export'},
							{url:'http://image.uczzd.cn/14629150379482847816.jpg?id=0&from=export'},
						],
						liked:23,
						collected:10,
						share:12,
						comment:33
					},
					{
						user:{
							userChartInfo:{
								nickName:'秋天',
								headImage:'http://image.uczzd.cn/15206017539861396166.jpg?id=0&from=export'
							}
						},
						id:12,
						createTime:'2020-10-29 12:45:50',
						userId:'46',
						oneCategory:{
							oneCateName:'分享',
						},
						content:'爱情就如一株含苞待放的玫瑰，虽然每个人都知道将会被它刺痛，但是仍然争先恐后的想去摘取。与其说爱情是一种感情，倒不如说它是一种魔法，一种令人神魂颠倒的魔法。它可以让庸懒的人变得勤快；木讷的人变得浪漫；狡猾的人变得正直；颓废的人变得积极。',
						imagesJsonList:[
							{url:'http://image.uczzd.cn/15439862492425645944.jpg?id=0&from=export'},
							{url:'http://image.uczzd.cn/14525817096762672792.jpg?id=0&from=export'},
							{url:'http://image.uczzd.cn/2185838273052812405.jpg?id=0&from=export'},
						],
						liked:23,
						collected:10,
						share:12,
						comment:33
					},
					{
						user:{
							userChartInfo:{
								nickName:'冬天',
								headImage:'http://image.uczzd.cn/10786026896486406429.jpg?id=0&from=export'
							}
						},
						id:5,
						createTime:'2019-10-12 08:24',
						userId:'47',
						oneCategory:{
							oneCateName:'分享',
						},
						content:'一个人，只有放低自己的姿态，才能拔高自己的人生。自以为是，不是本事；常思己过，才能少错。',
						imagesJsonList:[
							{url:'http://image.uczzd.cn/2883789093405661048.jpg?id=0&from=export'},
							{url:'http://image.uczzd.cn/4220351132325296517.jpg?id=0&from=export'},
							{url:'http://image.uczzd.cn/934252461801745646.jpg?id=0&from=export'},
						],
						liked:55,
						collected:13,
						share:19,
						comment:54
					},
					{
						user:{
							userChartInfo:{
								nickName:'秋天',
								headImage:'http://image.uczzd.cn/15206017539861396166.jpg?id=0&from=export'
							}
						},
						id:48,
						createTime:'2019-10-03 13:03:50',
						userId:'46',
						oneCategory:{
							oneCateName:'分享',
						},
						content:'与其羡慕别人生活，不如让你自己也活成别人羡慕的样子。从现在，这一刻开始，摆脱困境，逆境而上，活成你最希望的自己。',
						imagesJsonList:[
							{url:'http://res.youth.cn/img-detail/82c3ecef73efd4a318a4f49f23a1b504:640:411.jpg'},
							{url:'http://res.youth.cn/img-detail/6f4cb8b320bdfb1924cd7481e5122131:640:427.jpg'},
							{url:'http://res.youth.cn/img-detail/686682c000fb07bbcee58fc5f09e4cef:640:429.jpg'},
						],
						liked:73,
						collected:150,
						share:52,
						comment:39
					},
					{
						user:{
							userChartInfo:{
								nickName:'冬天',
								headImage:'http://image.uczzd.cn/10786026896486406429.jpg?id=0&from=export'
							}
						},
						id:50,
						createTime:'2019-09-12 08:24',
						userId:'47',
						oneCategory:{
							oneCateName:'分享',
						},
						content:'如果你有信仰，你可以呼求心中的主宰，希望他把宁静、专注、踏实的恩典赐予你，让你能关照自己，守护自己。如果你没有明确的信仰，你可以去阅读、去学习、去了解、去观察，直到明白人生的意义。',
						imagesJsonList:[
							{url:'http://res.youth.cn/img-detail/f911a2bebea6394800a25400651a3898:640:338.jpg'},
							{url:'http://res.youth.cn/img-detail/d4e4cb0822014751b7512f80690b5726:640:322.jpg'},
							{url:'http://res.youth.cn/img-detail/df0932a1545087c2560dc593f6e7bf32:640:309.jpg'},
						],
						liked:95,
						collected:63,
						share:109,
						comment:524
					},
				],
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
			},
			getWeather(cityEncoding){
				let location = cityEncoding || 101280101;
				let note = new Date();
				//console.log('小时'+note.getHours())
				let hours = note.getHours();
				let day = (hours>7&&hours<19)?'d':'n';
				console.log('小时'+ day)
				uni.request({
					url: 'https://apip.weatherdt.com/plugin/data',
					method: "GET",
					data:{
						key: "vlsKFvatDv",
						lang: 'zh',
						location: location
					},
					dataType: "json",
					responseType: "text",
					success: (res)=>{
						console.log(res.data);
						console.log('code'+res.data.now.code)
						this.weather = res.data;
						console.log(this.weather)
						this.backgroundUrl = 'https://apip.weatherdt.com/view/static/images/bg_'+ res.data.now.code + day +'.png';
						console.log(this.backgroundUrl);
					},
					fail: (err)=>{
						//网络异常等引起发送请求异常
						console.log("请求异常",err)
						
					},
					complete: ()=> {}
				})
				
				
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
			// indexApi.getSwiper((res)=>{
			// 	if(res.data.code==200){
			// 		this.swiperDataList = res.data.data;
			// 		console.log("get swiper:  ",this.swiperDataList);
			// 	}
				console.log(this.swiperDataList)
			// })
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
							this.hotList.push(item);
							
						});
					}
				}
				
				console.log("get hotPost:  ",this.hotList);
			})

			uni.request({
				url: 'https://recommend.funzixun.com/api/ip',
				method: "GET",
				dataType: "json",
				responseType: "text",
				success: (res)=>{
					console.log(res.data);
					let data = res.data.data;
					console.log(data)
					let tmpArr = data.split('-');
					console.log(tmpArr);
					for(let key in cities){
						if(key == tmpArr[0]){
							console.log(key)
							console.log('正确')
							for(let city in cities[key]){
								if(city == tmpArr[1]){
									console.log(city)
									console.log(cities[key][city])
									console.log(cities[key][city][0])
									console.log(cities[key][city][0].v)
									let code = cities[key][city][0].v;
									let location = code.slice(2)
									console.log(code,location)
									this.getWeather(location)
								}
							}
						}
						
					}
				},
				fail: (err)=>{
					//网络异常等引起发送请求异常
					console.log("请求异常",err)
					this.getWeather()
				},
				complete: ()=> {}
			})

			console.log(cities)
			
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
.weather-big {
	width: 100%;
	height: 100rpx;
}
.weather-first {
	line-height: 100rpx;
	font-size: 35rpx;
	padding: 0 20rpx;
}
.padding-pg{
	padding-left: 160rpx;
}
/* .weather-moddle{
	width: 100%;
	height: 300rpx;
	padding: 0rpx 10rpx;
}
.weather-moddle .fl{
	width: 55%;
	height: 100%;
}
.weather-moddle .fr{
	width: 45%;
	height: 100%;
}
.weather-moddle .fr .trd{
	height: 60rpx;
	line-height: 60rpx;
	padding: 5rpx 0rpx;
}
.weather-end{
	padding: 0rpx 10rpx;
	line-height: 50rpx;
} */

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
    top:0rpx;    
    z-index: 99900; 
}

</style>>
   
