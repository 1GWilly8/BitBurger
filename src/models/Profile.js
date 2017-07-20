var m = require("mithril")
var users = require("./Users")
var locations = require("./Locations")

var Profile = {
    is_signedIn: false,
    user_name: "",
    user_id: "59639d01f36d283e6e74cb27",
    resetVote: false,

    oninit: function() {
        console.log("/Users init")
        return m.request({
            method: "GET",
            url: "http://localhost:8000/Users",
        })
    },

    castVote: function(place) {
        var vote = { "_id": Profile.user_id, "place": place }
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
        if (!Profile.resetVote) {
        }
            users.reset_vote.push("aye")
            Profile.resetVote = true
    },

    checkLogIn: function() {
        var logInTime = new Date().getTime()
        // console.log("New Date Obj", logInTime)

        m.request({
                method: "GET",
                url: "http://localhost:8000/Meta"
            })
            .then(function(response) {
                if ((logInTime - response[0].lastInit) >= 86400000) {
                    console.log("First log in in 24+ hrs. Fetching new vote")
                    locations.loadList(true)

                    var startOfDay = (logInTime - (logInTime%86400000))
                    console.log("eLogTime", startOfDay)

                    var data = {"docId": "596d0828734d1d0ff260479a", "logInTime": startOfDay}
                    m.request({
                        method: "PUT",
                        url: "http://localhost:8000/Meta",
                        data: data
                    })
                } else {
                    users.getVotes()
                    locations.loadList(false)
                }
            })
    }
    // sign_in: function() {}

    //     log_out: function() {
    //     is_signedIn = false;
    //     user_name = "";
    //     window.location.reload(true);
    // }
}
module.exports = Profile;