TrolleApp.Routers.HomeRouter = Support.SwappingRouter.extend({

  initialize: function(options){
		//lets get rid of these 'magic numbers' by explicitly referring the elements we want
    this.visiting_user = options[0];
    this.user_boards = options[1];
    TrolleApp.visiting_user = this.visiting_user;
    TrolleApp.user_boards = this.user_boards;
    TrolleApp.metaCollection = [];
    for (var i = 0; i < TrolleApp.user_boards.length; i++){
      TrolleApp.metaCollection.push(TrolleApp.user_boards[i].id);
    }

  },

  routes: {
    "" : "index",
  },

  index: function(){
    var user_boards = this.user_boards;
    var visiting_user = this.visiting_user;
    var homeIndexForm = new TrolleApp.Views.HomeIndex({current_user: visiting_user, user_boards: user_boards, collection: TrolleApp.Collections.Boards});
    var renderedHome = homeIndexForm.render();
    $("#content").html(renderedHome.el);
  },
});