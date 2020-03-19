<template>
	<view>
		<!-- 标题 -->
		<cu-custom bgColor="bg-person-newblue" :isBack="true">
			<block slot="content">消息</block>
		</cu-custom>
		<!-- <button @click="wstest">连接websocket</button>
		<button @click="sendMsgToUser2">发送消息给用户2</button> -->
		<view class="cu-list menu-avatar">
			<view class="cu-item" @click="openMsg">
				<view class="cu-avatar round lg" style="background-image:url(http://image.uczzd.cn/7338690865420014518.jpg?id=0&from=export);"></view>
				<view class="content">
					<view class="text-grey">新的开始</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="cuIcon-infofill text-red  margin-right-xs"></text>
							人生一世，折磨我们的不是贫穷，而是这样和那样的贪欲！
						</view> </view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cu-tag round bg-grey sm">5</view>
				</view>
			</view>
			<view class="cu-item" @click="openMsg">
				<view class="cu-avatar round lg" style="background-image:url(http://image.uczzd.cn/15206017539861396166.jpg?id=0&from=export);">
					<view class="cu-tag badge">99+</view>
				</view>
				<view class="content">
					<view class="text-grey">
						<view class="text-cut">秋天</view>
						<view class="cu-tag round bg-orange sm">勇士</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							与其说爱情是一种感情，倒不如说它是一种魔法，一种令人神魂颠倒的魔法。
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cuIcon-notice_forbid_fill text-gray"></view>
				</view>
			</view>
			<view class="cu-item" @click="openMsg">
				<view class="cu-avatar radius lg" style="background-image:url(http://image.uczzd.cn/10786026896486406429.jpg?id=0&from=export);"></view>
				<view class="content">
					<view class="text-pink"><view class="text-cut">冬天</view></view>
					<view class="text-gray text-sm flex"> <view class="text-cut">一个人，只有放低自己的姿态，才能拔高自己的人生。自以为是，不是本事；常思己过，才能少错。</view></view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cu-tag round bg-red sm">5</view>
				</view>
			</view>
			<view class="cu-item grayscale" @click="openMsg">
				<view class="cu-avatar radius lg" style="background-image:url(http://image.uczzd.cn/7775233441626866136.jpg?id=0&from=export);"></view>
				<view class="content">
					<view><view class="text-cut">春天</view>
						<view class="cu-tag round bg-orange sm">断开连接...</view>
					</view>
					<view class="text-gray text-sm flex"> <view class="text-cut"> 人活在这个世界上，最终要学会的，还是和自己相处的能力。</view></view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cu-tag round bg-red sm">5</view>
				</view>
			</view>
			<view class="cu-item cur" @click="openMsg">
				<view class="cu-avatar radius lg" style="background-image:url(http://image.uczzd.cn/4436671288977152410.jpg?id=0&from=export);">
					<view class="cu-tag badge"></view>
				</view>
				<view class="content">
					<view>
						<view class="text-cut">夏天</view>
						<view class="cu-tag round bg-orange sm">6人</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut"> 无论生活怎样，都不要忘记微笑。<text class="cuIcon-locationfill text-orange margin-right-xs"></text>愿你成为自己的太阳，无须凭借谁的光。</view></view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cuIcon-notice_forbid_fill text-gray"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				socketOpen:false,
			}
		},
		methods: {
			openMsg(){
				uni.navigateTo({
				    url: '../message/chat'
				});
			},
			wstest(){
				let _this  = this
				uni.connectSocket({
				    url: 'ws://localhost:8080/api/v1/ws/im/imWebSocketHandler?token=eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNoki0EKwyAQAP-yZ4Xd1SbGe26FQkrPwbUG7KUSDRRK_15Lb8MM84Z6CHgoqaUdFBw17Wu-g2cFNT5L6m25nOf1dp2X3tOrgKfTSOzQklWQQ_sLmiz-xKPl_jC6EAcXtInGaMudHJlNb8I4oYyCg8DnCwAA__8.ecbeK_vpmbsRvX7_q-SfaSi6kfZCtqSyfmiGzTyDKbk',
				   
				});
				uni.onSocketOpen(function (res) {
				  console.log('WebSocket连接已打开！');
				  _this.socketOpen = true
				});
				uni.onSocketMessage(function (res) {
				  console.log('收到服务器内容：' + res.data);
				});
			},
			sendMsgToUser2(){
				let msg = {
					toId: 2,
					contentType: "text",
					message: "通过ws的发送的消息"
				}
				 if (this.socketOpen) {
				    uni.sendSocketMessage({
				      data: JSON.stringify(msg)
				    });
				}else{
					console.log("未连接ws")
				}
			}
			
		}
	}
</script>

<style>

</style>
