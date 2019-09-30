import api from "./base.js";

function getInfo(data,success){//获取用户基本信息
    api.getToken("/api/v1/user/info/getInfo",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function getMyPostHistory(data,success){//获取本人的个人主页动态列表
    api.postToken("/api/v1/user/info/getMyPostHistory",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function getOtherPostHistory(url,data,success){//获取他人的个人主页动态列表
    api.postToken("/api/v1/user/info/getOtherPostHistory"+url,data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}



function getUserAndRole(data,success){//根据token获取用户类型
    api.getToken("/api/v1/user/info/getUserAndRole",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}
function modifyInfo(data,success){//修改用户基本信息
    api.postToken("/api/v1/user/info/modifyInfo",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function setPostTop(url,data,success){//设置帖子个人首页顶置
    api.postToken("/api/v1/user/info/setPostTop"+url,data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function setPostViewPermission(data,success){//设置帖子的查看权限
    api.postToken("/api/v1/user/info/setPostViewPermission",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

export let userApi = {
    getInfo: getInfo,
    getMyPostHistory:getMyPostHistory,
    getOtherPostHistory:getOtherPostHistory,
    getUserAndRole:getUserAndRole,
    modifyInfo:modifyInfo,
    setPostTop:setPostTop,
    setPostViewPermission:setPostViewPermission
}