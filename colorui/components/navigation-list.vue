<template name="nav">
	<view>
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']" v-if="cuIconList.length<gridCol*gridRow">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index"  @click="jumpTo(item.url)">
				<view :class="[ item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text >{{item.name}}</text>
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
            default:[]
        },
    },
    data(){
        return{

        }
    },
    methods:{
        jumpTo(url){
            console.log(url);
            if(url != undefined && url != null){
                uni.navigateTo({
                    url: url
                })
            }
        },
    }
}
</script>

<style  scoped>

</style>