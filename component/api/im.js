 import api from "./base.js"


/**
 * 获取相互关注用户列表
 * @param {Object} data
 * @param {Object} success
 * @param {Object} fail
 */
function getFEOListRequest(data,success,fail){	
	api.postToken("/api/v1/user/im/getFriendList",data,success,fail)
		
}
/**
 * 获取我的关注用户列表
 * @param {Object} data
 * @param {Object} success
 * @param {Object} fail
 */
function getFollowListRequest(data,success,fail){	
	api.postToken("/api/v1/user/im/getFollowList",data,success,fail)
		
}
/**
 * 获取我的粉丝用户列表
 * @param {Object} data
 * @param {Object} success
 * @param {Object} fail
 */
function getFollowMeListRequest(data,success,fail){	
	api.postToken("/api/v1/user/im/getFollowMeList",data,success,fail)
		
}

/**
 * 获取未读列表信息
 * @param {Object} success
 * @param {Object} fail
 */
function checkSyncTableAndCountUnreadMessages(type,success,fail){	
	api.getToken("/api/v1/user/im/checkSyncTableAndCountUnreadMessages/"+type,{},success,fail)
		
}
/**
 * 获取与某人的聊天记录
 * @param {Object} data
 * @param {Object} success
 * @param {Object} fail
 */
function showConversationMessages(data,success,fail){	
	api.postToken("/api/v1/user/im/showConversationMessages",data,success,fail)
		
}


export let ImApi = {
	getFEOList: getFEOListRequest,
	getFollowList: getFollowListRequest,
	getFollowMeList: getFollowMeListRequest,
	checkSyncTableAndCountUnreadMessages:checkSyncTableAndCountUnreadMessages,
	showConversationMessages:showConversationMessages,
	
}
