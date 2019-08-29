<template name="dynamic">
	<view>
		
		<!-- 标题 -->
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
            <!-- <block slot="backText">返回</block> -->
			<block slot="content">动态</block>
		</cu-custom>
		
		<!-- 动态 -->
		<view class="cu-card dynamic " :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item new-cu-item">
						<view class="cu-avatar round lm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view class="new-text-black">凯尔</view>
							<view class="text-gray text-sm flex justify-between">
								2019年12月3日
							</view>                          
						</view>
                        <view class="new-text-black" style="width:100upx;">关注</view>
					</view>
				</view>
				<view class="text-content" style="padding:0 24upx;">
					折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！
				</view>
				<view class="grid flex-sub padding-lr-lm " :class="isCard?'col-3 grid-square':'col-1'">
					<view class="bg-img" :class="isCard?'':'only-img'" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"
					 v-for="(item,index) in isCard?9:1" :key="index">
                     <image src='https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'></image>
					</view>
				</view>
                <scroll-view scroll-x class="bg-white nav" style="padding:0 24upx;">
                    <view class="flex text-center">
                        <view class=" flex-sub cuIcon-appreciate" :class="0==TabCur?'new-text-red':''"  @tap="tabSelect" :data-id="0">
                            <text class=" ">Tab{{222232200000}}</text>
                        </view>
                        <view class=" flex-sub cuIcon-favor" :class="0==TabCur?'new-text-red':''"  @tap="tabSelect" :data-id="1">
                            <text class=" ">Tab54646465441</text>
                        </view>
                        <view class=" flex-sub cuIcon-forward" :class="0==TabCur?'new-text-red':''"  @tap="tabSelect" :data-id="2">
                            <text class=" ">Tab66761456746</text>
                        </view>
                         <view class=" flex-sub cuIcon-message" :class="0==TabCur?'new-text-red':''"  @tap="tabSelect" :data-id="3">
                            <text class=" ">Tab000000</text>
                        </view>

                    </view>
                </scroll-view>
			</view>
		</view>
		
        <view class="cu-card dynamic new-margin-top" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item new-cu-item">
						<view class="cu-avatar round lm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view class="new-text-black">凯尔</view>
							<view class="text-gray text-sm flex justify-between">
								2019年12月3日
							</view>                          
						</view>
                        <view class="new-text-black" style="width:100upx;">关注</view>
					</view>
				</view>
				<view class="text-content" style="padding:0 24upx;">
					折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！
				</view>
				<view class="grid flex-sub padding-lr-lm " :class="isCard?'col-3 grid-square':'col-1'">
					<view class="bg-img" :class="isCard?'':'only-img'" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"
					 v-for="(item,index) in isCard?9:1" :key="index">
					</view>
				</view>
				<view class="text-gray text-sm text-right padding">
					<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
					<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
					<text class="cuIcon-messagefill margin-lr-xs"></text> 30
				</view>
			</view>
		</view>
		
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
    import swiperList from './../../colorui/components/swiper-list.vue'
	export default {
        components: {swiperList},
		name: "dynamic",
		data() {
			return {
				isCard: true,
				cardCur: 0,
				swiperDataList: [],
				
				towerStart: 0,
				direction: '',
				PageCur:'',
				TabCur:0,
				
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
						name: '游戏装备/账号'
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
.new-text-red{
    color: #ec0d1b;
}
</style>>
   
