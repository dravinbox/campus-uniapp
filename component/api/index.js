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
 
 function getCategory(success){
    api.post("/api/v1/user/discover/getCategory",
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}
 export let indexApi = {
 	getSwiper: getSwiper,
	getNavigation: getNavigation,
	getCategory:getCategory
 }
 