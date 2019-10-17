<template name="dynamic">
	<view >
		
		<!-- 标题 -->
		<cu-custom bgColor="bg-gradual-newblue" :isBack="true">
            <!-- <block slot="backText">返回</block> -->
			<block slot="content">动态</block>
		</cu-custom>
		
		<!-- 动态 -->
		<view >
			<post-list  :itemList='list' ></post-list>
		</view>

		<!-- 没有动态数据时 -->
		<view v-if="list.length==0&&isCard" class="bg-white text-center new-line">
			<text>没有数据</text>
		</view>

		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import postList from './post-list.vue'
	import { discoverApi } from '../api/discover.js';
	export default {
        components: {postList},
		name: "dynamic",
		props: {
			parameter:{//数据
				type:Object,
				default:{
					cateId:1
				}
			},
		},
		data() {
			return {
				isCard:false,
				list:[],
				params:{
					"oneCateId": 1,
					"pageNum": 1,
					"pageSize": 10,
					"pullLast": true,//为true时，一直拉取新的动态
				},
			};
		},
		methods: {
			getPostList(){//获取帖子列表
				if(this.parameter.cateId){
					this.params.oneCateId = this.parameter.cateId;
				}
				discoverApi.getPostList(this.params,(res)=>{
					console.log("get tPostList:  ",res.data.data);
					this.list = [];
					if(res.data.code == 200){
						if(res.data.data.list){
							res.data.data.list.forEach((item,index) => {
								console.log(typeof(item.imagesJsonList));
								//console.log(JSON.parse(item.imagesJsonList));
								item.videoPaused = true;
								//item.video = 'https://toss.paycore.cc/ts/video/1566288960116.mp4';
								if(JSON.parse(item.imagesJsonList)!=null){
									item.imagesJsonList = JSON.parse(item.imagesJsonList);
								}else{
									item.imagesJsonList = []
								}
								this.list.push(item);
								
							});
						}
					}
					
					console.log(this.list)
				})
			}
		},
		mounted() {
			this.getPostList()
			setTimeout(()=>{
				this.isCard =  true;
			},5000)
		},
		
	}
</script>

<style  scoped>
.new-line{
	line-height: 200rpx;
}
</style>>
   
