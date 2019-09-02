import api from "./base.js";

function getCategory(data,success){
    api.postToken("/api/v1/user/discover/getCategory",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function getPostList(data,success){
    api.postToken("/api/v1/user/discover/getPostList",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function sendAPost(data,success){
    api.postToken("/api/v1/user/discover/sendAPost",data,
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
