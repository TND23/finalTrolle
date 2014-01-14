TrolleApp.Views.ListShow = Backbone.View.extend({

  initialize: function(options){
		TrolleApp.Collections.Cards = new TrolleApp.Collections.Cards(options.list_id);
		//TrolleApp.Collections
	},

  template: JST['boards/show'],
  events: {

  },

  render: function(){
		var that = this;
    var id = this.current_board.id;
    $(this.el).html(this.template({collection: this.collection, board: this.current_board, data: this.data}));

    $.ajax({
      url: "/boards/"+id+"/lists.json",
      type:"GET",
      success: function(data){
				that.makeDraggable();
				that.makeDroppable();
			}
    });
    return this;
  },
});