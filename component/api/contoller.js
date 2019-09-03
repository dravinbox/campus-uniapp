import api from "./base.js";

function getSyncMessage(data,success){
    api.getToken("/api/v1/user/im/getSyncMessage",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function getUserChatInfo(data,success){
    api.getToken("/api/v1/user/im/getUserChatInfo/{userId}",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}


function subcribeUser(url,data,success){//关注
    api.postToken("/api/v1/user/im/subcribeUser"+url,data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function unSubcribeUser(url,data,success){//取消关注
    api.postToken("/api/v1/user/im/unSubcribeUser"+url,data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

export let contollerApi = {
    getSyncMessage: getSyncMessage,
    getUserChatInfo: getUserChatInfo,
    subcribeUser:subcribeUser,
    unSubcribeUser:unSubcribeUser
}
