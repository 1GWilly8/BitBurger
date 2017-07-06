var m = require("mithril")

var Locations = {
	location_list: ["Kroger", "Sav's/Chitople", "Joella's", "Kroger", "Sav's/Chitople", "Joella's"],
	// location_list: [],

	loadList: function() {
        return m.request({
            method: "GET",
            url: "http://localhost:8000/users",
        })
        .then(function(response) {
            Locations.location_list = response
            
        })
    },
 
}
module.exports = Locations;