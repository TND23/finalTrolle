TrolleApp.Views.BoardShow = Backbone.View.extend({

  initialize: function(options){
	this.collection = options.collection;
	this.current_board = options.current_board;
	this.data = options.data;
	TrolleApp.boardLists = this.collection;
	},

  template: JST['boards/show'],
  events: {
	"click .cardTitle" : "dragIt",
	"mouseover #listButtonHolder" : "displayButtonInfo",
	
	"click #listButtonHolder" : "displayButtonInfo",
	"click .createCard" : "createCard",
	"click .deleteACard" : "destroyCard",
	"click #listForm" : "showListInfo",
	"click #createList" : "createList",
	"click .deleteAList" : "destroyList",
	"click .card-input" : "checkForMouse",

	"sortList" : "sortList"
  },

	getTarget: function(event){
		// get the id by parsing the event target
		var that = this;
		var unparsedID = event.target.id;
		console.log(unparsedID);
		var target_id = parseInt(unparsedID.match(/\d+/));

		return target_id;
	},

  createCard: function(event){
    event.preventDefault();
		var that = this;

		var target_list_id = this.getTarget(event);
		var current_list = this.collection.get(target_list_id);
		TrolleApp.aList = current_list;
		var newCard = new TrolleApp.Models.Card(target_list_id);
		TrolleApp.card = newCard;
				newCard.save(newCard.attributes,
			{
				success: function(model, response, xhr){
					TrolleApp.Collections.Cards.add(TrolleApp.Card);
					var cardTemplate = JST['cards/show']({card: newCard});
					current_list.attributes.cards.push(newCard);

					$('#list'+current_list.id+'Content').append(cardTemplate);
				},
				error: function(model, response){console.log('shoot'); console.log(response);}
			});
		this.makeDraggable();
		this.makeDroppable();
	},

  createList: function(event){
	event.preventDefault();
	var that = this;
      this.newListTitle = $("#list_listtitle").val();
	this.board_id = this.data.id;
	
	this.newList = new TrolleApp.Models.List({board_id: that.board_id, listtitle: that.newListTitle});
	// on success we callback to add this to the collection so that the newList has an ID since its been saved to the server
	this.newList.save(that.newList.attributes, {
		success: function(model, response, xhr){
												 TrolleApp.boardLists.add(that.newList);
												 that.renderList(that.newList.id);
											//	 console.log(that.newList);

												that.newList.cards = new TrolleApp.Collections.Cards();
												

 										 		// var aView = new TrolleApp.Views.ListShow({list_id: that.newList.id});
											 },
		error: function(){console.log('error')}
	});
  },

	destroyCard: function(event){
		event.preventDefault();

		var card_id = parseInt(event.target.id.match(/\d+/));
		var list_id = parseInt(event.target.parentElement.parentElement.parentElement.id.match(/\d+/));
		var cardHolder = $("#cardHolder"+card_id);
        	    $.ajax({
	      url: "/cards/" + card_id +".json",
	      type:"DELETE",
	      error: function(data){
				console.log(data);
				}
	    });
        	    		cardHolder[0].remove();

	},

	destroyList: function(event){
	  event.preventDefault();
		var list_id = this.getTarget(event);
		var list = this.collection.get(list_id);
		var curr_list = list.id;
		//this is the list object
		var list_container = $("#list"+curr_list);
		list_container[0].remove();
		list.destroy();
	},

	displayDeleteInfo: function(event){
		var that = this;
		TrolleApp.deleteListTimer = window.setTimeout(that.showIntel, 1000);
	},

	makeDraggable: function(){
		$(".cardContainer").draggable({
			opacity: 0.35,
			revert: "invalid",
			zIndex: 1
		});
	},

	makeDroppable: function(event){

	  $(".listContent").droppable({
			accept: $(".cardContainer"),
			drop: function(){
				console.log('drop');
			}
	  });

	  $("#boardTitle").droppable({
			accept: $(".listOfLists"),

	  });
	},

	resetDeleteInfo: function(){
		window.clearTimeout(TrolleApp.deleteListTimer);
	},

	showIntel: function(){
		console.log("info");
	},

  showListInfo: function(event){
    var that = this;
    event.preventDefault();
    if ($('#listNameContainer').length <= 0){
      $('#listMenu').append(JST['lists/new']({board: that.current_board}));
    } else {
      $('#listNameContainer').remove();
    }
  },

	renderList: function(id){
		var that = this;
	var id = id;
		var list_of_models = TrolleApp.boardLists.models;
		var current_index = TrolleApp.boardLists.length - 1;
		$('#sortable').append(JST['lists/show']({collection: this.collection, board: this.board, current_list: list_of_models[current_index]}));
	},

	checkForMouse: function(event){
		var that = this;
		that.card = event.target;
		//gross
		var	current_list_id = parseInt((event.target.parentElement.parentElement.parentElement.id).match(/\d+/));
		that.checkForEnter(that.card, current_list_id);
	},

	checkForEnter: function(card, list_id){
		var current_card = card['id'];
		var card_id = parseInt(current_card.match(/\d+/));
		var list_id = list_id;
		var that= this;
		$("#"+current_card).keydown(function(e){
		    if (e.keyCode == 13) {
					var card_container = $("#area"+card_id);
					var card_body = ($("#area"+card_id).val());
					if(card_body !== ""){
				    var card = $.ajax({
				      url: "/cards/" + card_id +" .json",
				      type:"GET",
				      success: function(data){
								that.updateCardBody({data: card_id, card_body: card_body, card_container: card_container});
							}
				    });
					}
		     return false;
		    }
		});
	},

	updateCardBody: function(options){
		var card = options['data'];
		var new_body = options['card_body'];
		var card_container = options['card_container'];
		card_container[0].remove();
		var curr_card = TrolleApp.Cards.get(card);
		curr_card.set({cardbody: new_body});
		curr_card.save(curr_card.attributes, {error: function(model, response){console.log(model); console.log(response);}})
	},

	makeSortable: function(){
	  $(function() {
	    $( "#sortable" ).sortable({
				stop: function(event, ui){
					//once dropped call sortList
					ui.item.trigger("sortList", ui.item.index());
				}
			});
	  });
	},

	renderCards: function(){
		for(var i = 0; i < TrolleApp.boardLists.length; i++){
			var curr_list = TrolleApp.boardLists.models[i];
			var curr_list_view = new TrolleApp.Views.CardShow({collection: curr_list});
			$("#list"+curr_list.id+"Content").append(curr_list_view.el.innerHTML);
		}
	},

  render: function(){
		var that = this;
    var id = this.current_board.id;
    $(this.el).html(this.template({collection: this.collection, board: this.current_board, data: this.data}));

		this.renderCards();

    $.ajax({
      url: "/boards/"+id+"/lists.json",
      type:"GET",
      success: function(data){
				that.makeDraggable();
				that.makeDroppable();
				that.makeSortable();
			}
    });
    return this;
  },
});