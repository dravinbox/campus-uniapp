import api from "./base.js";

function getCategory(data,success){//获取分类
    api.postToken("/api/v1/user/discover/getCategory",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function getPostList(data,success){//获取帖子
    api.postToken("/api/v1/user/discover/getPostList",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}
function sendAPost(data,success){//发帖
    api.postToken("/api/v1/user/discover/sendAPost",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function likePost(url,data,success){//点赞或取消点赞某个帖子
    api.postToken("/api/v1/user/discover/likePost"+url,data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function likeComment(url,data,success){//点赞或取消点赞 某个评论
    api.postToken("/api/v1/user/discover/likeComment"+url,data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function collectPost(url,data,success){//点赞或取消点赞 某个评论
    api.postToken("/api/v1/user/discover/collectPost"+url,data,
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
    likePost:likePost,
    likeComment:likeComment,
    collectPost:collectPost
}
