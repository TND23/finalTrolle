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
		'mouseleave #toBoard' : 'hideBoardPreview',

		'mouseenter #toSettings' : 'startSettingsDisplayTimer',
		'mouseleave #toSettings' : 'hideSettingsPreview',

		'mouseenter #toBin' : 'startBinDisplayTimer',
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
		this.timeout1 =window.setTimeout(that.displayBoardPreview, 750);
	},

	displayBoardPreview: function(){
		$('#board-preview').show("clip", 500);
	},

	hideBoardPreview: function(){
		var that = this;
		window.clearTimeout(this.timeout1);
		$('#board-preview').hide("clip", 500);
	},


	startSettingsDisplayTimer: function(){
		var that = this;
		this.timeout2 =window.setTimeout(that.displaySettingsPreview, 750);
	},

	displaySettingsPreview: function(){
		$('#settings-preview').show("clip", 500);
	},

	hideSettingsPreview: function(){
		var that = this;
		window.clearTimeout(this.timeout2);
		$('#settings-preview').hide("clip", 500);
	},


	startBinDisplayTimer: function(){
		var that = this;
		this.timeout3 =window.setTimeout(that.displayBinPreview, 750);
	},

	displayBinPreview: function(){
		$('#bin-preview').show("clip", 500);
	},

	hideBinPreview: function(){
		var that = this;
		window.clearTimeout(this.timeout3);
		$('#bin-preview').hide("clip", 500);
	},


  render: function(){
    // ensure content only rendered if it doesn't exist
    var that = this;
    $(this.el).append(this.template({user: that.user}));
    return this;
  }
});
