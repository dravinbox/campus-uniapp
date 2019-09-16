<template name="discover">
	<view>
		<!-- 标题 -->
		<cu-custom  bgColor="bg-gradual-pink">
			<block slot="content">发现</block>
		</cu-custom>
		
		<!-- 分类 -->
		<!-- <scroll-view scroll-x class="bg-white nav"  scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in cateList" :key="index" @tap="tabSelect" :data-id="index">
				{{item.oneCateName}}
			</view>
		</scroll-view> -->
		
		<!-- 帖子 -->
		<view class="cu-card dynamic margin-top" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view>凯尔</view>
							<view class="text-gray text-sm flex justify-between">
								2019年12月3日
							</view>
						</view>
					</view>
				</view>
				<view class="text-content">
					折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！
				</view>
				<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">
					<view class="bg-img" :class="isCard?'':'only-img'" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"
					 v-for="(item,index) in isCard?9:1" :key="index">
					</view>
				</view>
				<view class="text-gray text-sm text-right padding">
					<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
					<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
					<text class="cuIcon-messagefill margin-lr-xs"></text> 30
				</view>
		
				<view class="cu-list menu-avatar comment solids-top">
					<view class="cu-item">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
						<view class="content">
							<view class="text-grey">莫甘娜</view>
							<view class="text-gray text-content text-df">
								凯尔，你被自己的光芒变的盲目。
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>凯尔：</view>
									<view class="flex-sub">妹妹，你在帮他们给黑暗找借口吗?</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cuIcon-appreciatefill text-red"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
								</view>
							</view>
						</view>
					</view>
		
					<view class="cu-item">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content">
							<view class="text-grey">凯尔</view>
							<view class="text-gray text-content text-df">
								妹妹，如果不是为了飞翔，我们要这翅膀有什么用?
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>莫甘娜：</view>
									<view class="flex-sub">如果不能立足于大地，要这双脚又有何用?</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cuIcon-appreciate text-gray"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="cu-card dynamic margin-top" :class="isCard?'no-card':''" v-for="(item,index) in list" :key="index" >
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view>{{item.user?item.user.name:'凯尔'}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{item.createTime}}
							</view>
						</view>
					</view>
				</view>
				<view class="text-content">
					{{item.title}} 
				</view>
				<view class="text-content">
					{{item.content}} 
				</view>
				<view class="grid flex-sub padding-lr" :class="item.imagesJsonList.length>1?'col-3 grid-square':'col-1'">
					<view class="bg-img" :class="item.imagesJsonList.length>1?'':'only-img'" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"
					 v-for="(url,urInx) in item.imagesJsonList" :key="urInx">

					</view>
				</view>
				<view class="text-gray text-sm text-right padding">
					<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
					<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.liked}}
					<text class="cuIcon-messagefill margin-lr-xs"></text> {{item.comment}}
				</view>
		
				<view class="cu-list menu-avatar comment solids-top">
					<view class="cu-item">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
						<view class="content">
							<view class="text-grey">莫甘娜</view>
							<view class="text-gray text-content text-df">
								凯尔，你被自己的光芒变的盲目。
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>凯尔：</view>
									<view class="flex-sub">妹妹，你在帮他们给黑暗找借口吗?</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cuIcon-appreciatefill text-red"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
								</view>
							</view>
						</view>
					</view>
		
					<view class="cu-item">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content">
							<view class="text-grey">凯尔</view>
							<view class="text-gray text-content text-df">
								妹妹，如果不是为了飞翔，我们要这翅膀有什么用?
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>莫甘娜：</view>
									<view class="flex-sub">如果不能立足于大地，要这双脚又有何用?</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cuIcon-appreciate text-gray"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
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
	import { discoverApi } from '../../component/api/discover.js';
	export default {
		name: "discover",
		data() {
			return {
				isCard:true,
				TabCur: 0,
				scrollLeft: 0,
				params:{
					"oneCateId": 1,
					"pageNum": 1,
					"pageSize": 5,
					"pullLast": false,
					"twoCateId": 1
				},
				cateList:[],
				list:[],
			}
		},
		onHide: function(){
			console.log('ssssssssss  onShow')
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			sendPosting(){//发帖子
				let data = {
					"content": "131313",
					"imagesJsonList": "115415641",
					"oneCate": 1,
					"title": "552",
					"twoCate": 1,
					"video": "2145454",
					"voice": "164134"
				}				
				discoverApi.sendAPost(data,(res) =>{
					console.log(res)
				})
			}
			
		},
		mounted() {
			console.log('jin来')
			//获得帖子的分类
			// discoverApi.getCategory({},(res)=>{
			// 	this.cateList = res.data.data;
			// 	console.log("get Category:  ",this.cateList);
			// })

			//获取帖子列表
			discoverApi.getPostList(this.params,(res)=>{
				console.log("get tPostList:  ",res.data.data);
				this.list = [];
				if(res.data.code == 200){
					if(res.data.data.list){
						res.data.data.list.forEach((item,index) => {
							console.log(typeof(item.imagesJsonList));
							//console.log(JSON.parse(item.imagesJsonList));
							item.videoPaused = true;
							//item.video = 'https://toss.paycore.cc/ts/video/1566288960116.mp4';
							if(JSON.parse(item.imagesJsonList)!=null){
								item.imagesJsonList = JSON.parse(item.imagesJsonList);
							}else{
								item.imagesJsonList = []
							}
							this.list.push(item);
							
						});
					}
				}
				
				console.log(this.list)
			})

			
		},
	}
</script>

<style>

</style>
