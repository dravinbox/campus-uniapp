export default {
	
	map:{
		//本地开发环境
		"dev":{
			// protocol: "http",
			// domain: "192.168.1.5",
			// port: "8080"
			protocol: "https",
			domain: "api.campus.gzmytech.com",
			port: "443",
		},
		//演示环境
		"pre":{
			protocol: "https",
			domain: "api.campus.gzmytech.com",
			port: "443",
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
		// #ifdef  H5  
			return this.map[env].protocol+"://"+this.map[env].domain+":"+this.map[env].port
		// #endif

		//#ifdef APP-PLUS || MP-WEIXIN
			return this.map[env].protocol+"://"+this.map[env].domain+":"+this.map[env].port
		// #endif

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
			method: "POST",
			data:data,
			dataType: "json",
			responseType: "text",
			success: (res)=>{
				if(res.data.code==200){
					//业务操作成功
					success(res)
				}else{
					//业务操作不成功
					fail(res)
				}
			},
			fail: (err)=>{
				//网络异常等引起发送请求异常
				console.log("请求异常",err)
			},
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
			success: (res)=>{
				if(res.data.code==200){
					//业务操作成功
					success(res)
				}else{
					//业务操作不成功
					fail(res)
				}
			},
			fail: (err)=>{
				//网络异常等引起发送请求异常
				console.log("请求异常",err)
			},
			complete: complete
		})
	},

	
	postToken: function(url,data,success,fail,complete){
		let value = 'eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNoki0sKwjAQQO8y6wQ6TpPU7gRdCGrBC5TETCAFtZgWhNK7O8Xt-yxQ5gAt-PjML1AwF_70OUKLCsrjPbK4e3c59Yfj9XyTgL-jSOMq6ypsSEH20x-YhtwGhinLZCjuLVHQUu10LU77hF7XCZEdBms4wfoDAAD__w.mNaPwqnU0KP64_0qM_7gPlm49AkE3h5fr95-CR3TyDQ'
		try {	
			value = uni.getStorageSync('token');
		} catch (e) {
			// error
		}
		
		let token = "Bearer "+value
		//console.log(data)
		uni.request({
			url: this.getPath() + url,
			header:{
				"Authorization":token
			},
			method: "POST",
			data:data,
			dataType: "json",
			responseType: "text",
			success: (res)=>{
				
				if(res.data.code==200){
					//业务操作成功
					success(res)
				}else if(res.data.code==401){
					//授权token已过期，跳转到登录页面
					uni.navigateTo({
						url:'/pages/index/login'
					})
				}else{
					//业务操作不成功
					fail(res)
				}
				
			},
			fail: (err)=>{
				//网络异常等引起发送请求异常
				console.log("请求异常",err)
			},
			complete: complete
		})
	},

	getToken: function(url,data,success,fail,complete){
		let value = 'eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNoki0sKwjAQQO8y6wRMZjLJdCfoQvADXqCkJkIKajEtCOLdjbh9nzfUZYAOYrqVOyhYan72JUFnFNTLY8rNnU_7bb_eHHbHFuTX1KRjQS-OSUGJ8x9YQfMD41zaFIwbPGbRbClpigG1EJIOQt5K4tWVDXy-AAAA__8.z1vSZ4OfqZlv9_CE_ikO0bUwj0o9pPSce0olGGSAPAo'
		try {
			value = uni.getStorageSync('token');			
		} catch (e) {
			// error
		}
		let token = "Bearer "+value
		uni.request({
			
			url: this.getPath() + url,
			header:{
				"Authorization":token
			},
			method: "GET",
			data:data,
			dataType: "json",
			responseType: "text",
			success: (res)=>{
				if(res.data.code==200){
					//业务操作成功
					success(res)
				}else if(res.data.code==401){
					//授权token已过期，跳转到登录页面
					uni.navigateTo({
						url:'/pages/index/login'
					})
				}else{
					//业务操作不成功
					fail(res)
				}
			},
			fail: (err)=>{
				//网络异常等引起发送请求异常
				console.log("请求异常",err)
				
			},
			complete: complete
		})
	},



	uploadFileToken: function(url,data,success,fail,complete){
		let value = 'eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNoki0sKwjAQQO8y6wQ6TpPU7gRdCGrBC5TETCAFtZgWhNK7O8Xt-yxQ5gAt-PjML1AwF_70OUKLCsrjPbK4e3c59Yfj9XyTgL-jSOMq6ypsSEH20x-YhtwGhinLZCjuLVHQUu10LU77hF7XCZEdBms4wfoDAAD__w.mNaPwqnU0KP64_0qM_7gPlm49AkE3h5fr95-CR3TyDQ'
		try {	
			value = uni.getStorageSync('token');
		} catch (e) {
			// error
		}
		let token = "Bearer "+value
		//console.log(data)
		uni.uploadFile({
			url: this.getPath() + url,
			header:{
				"Authorization":token
			},
			filePath: data,
			name: 'file',
			formData: {
				file:data
			},
			success: success,
			fail: fail,
			complete: complete
		})
	},
	
}