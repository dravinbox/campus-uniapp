<template >
    <view class="cu-list menu-avatar" >
        <view class="cu-item" 
			:class="modalName=='move-box-'+ index?'move-cur':''" 
			v-for="(item,index) in messageList" :key="index"
            @touchstart="ListTouchStart" 
			@touchmove="ListTouchMove" 
			@touchend="ListTouchEnd" 
			:data-target="'move-box-' + index">
            <view class="cu-avatar new-cu-avatar round lg" :style="[{backgroundImage:'url('+item.userChartInfo.headImage||''+')'}]"></view>
            <view class="content">
                <view class="text-grey">{{item.userChartInfo.nickName}}</view>
                <view class="text-black text-sm">
                   <!-- <text class="cuIcon-infofill text-red  margin-right-xs"></text> -->
					<text>
						{{item.latestMessage}}
					</text>
                </view>
            </view>
            <view class="action">
                <view class="text-grey text-xs">{{item.latestTime|formatTime}}</view>
                <view class="cu-tag round bg-red sm">{{item.unRead}}</view>
            </view>
            <view class="move">
                <view class="bg-grey">屏蔽</view>
                <view class="bg-red">删除</view>
            </view>
        </view>
    </view>
</template>

<script>
	
	export default {
		props:{
			//0:文字匹配  1:语音匹配  2:相互关注  3:我的关注 4:关注我的
			messageType: String,
		},
		computed:{
			getTitle(){
				return this.messageType+"::"
			}
		},
		data() {
            return {
                    PageCur: 'mainpage',
                    modalName: null,
                    radio: 'radio1',
                    modalName: null,
					
					messageList:[
						{
						        "userId": "user_3",
						        "unRead": 1,
						        "latestMessage": "您好,来自runner",
						        "latestTime": 1571624344060,
						        "userChartInfo": {
						          "userId": "user_3",
						          "sexuality": "FEMALE",
						          "nickName": "runner",
						          "age": 18,
						          "sign": "哥是个传说 runner",
						          "headImage": "https://tb-campus.oss-cn-shenzhen.aliyuncs.com/ts/image/1570586829531.png"
						        }
						      },
						      {
						        "userId": "user_2",
						        "unRead": 3,
						        "latestMessage": "您好3",
						        "latestTime": 1571623757703,
						        "userChartInfo": {
						          "userId": "user_2",
						          "sexuality": "MALE",
						          "nickName": "peter",
						          "age": 18,
						          "sign": "哥是个传说 peter",
						          "headImage": "https://tb-campus.oss-cn-shenzhen.aliyuncs.com/ts/image/1570586829531.png"
						        }
						      },
					
					]
                }
		},
		filters: {
			formatTime(date) {
				//console.log(date,'参数')
				//#ifdef H5 || MP-WEIXIN
				let oldDate  = new Date(date);
				//#endif
		
				//#ifdef APP-PLUS
				let dd = new Date()
				var nd = dd.getTimezoneOffset();
				let timeDifference =Math.abs(Math.floor(nd*60*1000));
				var data = date.substr(0, 19); //'2019-08-09T18:23:27'
				var oldDate = new Date(data.replace(/T/g, ' ').replace(/-/g, '/'));
				let oldTime = timeDifference + oldDate.getTime();
				 oldDate = new Date(oldTime)
				//#endif
					
				let y = oldDate.getFullYear();
				let m = oldDate.getMonth() + 1 < 10 ? '0' + (oldDate.getMonth() + 1) : oldDate.getMonth() + 1; // 获取当前月份的日期，不足10补0
				let d = oldDate.getDate() < 10 ? '0' + oldDate.getDate() : oldDate.getDate(); // 获取当前几号，不足10补0
				let h =  oldDate.getHours() < 10 ? '0' + oldDate.getHours() : oldDate.getHours(); // 获取当前几点，不足10补0
				let minute =  oldDate.getMinutes() < 10 ? '0' + oldDate.getMinutes() : oldDate.getMinutes(); // 获取当前几分，不足10补0
				// return y + '-' + m + '-' + d +'  '+h+':'+minute;
				return h+':'+minute;
				
			},
		},
		created() {
			console.log("created============================")
		},
		methods: {
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStartX = e.touches[0].pageX
				this.listTouchStartY = e.touches[0].pageY
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.dx = e.touches[0].pageX - this.listTouchStartX
				this.dy = e.touches[0].pageY - this.listTouchStartY
				if(Math.abs(this.dy) < 3){
					if( this.dx < 0  ){
						// console.log("left",this.dx,this.dy)
						this.listTouchDirectionX = 'left'
					}else if( this.dx > 0  ){
						// console.log("right",this.dx,this.dy)
						this.listTouchDirectionX = 'right'
					}else{
						// console.log("nothing1",this.dx,this.dy)
					}
				}else{
					// console.log("nothing2",this.dx,this.dy)
				}
				
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				
				// console.log("touchEnd !!!!=====",this.listTouchDirectionX)
				if (this.listTouchDirectionX == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirectionX = null
			},
			
			
		},
		
	}
</script>

<style>

</style>