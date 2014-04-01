TrolleApp.Views.BoardShow = Backbone.View.extend({

  initialize: function(options){
		this.current_board = options.current_board;
		this.data = options.data;
		TrolleApp.boardLists = options.collection;
	},

  template: JST['boards/show'],
  events: {
		"click .createCard" : "createCard",
		"click .deleteACard" : "destroyCard",
		"click .inspectACard" : "inspectCard",
		"click #listForm" : "showListInfo",
		"click #createList" : "createList",
		"click .deleteAList" : "destroyList",
		"click .card-input" : "checkForMouse",
		"click #list_listtitle" : "checkEntry",
		"click .cardBody" : "editCardText",
		"sortList" : "sortList"
  },

	getTarget: function(event){
		// get the id by parsing the event target
		var unparsedID = event.target.id;
		var target_id = parseInt(unparsedID.match(/\d+/));
		return target_id;
	},

	checkEntry: function(event){
		var that = this;
		$("#list_listtitle").keydown(function(e){
		    if (e.keyCode == 13) {
		    	e.preventDefault();
		    	that.createList(event, true);
		    }
		  })
	},

  createCard: function(event){
		var that = this;
		var target_list_id = this.getTarget(event);
		var current_list = TrolleApp.boardLists.get(target_list_id);
		var newCard = new TrolleApp.Models.Card(target_list_id);
		newCard.list_id = target_list_id;
		newCard.save(newCard.attributes,
			{
				success: function(model, response, xhr){
					TrolleApp.Collections.Cards.add(newCard);
					var cardTemplate = JST['cards/show']({card: newCard});
					current_list.attributes.cards.push(newCard);
					$('#list'+current_list.id+'Content').append(cardTemplate);
					$(".inspectACard").attr('title', 'View more information regarding this card');
					$(".deleteACard").attr('title', 'Send this card to the bin');
					that.makeDraggable();
					that.makeDroppable();
				}
			});
			current_list.save();
	},

  createList: function(event, bool){
  	//check where function is called from
  	if (bool != true){
			event.preventDefault();  		
  	}
		var that = this;
	  this.newListTitle = $("#list_listtitle").val();
		this.board_id = this.data.id;
		
		this.newList = new TrolleApp.Models.List({board_id: that.board_id, listtitle: that.newListTitle});
		// on success we callback to add this to the collection so that the newList 
		//has an ID since its been saved to the server
		this.newList.save(this.newList.attributes, {
			success: function(model, response, xhr){
													 TrolleApp.boardLists.add(that.newList);
													 that.renderNewList(that.newList.id);
													$(".createCard").attr('title', 'Add a card');
													$(".deleteAList").attr('title', 'Destroy this list');
													that.makeDraggable();
													that.makeDroppable();
			}
		});
  },

	destroyCard: function(event){
		event.preventDefault();
		var card_id = parseInt(event.target.id.match(/\d+/));
		var card = TrolleApp.Collections.Cards.get(card_id);
		var cardHolder = $("#cardHolder"+card_id);
	 	cardHolder.remove();
		card.destroy();       
	},

	destroyList: function(event){
	  event.preventDefault();
		var x;
		var r=confirm("Are you sure you want to delete this list?");
		if (r==true)
		  {
			var list_id = this.getTarget(event);
			var list = TrolleApp.boardLists.get(list_id);
			var curr_list = list.id;
			//this is the list object
			var list_container = $("#list"+curr_list);
			list_container[0].remove();
			list.destroy();
		}		
	},

	editCardText: function(e){
		console.log(e.target);
	},

	makeDraggable: function(){
		$(".cardContainer").draggable({
			opacity: 0.7,
			revert: "invalid",
			zIndex: 1,
			helper: "clone",
			cursorAt: {"top" : 5, "left" : 5},
		});
	},

	makeDroppable: function(event){
		//this logic is made necessary thanks to a (bug?) with jQuery's overflow
		var that = this;
	  $(".listContent").droppable({
			accept: $(".cardContainer"),

			drop: function(event, draggable){
				var list_id = parseInt(event.target.id.match(/\d+/));
				var card_id = draggable.draggable[0].id;
				var card_no = parseInt(card_id.match(/\d+/));
				var target_list = TrolleApp.boardLists.get(list_id);
				var card = TrolleApp.Collections.Cards.get(card_no);
				var cardTemplate = JST['cards/show']({card: card});
				card.attributes.list_id = list_id;
				card.save(card.attributes, 
					{
						success: function(){
							$("#cardHolder"+card_no).appendTo($('#list'+target_list.id+'Content'));
							target_list.attributes.cards.push(card);
							that.makeDraggable();
							that.makeDroppable();
						},
						error: function(){
							console.log('error');
						}
					});
			}
	  });

	  $("#boardTitle").droppable({
			accept: $(".listOfLists"),
	  });
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

	renderNewList: function(id){
		var that = this;
		var id = id;
		var list_of_models = TrolleApp.boardLists.models;
		var current_index = TrolleApp.boardLists.length - 1;
		$('#sortable').append(JST['lists/show']({
			collection: TrolleApp.boardLists, 
			board: this.board, 
			current_list: list_of_models[current_index]
		}));
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
		var that = this;
		$("#"+current_card).keydown(function(e){
		    if (e.keyCode == 13) {
					var card_container = $("#area"+card_id);
					var card_body = ($("#area"+card_id).val());
					if(card_body !== ""){
						var card = TrolleApp.Collections.Cards.get(card_id);
						// card.set({"list_id": card.list_id.list_id});
						card.set({"cardbody": card_body});
						card.save();
						that.updateCardBody({card: card, card_body: card_body});
					}
				}
			});	
	},

	updateCardBody: function(options){
		var card = options.card;
		var card_container = $("#area" + card.id);
		card_container.remove();
		var safe_card_content = card.escape("cardbody");
		$("#cardBody"+card.id).html(safe_card_content);
		this.makeDraggable();
		card.save(card.attributes, {error: function(model, response){console.log(model); console.log(response);}})
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
	  $(this.el).html(this.template({collection: TrolleApp.boardLists, board: this.current_board, data: this.data}));
		this.renderCards();
    $.ajax({
      url: "/boards/"+id+"/lists.json",
      type:"GET",
      success: function(data){
				that.makeDraggable();
				that.makeDroppable();
				that.makeSortable();
				$(".createCard").attr('title', 'Add a card');
				$(".deleteAList").attr('title', 'Destroy this list');
				$(".deleteACard").attr('title', 'Send this card to the bin');
				$(".inspectACard").attr('title', 'View more information regarding this card');
			}
    });
    return this;
  },
});