export default {
	
	map:{
		//本地开发环境
		"dev":{
			protocol: "http",
			domain: "localhost",
			port: "8080",
		},
		//演示环境
		"pre":{
			protocol: "http",
			domain: "pre",
			port: "8080",
		},
		//正式环境
		"pro":{
			protocol: "http",
			domain: "pro",
			port: "8080",
		},
	},
	
	defaultHeader:{
		"content-type": "application/json"
	},
	
	/**
	 * @description 获取网关地址
	 * @param {String} env 环境
	 */
	getPath: function(env) {
		
		if(env==undefined|| env == null){
			env = "dev"
		}
		return this.map[env].protocol+"://"+this.map[env].domain+":"+this.map[env].port
	},
	
	
	/**
	 * @description 发起POST请求
	 * @param {String} url 请求路径
	 * @param {Object} data 请求体
	 * @param {Function} success 成功回调
	 * @param {Function} fail 失败回调
	 * @param {Function} complete 完成回调
	 */
	post: function(url,data,success,fail,complete){
		uni.request({
			url: this.getPath() + url,
			method: "POST",
			data:data,
			dataType: "json",
			responseType: "text",
			success: success,
			fail: fail,
			complete: complete
		})
	},
	
	/**
	 * @description 发起GET请求
	 * @param {String} url
	 * @param {Function} success
	 * @param {Function} fail
	 * @param {Function} complete
	 */
	get: function(url,success,fail,complete){
		uni.request({
			url: this.getPath() + url,
			method: "GET",
			dataType: "json",
			responseType: "text",
			success: success,
			fail: fail,
			complete: complete
		})
	},
	
}