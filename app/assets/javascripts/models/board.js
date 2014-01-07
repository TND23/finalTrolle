TrolleApp.Models.Board = Backbone.Model.extend({

  urlRoot: function(){
    var url = '/users/' + current_user.id + '/boards';
    return url;
  },

	collection: TrolleApp.Collections.Lists

});