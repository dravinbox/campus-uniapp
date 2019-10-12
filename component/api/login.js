 import api from "./base.js"


/**
 * @description 使用手机登录
 * @param {String} mobile 手机号码
 * @param {String} vcode 验证码
 */
function loginRequest(mobile,vcode,success,fail){	


	
	api.post("/api/v1/phoneLogin?smsCode="+vcode+"&mobile="+mobile,{},success,fail,(res)=>{
		console.log("complete")
	})
		
}
/**
 * @description 获取验证码请求
 * @param {String} mobile 手机号码
 */
function vcodeRequest(mobile){
	api.get("/api/v1/getVerifyCode/"+mobile,
	(res)=>{
		console.log("success: ",res)
	},(res)=>{
		console.log("fail: ",res)
	},(res)=>{
		console.log("complete")
	})
}
function loginUser(data,success){//账号登录
	api.post("/api/v1/login",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function signUser(data,success){//账号注册
	api.post("/api/v1/sign",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}


function getName(){
	return api.getPath()
}

export let loginApi = {
	login: loginRequest,
	getVCode: vcodeRequest,
	getName: getName,
	loginUser:loginUser,
	signUser:signUser
}
