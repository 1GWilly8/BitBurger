var m = require("mithril")

var Locations = {
	//location_list: ["Kroger", "Sav's/Chitople", "Joella's", "Kroger", "Sav's/Chitople", "Joella's"],
	location_list: null,

	loadList: function() {
        return m.request({
            method: "GET",
            url: "http://localhost:8000/Restaurants",
        })
        .then(function(response) {
            Locations.location_list = response[0].restaurants
            // console.log("res", response)
            // console.log("location_list", Locations.location_list)
            m.redraw()
            
        })
    },
 
}
module.exports = Locations;