TrolleApp.Models.List = Backbone.Model.extend({
  initialize: function(options){
    this.board_id = options['board_id'];
    this.listtitle = options['listtitle'];
    // this.attributes.cards = new TrolleApp.Collections.Cards(this.attributes.id);
    // this.attributes.cards.url = '/lists/'+this.attributes.id+'/cards';
    
  },

	defaults: {
		"cardCollection" : [],
	},


  urlRoot: function(){
    var url = "/boards/" + this.board_id + "/lists";
    return url;
  },

});