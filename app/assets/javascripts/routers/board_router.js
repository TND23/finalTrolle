TrolleApp.Routers.BoardRouter = Support.SwappingRouter.extend({

  initialize: function(){
    this.visiting_user = TrolleApp.currentUser;
  },

  routes: {
    "" : "index",
    ":id/lists" : "findBoard",

  },

  index: function(){
    var that = this;
    var visiting_user = this.visiting_user;
    var boardView = new TrolleApp.Views.BoardIndex({current_user: visiting_user, collection: TrolleApp.Collections.Boards});
    TrolleApp.Collections.Boards.fetch({reset: true, user_id: this.visiting_user});
    $("#board_content").empty();
    $('#board_content').append(boardView.render().el);

    console.log('here');
  },

  findBoard: function(id){
    var that = this;
    this.id = id;
    this.user_id = current_user.id;
    // fetch list collection when visiting new board
    // find the corresponding board and render it
    TrolleApp.Collections.currentBoardLists = new TrolleApp.Collections.Lists({board_id: id});
    //change this so that the list is not created every time we render the board.
    // this way we can have a meaningful default attribute of a list and it is likely this will fix the refresh problem
    TrolleApp.Collections.currentBoardLists.fetch();
    
    $.ajax({
      url: "/users/"+ this.user_id +"/boards/"+id+".json",
      type:"GET",
      success: function(data){
        that.displayResult(data);
			}
    });
  },

  displayResult: function(data){
    var that = this;
        TrolleApp.Collections.currentBoardLists.reset(data.lists);
      for (var i = 0; i < TrolleApp.Collections.Boards.length; i++){
        if (TrolleApp.Collections.Boards.models[i].id == that.id){
          var current_board = TrolleApp.Collections.Boards.models[i];
          $("#board_content").empty();
          $("#menu").empty();
          TrolleApp.boardDisplay = new TrolleApp.Views.BoardShow({collection: TrolleApp.Collections.currentBoardLists, current_board: current_board, data: data});
	    $('#board_content').append(TrolleApp.boardDisplay.render().el);
        }
      }
    }
});