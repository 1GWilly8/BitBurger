var m = require("mithril")

var Profile = {
    is_signedIn: false,
    user_name: "",
    user_id: "59639d01f36d283e6e74cb27",

    oninit: function() {
    	console.log("/Users init")
    	return m.request({
            method: "GET",
            url: "http://localhost:8000/Users",
        })
    },

    castVote: function(place) {
    	var vote = {"_id": Profile.user_id, "place": place}
    	return m.request({
            method: "PUT",
            url: "http://localhost:8000/Users",
            data: vote,
        })
        .then(function(response) {
            console.log("res", response)
            // console.log("location_list", Locations.location_list)
            m.redraw()
            
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
