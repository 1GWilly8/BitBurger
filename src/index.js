var m = require("mithril")
var Home = require("./views/home")
var NewHome = require("./views/newHome")
var Landing = require("./views/landing")
var profile = require("./models/Profile")
var chat = require("./models/Chat")
var moment = require("moment")
// var faye = require("faye");
// var client = new faye.Client("http://localhost:8000/faye");
// client.subscribe("/test", function(message) {
//     alert('Got a message: ' + message.text);
// });

window.onload = function() {
     var logCheckRes = profile.checkLogIn()
    cookieInfo = document.cookie
    console.log("COOKIES", logCheckRes)
    if (cookieInfo[0] == "u") {
        var name = ""
        for (var i = 9; i < cookieInfo.length; i++) {
            name += cookieInfo[i]
        }
        console.log("concatanated name=", name)
        localStorage.setItem('user_id', name);
        var nowPlus7Days = moment().add(7, "days")
        document.cookie = "username=" + name + "; expires=" + nowPlus7Days.format("dddd, D MMM YYYY HH:mm:ss [UTC]") + "; path=/;";
        // TODO: add username if users cleared from last session
    } else {
        window.location = "http://localhost:8000/#!/NewUser";
        console.log("redirecting for new user");
    }
}
//  var now = new Date().getTime()

m.route(document.body, "/Home", {
    "/Home": {
        render: function() {
            return m(Home)
        }
    },
    "/TwoHome": {
        render: function() {
            return m(NewHome)
        }
    },
    "/NewUser": {
        render: function() {
            return m(Landing)
        }
    }
})