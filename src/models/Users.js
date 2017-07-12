var m = require("mithril")

var Users = {
    users_doc_id: "595e65fd734d1d25634234d3",
    users_list: [],
    vote_tally: [],
    vote_count: [],
    voteLead: "",

    getUsers: function() {
        var rmIdValue = true
        return m.request({
                method: "GET",
                url: "http://localhost:8000/Users/" + Users.users_doc_id
            })
            .then(function(response) {
                for (key in response[0]) {
                    if (!rmIdValue) {
                        Users.users_list.push(response[0][key])
                    } else {
                    	rmIdValue = false
                    }
                }
                Users.countVotes()
            })
    },

    getVotes: function() {
        // console.log("here", Users.users_list)
        for (var i = 0; i < Users.users_list.length; i++) {
            // console.log("there", Users.users_list[i])
            m.request({
                method: "GET",
                url: "http://localhost:8000/Users/" + Users.users_list[i]
            })
            .then(function(response) {
                Users.vote_tally.push(response[0].vote)
                // console.log("res", Users.vote_tally)
        // Users.countVotes()
            })
        }
    },

    countVotes: function() {
        Users.getVotes()
        var maxVotes = 0
        var curLead = ""
        for (var i = 0; i < Users.vote_tally.length; i++) {
            console.log("e For 1")
            if (Users.vote_tally[i] != "") {
                console.log("e If 1")
                var curTally = 1
                for (var j = i + 1; j < Users.vote_tally.length; j++) {
                    console.log("e For 2")
                    if (Users.vote_tally[i] == Users.vote_tally[j]) {
                        console.log("e If 2"),
                        curTally++
                    }
                }
                if (curTally > maxVotes) {
                    curLead = Users.vote_tally[i],
                    maxVotes = curTally
                }
            }
        }
        voteLead = curLead
        console.log("lead: ", curLead)
    },

    diff: function() {
        var tmpVotes = []
        tmpVotes.push(Users.vote_tally)
        Users.getVotes()
        console.log("tmpVotes", tmpVotes)
        console.log("Users.vote_tally", Users.vote_tally)
        if (tmpVotes != Users.vote_tally) {
            // Users.countVotes()
        }
    }
}

module.exports = Users;
