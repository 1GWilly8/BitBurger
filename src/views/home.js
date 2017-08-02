var m = require("mithril")

var faye = require("faye");
var profile = require("../models/Profile")
var locations = require("../models/Locations")
var users = require("../models/Users")
var chat = require("../models/Chat")

var client = new faye.Client("http://localhost:8000/faye");

// m.mount("form", [
//  m("input['type=text', 'name=identifier']"),
//  m("input['type=submit']", {
//  onclick: function(identifier) {
//      var value = "{name = " + identifier + "}"
//      return m.request({
//             method: "POST",
//             url: "https://f5a15j7due.execute-api.us-east-1.amazonaws.com/latest/getLink",
//             data: value
//         })
//         .then(function(response) {
//          window.location(response.link)
//         })
//  }
// })])

// src/views/Layout.js
var state = {
    value: "",
    chatMessage: "",
    setValue: function(v) {
        state.value = v;
    },
    setChatMessageValue: function(v) {
        state.chatMessage = v;
    },
    curResetVote: 0,
    curVoteLead: users.voteLead
}

function locationClick(obj) {
    profile.castVote(obj);
    // console.log("clicked", "   " + obj);
    return;
};

client.subscribe("/test", function(message) {
    users.getVotes()
});

client.subscribe("/addRest", function(message) {
    console.log('Got a new opt for today: ' + message.text);
    locations.loadList()
    m.redraw()
    console.log("getVote from faye", locations.todays_locations)
    users.getVotes()
});

client.subscribe("/chat", function(message) {
    console.log("Ishould be getting msg, but I'm not")
    chat.loadMessages()
    m.redraw()
});

module.exports = {
    oninit: function() {
        // if (!localStorage.user_id) {
        //     window.location = "http://localhost:8000/#!/NewUser"
        // }
        users.countVotes()
        profile.checkLogIn()
        // setTimeout(function() {
        // }, 5000)
        console.log("voteLead", state.voteLead)
        users.getUsers()
        users.getVotes()
        chat.loadMessages()
        // chat.sendMessage("test")
        // locations.loadList(profile.loadNewLocations)
        // locations.selectTodaysLocations()
    },

    onupdate: function() {
        //users.diff()
    },
    // controller: function() {

    // }
    view: function(vnode) {
        return m("main", [
            m("nav.navbar.navbar-inverse.fixed-top.bg-inverse", [
                m("div.container", [
                    m("a.navbar-brand[href='#']", [
                        m("span", m("img[src='src/img/Bitburger_Logo.png'][width='30'][height='30'][class='d-inline-block align-top'][alt='']")),
                        "BitBurger"
                    ]),
                    m("a.navbar-right[data-target='#sign_in_modal'][data-toggle='modal']",
                        m("img[src='src/img/signIn_Button.png'][width='40'][height='40']")),
                    // (profile.is_signedIn) ? [
                    //     m("h3.navbar-right", "Hello, " + profile.user_name)
                    // ] : [m("h3.navbar-right", "Sign In/Create Account")]
                ])

            ]),
            m("div.container", [
                m(".col-md-8", [
                    m(".row", [
                        m(".col-md-6", m("h1", "Today's options:")),
                        m(".col-md-3"),
                        m(".col-md-5", [
                            m("span.lead_text", "Current Lead: " + users.voteLead)
                        ])
                    ]),
                    m("p", "Click the button next to the place of your choice, To change vote simple click a different Place."),
                    m(".vertical_break_md"),
                    m(".container col-md-12 h-50", [
                        // m(".col-md-1"),
                        // m(".col-md-11 .h-25", [
                        m("div[id='radio_box']",
                            locations.todays_locations && locations.todays_locations.map(function(obj, index) {
                                // console.log("obj", obj)
                                // console.log("index", index)
                                return [m("span.col-md-4", [
                                        m("input[type='radio'][name='location']", {
                                            onclick: function() {
                                                profile.castVote(obj)
                                                console.log("clicked", "   " + obj)
                                            }
                                        }),
                                        m("span.medium", "   " + obj),
                                        m(".vertical_break_sm")
                                    ]),
                                    (index == 2 || index == 5) ? [m("br")] : ""

                                ]
                            })
                        )

                        // ])

                    ]),
                    m("p.sub_text", "Don’t See a place you like, add here"),
                    m(".vertical_break_sm"),
                    // m(".row ", [
                    m("form.row[id='newRes']", [
                        m("input.input_add.col-md-6[type=text][placeholder='Location']", {
                            oninput: m.withAttr("value", state.setValue),
                            value: state.value,
                        }),
                        m("button.btn_main.col-md-4[type='submit'][form='newRes']", {
                            onclick: function() {
                                console.log("To add: ", state.value)
                                const newRes = { "docId": locations.todays_locations_doc_id, restaurants: state.value }
                                console.log("newRes tast", newRes)
                                locations.addLocation(state.value)
                                m.request({
                                        method: "PUT",
                                        url: "http://localhost:8000/Restaurants",
                                        data: newRes
                                    })
                                    .then(function(response) {

                                    })
                                state.value = ""
                            }
                        }, "Add"),
                        // ]),
                    ]),
                    m(".vertical_break_sm"),

                    m("p.sub_text", "Will only reset with the Agreement of 2/3rds of the group"),
                    m("button.btn_second", {
                        onclick: function() {
                            profile.voteForReset()
                            locations.resetLocations()
                            state.curResetVote
                            m.request({
                                    method: "GET",
                                    url: "http://localhost:8000/Meta"
                                })
                                .then(function(response) {
                                    console.log("this doc", response[1].resetVoteCount)
                                    state.curResetVote = response[1].resetVoteCount
                                    m.redraw()
                                })
                        }
                    }, "Reset chocies"),
                    m("span.sub_btn_text", "Currently " + Math.floor((state.curResetVote + 1) / (users.numUsers / 3)) + "/3rds"),


                    m(".modal.fade[aria-labelledby='myModalLabel'][id='sign_in_modal'][role='dialog'][tabindex='-1']",
                        m(".modal-dialog.summary-dialog[role='document']",
                            m(".modal-content", [
                                m(".modal-header", [
                                    m("button.close[aria-label='Close'][data-dismiss='modal'][type='button']",
                                        m("span[aria-hidden='true']",
                                            "×")
                                    ),
                                    m("h4.modal-title[id='myModalLabel']",
                                        "BitBurger Sign In")
                                ]),
                                m(".modal-body", [
                                    m("label",
                                        "UserName/E-mail"),
                                    m("input.form-control[type='text']"),
                                    m("label",
                                        "Password"),
                                    m("input.form-control[type='password']")
                                ]),
                                m(".modal-footer.summary-footer", [
                                    m("a[href='/auth/google']", { oncreate: m.route.link },
                                        "Sign In with Google"
                                    ),
                                    m("button.btn[type='button']",
                                        "Sign In"),
                                    m("button.btn[data-dismiss='modal'][type='button']",
                                        "Cancel")

                                ])
                            ])
                        )
                    ),
                ]),
                m(".col-md-2"),
                m("div.chat_backboard.col-md-4", [
                    m("h1.chat_title", "Chat:"),
                    m("div.message_board[id='messageBoard']", [
                        // oninit: function() {
                        // var element = document.getElementById("messageBoard");
                        // var elementHeight = element.scrollHeight;
                        // element.scrollTop = elementHeight
                        // },
                        chat.messages && chat.messages.map(function(obj, index) {
                            // var actualName = users.userIds.find(function(obj[0]) {
                            //     return 
                            // })
                            // console.log("HERE!!", users.userIds[obj[0]])
                            // if (obj[0] == profile.user_id) {
                            if (obj[0] == localStorage.user_id) {
                                return m("div.my_message", [
                                    m("span.message_name_display", obj[0]),
                                    m(".vertical_break_min"),
                                    m("div.my_message_text_display", obj[2])
                                ])
                            } else {
                                return m("div.message", [
                                    m("span.message_name_display", obj[0]),
                                    m(".vertical_break_min"),
                                    m("div.message_text_display", obj[2])
                                ])
                            }

                        })
                        // ,
                        // oninit: function() {
                        //     var objDiv = document.getElementById("div.message_board");
                        //     objDiv.scrollTop = objDiv.scrollHeight;
                        //     this.scrollTop = this.scrollHeight
                        // }
                    ]),
                    m("span.user_display", "Malik:"),
                    m("input.input_message.col-md-8[type=text][placeholder='Type your message here']", {
                        oninput: m.withAttr("value", state.setChatMessageValue),
                        value: state.chatMessage,
                        onkeyup: function(event) {
                            if (event.keyCode == 13 && event.target.value != "") {
                                chat.sendMessage(state.chatMessage),
                                    state.setChatMessageValue("")
                            }
                        }
                    }),
                    m("button.btn_send.col-md-4", {
                        onclick: function() {
                            chat.sendMessage(state.chatMessage)
                        }
                    }, "Add")
                    // m("div.chat_gradient")
                ]),

            ])
        ])
    }
}