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

function sharePost(url,data,success){//分享某个帖子
    api.postToken("/api/v1/user/discover/sharePost"+url,data,
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

function likeCommentComment(url,data,success){//点赞或取消点赞 某个二级评论
    api.postToken("/api/v1/user/discover/likeCommentComment"+url,data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function collectPost(url,data,success){//收藏或取消收藏 某个评论
    api.postToken("/api/v1/user/discover/collectPost"+url,data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function getPostDetail(url,data,success){//获取某个帖子的详情
    api.postToken("/api/v1/user/discover/getPostDetail"+url,data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function getPostComment(url,data,success){//获取某个帖子的评论
    api.postToken("/api/v1/user/discover/getPostComment"+url,data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function commentPost(data,success){//评论某个帖子
    api.postToken("/api/v1/user/discover/commentPost",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function commentComment(data,success){//评论某个评论
    api.postToken("/api/v1/user/discover/commentComment",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function getCommentComment(url,data,success){//获取某个评论的回复评论列表
    api.postToken("/api/v1/user/discover/getCommentComment"+url,data,
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
	sharePost:sharePost,
    likePost:likePost,
    likeComment:likeComment,
    collectPost:collectPost,
    getPostDetail:getPostDetail,
    getPostComment:getPostComment,
    commentPost:commentPost,
    commentComment:commentComment,
    getCommentComment:getCommentComment,
    likeCommentComment:likeCommentComment
}
