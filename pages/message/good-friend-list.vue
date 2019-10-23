<template name="discover">
	<view>
		<!-- 标题 -->
		<cu-custom bgColor="bg-gradual-white" isBack="true">
			<block slot="content">那些话</block>
		</cu-custom>

		<!-- 栏目 -->
		<scroll-view scroll-x class="bg-white nav new-solids-bottom" scroll-with-animation :scroll-left="scrollLeft" style="padding:0 20upx;">
			<view class="flex text-center ">
				<view class="cu-item flex-sub" v-for="(item,index) in cateList" :key="index" @tap="tabSelect" :data-id="index">
					<view :class="index==TabCur?'new-text-blue new-border':'new-text-black'">{{item}}</view>
				</view>
			</view>
		</scroll-view>

		<!-- 列表 -->
		<view style="padding:0 20upx;background:#ffffff;">
			<view class="cu-list"></view>
			<words-list v-show="showWordsList" :messageList="msgList[0].data.messageList" ></words-list>
			<voice-list v-show="showVoiceList"></voice-list>
			<follow-eachother-list v-show="showFEOList" :userList="msgList[2].data.userList" ></follow-eachother-list>
			<follow-list v-show="showFollowList" :userList="msgList[3].data.userList"></follow-list>
			<follow-me-list v-show="showFollowMeList" :userList="msgList[4].data.userList"></follow-me-list>


		</view>

		<view class="cu-tabbar-height"></view>

	</view>
</template>

<script>
	import messageList from '../../component/friendship/message-list.vue';
	import wordsList from '../../component/friendship/words-list.vue';
	import voiceList from '../../component/friendship/voice-list.vue';
	import followList from '../../component/friendship/follow-list.vue';
	import followMeList from '../../component/friendship/follow-me-list.vue';
	import followEachotherList from '../../component/friendship/follow-eachother-list.vue';
	import {
		discoverApi
	} from '../../component/api/discover.js';
	
	import {ImApi} from '@/component/api/im.js'
	
	export default {
		components: {
			wordsList,
			voiceList,
			followList,
			followEachotherList,
			followMeList,
			messageList
		},
		name: "goodfriendlist",
		computed: {
			showWordsList() {
				return this.TabCur == '0'
			},
			showVoiceList() {
				return this.TabCur == '1'
			},
			showFEOList() {
				return this.TabCur == '2'
			},
			showFollowList() {
				return this.TabCur == '3'
			},
			showFollowMeList() {
				return this.TabCur == '4'
			}
		},
		data() {
			return {
				isCard: true,
				TabCur: '0',
				scrollLeft: 0,
				src: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
				params: {
					"oneCateId": 1,
					"pageNum": 1,
					"pageSize": 5,
					"pullLast": false,
					"twoCateId": 1
				},
				cateList: ['文字匹配', '语音匹配', '相互关注', '我的关注', '关注我的'],
				list: [],
				PageCur: 'discover',
				modalName: null,
				listTouchStartX: 0,
				listTouchStartY: 0,
				msgList:[
					{
						name:'words-list',
						page:{
							pageNum:1,
							pageSize:5
						},
						data:{
							messageList:[
								
							]
						}
					},
					{
						name:'voice-list',
						page:{
							pageNum:1,
							pageSize:5
						},
						data:{
							
						}
					},
					{
						name:'followeachother-list',
						page:{
							pageNum:1,
							pageSize:8
						},
						data:{
							userList:[]
						}
					},
					{
						name:'follow-list',
						page:{
							pageNum:1,
							pageSize:8
						},
						data:{
							userList:[
								// {
								// 	userId:'user_1',
								// 	nickName:'小明1',
								// 	headImage:'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
								// },
								// {
								// 	userId:'user_2',
								// 	nickName:'小红1',
								// 	headImage:'https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg',
								// },
								// {
								// 	userId:'user_3',
								// 	nickName:'小丽1',
								// 	headImage:'https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg',
								// }
							]
						}
					},
					{
						name:'followme-list',
						page:{
							pageNum:1,
							pageSize:8
						},
						data:{
							userList:[
								
							]
							
						}
					},
				]
			}
		},
		onHide: function() {
			console.log('ssssssssss  onShow')
		},
		methods: {
			tabSelect(e) {
				console.log('tab select')
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				console.log("tabcur",this.TabCur)
				switch (this.TabCur) {
					case 0:
					case '0':
						console.log("文字匹配",this.msgList[0].name)
						ImApi.checkSyncTableAndCountUnreadMessages((res)=>{
							this.msgList[0].data = res.data.data
						},(res)=>{
							console.log("没有更多数据了")
						})
						break;
					case 1:
					case '1':
						console.log("语音匹配",this.msgList[1].name)
						break;
					case '2':
						console.log("相互关注",this.msgList[2].name)
						this.msgList[2].page.pageNum = 1
						ImApi.getFEOList(this.msgList[2].page,(res)=>{
							this.msgList[2].data.userList = res.data.data
						},(res)=>{
							console.log("没有更多数据了")
						})
						break;
					case '3':
						console.log("我的关注",this.msgList[3].name)
						this.msgList[3].page.pageNum = 1
						ImApi.getFollowList(this.msgList[3].page,(res)=>{
							this.msgList[3].data.userList = res.data.data
						},(res)=>{
							console.log("没有更多数据了")
						})
						break;
					case '4':
						console.log("我的粉丝",this.msgList[4].name)
						this.msgList[4].page.pageNum = 1
						ImApi.getFollowMeList(this.msgList[4].page,(res)=>{
							this.msgList[4].data.userList = res.data.data
						},(res)=>{
							console.log("没有更多数据了")
						})
						break;
					default:
						console.log("nothing")
						break;
				}


			},
			sendPosting() { //发帖子
				let data = {
					"content": "131313",
					"imagesJsonList": "115415641",
					"oneCate": 1,
					"title": "552",
					"twoCate": 1,
					"video": "2145454",
					"voice": "164134"
				}
				discoverApi.sendAPost(data, (res) => {
					console.log(res)
				})
			},
			openMsg() {

			},
			backStyle(src) {
				return {
					'background-image': 'url(' + src + ')'
				}
			},
			/*
			// ListTouch触摸开始
			ListTouchStart(e) {
				console.log("start",e.currentTarget.dataset.target)
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				console.log("end",e.currentTarget.dataset.target)
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
			*/

		},
		mounted() {
			console.log('jin来')
			//获得帖子的分类
			discoverApi.getCategory({}, (res) => {
				//this.cateList = res.data.data;
				//console.log("get Category:  ",this.cateList);
			})

			//获取帖子列表
			discoverApi.getPostList(this.params, (res) => {
				console.log("get tPostList:  ", res.data.data);
				this.list = [];
				if (res.data.data.list) {
					res.data.data.list.forEach((item, index) => {
						console.log(typeof(item.imagesJsonList));
						console.log(JSON.parse(item.imagesJsonList));
						item.imagesJsonList = JSON.parse(item.imagesJsonList);
						this.list.push(item);

					});
				}
				this.list = [];
				console.log(this.list)
			})


		},
		onReachBottom() {


			switch (this.TabCur) {


				case '0':
					console.log("文字匹配",this.msgList[0].name)
					break;
				case '1':
					console.log("语音匹配",this.msgList[1].name)
					break;
				case '2':
					console.log("相互关注",this.msgList[2].name)
					break;
				case '3':
					console.log("加载更多‘我的关注’的数据...")
					this.msgList[3].page.pageNum+=1
					ImApi.getFollowList(this.msgList[3].page,(res)=>{
						this.msgList[3].data.userList = this.msgList[3].data.userList.concat( res.data.data )
					},(res)=>{
						this.msgList[3].page.pageNum-=1
						console.log("没有更多数据了")
					})
					break;
				case '4':
					console.log("我的粉丝",this.msgList[4].name)
					break;
				default:
					console.log("nothing",this.msgList[5].name)
					break;
			}

		}
	}
</script>

<style scoped>
	.new-solids-bottom {
		position: relative;
		border-bottom: 1px solid #eee !important;
	}

	.new-size {
		font-size: 30upx !important;
	}

	.new-border {
		height: 90upx;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		border-bottom: 8upx solid #2ad0ea;
		border-radius: 3upx;
		-webkit-border-radius: 3upx;
	}

	/* .list-border{
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0upx;
    border-bottom:8upx solid #2ad0ea;
} */
</style>>
