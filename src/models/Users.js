var m = require("mithril")

var Users = {
    users_doc_id: "595e65fd734d1d25634234d3",
    users_list: [],
    vote_tally: [],
    vote_count: [],
    reset_vote: [],
    voteLead: "",
    numUsers: 0,

    userIds: {},

    getUsers: function() {
        numUsers = 0
        var rmIdValue = true
        return m.request({
                method: "GET",
                url: "http://localhost:8000/Users/" + Users.users_doc_id
            })
            .then(function(response) {
                Users.userIds = response[0]
                console.log("users__:", userIds)
                for (key in response[0]) {
                    if (!rmIdValue) {
                        Users.numUsers++
                            // console.log("users++", Users.numUsers)
                            Users.users_list.push(response[0][key])
                    } else {
                        rmIdValue = false
                    }
                }
            })
    },

    getVotes: function() {
        if (Users.vote_tally != []) {
            Users.vote_tally = []
        }
        console.log("getVote initiated")
        var counter = 1
        for (var i = 0; i < Users.users_list.length; i++) {
            m.request({
                    method: "GET",
                    url: "http://localhost:8000/Users/" + Users.users_list[i]
                })
                .then(function(response) {
                    counter++
                    Users.vote_tally.push(response[0].vote)
                    if (counter == Users.users_list.length) {
                        Users.countVotes()
                    }
                })
        }
    },

    countVotes: function() {
        // console.log("####### count initiated #######")
        // console.log("U.vote_tally", Users.vote_tally)
        var maxVotes = 0
        var curLead = ""
        for (var i = 0; i < Users.vote_tally.length; i++) {
            if (Users.vote_tally[i] != "") {
                var curTally = 1
                for (var j = i + 1; j < Users.vote_tally.length; j++) {
                    if (Users.vote_tally[i] == Users.vote_tally[j]) {
                        // console.log("count: ", Users.vote_tally[i], curTally + 1)
                        Users.vote_tally[j] = ""
                        curTally++
                    }
                }
                if (curTally > maxVotes) {
                    curLead = Users.vote_tally[i],
                        maxVotes = curTally
                }
            }
        }
        Users.voteLead = curLead
        // console.log("lead: ", curLead)
    },

    // diff: function() {
    //     var tmpVotes = []
    //     tmpVotes.push(Users.vote_tally)
    //     Users.getVotes()
    //     console.log("tmpVotes", tmpVotes)
    //     console.log("Users.vote_tally", Users.vote_tally)
    //     if (tmpVotes != Users.vote_tally) {
    //         // Users.countVotes()
    //     }
    // }
}

module.exports = Users;