export default {
	
	map:{
		//本地开发环境
		"dev":{
			protocol: "http",
			domain: "120.24.236.181",
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
		try {
			console.log(window.location.href)
			return ''
		} catch (error) {
			//console.log(error)
			return this.map[env].protocol+"://"+this.map[env].domain
		}

		//return this.map[env].protocol+"://"+this.map[env].domain+":"+this.map[env].port
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
			header:{
				"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNoki0sKwjAQQO8y6wSamJl0uhPsQvADXqCk7QRSUEvTgiDe3Yjb93lD3npoIIz39AAFW5alSyM0RkEenrMUd7ue2m5_OB8vJZDXXCQS7WrLnhSksP6BZcIfmNZUptpFW3nptR3YaceCmiNGbUIlSN57IwyfLwAAAP__.T4ZtFfNZPxNzABRqV3i35ApHFx3HLorRse6ie5iWa88"
			},
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

	
	postToken: function(url,data,success,fail,complete){
		let token =  "Bearer eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNosi80KgzAMgN8lZwuxJLZ4G2wHYZvgC0hcK3SwTazCYOzdjeD1-_lBXgeoQcIrvaGANce5TwHqsoD8-ExRXddeL_3pfGvuGsTvpJIrx977UqskywHQ0g6eS9JpJBpdxWyYRAw5S0ZEyDi0yEw2YkD4bwAAAP__.56D-rmwB1Pby2U5yPP6w8hDIOJt3qjWtZWXBZ3eOVSc"
		console.log(data)
		uni.request({
			url: this.getPath() + url,
			header:{
				"Authorization":token
			},
			method: "POST",
			data:data,
			dataType: "json",
			responseType: "text",
			success: success,
			fail: fail,
			complete: complete
		})
	},

	getToken: function(url,data,success,fail,complete){
		let token =  "Bearer eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNosi80KgzAMgN8lZwuxJLZ4G2wHYZvgC0hcK3SwTazCYOzdjeD1-_lBXgeoQcIrvaGANce5TwHqsoD8-ExRXddeL_3pfGvuGsTvpJIrx977UqskywHQ0g6eS9JpJBpdxWyYRAw5S0ZEyDi0yEw2YkD4bwAAAP__.56D-rmwB1Pby2U5yPP6w8hDIOJt3qjWtZWXBZ3eOVSc"
		uni.request({
			url: this.getPath() + url,
			header:{
				"Authorization":token
			},
			method: "GET",
			data:data,
			dataType: "json",
			responseType: "text",
			success: success,
			fail: fail,
			complete: complete
		})
	},
	
}