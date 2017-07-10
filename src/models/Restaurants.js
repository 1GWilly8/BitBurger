var m = require("mithril")

var Restaurants = {
	doc_id: "59638a12f36d283e6e74be5b"

	getTodaysRestaurants: function() {

	},

	addRestaurant: function() {
		return m.request({
			method: "POST",
			url: "http://localhost:8000/Restaurants"
		})
	}
}

module.exports = Restaurants