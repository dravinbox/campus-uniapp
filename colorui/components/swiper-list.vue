<template>
	<view>
		<swiper class="screen-swiper square-dot"  :indicator-dots="true" :circular="true"
		 :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
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

</style>>