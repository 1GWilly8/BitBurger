var m = require("mithril")
var Home = require("./views/home")

// window.onload = function() {
// 	var now = new Date().getTime()

m.route(document.body, "/Home", {
    "/Home": {
        render: function() {
            return m(Home)
        }
    }
})

var client = new Faye.Client('http://localhost:8000/');

client.subscribe('/messages', function(message) {
  alert('Got a message: ' + message.text);
});

client.publish('/messages', {
  text: 'Hello world'
});

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
