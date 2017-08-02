var m = require("mithril");
var users = require("./Users");

var Locations = {
    locations_doc_id: "59638a12f36d283e6e74be5b",
    todays_locations_doc_id: "596d2881734d1d0ff2605936",
    location_list: null,
    todays_locations: [],

    loadList: function(firstLoad) {
        Locations.todays_locations = []
        const details1 = { "docId": Locations.locations_doc_id }
        // console.log("hEre", details1)
        return m.request({
                method: "GET",
                url: "http://localhost:8000/Restaurants",
                data: details1
            })
            .then(function(response) {
                Locations.location_list = response[0].restaurants
                if (firstLoad) {
                    console.log("selectTodaysLocations")
                    Locations.selectTodaysLocations()

                    const details2 = {
                        "docId": Locations.todays_locations_doc_id,
                        "restaurants": Locations.todays_locations,
                        "multi": true
                    }
                    console.log("deets", details2)
                    m.request({
                        method: "PUT",
                        url: "http://localhost:8000/Restaurants",
                        data: details2
                    })
                } else {
                    // console.log("hear")
                    const details3 = { "docId": Locations.todays_locations_doc_id }
                    m.request({
                            method: "GET",
                            url: "http://localhost:8000/Restaurants",
                            data: details3
                        })
                        .then(function(response) {
                            Locations.todays_locations = response[0].restaurants
                            console.log("_-__-", response[0].restaurants)
                        })
                }
                m.redraw()

            })
    },

    selectTodaysLocations: function() {
        console.log("Locations.todays_locations", Locations.todays_locations);
        var numChoices = Math.floor((Math.random() * 3) + 3);
        console.log("Num Options", numChoices);
        var locListLen = Locations.location_list.length;
        console.log("locListLen", locListLen);
        var candidate;

        for (var i = 0; i < numChoices; i++) {
            candidate = Math.floor((Math.random() * locListLen));
            console.log("iteration", candidate)
            console.log("candidate", Locations.location_list[candidate])
            
            if (Locations.todays_locations.indexOf(Locations.location_list[candidate]) < 0) {
                Locations.todays_locations.push(Locations.location_list[candidate])
            } else {
                i--
            }
        }
        console.log("today loc", Locations.todays_locations)
    },

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
            var data = {"_id": "5978a267f36d2866105775ba", "resetCount": 0, "reset": "true"}
            Locations.loadList(true)
            m.request({
                method: "PUT",
                url: "http://localhost:8000/Meta",
                data: data
            })
            users.reset_vote = []
        }
    }
}
module.exports = Locations;