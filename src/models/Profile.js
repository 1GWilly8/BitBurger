var m = require("mithril")
var users = require("./Users")
var locations = require("./Locations")
var chat = require("./Chat")
var moment = require("moment")

var Profile = {
    is_signedIn: false,
    user_name: "",
    // user_id: "59639d14f36d283e6e74cb30",
    resetVote: false,

    oninit: function() {
        console.log("/Users init")
        // test user id
        // localStorage.setItem('user_id', "59639d14f36d283e6e74cb30");
        return m.request({
            method: "GET",
            url: "http://localhost:8000/Users",
        })
    },

    castVote: function(place) {
        // var vote = { "_id": Profile.user_id, "place": place }
        var tmp = users.userIds[localStorage.user_id]
        var vote = { "_id": tmp[0], "place": place }
        return m.request({
                method: "PUT",
                url: "http://localhost:8000/Users",
                data: vote,
            })
            .then(function(response) {
                // console.log("res", response)
                // console.log("location_list", Locations.location_list)
                m.redraw()

            })
    },

    voteForReset: function() {
        if (!Profile.resetVote) {}
        users.reset_vote.push("aye")
        Profile.resetVote = true
        var data = { "docId": "5978a267f36d2866105775ba", "resetCount": users.reset_vote.length, "reset": "true" }
        m.request({
            method: "PUT",
            url: "http://localhost:8000/Meta",
            data: data

        })
    },

    checkLogIn: function() {
        var logInTime = moment().unix()
        // console.log("New Date Obj", logInTime)
        m.request({
                method: "GET",
                url: "http://localhost:8000/Meta"
            })
            .then(function(response) {
                if ((logInTime - response[0].lastInit) >= 86400000) {
                    console.log("First log in in 24+ hrs. Fetching new vote")
                    locations.loadList(true)

                    var startOfDay = moment().startOf('day').unix()
                    console.log("eLogTime", startOfDay)

                    var data = { "docId": "596d0828734d1d0ff260479a", "logInTime": startOfDay }
                    var data1 = { "docId": "5979fba1734d1d4610dc06d9", "reset": true }
                    m.request({
                        method: "PUT",
                        url: "http://localhost:8000/Meta",
                        data: data
                    })
                    // call chat.clear messages
                    users.clearUsers()
                    chat.clear()
                    return "cleared"

                    // m.request({
                    //     method: "PUT",
                    //     url: "http://localhost:8000/Chat",
                    //     data: data1
                    // })
                    // .then(function(response) {
                    //     chat.loadMessages()
                    // })
                } else {
                    console.log("Not first log in in 24 hrs")
                    users.getVotes()
                    locations.loadList(false)
                }
            })

    }
}
module.exports = Profile;