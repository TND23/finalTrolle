TrolleApp.Collections.Cards = Backbone.Collection.extend({

	initialize: function(list_id){
		this.list_id = list_id;
	},

  model: TrolleApp.Models.Card,
	url: "/cards/"
});