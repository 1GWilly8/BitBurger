var m = require("mithril")
var Home = require("./views/home")


m.route(document.body, "/Home", {
    "/Home": {
        render: function() {
        return m(Home)
        }
    }
})
