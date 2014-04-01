TrolleApp.Models.List = Backbone.Model.extend({
  initialize: function(options){
    this.board_id = options['board_id'];
    this.listtitle = options['listtitle'];

  },

	defaults: {
		"cardCollection" : [],
	},

  swapOrder: function(target_list){
    var temp = this.order;
    this.order = target_list.order;
    target_list.order = temp; 
  },


  urlRoot: function(){
    var url = "/boards/" + this.board_id + "/lists";
    return url;
  },

});