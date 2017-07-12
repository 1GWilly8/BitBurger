var m = require("mithril")
var Home = require("./views/home")
var faye = require("faye");
var client = new faye.Client("http://localhost:8000/faye");
client.subscribe("/test", function(message) {
    alert('Got a message: ' + message.text);
});

// window.onload = function() {
// 	var now = new Date().getTime()

m.route(document.body, "/Home", {
    "/Home": {
        render: function() {
            return m(Home)
        }
    }
})




//     return m.request({
//         method: "GET",
//         url: "http://localhost:8000/tasks"
//     })
//     .then(function() {
//     	if(now - response.getTime() >= 86400000) {
//     		return m.request({
//     			method: "POST",
//     			url: ""
//     		})
//     	}
//     })
// }
