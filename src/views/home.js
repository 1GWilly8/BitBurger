// var m = require("mithril")

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
var m = require("mithril")
var profile = require("../models/Profile")
var locations = require("../models/Locations")
module.exports = {
    // controller: function() {
        
    // }
    view: function(vnode) {
        return m("main", [
            m("nav.navbar.navbar-inverse.fixed-top.bg-inverse", [
                m("a.navbar-brand[href='#']", [
                    m("span", m("img[src='src/img/Bitburger_Logo.png'][width='30'][height='30'][class='d-inline-block align-top'][alt='']")),
                    "BitBurger"
                ]),
                m("a.navbar-right[data-target='#sign_in_modal'][data-toggle='modal']",
                    m("img[src='src/img/signIn_Button.png'][width='40'][height='40']")),
                // (profile.is_signedIn) ? [
                //     m("h3.navbar-right", "Hello, " + profile.user_name)
                // ] : [m("h3.navbar-right", "Sign In/Create Account")]

            ]),
            m(".row", [
                m(".col-md-2"),
                m(".col-md-8", [
                    m(".row", [
                        m(".col-md-4", m("h1", "Choose place:")),
                        m(".col-md-3"),
                        m(".col-md-5", [
                            m("span.lead_text", "Current Lead:"),
                            m("span.lead_sub_text", "place in lead")
                        ])

                    ]),
                    m(".row", [
                        m(".col-md-4", m("p.info_text", "Click the button next to the place of your choice, To change vote simple click a different Place.")),
                        m(".col-md-3"),
                        m(".col-md-5")

                    ]),
                    m(".row", [
                        m(".col-md-1"),
                        m(".col-md-11", [
                            m("div",
                                m("form", [
                                    locations.location_list.map(function(obj, index) {
                                        return [m("span", [
                                                m("input[type='radio'][name='location']"),
                                                m("span.input_radio", obj)
                                            ]),
                                            (index == 2 || index == 5) ? [m("br")] : ""

                                        ]
                                    })

                                ])
                            )

                        ])

                    ]),
                    m("div", [
                        m("p.sub_text", "Don’t See a place you like, add here"),
                        m("input.input_add[type=text][placeholder='Location']"),
                        m("span", m("button.btn_main", "Add")),
                        m("p.sub_text", "Will only Reset with the Agreement of 2/3rds of the group"),
                        m("button.btn_second", "Reset chocies"),
                        m("span.sub_btn_text", "Currently 0/3rds")
                    ]),

                    m("div.chat_backboard", [
                        m("h1.chat_title", "Chat:"),
                        m("div.message_board"),
                        m("span.user_display", "Malik:"),
                        m("input.input_message[type=text][placeholder='Type your message here']"),
                        m("span", m("button.btn_send", "Add")),


                    ]),


                    //
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
                    )
                ]),
                m(".col-md-2")

            ])
        ])
    }
}
