import api from "./base.js";

function uploadImage(data,success){//上传图片
    api.uploadFileToken("/api/v1/upload/uploadImage",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function uploadVideo(data,success){//上传视频
    api.uploadFileToken("/api/v1/upload/uploadVideo",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}

function uploadVoice(data,success){//上传音频
    api.uploadFileToken("/api/v1/upload/uploadVoice",data,
    success,(res)=>{
        console.log("fail: ",res)
    },(res)=>{
        console.log("complete")
    })
}


export let uploadApi = {
    uploadImage:uploadImage,
    uploadVideo:uploadVideo,
    uploadVoice:uploadVoice
}