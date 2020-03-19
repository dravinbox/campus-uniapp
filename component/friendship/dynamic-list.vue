<template name="dynamic">
	<view >
		
		<!-- 标题 -->
		<cu-custom bgColor="bg-gradual-newblue" :isBack="true">
            <!-- <block slot="backText">返回</block> -->
			<block slot="content">动态</block>
		</cu-custom>
		
		<!-- 动态 -->
		<view >
			<post-list  :itemList='list' ></post-list>
		</view>

		<!-- 没有动态数据时 -->
		<view v-if="list.length==0&&isCard" class="bg-white text-center new-line">
			<text>没有数据</text>
		</view>

		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import postList from './post-list.vue'
	import { discoverApi } from '../api/discover.js';
	export default {
        components: {postList},
		name: "dynamic",
		props: {
			parameter:{//数据
				type:Object,
				default:{
					cateId:1
				}
			},
		},
		data() {
			return {
				isCard:false,
				list:[
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
				params:{
					"oneCateId": 1,
					"pageNum": 1,
					"pageSize": 10,
					"pullLast": true,//为true时，一直拉取新的动态
				},
			};
		},
		methods: {
			getPostList(){//获取帖子列表
				if(this.parameter.cateId){
					this.params.oneCateId = this.parameter.cateId;
				}
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
								this.list.push(item);
								
							});
						}
					}
					
					console.log(this.list)
				})
			}
		},
		mounted() {
			this.getPostList()
			setTimeout(()=>{
				this.isCard =  true;
			},5000)
		},
		
	}
</script>

<style  scoped>
.new-line{
	line-height: 200rpx;
}
</style>>
   
