TrolleApp.Collections.Lists = Backbone.Collection.extend({
	initialize: function(options){
		this.board_id = options.board_id;
	},
  // parse: function(response){
  // 	console.log(response);
  //  },

  url: function(){
    var url = "/boards/" + this.board_id + "/lists";
    return url;
  },

	model: TrolleApp.Models.List
});
