var m = require("mithril")

var Locations = {
    doc_id: "59638a12f36d283e6e74be5b",
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

    addLocation: function(newLocation) {
        const newRes = {"_id": Locations.doc_id, restaurant: newLocation}
        return m.request({
            method: "PUT",
            url: "http://localhost:8000/Restaurants",
            data: newRes
        })
        .then(function(response) {
            console.log("res", response)
        })
    }
 
}
module.exports = Locations;