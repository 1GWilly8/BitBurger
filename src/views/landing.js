var m = require("mithril")
var profile = require("../models/Profile")
var locations = require("../models/Locations")
var users = require("../models/Users")
var chat = require("../models/Chat")

var state = {
    value: "",
    setValue: function(v) {
        state.value = v;
    }
}

module.exports = {
    view: function(vnode) {
        return m("body.login_screen_background", [
            m("div.container", [
                m(".vertical_break_hg"),
                m(".vertical_break_lg"),
                m(".vertical_break_md"),
                m("div.col-8-md.login_text_display", "Enter your name to start eating!"),
                m("div.col-12-md", [
                    m(".input-group", [
                        m("input.form-control[placeholder='Prefered name'][type='text']", {
                            oninput: m.withAttr("value", state.setValue),
                            value: state.value,
                            onkeyup: function(event) {
                                if (event.keyCode == 13 && event.target.value != "") {
                                    m.request({
                                            method: "POST",
                                            url: "http://localhost:8000/Users",

                                        })
                                        .then(function(response) {

                                            localStorage.setItem('user_id', state.value);
                                            var data = { "name": state.value, "uId": response, "mapping": true }
                                            console.log(":::", data)
                                            m.request({
                                                method: "PUT",
                                                url: "http://localhost:8000/Users",
                                                data: data
                                            })

                                        })
                                        window.location = "http://localhost:8000/#!/Home"
                                }
                            }
                        }),
                        m("span.input-group-addon.cursor_pointer", {
                                onclick: function() {
                                    m.request({
                                            method: "POST",
                                            url: "http://localhost:8000/Users",

                                        })
                                        .then(function(response) {

                                            localStorage.setItem('user_id', state.value);
                                            var data = { "name": state.value, "uId": response, "mapping": true }
                                            console.log(":::", data)
                                            m.request({
                                                method: "PUT",
                                                url: "http://localhost:8000/Users",
                                                data: data
                                            })

                                        })
                                        window.location = "http://localhost:8000/#!/Home"
                                }
                            },
                            "Eat!"
                        )
                    ])
                ])
            ])
        ])
    }
}