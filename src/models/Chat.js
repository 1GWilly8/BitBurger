var m = require("mithril");
var profile = require("./Profile");

var Chat = {

	messages: [],
	doc_id: "5979fba1734d1d4610dc06d9",

	loadMessages: function() {
		m.request({
			method: "GET",
			url: "http://localhost:8000/Chat"
		})
		.then(function(response) {
			Chat.messages = response[0].messages
			console.log("Chat db contents", Chat.messages)
		}) 
	},

	sendMessage: function(message) {
		var timeStamp = new Date().getTime()
		// console.log("***", profile.user_id)
		// const data = {"docId": Chat.doc_id, "uId": profile.user_id, "time": timeStamp, "message": message}
		console.log("***", localStorage.user_id)
		const data = {"docId": Chat.doc_id, "uId": localStorage.user_id, "time": timeStamp, "message": message}
		m.request({
			method: "PUT",
			url: "http://localhost:8000/Chat",
			data: data
		})
	}

}

module.exports = Chat;