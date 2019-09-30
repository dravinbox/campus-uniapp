<template>
	<view>
		<swiper class="screen-swiper square-dot" :class='heightClass' :indicator-color='indcolor' :indicator-active-color='indActiveColor' :indicator-dots="true" :circular="true"
		 :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image lazy-load :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
        name: 'swiper-list',
		data() {
			return {
			};
		},
		
		props: {
			swiperList: {
				type: Array,
				default:  []
            },
            autoplay: {
				type: [Boolean, String],
				default: true
			},
            interval: {
                type: String,
				default: '5000'
            },
            duration: {
                type: String,
				default: '500'
			},
			indcolor:{
				type: String,
				default: '#9ee2f5'
			},
			indActiveColor:{
				type: String,
				default: '#2cd2e8'
			},
			heightClass:{
				type: String,
				default: ''
			}
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style scoped>
/* .screen-swiper{
	height: 427rpx;
} */
.new-swiper{
	height: 427rpx;
}
</style>>