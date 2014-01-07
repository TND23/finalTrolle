TrolleApp.Views.BoardIndex = Backbone.View.extend({

  initialize: function(options){
    this.user = options.current_user;
    this.collection = options.collection;
		TrolleApp.fhtw = this.collection;
		this.listenTo(
			options.collection,
			"add",
			this.render
		);
	},

  template: JST['boards/index'],
  events: {
    "click #boardForm" : "showBoardForm",
    "click #createBoard" : "submitBoard",
    "click #home" : "goHome",
    "click .indivBoard" : "rerenderPage",
  },

  showBoardForm: function(){
    //restyle this so that it doesn't overlap with the list form
    var that = this;
    if($("#createContainer").length > 0){
      $('#createHolder').toggle();
    }
    else{
      $('#createHolder').append((JST['boards/new']({user: that.user})));
      $('#createHolder').toggle();
    }
  },

  submitBoard: function(event){
    event.preventDefault();
    var that = this;
    var id = this.user.id;
    var title = $('#board_boardtitle').val()
    if(title.length < 1){
      alert("please give your board a title");
      window.location = "users/"+id+"/boards";
    }
    else{

      var newBoard = new TrolleApp.Models.Board({boardtitle: title, user_id: id}, {collection: that.collection});

			//listenTo allows dynamic rendering
      newBoard.save(newBoard.attributes,
				{
					success: function(){
						that.collection.add(newBoard);
						that.collection.fetch();

					},
					error: function(){alert("something has gone wrong in saving");}
				});
    }
  },

  goHome: function(){
    window.location = ("/");
  },

  rerenderPage: function(event){
		//generates lists that correspond with the board if there are any lists.
		console.log(event.target);
      event.preventDefault();
      $('#boardTitle').remove();
      $('.listOfLists').remove();

      //$('#home_menu').remove();
      this.off();
      window.location = event.target;

  },

  render: function(){
    var that = this;
    var boards = that.user_boards;
    $(this.el).html(this.template({boards: that.collection}));
    return this;
  },
});
