 import api from "./base.js"
 
 function getSwiper(success){
	 api.get("/api/v1/user/index/getSwiperResources",
	 success,(res)=>{
	 	console.log("fail: ",res)
	 },(res)=>{
	 	console.log("complete")
	 })
 }
 
 function getNavigation(success){
	 api.get("/api/v1/user/index/getNavigationResources",
	 success,(res)=>{
	 	console.log("fail: ",res)
	 },(res)=>{
	 	console.log("complete")
	 })
 }
 function getHotPost(data,success){
	api.post("/api/v1/user/index/getHotPostResources",
	data,
	success,(res)=>{
		console.log("fail: ",res)
	},(res)=>{
		console.log("complete")
	})
}
 
 export let indexApi = {
 	getSwiper: getSwiper,
	getNavigation: getNavigation,
	getHotPost:getHotPost
 }
 