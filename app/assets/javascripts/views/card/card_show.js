TrolleApp.Views.CardShow = Backbone.View.extend({

	initialize: function(options){
		this.id = options['collection'].id;
		var that = this;

    $.ajax({
      url: "/cards",
      type:"GET",
      success: function(data, id){
				that.render(data);
			}
    });
	},

	template: JST['cards/show'],

	render: function(data, id){
		var data = data;
		var that = this;
		for (var i = 0; i < data.length; i++){
      			if (data[i].list_id === that.id){
				$("#list"+that.id+"Content").append(this.template({card: data[i]}));
			}
		}
		return this.el;
	}
});