<template name="nav">
	<view>
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']" v-if="cuIconList.length<gridCol*gridRow">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index"  @click="jumpTo(item.url)">
				<view :class="[ item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
    props: {
        gridCol:{//数据
            type:Number,
            default:4
        },
        gridRow:{
            type:Number,
            default:3
        },
        gridBorder:{//是否是热帖
            type:Boolean,
            default:false
        },
        cuIconList: {
            type:Array,
            default:[
                {
                    cuIcon: 'cardboardfill',
                    color: 'red',
                    badge: 120,
                    name: 'VR',
                    url: '/pages/message/chat'
                }, 
                {
                    cuIcon: 'recordfill',
                    color: 'orange',
                    badge: 1,
                    name: '录像'
                },
                {
                    cuIcon: 'picfill',
                    color: 'yellow',
                    badge: 0,
                    name: '图像'
                },
                {
                    cuIcon: 'noticefill',
                    color: 'olive',
                    badge: 22,
                    name: '通知'
                },
                {
                    cuIcon: 'upstagefill',
                    color: 'cyan',
                    badge: 0,
                    name: '排行榜'
                }, 
                {
                    cuIcon: 'clothesfill',
                    color: 'blue',
                    badge: 0,
                    name: '皮肤'
                },
                {
                    cuIcon: 'discoverfill',
                    color: 'purple',
                    badge: 0,
                    name: '发现'
                }, 
                {
                    cuIcon: 'questionfill',
                    color: 'mauve',
                    badge: 0,
                    name: '帮助'
                }, 
                {
                    cuIcon: 'commandfill',
                    color: 'purple',
                    badge: 0,
                    name: '问答'
                }, 
                {
                    cuIcon: 'brandfill',
                    color: 'mauve',
                    badge: 0,
                    name: '版权'
                }
            ]
        },
    },
    data(){
        return{

        }
    }
}
</script>

<style  scoped>

</style>