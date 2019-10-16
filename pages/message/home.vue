<template>
	<view>
		<!-- 标题 -->
		<cu-custom bgColor="bg-gradual-pink" >
			<block slot="content">消息</block>
		</cu-custom>
		<button @click="wstest">连接websocket</button>
		<button @click="sendMsgToUser2">发送消息给用户2</button>
		<view class="cu-list menu-avatar">
			<view class="cu-item" @click="openMsg">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
				<view class="content">
					<view class="text-grey">凯尔</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="cuIcon-infofill text-red  margin-right-xs"></text>
							我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。
						</view> </view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cu-tag round bg-grey sm">5</view>
				</view>
			</view>
			<view class="cu-item" @click="openMsg">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Taric.png);">
					<view class="cu-tag badge">99+</view>
				</view>
				<view class="content">
					<view class="text-grey">
						<view class="text-cut">瓦洛兰之盾-塔里克</view>
						<view class="cu-tag round bg-orange sm">战士</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							塔里克是保护者星灵，用超乎寻常的力量守护着符文之地的生命、仁爱以及万物之美。塔里克由于渎职而被放逐，离开了祖国德玛西亚，前去攀登巨神峰寻找救赎，但他找到的却是来自星界的更高层的召唤。现在的塔里克与古代巨神族的神力相融合，以瓦洛兰之盾的身份，永不疲倦地警惕着阴险狡诈的虚空腐化之力。
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cuIcon-notice_forbid_fill text-gray"></view>
				</view>
			</view>
			<view class="cu-item" @click="openMsg">
				<view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
				<view class="content">
					<view class="text-pink"><view class="text-cut">莫甘娜</view></view>
					<view class="text-gray text-sm flex"> <view class="text-cut">凯尔，你被自己的光芒变的盲目！</view></view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cu-tag round bg-red sm">5</view>
				</view>
			</view>
			<view class="cu-item grayscale" @click="openMsg">
				<view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81007.jpg);"></view>
				<view class="content">
					<view><view class="text-cut">伊泽瑞尔</view>
						<view class="cu-tag round bg-orange sm">断开连接...</view>
					</view>
					<view class="text-gray text-sm flex"> <view class="text-cut"> 等我回来一个打十个</view></view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cu-tag round bg-red sm">5</view>
				</view>
			</view>
			<view class="cu-item cur" @click="openMsg">
				<view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg);">
					<view class="cu-tag badge"></view>
				</view>
				<view class="content">
					<view>
						<view class="text-cut">瓦罗兰大陆-睡衣守护者-新手保护营</view>
						<view class="cu-tag round bg-orange sm">6人</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut"> 伊泽瑞尔：<text class="cuIcon-locationfill text-orange margin-right-xs"></text> 传送中...</view></view>
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
