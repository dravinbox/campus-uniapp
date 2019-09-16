<template name="me">
	<view>
		<!-- 标题 -->
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">分类</block>
		</cu-custom>
		<!-- 个人主页 -->
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu':'']" >
			<view class="cu-item"  :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="cuIcon-homefill text-white new-boxing"></text>
					<text class="text-black new-cate">个人主页</text>
				</view>
			</view>
		</view>

		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu new-margin-top':'']" v-for="(item,index) in cateList" :key="index">

			<view class="cu-item" :class="menuArrow?'arrow':''"  v-for="(first,firstIndex) in item" :key="firstIndex">
				<view class="content">
					<image :src="first.iconUrl" class="png new-image" mode="aspectFit"></image>
					<text class="text-black new-cate">{{first.oneCateName}}</text>
				</view>
			</view>
			
		</view>

		<view class="cu-tabbar-height bg-white"></view>
		
	</view>
</template>

<script>
	import { discoverApi } from '../../component/api/discover.js';
	export default {
		name: "me",
		data() {
			return {
				modalName: null,
				menuBorder: true,
				menuArrow: true,
				menuCard: false,
				skin: false,
				cateList:[],
				firstList:[],
				secondList:[],
				thirdList:[],
				fourList:[],
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
				    url: '../friend/friendship'
				});
			}
		},
		mounted(){
			discoverApi.getCategory({},(res)=>{
				if(res.data.code == 200){
					this.cateList = [];
					this.firstList = [];
					this.secondList = [];
					this.thirdList = [ ];
					this.fourList = [];
					if(res.data.data){
						res.data.data.forEach((item,index) => {
							item.rankGroup == 0 ? this.firstList.push(item):'';
							item.rankGroup == 1 ? this.secondList.push(item):'';
							item.rankGroup == 2 ? this.thirdList.push(item):'';
							item.rankGroup == 3 ? this.fourList.push(item):'';
						});
						//console.log(this.firstList,this.secondList)
						//console.log(this.thirdList,this.fourList)
						this.cateList.push(this.firstList);
						this.cateList.push(this.secondList);
						this.cateList.push(this.thirdList);
						this.cateList.push(this.fourList);
						//console.log(this.cateList)
					}	
				}
			})
		}
	}
</script>

<style scoped>
.new-boxing{
	width: 60upx !important;
	height: 60upx !important;
	line-height: 60upx !important;
	/* padding: 10rpx 10rpx; */
	background: #34e3e8;
	font-size: 35upx;
	border-radius: 50%;
	-webkit-border-radius: 50%;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
}
.new-image{
	width: 60upx !important;
	height: 60upx !important;
	line-height: 60upx !important;
	font-size: 35upx;
	/* border-radius: 50%;
	-webkit-border-radius: 50%; */
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
}
.new-cate{
	padding-left: 10rpx;
	font-weight: bold;
}
</style>>

