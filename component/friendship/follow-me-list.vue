<template >
	<!-- 我的粉丝 -->
    <view class="cu-list menu-avatar " >
        <view class="cu-item" @click="openMsg" 
			v-for="(item,index) in userList" :key="index">
            <view class="cu-avatar new-cu-avatar round lg" :style="[{backgroundImage:'url('+ item.headImage||'' +')'}]"></view>
            <view class="content">
                <view class="text-black"><view class="text-cut">{{item.nickName}}</view></view>
            </view>
            
        </view>
       
    </view>
</template>

<script>
	import {ImApi} from '@/component/api/im.js'
	

	export default {
		props:{
			userList:{
				type: Array,
				default:()=>[
					{
						userId:'user_1',
						nickName:'小明',
						headImage:'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
					},
					{
						userId:'user_2',
						nickName:'小红',
						headImage:'https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg',
					},
					{
						userId:'user_3',
						nickName:'小丽',
						headImage:'https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg',
					}
				]
			}
		},
		data() {
            return {
                    
					
                }
		},
	
		methods: {
            openMsg(){

			},
			
		},
		
		
	}
</script>

<style>

</style>