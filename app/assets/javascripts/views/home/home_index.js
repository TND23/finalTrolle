TrolleApp.Views.HomeIndex = Backbone.View.extend({

  initialize: function(options){
    this.user = options.current_user;
    this.user_boards = options.user_boards;
		this.collection = options.collection;
		//listenTo allows dynamic rendering
  },

  template: JST['home/index'],

  events: {
   		 'click #toBoard' : 'goToBoards',
		'mouseenter #toBoard' : 'startBoardDisplayTimer',
		'mouseenter #toSettings' : 'startSettingsDisplayTimer',
		'mouseenter #toBin' : 'startBinDisplayTimer',
		'mouseleave #toBoard' : 'hideBoardPreview',
		'mouseleave #toSettings' : 'hideSettingsPreview',
		'mouseleave #toBin' : 'hideBinPreview',
  },

  goToBoards: function(){
    //remove all BB elements, change router, add new BB content
    var that = this;
    this.off();
    this.remove();
    var current_id = this.user.id;
  },

	startBoardDisplayTimer: function(){
		var that = this;
		this.timeout1 =window.setTimeout(that.displayBoardPreview, 200);
	},

	displayBoardPreview: function(){
		$('#settings-preview').hide();
		$('#bin-preview').hide();
		$('#board-preview').show("clip", 350);
	},

	hideBoardPreview: function(){
		var that = this;
		window.clearTimeout(this.timeout1);
	},


	startSettingsDisplayTimer: function(){
		var that = this;
		this.timeout2 =window.setTimeout(that.displaySettingsPreview, 200);
	},

	displaySettingsPreview: function(){
		$('#board-preview').hide();
		$('#bin-preview').hide();
		$('#settings-preview').show("clip", 350);
	},

	hideSettingsPreview: function(){
		var that = this;
		window.clearTimeout(this.timeout2);
	},


	startBinDisplayTimer: function(){
		var that = this;
		this.timeout3 =window.setTimeout(that.displayBinPreview, 200);
	},

	displayBinPreview: function(){
		$('#board-preview').hide();
		$('#settings-preview').hide();
		$('#bin-preview').show("clip", 350);
	},

	hideBinPreview: function(){
		var that = this;
		window.clearTimeout(this.timeout3);
	},


  render: function(){
    // ensure content only rendered if it doesn't exist
    var that = this;
    $(this.el).append(this.template({user: that.user}));
    return this;
  }
});
