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
			<words-list v-show="showWordsList" :messageList="msgList[1].data.messageList" messageType="0" ></words-list>
			<words-list v-show="showVoiceList" :messageList="msgList[2].data.messageList" messageType="1" ></words-list>
			<words-list v-show="showFEOList" :messageList="msgList[0].data.messageList" messageType="2"></words-list>
			<!-- <voice-list v-show="showVoiceList"></voice-list>
			<follow-eachother-list v-show="showFEOList" :userList="msgList[2].data.userList" ></follow-eachother-list>
			
 -->
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
								
							],
							newMessageAgg:{
								
							}
							
						}
					},
					{
						name:'voice-list',
						page:{
							pageNum:1,
							pageSize:5
						},
						data:{
							messageList:[
								
							],
							newMessageAgg:{
								
							},
						}
					},
					{
						name:'followeachother-list',
						page:{
							pageNum:1,
							pageSize:8
						},
						data:{
							messageList:[
								
							],
							newMessageAgg:{
								
							},
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
						ImApi.checkSyncTableAndCountUnreadMessages(1,(res)=>{
							console.log("获取文字匹配的聊天信息成功",res)
							this.checkCache(1,res.data.data)
						},(res)=>{
							console.log("没有更多数据了")
						})
						
						break;
					case 1:
					case '1':
						console.log("语音匹配",this.msgList[1].name)
						ImApi.checkSyncTableAndCountUnreadMessages(2,(res)=>{
							console.log("获取语音匹配的聊天信息成功",res)
							this.checkCache(2,res.data.data)
						},(res)=>{
							console.log("没有更多数据了")
						})
						break;
					case '2':
						console.log("相互关注",this.msgList[2].name)
						ImApi.checkSyncTableAndCountUnreadMessages(0,(res)=>{
							console.log("获取相互关注的聊天信息成功",res)
							this.checkCache(0,res.data.data)
						},(res)=>{
							console.log("没有更多数据了")
						})
						// ImApi.checkSyncTableAndCountUnreadMessages(0,(res)=>{
						// 	console.log("获取语音匹配的聊天信息成功",res)
						// 	this.msgList[0].data = res.data.data
						// },(res)=>{
						// 	console.log("没有更多数据了")
						// })
						
						
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
			getNotInCount(newarr,oldarr){
				console.log("开始对比两个数组",newarr,oldarr)
				
				let count =0;
				for (var i = 0; i < newarr.length; i++) {
					let index = oldarr.indexOf(newarr[i]);
					if(index<0){
						count++
					}
				}
				return count
			},
			
			checkCache(type,data){
				let _this = this
				try {
					let urc = uni.getStorageSync('unReadCount');
					if(urc){
						
						if(urc[type].data.syncCheckpoint != data.syncCheckpoint){
							console.log("有新的消息来了")
							let flag = false
							//BEGIN 遍历新来的所有消息
							for (let d in data.newMessageAgg) {
								console.log('开始对比用户:',d)
								console.log(urc[type].data.newMessageAgg)
								
								if(urc[type].data.newMessageAgg[d]){
									console.log('原来的缓存中有这个用户:',d)
									//获取有多少条新的数量
									let c = _this.getNotInCount(data.newMessageAgg[d].messages_time,urc[type].data.newMessageAgg[d].messages_time)
									console.log("获取新消息数量:",c)
									if(c>0){
										//追加到缓存中 count message lasttime
										console.log("长度：",urc[type].data.messageList.length)
										for (let j = 0; j < urc[type].data.messageList.length; j++) {
											console.log("第几次便利",j,urc[type].data.messageList[j].userId,d)
											if(urc[type].data.messageList[j].userId == d){
												console.log("开始准备一下更新数据")
												urc[type].data.messageList[j].unRead+=c
												urc[type].data.messageList[j].latestMessage=data.newMessageAgg[d].latestMessage
												urc[type].data.messageList[j].latestTime=data.newMessageAgg[d].latestTime
												
												urc[type].data.newMessageAgg[d].messages_time = data.newMessageAgg[d].messages_time
												flag = true
												break;
											}
											
										}
									}
									
									
								}else{
									//这是新用户的信息 todo
									console.log('原来的缓存中没有这个用户:',d)
									urc[type].data.newMessageAgg[d] = data.newMessageAgg[d]
									for (let j = 0; j < data.messageList.length; j++) {
										if(data.messageList[j].userId == d){
											urc[type].data.messageList.push(data.messageList[j])
											flag = true
											break;
										}
									
									}
								}
								// for (let u in urc[type].data.newMessageAgg) {
									
								// }
							}
							//END 遍历新来的所有消息
							
							if(flag){
								// 修改 syncCheckpoint
								urc[type].data.syncCheckpoint = data.syncCheckpoint
								try{
									console.log("由于新的消息来了，更新缓存")
									uni.setStorageSync('unReadCount',urc)
									_this.msgList[type].data.messageList = urc[type].data.messageList
								}catch(e){
									//TODO handle the exception
								}
							}
						
						}else{
							console.log("还没有新的消息来，不用动缓存")

						}
					}else{
						console.log("还没有存储,第一次保存2")
						_this.msgList[type].data = data
						try {
							uni.setStorageSync('unReadCount',_this.msgList);
							
						} catch (e) {
							// error
						}
					}
					
				} catch (e) {
					// error
				}
				
			},

		},
		onLoad() {
			try {
				let ml = uni.getStorageSync('unReadCount');
				if(ml){
					this.msgList = ml
					//拉取对比
					ImApi.checkSyncTableAndCountUnreadMessages(1,(res)=>{
						console.log("获取文字匹配的聊天信息成功",res)
						this.checkCache(1,res.data.data)
					},(res)=>{
						console.log("没有更多数据了")
					})
					
				}else{
					//拉取填充
					ImApi.checkSyncTableAndCountUnreadMessages(1,(res)=>{
						console.log("获取文字匹配的聊天信息成功",res)
						this.msgList[1].data = res.data.data
						console.log("还没有存储,第一次保存")
						try {
							uni.setStorageSync('unReadCount',this.msgList);
							
						} catch (e) {
							// error
						}
						
					},(res)=>{
						console.log("没有更多数据了")
					})
				}
				
			} catch (e) {
				// error
			}
		},
		mounted() {
			
			


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
