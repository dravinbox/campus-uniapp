<template name="mainpage">
	<view>
		
		<!-- 标题 -->
		<cu-custom bgColor="bg-gradual-pink" >
			<block slot="content">APP</block>
		</cu-custom>
		<!-- 轮播图 -->
		<swiper class="screen-swiper square-dot"  :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		
		<!-- 功能板 -->
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*gridRow" @click="jumpTo(item.url)">
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
		<view class="cu-tabbar-height"></view>

		
		
	</view>
</template>

<script>
	import {indexApi} from '../../component/api/index.js'
	export default {
		name: "mainpage",
		data() {
			return {
				isCard: false,
				cardCur: 0,
				swiperList: [],
				// swiperListBak: [{
				// 	id: 0,
				// 	type: 'image',
				// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				// }, {
				// 	id: 1,
				// 	type: 'image',
				// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				// }, {
				// 	id: 2,
				// 	type: 'image',
				// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				// }, {
				// 	id: 3,
				// 	type: 'image',
				// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				// }, {
				// 	id: 4,
				// 	type: 'image',
				// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				// }, {
				// 	id: 5,
				// 	type: 'image',
				// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				// }, {
				// 	id: 6,
				// 	type: 'image',
				// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				// }, {
				// 	id: 7,
				// 	type: 'video',
				// 	url: 'https://www.w3school.com.cn/i/movie.ogg'
				// }
				// 
				// ],
				
				towerStart: 0,
				direction: '',
				
				
				
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: 'VR',
					url: '/pages/message/chat'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '录像'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '图像'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '排行榜'
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '皮肤'
				}, {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '发现'
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '帮助'
				}, {
					cuIcon: 'commandfill',
					color: 'purple',
					badge: 0,
					name: '问答'
				}, {
					cuIcon: 'brandfill',
					color: 'mauve',
					badge: 0,
					name: '版权'
				}],
				gridCol: 4,
				gridRow: 3,
				gridBorder: false,
				hotdData:{
					"pageNum": 1,
					"pageSize": 5
				}
			};
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
				this.swiperList = res.data.data
				console.log("get swiper:  ",this.swiperList);
			})
			//获取导航栏
			indexApi.getNavigation((res)=>{
				this.cuIconList = res.data.data
				console.log("get navigation:  ",this.cuIconList);
			})
			//获取热门帖子
			indexApi.getHotPost(this.hotdData,(res)=>{
				this.cuIconList = res.data.data
				console.log("get navigation:  ",this.cuIconList);
			})
		}
	}
</script>

<style>
   

</style>
