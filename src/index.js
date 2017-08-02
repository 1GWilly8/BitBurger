var m = require("mithril")
var Home = require("./views/home")
var Landing = require("./views/landing")
// var faye = require("faye");
// var client = new faye.Client("http://localhost:8000/faye");
// client.subscribe("/test", function(message) {
//     alert('Got a message: ' + message.text);
// });

window.onload = function() {
	if (!localStorage.user_id) {
		console.log("redirecting for new user")
		window.location = "http://localhost:8000/#!/NewUser"
	}
}
// 	var now = new Date().getTime()

m.route(document.body, "/Home", {
    "/Home": {
        render: function() {
            return m(Home)
        }
    },
    "/NewUser": {
    	render: function() {
    		return m(Landing)
    	}
    }
})


