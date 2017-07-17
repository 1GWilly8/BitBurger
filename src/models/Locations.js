var m = require("mithril")
var users = require("./Users")

var Locations = {
    locations_doc_id: "59638a12f36d283e6e74be5b",
    location_list: null,
    todays_locations: [],

    loadList: function() {
        Locations.todays_locations = []
        return m.request({
                method: "GET",
                url: "http://localhost:8000/Restaurants",
            })
            .then(function(response) {
                Locations.location_list = response[0].restaurants
                const numChoices = Math.floor((Math.random() * 3) + 3)
                console.log("Num Options", numChoices)
                const locListLen = Locations.location_list.length
                var candidate = null
                var pass = false
                for (var i = 1; i <= numChoices; i++) {
                    candidate = Math.floor((Math.random() * locListLen))
                    for (var j = 0; j <= Locations.todays_locations.length; j++) {
                        // console.log(Locations.todays_locations[j])
                        // console.log(Locations.location_list[candidate])
                        if (Locations.todays_locations[j] == Locations.location_list[candidate]) {
                            pass = true
                            console.log("duplicate")
                            i--
                        }
                    }
                    if (!pass) {
                        Locations.todays_locations.push(Locations.location_list[candidate])
                        //console.log("iteration", Locations.todays_locations)
                    } else {
                        pass = false
                    }
                }
                m.redraw()

            })
    },

    // selectTodaysLocations: function() {
    //     const numChoices = Math.floor((Math.random() * 5) + 3)
    //     const locListLen = Locations.location_list.length()
    //     for (var i = 1; i <= numChoices; i++) {
    //         Locations.todays_locations.append(Locations.location_list(Math.floor((Math.random() * locListLen))))
    //     }
    // },

    addLocation: function(newLocation) {
        const newRes = { "_id": Locations.locations_doc_id, restaurant: newLocation }
        return m.request({
                method: "PUT",
                url: "http://localhost:8000/Restaurants",
                data: newRes
            })
            .then(function(response) {

            })
    },

    resetLocations: function() {
        if (users.numUsers == 0) {
            users.getUsers()
        }
        console.log("votes: ", users.reset_vote.length)
        if (Math.floor(users.numUsers * (2 / 3)) <= users.reset_vote.length) {
            Locations.loadList()
        }
    }
}
module.exports = Locations;