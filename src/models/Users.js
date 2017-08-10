var m = require("mithril")

var Users = {
    users_doc_id: "59836db8f36d2839ce8cd389",
    users_list: [],
    users_names_list: [],
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
                console.log("users__:", Users.userIds)
                for (key in response[0]) {
                    if (!rmIdValue) {
                        Users.numUsers++
                            // console.log("users++", Users.users_names_list)
                            Users.users_names_list.push(key)
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
        var tmpVoteTally = Users.vote_tally
        var maxVotes = 0
        var curLead = ""

        // Users.vote_tally.forEach(function(itm) {
        //     if (!itm.__proto__.__proto__) {
        //         cnt++;
        //     }
        // });

            console.log("vote_tally len", Users.vote_tally.length)
        for (var i = 0; i < Users.vote_tally.length; i++) {
            console.log("entering 1st for loop")
            if (Users.vote_tally[i] != "") {
                console.log("count non-null space in vote_tally")
                var curTally = 1
                for (var j = i + 1; j < Users.vote_tally.length; j++) {
                    console.log("entering 2nd for loop")
                    if (Users.vote_tally[i] == Users.vote_tally[j]) {
                        console.log("vote_tally len", Users.vote_tally)
                        console.log("instance of match", Users.vote_tally[i])
                        Users.vote_tally[j] = ""
                        curTally++
                    }
                }
                if (curTally == maxVotes) {
                    curLead = curLead + " and " + Users.vote_tally[i] + " are tied."
                } else if (curTally > maxVotes) {
                    curLead = Users.vote_tally[i],
                        maxVotes = curTally
                }
                console.log("curLeadddd", curLead)
            }
        }
        Users.voteLead = curLead
        console.log("lead: ", curLead)
        Users.vote_tally = tmpVoteTally
        m.redraw()
    },

    clearUsers: function() {
        var data = { "resetting": true }
        m.request({
            method: "PUT",
            url: "http://localhost:8000/Users/",
            data: data
        })
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