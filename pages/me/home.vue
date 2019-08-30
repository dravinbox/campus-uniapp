<template name="me">
	<view>
		<!-- 标题 -->
		<cu-custom bgColor="bg-gradual-white" >
			<block slot="content">分类</block>
		</cu-custom>
		<!-- 个人主页 -->
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu':'']" >
			<view class="cu-item"  :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-circlefill text-black"></text>
					<text class="text-black">个人主页</text>
				</view>
			</view>
		</view>

		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu new-margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-circlefill text-black"></text>
					<text class="text-black">校园通知</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-circlefill text-black"></text>
					<text class="text-black">校园通知</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<image src="/static/logo.png" class="png" mode="aspectFit"></image>
					<text class="text-black">校园圈子</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="openMsg">
				<view class="content">
					<image src="/static/logo.png" class="png" mode="aspectFit"></image>
					<text class="text-black">交友系列</text>
				</view>
			</view>
			
		</view>

		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu new-margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''" >
				<view class="content">
					<image src="/static/logo.png" class="png" mode="aspectFit"></image>
					<text class="text-black">创业园</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
					<text class="cuIcon-discoverfill text-orange"></text>
					<text class="text-black">跳骚市场</text>
				</navigator>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
					<text class="cuIcon-discoverfill text-orange"></text>
					<text class="text-black">潮流街</text>
				</navigator>
			</view>
		</view>

		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu new-margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-game text-white new-boxing"></text>
					<text class="text-black">游戏组队</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-circlefill text-grey "></text>
					<text class="text-black">学习组队</text>
				</view>
			</view>
						
		</view>

		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu new-margin-top':'']">
			
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-btn text-olive"></text>
					<text class="text-black">我爱公益</text>
				</button>
			</view>
			<view class="cu-item ">
				<view class="content">
					
				</view>
			</view>
			
		</view>
		<view class="cu-tabbar-height"></view>
		
	</view>
</template>

<script>
	export default {
		name: "me",
		data() {
			return {
				modalName: null,
				menuBorder: true,
				menuArrow: true,
				menuCard: false,
				skin: false,
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			MenuBorder(e) {
				this.menuBorder = e.detail.value
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			MenuCard(e) {
				this.menuCard = e.detail.value
			},
			SwitchSex(e) {
				this.skin = e.detail.value
			},
			openMsg(){
				uni.navigateTo({
				    url: '../me/friendship'
				});
			}
		}
	}
</script>

<style scoped>
.new-boxing{
	width: 60upx !important;
	height: 60upx !important;
	line-height: 60upx !important;
	background: #fda935;
	font-size: 35upx;
	border-radius: 50%;
	-webkit-border-radius: 50%;
}

</style>>

