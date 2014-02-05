TrolleApp.Models.Board = Backbone.Model.extend({

	initialize: function(){
		var bTitle = this.escape("boardtitle");
		this.boardtitle = bTitle;
	},

  urlRoot: function(){
    var url = '/users/' + current_user.id + '/boards';
    return url;
  },

	collection: TrolleApp.Collections.Lists,
});