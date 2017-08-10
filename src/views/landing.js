var m = require("mithril")
var profile = require("../models/Profile")
var locations = require("../models/Locations")
var users = require("../models/Users")
var chat = require("../models/Chat")
var moment = require("moment")

var state = {
    value: "",
    setValue: function(v) {
        state.value = v;
    }
}

module.exports = {
    view: function(vnode) {
        return m("body[background='./src/img/BitBurgerBackground.jpg']", [
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
                                            console.log("fin response, why?", response)
                                            var data = { "name": state.value, "uId": response, "mapping": true }
                                            console.log(":::", users.users_names_list.length)
                                            var alreadyInList = false
                                            for (var i = 0; i < users.users_names_list.length; i++) {
                                                if (users.users_names_list[i] == state.value) {
                                                    alreadyInList = true
                                                }
                                            }
                                            // console.log('username already in use', alreadyInList)
                                            if (alreadyInList == false) {
                                                console.log("PPP")
                                                m.request({
                                                    method: "PUT",
                                                    url: "http://localhost:8000/Users",
                                                    data: data
                                                })
                                            }

                                        })
                                    var nowPlus7Days = moment().add(7, "days")
                                    document.cookie = "username=" + state.value + "; expires=" + nowPlus7Days.format("dddd, D MMM YYYY HH:mm:ss [UTC]") + "; path=/;";
                                    setTimeout(function() {
                                        window.location = "http://localhost:8000/#!/Home"
                                    }, 600)
                                }
                            }
                        }),
                        m("span.input-group-addon.cursor_pointer", {
                                onclick: function() {
                                    if (state.value !== "") {
                                        m.request({
                                                method: "POST",
                                                url: "http://localhost:8000/Users",

                                            })
                                            .then(function(response) {

                                                localStorage.setItem('user_id', state.value);
                                                var data = { "name": state.value, "uId": response, "mapping": true }
                                                // console.log(":::", data)
                                                var alreadyInList = false
                                                for (var i = 0; i < users.users_names_list.length; i++) {
                                                    if (users.users_names_list[i] == state.value) {
                                                        alreadyInList = true
                                                    }
                                                }
                                                // console.log('username already in use', alreadyInList)
                                                if (alreadyInList == false) {
                                                    console.log("PPP")
                                                    m.request({
                                                        method: "PUT",
                                                        url: "http://localhost:8000/Users",
                                                        data: data
                                                    })
                                                }
                                            })
                                        var nowPlus7Days = moment().add(7, "days")
                                        document.cookie = "username=" + state.value + "; expires=" + nowPlus7Days.format("dddd, D MMM YYYY HH:mm:ss [UTC]") + "; path=/;";
                                        setTimeout(function() {
                                            window.location = "http://localhost:8000/#!/Home"
                                        }, 600)
                                    }
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