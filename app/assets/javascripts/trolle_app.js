window.TrolleApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(currentUser, routerOption, currentBoards) {
    TrolleApp.csrfToken = $("meta[name='csrf-token']").attr('content');
    TrolleApp.currentUser = currentUser;

	TrolleApp.Collections.Boards = new TrolleApp.Collections.Boards({visiting_user: TrolleApp.currentUser});
      TrolleApp.Collections.Cards = new TrolleApp.Collections.Cards();
      // loop thru & find lists
      // get the id build model for list
      //do this on the home router initializition
      //
    var $rootEl = $('#content');
    //get the router or assign it
    var routerOption = routerOption || 1;
    var visiting_user = currentUser || JSON.parse($('#user_boots').html()).current_user;

    if($('#user_board_boots').length > 0){
      var user_boards = JSON.parse($('#user_board_boots').html()).user_boards;
    } else {
      user_boards = currentBoards;
    }

    if(visiting_user){
      var board = new TrolleApp.Models.Board();
    }

	if(TrolleApp.currentBoardID){
		TrolleApp.Collections.currentBoardLists = new TrolleApp.Collections.Lists({board_id: that.id});
		TrolleApp.Collections.currentBoardLists.fetch();
	}

		//decide which router is to be used based on what's passed in
    TrolleApp.Collections.Boards.fetch({
      success: function(){
        if (routerOption == 1) {
          TrolleApp.homeRouter = new TrolleApp.Routers.HomeRouter([visiting_user, user_boards]);
					console.log('1');
				}
        if (routerOption == 2){
					console.log('2')
          TrolleApp.Collections.Cards.fetch();
          TrolleApp.boardRouter = new TrolleApp.Routers.BoardRouter();
        }
        Backbone.history.start();
      },
      error: function(model, response){
        alert("We're so sorry... something has gone terribly wrong.");
      }
    })
  }
};