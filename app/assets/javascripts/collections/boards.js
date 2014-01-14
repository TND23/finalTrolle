TrolleApp.Collections.Boards = Backbone.Collection.extend({

	initialize: function(options){
		this.visiting_user = options.visiting_user;
	},

  model: TrolleApp.Models.Board,
  url: function(){
		var url = '/users/' + this.visiting_user.id + '/boards';
		return url;
	}
});