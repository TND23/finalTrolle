TrolleApp.Models.List = Backbone.Model.extend({
  initialize: function(options){
    this.board_id = options['board_id'];
    this.listtitle = options['listtitle'];
  },

	defaults: {
		"cardCollection" : [],

	},


  urlRoot: function(){
    var url = "/boards/" + this.board_id + "/lists";
    return url;
  },

});