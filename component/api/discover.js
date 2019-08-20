import api from "./base.js";

function getCategory(success){
    api.post("/api/v1/user/discover/getCategory",
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function getPostList(success){
    api.post("/api/v1/user/discover/getPostList",
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function sendAPost(success){
    api.get("/api/v1/user/discover/sendAPost",
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

export let discoverApi = {
    getCategory: getCategory,
    getPostList: getPostList,
    sendAPost:sendAPost,
}
