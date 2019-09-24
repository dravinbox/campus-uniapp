<template>
	<view class="bg-gradual-newblue">
        <cu-custom  :isBack="true">
			<block slot="content">个人主页</block>
		</cu-custom>
		<view  >bbb	</view>	
	</view>
</template>

<script>

	export default {
		data() {
			return {
				PageCur: 'dynamic',
				modalName: null,
				radio: 'radio1',
				newParam:{
					classItem:'',
					cateId:null,
				}
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
.bg-gradual-newblue{
	line-height: 260rpx;
}
</style>>

