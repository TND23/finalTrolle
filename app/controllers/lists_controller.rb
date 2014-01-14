class ListsController < ApplicationController

  def index
    current_board = Board.find(params[:board_id])
    @lists = current_board.lists
  end

  def show
    @list = List.find(params[:id])
  end

  def create
    @board = Board.find(params[:board_id])
    @list = List.new(params[:list])

    @list.board_id = @board.id
    if @list.save
    else
      render :json => "saving failure"
    end
  end

  def destroy
    @list = List.find(params[:id])
    if @list.cards
      @list.cards.each do |card|
        card.destroy
      end
    end

    if @list
      @list.destroy
    else
      render :json => "could not find list"
    end
  end
end