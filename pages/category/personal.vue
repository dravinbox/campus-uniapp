<template>
	<view >
		<view>	
			<cu-custom bgColor="bg-person-newblue "   :isBack="true">
				<block slot="content">个人主页</block>
			</cu-custom>
			<view  class="new-yu-blue bg-person-newblue">	
				<view class="text-center head-portrait">
					<image lazy-load src='https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'></image>
				</view>
				<view class="text-center head-name">
					<text>名字斯蒂芬</text>
				</view>
				<view class="flex text-center new-height">
					<view class="cu-item flex-sub new-class-right"   :data-id="0">
						我的帖子
					</view>
					<view class="cu-item flex-sub new-class-right"   :data-id="1">
						我的粉丝
					</view>
					<view class="cu-item flex-sub new-class-right"   :data-id="2">
						我的关注
					</view>
					<view class="cu-item flex-sub"   :data-id="3">
						我的收藏
					</view>
				</view>
			</view>	
			<view class="homepage-content">
				<view class="cu-timeline">
					<view class="cu-time "></view>
					<view class="cu-item cur cuIcon-noticefill text-blue">
						<view class="content bg-green shadow-blur">
							<text>22:22</text> 【广州市】快件已到达地球
						</view>
					</view>
					<view class="cu-item  ">
						<view class="content bg-red shadow-blur">
							这是第一次，我家的铲屎官走了这么久。久到足足有三天！！
						</view>
					</view>
					<view class="cu-item text-grey cuIcon-evaluate_fill">
						<view class="content bg-grey shadow-blur">
							这是第一次，我家的铲屎官走了这么久。
						</view>
					</view>
					<view class="cu-item ">
						<view class="bg-blue content">
							<text>20:00</text> 【月球】快件已到达月球，准备发往地球
						</view>
						<view class="bg-cyan content">
							<text>10:00</text> 【银河系】快件已到达银河系，准备发往月球
						</view>
					</view>
				</view>

				<view class="cu-timeline">
					<!-- <view class="cu-time">06-17</view> -->
					<view class="cu-item cuIcon-evaluate_fill text-red">
						<view class="content">
							<text>01:30</text> 【喵星】 MX-12138 已揽收，准备发往银河系
						</view>
					</view>
				</view>

				<view class="cu-timeline">
					<!-- <view class="cu-time">06-17</view> -->
					<view class="cu-item">
						<view class="content">
							<view class="cu-capsule radius">
								<view class="cu-tag bg-cyan">上午</view>
								<view class="cu-tag line-cyan">10:00</view>
							</view>
							<view class="margin-top">这是第一次，我家的铲屎官走了这么久。久到足足有三天！！ 在听到他的脚步声响在楼梯间的那一刻，我简直想要破门而出，对着他狠狠地吼上10分钟，然后再看心情要不要他进门。</view>
						</view>
					</view>
					<view class="cu-item text-blue">
						<view class="bg-blue shadow-blur content">
							<view class="cu-list menu-avatar radius">
								<view class="cu-item">
									<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
									<view class="content">
										<view class="text-grey">文晓港</view>
										<view class="text-gray text-sm">
											<text class="cuIcon-infofill text-red"></text> 消息未送达</view>
									</view>
									<view class="action">
										<view class="text-grey text-xs">22:20</view>
										<view class="cu-tag round bg-grey sm">5</view>
									</view>
								</view>
								<view class="cu-item">
									<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);">
										<view class="cu-tag badge">99+</view>
									</view>
									<view class="content">
										<view class="text-grey">文晓港
											<view class="cu-tag round orange sm">SVIP</view>
										</view>
										<view class="text-gray text-sm">
											<text class="cuIcon-redpacket_fill text-red"></text> 收到红包</view>
									</view>
									<view class="action">
										<view class="text-grey text-xs">22:20</view>
										<text class="cuIcon-notice_forbid_fill text-gray"></text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>	
		
	</view>
</template>

<script>

	export default {
		data() {
			return {
				TabCur:0,
				PageCur: 'dynamic',
				modalName: null,
				radio: 'radio1',
				newParam:{
					classItem:'',
					cateId:null,
				},
				scrollHeight:0,
			}
		},
		onLoad(option) {
			console.log(option.classItem); //打印出上个页面传递的参数。
			console.log(option.cateId); //打印出上个页面传递的参数
			this.newParam.classItem = option.classItem;
			this.newParam.cateId = Number(option.cateId);
			console.log(this.newParam)
			var pages = getCurrentPages();
			console.log(pages)
			//console.log(this.$mp.query)
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
		},
		
	}
</script>

<style scoped>
.new-yu-blue{
	height: 170px;
}
.head-portrait{
	height: 75px;
}
.head-name{
	height: 20px;overflow: hidden;padding: 0px 20px;
	margin: 20rpx 0px 60rpx 0px ;
}
.head-name text{font-size: 34rpx;}
.head-portrait image{
	margin-top: 10px;
	width: 55px;
	height: 55px;
	border: 5px solid #5dd0eb;
	border-radius: 50%;
}
.homepage-content{
	min-height: 500rpx;
	background: #ffffff;
}
.new-height{height: 30px;line-height: 18px;padding: 6px 0px; color: rgba(255, 255, 255, .8);}
.new-class-right{border-right: 1px solid rgba(255, 255, 255, .8);}
.cu-timeline>.cu-item[class*="cuIcon-"]::before {
	background-image: url('./../../static/icon_home.png');
	background-size: cover;
}
</style>

