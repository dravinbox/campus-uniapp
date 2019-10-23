<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block> <block slot="content" >聊天{{timelineId}}</block>
			<view slot="right" class="new-backText">关注</view>
		</cu-custom>
		
		
		<view class="cu-chat">
			
			<!-- 历史聊天记录 -->
			<view class="cu-item " 
				v-for="(item,index) in timeline"
				:key="index"
				:class="item.timelineMessage.fields.sender.value.value==userId?'':'self'" 
			>
				<view v-if="item.timelineMessage.fields.sender.value.value==userId" class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="main">
					<!-- 文字 -->
					<view v-if="item.timelineMessage.fields.content_type.value.value=='text'" class="content shadow" :class="item.timelineMessage.fields.sender.value.value==userId?'':'bg-my-blue'" >
						<text>{{item.timelineMessage.fields.message.value.value}}</text>
					</view>
					<!-- 图片 -->
					<image v-if="item.timelineMessage.fields.content_type.value.value=='image'" :src="item.timelineMessage.fields.message.value.value" class="radius" mode="widthFix"></image>
					<!-- 语音 -->
					<view v-if="item.timelineMessage.fields.content_type.value.value=='voice'" class="flex justify-end align-center">
						<view class="action text-bold text-grey" v-if="item.timelineMessage.fields.sender.value.value!=userId">
							3"
						</view>	
						
						<view class="content shadow" v-if="audioPaused==index" :class="item.timelineMessage.fields.sender.value.value==userId?'':'bg-my-blue'" @tap='audioStop(index)'>
							<text class="cuIcon-stop text-xxl padding-right-xl" :class="item.timelineMessage.fields.sender.value.value==userId?'text-black':'text-white'"> </text>
						</view>
						<view class="content shadow" v-else :class="item.timelineMessage.fields.sender.value.value==userId?'':'bg-my-blue'" @tap='audioStart(item.timelineMessage.fields.message.value.value,index)'>
							<text class="cuIcon-sound text-xxl padding-right-xl" :class="item.timelineMessage.fields.sender.value.value==userId?'text-black':'text-white'"> </text>
						</view>
						
						<view class="action text-bold text-grey" v-if="item.timelineMessage.fields.sender.value.value==userId">
							3"
						</view>	
					</view>
					
					
				</view>
				<view v-if="item.timelineMessage.fields.sender.value.value!=userId" class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<!-- <view class="date">{{item.timelineMessage.fields.send_time.value.value|formatTime}}</view> -->
				
			</view>
			
			<!-- 实时聊天记录 -->
			<view class="cu-item "
				v-for="(item,index) in wsMsg"
				:key="item.time"
				:class="item.toId!=userId?'':'self'" 
			>
				<view v-if="item.toId!=userId" class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="main">
					<!-- 文字 -->
					<view v-if="item.contentType=='text'" class="content shadow" :class="item.toId!=userId?'':'bg-my-blue'" >
						<text>{{item.message}}</text>
					</view>
					<!-- 图片 -->
					<image v-if="item.contentType=='image'" :src="item.message" class="radius" mode="widthFix"></image>
					<!-- 语音 -->
					<view v-if="item.contentType=='voice'" class="flex justify-end align-center">
						<view class="action text-bold text-grey" v-if="item.toId==userId">
							3"
						</view>	
						
						<view class="content shadow" v-if="audioPaused==index" :class="item.toId!=userId?'':'bg-my-blue'" @tap='audioStop(index)'>
							<text class="cuIcon-stop text-xxl padding-right-xl" :class="item.toId!=userId?'text-black':'text-white'"> </text>
						</view>
						<view class="content shadow" v-else :class="item.toId!=userId?'':'bg-my-blue'" @tap='audioStart(item.message)'>
							<text class="cuIcon-sound text-xxl padding-right-xl" :class="item.toId!=userId?'text-black':'text-white'"> </text>
						</view>
						
						<view class="action text-bold text-grey" v-if="item.toId!=userId">
							3"
						</view>	
					</view>
					
					
				</view>
				<view v-if="item.toId==userId" class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<!-- <view class="date">{{item.timelineMessage.fields.send_time.value.value|formatTime}}</view> -->
				
			</view>
			
			<!-- <view class="cu-info round">对方撤回一条消息!</view> -->
			
			<!-- 自己的文字 -->
			<!-- <view class="cu-item self">
				<view class="main">
					<view class="content bg-green shadow">
						<text>喵喵喵！喵喵喵！喵喵喵！喵喵！喵喵！！喵！喵喵喵！</text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">2018年3月23日 13:23</view>
			</view> -->
			
			
			
			<!-- 对方的文字 -->
			<!-- <view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						<text>喵喵喵！喵喵喵！</text>
					</view>
				</view>
				<view class="date "> 13:23</view>
			</view>
			 -->
			
			
			<!-- 自己的图片 -->
			<!-- <view class="cu-item self">
				<view class="main">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius" mode="widthFix"></image>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date"> 13:23</view>
			</view> -->
			
			<!-- 自己的语音 -->
			<!-- <view class="cu-item self">
				<view class="main">
					
						<view class="action text-bold text-grey">
							3"
						</view>
						<view class="content shadow">
							<text class="cuIcon-sound text-xxl padding-right-xl"> </text>
						</view>
					
					
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view>
			 -->


			<!-- <view class="cu-info round">对方撤回一条消息!</view> -->

			<!-- <view class="cu-info"><text class="cuIcon-roundclosefill text-red "></text> 对方拒绝了你的消息</view> -->
			
			<!-- <view class="cu-info">
				对方开启了好友验证，你还不是他(她)的好友。请先发送好友验证请求，对方验证通过后，才能聊天。
				<text class="text-blue">发送好友验证</text>
			</view> -->
			
			
			<!-- 定位 -->
			<!-- <view class="cu-item self">
				<view class="main">
					<view class="action">
						<text class="cuIcon-locationfill text-orange text-xxl"></text>
					</view>
					<view class="content shadow">
						喵星球，喵喵市
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view> -->
			
			<!-- 后面的提示语 -->
			<!-- <view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						@#$^&**
					</view>
					<view class="action text-grey">
						<text class="cuIcon-warnfill text-red text-xxl"></text> <text class="text-sm margin-left-sm">翻译错误</text>
					</view>
				</view>
				<view class="date">13:23</view>
			</view> -->
			
			
		</view>

		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
			 @focus="InputFocus" @blur="InputBlur" v-model="inputMessage"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<view class="action" v-if="inputMessage==''">
				<text class="cuIcon-roundadd text-grey"></text>
			</view>
			<button class="cu-btn round bg-green shadow" v-else @tap="sendMessage">发送</button>
		</view>

	</view>
</template>

<script>
	import {ImApi} from '@/component/api/im.js'
	export default {
		computed:{
			// reverseTimeline(){
			// 	return this.timeline.reverse()
				
			// }
		},
		data() {
			return {
				InputBottom: 0,
				userId:null,
				audioPaused:null,
				inputMessage:'',
				timelineId:null,
				isSocketOpen:false,
				socketMsgQueue:[],//发送缓存区
				wsMsg:[
					{"message":"111","contentType":"text","toId":"user_2","time":1571806730975},
					{"message":"111","contentType":"text","toId":"user_1","time":1571806730976},
					{"message":"222","contentType":"text","toId":"user_2","time":1571806730977},
				],
				
				cacheMsg:[],//缓存最新消息，方向：旧-》新 遗弃
				//展示的数据 旧-》新
				timeline:[
					{
					      "timelineId": "user_1:user_2",
					      "sequenceId": 1571704151352000,
					      "timelineMessage": {
					        "fields": {
					          "send_time": {
					            "name": "send_time",
					            "value": {
					              "value": 1571704175860,
					              "type": "INTEGER",
					              "dataSize": 8
					            },
					            "timestamp": 1571704151352,
					            "dataSize": 25,
					            "nameRawData": "c2VuZF90aW1l"
					          },
					          "content_type": {
					            "name": "content_type",
					            "value": {
					              "value": "text",
					              "type": "STRING",
					              "dataSize": 4
					            },
					            "timestamp": 1571704151352,
					            "dataSize": 24,
					            "nameRawData": "Y29udGVudF90eXBl"
					          },
					          "sender": {
					            "name": "sender",
					            "value": {
					              "value": "user_1",
					              "type": "STRING",
					              "dataSize": 6
					            },
					            "timestamp": 1571704151352,
					            "dataSize": 20,
					            "nameRawData": "c2VuZGVy"
					          },
					          "message": {
					            "name": "message",
					            "value": {
					              "value": "您好peter",
					              "type": "STRING",
					              "dataSize": 11
					            },
					            "timestamp": 1571704151352,
					            "dataSize": 26,
					            "nameRawData": "bWVzc2FnZQ=="
					          },
					          "type": {
					            "name": "type",
					            "value": {
					              "value": "SINGLE",
					              "type": "STRING",
					              "dataSize": 6
					            },
					            "timestamp": 1571704151352,
					            "dataSize": 18,
					            "nameRawData": "dHlwZQ=="
					          },
					          "conversation": {
					            "name": "conversation",
					            "value": {
					              "value": "user_1",
					              "type": "STRING",
					              "dataSize": 6
					            },
					            "timestamp": 1571704151352,
					            "dataSize": 26,
					            "nameRawData": "Y29udmVyc2F0aW9u"
					          }
					        }
					      }
					    },
					    {
					      "timelineId": "user_1:user_2",
					      "sequenceId": 1571623737336000,
					      "timelineMessage": {
					        "fields": {
					          "send_time": {
					            "name": "send_time",
					            "value": {
					              "value": 1571623757703,
					              "type": "INTEGER",
					              "dataSize": 8
					            },
					            "timestamp": 1571623737336,
					            "dataSize": 25,
					            "nameRawData": "c2VuZF90aW1l"
					          },
					          "content_type": {
					            "name": "content_type",
					            "value": {
					              "value": "image",
					              "type": "STRING",
					              "dataSize": 4
					            },
					            "timestamp": 1571623737336,
					            "dataSize": 24,
					            "nameRawData": "Y29udGVudF90eXBl"
					          },
					          "sender": {
					            "name": "sender",
					            "value": {
					              "value": "user_2",
					              "type": "STRING",
					              "dataSize": 6
					            },
					            "timestamp": 1571623737336,
					            "dataSize": 20,
					            "nameRawData": "c2VuZGVy"
					          },
					          "message": {
					            "name": "message",
					            "value": {
					              "value": "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
					              "type": "STRING",
					              "dataSize": 7
					            },
					            "timestamp": 1571623737336,
					            "dataSize": 22,
					            "nameRawData": "bWVzc2FnZQ=="
					          },
					          "type": {
					            "name": "type",
					            "value": {
					              "value": "SINGLE",
					              "type": "STRING",
					              "dataSize": 6
					            },
					            "timestamp": 1571623737336,
					            "dataSize": 18,
					            "nameRawData": "dHlwZQ=="
					          },
					          "conversation": {
					            "name": "conversation",
					            "value": {
					              "value": "user_2",
					              "type": "STRING",
					              "dataSize": 6
					            },
					            "timestamp": 1571623737336,
					            "dataSize": 26,
					            "nameRawData": "Y29udmVyc2F0aW9u"
					          }
					        }
					      }
					    },
					    {
					      "timelineId": "user_1:user_2",
					      "sequenceId": 1571623731919000,
					      "timelineMessage": {
					        "fields": {
					          "send_time": {
					            "name": "send_time",
					            "value": {
					              "value": 1571623752283,
					              "type": "INTEGER",
					              "dataSize": 8
					            },
					            "timestamp": 1571623731919,
					            "dataSize": 25,
					            "nameRawData": "c2VuZF90aW1l"
					          },
					          "content_type": {
					            "name": "content_type",
					            "value": {
					              "value": "text",
					              "type": "STRING",
					              "dataSize": 4
					            },
					            "timestamp": 1571623731919,
					            "dataSize": 24,
					            "nameRawData": "Y29udGVudF90eXBl"
					          },
					          "sender": {
					            "name": "sender",
					            "value": {
					              "value": "user_2",
					              "type": "STRING",
					              "dataSize": 6
					            },
					            "timestamp": 1571623731919,
					            "dataSize": 20,
					            "nameRawData": "c2VuZGVy"
					          },
					          "message": {
					            "name": "message",
					            "value": {
					              "value": "您好2",
					              "type": "STRING",
					              "dataSize": 7
					            },
					            "timestamp": 1571623731919,
					            "dataSize": 22,
					            "nameRawData": "bWVzc2FnZQ=="
					          },
					          "type": {
					            "name": "type",
					            "value": {
					              "value": "SINGLE",
					              "type": "STRING",
					              "dataSize": 6
					            },
					            "timestamp": 1571623731919,
					            "dataSize": 18,
					            "nameRawData": "dHlwZQ=="
					          },
					          "conversation": {
					            "name": "conversation",
					            "value": {
					              "value": "user_2",
					              "type": "STRING",
					              "dataSize": 6
					            },
					            "timestamp": 1571623731919,
					            "dataSize": 26,
					            "nameRawData": "Y29udmVyc2F0aW9u"
					          }
					        }
					      }
					    },
					    {
					      "timelineId": "user_1:user_2",
					      "sequenceId": 1571623727638000,
					      "timelineMessage": {
					        "fields": {
					          "send_time": {
					            "name": "send_time",
					            "value": {
					              "value": 1571623747948,
					              "type": "INTEGER",
					              "dataSize": 8
					            },
					            "timestamp": 1571623727638,
					            "dataSize": 25,
					            "nameRawData": "c2VuZF90aW1l"
					          },
					          "content_type": {
					            "name": "content_type",
					            "value": {
					              "value": "voice",
					              "type": "STRING",
					              "dataSize": 4
					            },
					            "timestamp": 1571623727638,
					            "dataSize": 24,
					            "nameRawData": "Y29udGVudF90eXBl"
					          },
					          "sender": {
					            "name": "sender",
					            "value": {
					              "value": "user_1",
					              "type": "STRING",
					              "dataSize": 6
					            },
					            "timestamp": 1571623727638,
					            "dataSize": 20,
					            "nameRawData": "c2VuZGVy"
					          },
					          "message": {
					            "name": "message",
					            "value": {
					              "value": "https://toss.paycore.cc/ts/voice/1566290016520.mp3",
					              "type": "STRING",
					              "dataSize": 6
					            },
					            "timestamp": 1571623727638,
					            "dataSize": 21,
					            "nameRawData": "bWVzc2FnZQ=="
					          },
					          "type": {
					            "name": "type",
					            "value": {
					              "value": "SINGLE",
					              "type": "STRING",
					              "dataSize": 6
					            },
					            "timestamp": 1571623727638,
					            "dataSize": 18,
					            "nameRawData": "dHlwZQ=="
					          },
					          "conversation": {
					            "name": "conversation",
					            "value": {
					              "value": "user_2",
					              "type": "STRING",
					              "dataSize": 6
					            },
					            "timestamp": 1571623727638,
					            "dataSize": 26,
					            "nameRawData": "Y29udmVyc2F0aW9u"
					          }
					        }
					      }
					    }
				],
				};
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
				 oldDate = new Date(oldTime)
				//#endif
					
				let nowDate = new Date();
				let y = oldDate.getFullYear();
				let m = oldDate.getMonth() + 1 < 10 ? '0' + (oldDate.getMonth() + 1) : oldDate.getMonth() + 1; // 获取当前月份的日期，不足10补0
				let d = oldDate.getDate() < 10 ? '0' + oldDate.getDate() : oldDate.getDate(); // 获取当前几号，不足10补0
				let h =  oldDate.getHours() < 10 ? '0' + oldDate.getHours() : oldDate.getHours(); // 获取当前几点，不足10补0
				let minute =  oldDate.getMinutes() < 10 ? '0' + oldDate.getMinutes() : oldDate.getMinutes(); // 获取当前几分，不足10补0
				
				let time_word = '凌晨'
				if(oldDate.getHours()>=0 && oldDate.getHours()<6){
					time_word = '凌晨'
				}else if(oldDate.getHours()>=6 && oldDate.getHours()<12){
					time_word = '早上'
				}else if(oldDate.getHours()>=12 && oldDate.getHours()<18 ){
					time_word = '下午'
				}else if(oldDate.getHours()>=18 && oldDate.getHours()<24 ){
					time_word = '晚上'
				}
					
				let dt =nowDate.getTime()-date
				if(dt < 86400000){
					// 今天之内
					if(dt < 10800000){
						//3小时内不显示时间
						return '';
					}
					return time_word+h+':'+minute;
				}else if(dt >86400000 && dt <=172800000){
					//昨天之内
					return "昨天 "+time_word+h+":"+minute
				}else{
					//比昨天更前的时间
					return m+'月'+d+'日'+' '+time_word+h+':'+minute;
				}
				
				// return y + '-' + m + '-' + d +'  '+h+':'+minute;
				// return h+':'+minute;
				
			},
		},
		onLoad(option) {
		    if(option.userId){
				//开场加载前30条数据
				this.userId = option.userId
				ImApi.showConversationMessages({
					userId:this.userId,
					lastSequenceId:0
				},(res)=>{
					console.log("获取服务器聊天信息成功",res)
					this.timelineId = res.data.data.timelineId
					this.timeline = res.data.data.list.reverse()
				},(res)=>{
					console.log("获取服务器聊天信息失败",res)
				})
				
				
				let _this = this
				if(!_this.isSocketOpen){
					//如果还没有连接socket,进行连接
					try {
						let token = uni.getStorageSync('token');	
						if(token){
							uni.connectSocket({
							  url: 'ws://127.0.0.1:8080/api/v1/ws/im/imWebSocketHandler?token='+token
							});
						}		
					} catch (e) {
						// error
					}
				}
				uni.onSocketOpen(function (res) {
				  console.log('WebSocket连接已打开！');
					_this.isSocketOpen = true;
				    for (var i = 0; i < _this.socketMsgQueue.length; i++) {
				      _this.sendMessage(_this.socketMsgQueue[i]);
				    }
				    _this.socketMsgQueue = [];
				});
				uni.onSocketMessage(function (res) {
				  // console.log('收到服务器内容：' , res);
				  let d = JSON.parse(res.data)
				  if(d.code==200){
					  _this.wsMsg.push(d.data)
				  }else{
					  console.log('无效ws消息',res)
				  }
				  
				  
				});
				
				uni.onSocketError(function (res) {
				  console.log('WebSocket连接打开失败，请检查！');
				});
				
				/*
				ImApi.showConversationMessages({
					userId:this.userId,
					lastSequenceId:0
				},(res)=>{
					console.log("获取服务器聊天信息成功",res)
					this.timelineId = res.data.data.timelineId
					let msgList = res.data.data.list
					try {
						
					    let oldList = uni.getStorageSync(this.timelineId+'');
						
					    if (oldList) {
							console.log("原来有数据，来判断追加数据")
							this.timeline = oldList.reverse()
							this.storeMsg(this.timelineId,msgList,oldList)
						}else{
							console.log("原来没有数据，来保存数据了")
							uni.setStorage({
							    key: this.timelineId,
							    data: msgList,
							    success: function () {
							        console.log('初次保存数据成功..');
							    },
								fail:function(e){
									console.log('初次保存数据失败..',e);
								}
							});
							this.timeline = msgList.reverse()
						}
					}catch (e) {

						console.log("获取本地存储聊天数据失败：",e);
					
					}
					
				},(res)=>{
					console.log("获取服务器聊天信息失败",res)
				})
				*/
			
				
				
		    }
			
		},
		
		methods: {
			//保存数据到持久层
			storeMsg(timelineId,msgList,oldList){
				
				
				        console.log("获取原来存储的聊天数据：",oldList);
						console.log("开始比对聊天数据")
						//如果新的记录比存储的记录都新，缓存这些数据，请求下一段数据，直到有一段其中某一条数据是等于或旧于存储的数据，才执行持久化
						//获取最新消息的最旧一条消息
						let msgListOldMsg = msgList[msgList.length-1]
						//存储的最新的一条消息
						let oldListNewMsg = oldList[0]
						if(msgListOldMsg.sequenceId>oldListNewMsg.sequenceId){
							//获取最新消息的最旧一条消息 还比 存储的最新的一条消息 更新
							//缓存这段最新消息
							this.cacheMsg = msgList.reverse().concat(this.cacheMsg)
							console.log("虽然这次并没有持久化，但是打印一下缓存吧",this.cacheMsg)
							//请求更多次新消息，再比较
							console.log("这段数据，在存储中完全找不到，要继续拿次新的消息")
							ImApi.showConversationMessages({
								userId:this.userId,
								lastSequenceId:msgListOldMsg.sequenceId
							},(res)=>{
								console.log("继续获取次新的信息成功",res)
								//开始递归
								this.storeMsg(timelineId,res.data.data.list,oldList)
								
							},(res)=>{
								console.log("获取服务器聊天信息失败",res)
							})
							 //todo
						}else{
							//执行持久化
							let msgListNewMsg = msgList[0]
							if(msgListNewMsg.sequenceId <= oldListNewMsg.sequenceId){
								//持久层已经完全包含获取的数据
								console.log("这段数据，完全在存储中了")
							}else{
								console.log("这段数据，有部分消息不在存储中，找出来把它们持久化")
								let c=0;
								//找出部分消息不存在于持久层的，再追加到缓存，最后才持久化
								for (var i = 0; i < msgList.length; i++) {
									if(msgList[i].sequenceId<=oldListNewMsg.sequenceId){
										c=i;
										break;
									}
								}
								let arr = msgList.slice(0,c)
								//追加到缓存
								this.cacheMsg = arr.reverse().concat(this.cacheMsg)
								console.log("准备要持久化，打印一下缓存吧",this.cacheMsg)
								let newList = this.cacheMsg.reverse().concat(oldList);
								this.timeline = newList.reverse()
								//执行持久化
								uni.setStorage({
								    key: timelineId,
								    data: newList,
								    success: function () {
								        console.log('添加数据成功..');
										//清空缓存
										this.cacheMsg = []
								    },
									fail:function(e){
										console.log('添加数据失败..',e);
									}
								});
								
							}
						}
				
				
				// uni.setStorage({
				//     key: 'msg',
				//     data: lastestMsg.reverse(),
				//     success: function () {
				//         console.log('保存数据成功..');
				//     }
				// });
				//循环插入
				// for (let m in lastestMsg) {
					
				// }
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			sendMessage(){
				console.log(this.inputMessage)
			
				
				let t = new Date().getTime();
				
				let data={
					  time: t,
				      message: this.inputMessage,
					  contentType: 'text',
					  toId: this.userId
				    }
				
				//本地缓存
				this.wsMsg.push(data)
				
				// return 
				//发送给服务器
				let wsData = JSON.stringify(data)
				 if (this.isSocketOpen) {
				    uni.sendSocketMessage({
						data:wsData
					});
				  } else {
				    this.socketMsgQueue.push(wsData);
				  }
				  //清空输入框
				  this.inputMessage=''
			},
			videoPlay(index,newIndex){
				//console.log('之前', document.body.scrollHeight)
				if(index==0){
					console.log('新的开始')
					if(this.recordVideoIndex!=null &&newIndex != this.recordVideoIndex){
						let num  = this.recordVideoIndex;
						console.log(this.recordVideoIndex)
						this.itemList[this.recordVideoIndex].videoPaused=false;
						console.log('关闭之前的',this.itemList[this.recordVideoIndex].videoPaused)
						//console.log('之前', document.body.scrollHeight)
						setTimeout(()=>{
							  this.itemList[num].videoPaused=true;
							// console.log('之后', document.body.scrollHeight)//
						},200)
						
					}else{
						console.log('false',this.recordVideoIndex)
					}
					this.recordVideoIndex = newIndex;
				}else{
					this.videoContext = null;
					console.log('暂停')
				}
				
			},
			audioStop(){//音频的开始播放
				try {
					this.innerAudioContext.stop();
					this.innerAudioContext.destroy()
					console.log('停止');
					this.innerAudioContext.onStop(() => {
						console.log('音频停止');
					});
					this.audioPaused = null;
					this.innerAudioContext.onError((res) => {
						console.log(res.errMsg);
						console.log(res.errCode);
					});
				} catch (error) {
					this.audioPaused = null;
				}
			},
			audioStart(voiceSrc,index){//音频的开始播放
				
				try {
					this.audioStop()
					this.innerAudioContext.destroy()
				} catch (error) {
					this.innerAudioContext = null;
				}
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.autoplay = true;
				this.innerAudioContext.src = voiceSrc;
				console.log(voiceSrc);
				this.audioPaused = index;
				this.innerAudioContext.onPlay(() => {
					console.log('开始播放');
					console.log(this.innerAudioContext.duration,this.innerAudioContext)
					this.duration = Math.round(this.innerAudioContext.duration)
				});
				//console.log(JSON.stringify(this.innerAudioContext))
				// this.innerAudioContext.onTimeUpdate(() =>{//音频播放进度更新事件
				// 	console.log(this.innerAudioContext.currentTime)
				// })
				this.innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
					this.audioPaused = null;
				});
				this.innerAudioContext.onEnded(() => {
					console.log('音频结束');
					this.audioPaused = null;
					this.innerAudioContext.destroy()
				});
				
			},
		}
	}
</script>

<style>
page{
  padding-bottom: 100upx;
}
.new-backText{
	margin-right: 20rpx;
	width: 110rpx;
    height: 50rpx;
    line-height: 50rpx;
    font-size: 24rpx;
    text-align: center;
    background: #2ad0ea;
    color: #ffffff;
    border: 1px solid #1ccce8;
    border-radius: 50rpx;
	-webkit-border-radius: 50rpx; 
}
</style>
