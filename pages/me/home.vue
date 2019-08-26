<template name="me">
	<view>
		
		<image src="/static/componentBg.png" mode="widthFix" class="response"></image>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 个人主页
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="showModal" data-target="menuModal">设置</button>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='menuModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-list menu text-left solid-top">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">短边框</text>
						</view>
						<view class="action">
							<switch @change="MenuBorder" :class="menuBorder?'checked':''" :checked="menuBorder?true:false"></switch>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">箭头</text>
						</view>
						<view class="action">
							<switch @change="MenuArrow" :class="menuArrow?'checked':''" :checked="menuArrow?true:false"></switch>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">卡片</text>
						</view>
						<view class="action">
							<switch @change="MenuCard" :class="menuCard?'checked':''" :checked="menuCard?true:false"></switch>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">校园通知</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<image src="/static/logo.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">校园圈子</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @click="openMsg">
				<view class="content">
					<image src="/static/logo.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">交友系列</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-btn text-olive"></text>
					<text class="text-grey">创业园</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
					<text class="cuIcon-discoverfill text-orange"></text>
					<text class="text-grey">跳骚市场</text>
				</navigator>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-emojiflashfill text-pink"></text>
					<text class="text-grey">潮流街</text>
				</view>
				<view class="action">
					<view class="cu-avatar-group">
						<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
						<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);"></view>
						<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view>
						<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);"></view>
					</view>
					<text class="text-grey text-sm">4 人</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-btn text-green"></text>
					<text class="text-grey">按钮</text>
				</view>
				<view class="action">
					<button class="cu-btn round bg-green shadow">
						<text class="cuIcon-upload"></text> 上传</button>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
					<text class="text-grey">标签</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-orange light">音乐</view>
					<view class="cu-tag round bg-olive light">电影</view>
					<view class="cu-tag round bg-blue light">旅行</view>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">游戏组队</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">学习组队</text>
				</view>
				<!-- <view class="action">
					<text class="text-grey text-sm">我爱公益</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">交友大厅</text>
				</view> -->
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-clothesfill text-blue margin-right-xs"></text> 多行Item</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text> 小目标还没有实现！</view>
				</view>
				<view class="action">
					<switch class="switch-sex" @change="SwitchSex" :class="skin?'checked':''" :checked="skin?true:false"></switch>
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
				menuBorder: false,
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

<style>

</style>
