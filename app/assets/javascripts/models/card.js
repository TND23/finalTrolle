TrolleApp.Models.Card = Backbone.Model.extend({

	initialize: function(list_id){
		console.log(list_id);
		this.attributes.list_id = list_id;
		this.list_id = list_id;
	},

	urlRoot: "/cards/",

	defaults: {
		cardtitle: "",
		cardbody: "",
	}


});