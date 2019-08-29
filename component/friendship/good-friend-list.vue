<template name="discover">
	<view>
		<!-- 标题 -->
		<cu-custom  bgColor="bg-gradual-white">
			<block slot="content">好友列表</block>
		</cu-custom>
		
		<!-- 栏目 -->
        <scroll-view scroll-x class="bg-white nav" style="padding:0 20upx;">
			<view class="flex text-center new-solids-bottom">
				<view class="cu-item flex-sub"  v-for="(item,index) in cateList" :key="index" @tap="tabSelect" :data-id="index">
					<view :class="index==TabCur?'new-text-blue new-border':'new-text-black'">{{item}}</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- 列表 -->
		<view style="padding:0 20upx;background:#ffffff;">
			<view class="cu-list menu-avatar" >
				<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in 4" :key="index"
					@touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
					<view class="cu-avatar new-cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view>
					<view class="content">
						<view class="text-grey">文晓港</view>
						<view class="text-black text-sm">
							<text class="cuIcon-infofill text-red  margin-right-xs"></text> 消息未送达
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">22:20</view>
						<view class="cu-tag round bg-red sm">5</view>
					</view>
					<view class="move">
						<view class="bg-grey">屏蔽</view>
						<view class="bg-red">删除</view>
					</view>
				</view>
			</view>
			<words-list></words-list>
			<voice-list></voice-list>
			<follow-list></follow-list>
		</view>

		<view class="cu-tabbar-height"></view>
		
	</view>
</template>

<script>
	import wordsList from './words-list.vue';
	import voiceList from './voice-list.vue';
	import followList from './follow-list.vue';
	import { discoverApi } from '../api/discover.js';
	export default {
		components: {wordsList,voiceList,followList},
		name: "goodfriendlist",
		data() {
			return {
				isCard:true,
				TabCur: 0,
				scrollLeft: 0,
				src:'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
				params:{
					"oneCateId": 1,
					"pageNum": 1,
					"pageSize": 5,
					"pullLast": false,
					"twoCateId": 1
				},
				cateList:['文字匹配','语音匹配','关注'],
                list:[],
				PageCur: 'discover',
				modalName: null,
			}
		},
		onHide: function(){
			console.log('ssssssssss  onShow')
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				// this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			sendPosting(){//发帖子
				let data = {
					"content": "131313",
					"imagesJsonList": "115415641",
					"oneCate": 1,
					"title": "552",
					"twoCate": 1,
					"video": "2145454",
					"voice": "164134"
				}				
				discoverApi.sendAPost(data,(res) =>{
					console.log(res)
				})
			},
			openMsg(){

			},
			backStyle(src){
				return {
					'background-image':'url('+src+')'
				}
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
			
		},
		mounted() {
			console.log('jin来')
			//获得帖子的分类
			discoverApi.getCategory({},(res)=>{
				//this.cateList = res.data.data;
				//console.log("get Category:  ",this.cateList);
			})

			//获取帖子列表
			discoverApi.getPostList(this.params,(res)=>{
				console.log("get tPostList:  ",res.data.data);
				this.list = [];
				if(res.data.data.list){
					res.data.data.list.forEach((item,index) => {
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
	}
</script>

<style scoped>
.new-solids-bottom {
    position: relative;
    border-bottom: 1px solid #eee !important;
}
.new-size{
    font-size: 30upx !important;
}
.new-border{
	height: 90upx;
	box-sizing: border-box ;
	-webkit-box-sizing: border-box ;
	border-bottom:8upx solid #2ad0ea; 
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

