class BoardsController < ApplicationController

  def index
    user = current_user
    @boards = user.boards
  end

  def show
    user = User.find(params[:user_id])
    @board = Board.find(params[:id])
  end

  def create
    user = User.find(params[:user_id])
    @board = Board.new(params[:board])
    @board.user_id = user.id
    @board.max_list_order = 0
    if @board.save
      redirect_to user_boards_url
    else
      render :json => 'save failure'
    end

  end

  def destroy
    @board = Board.find(params[:board])
    @board.destroy
  end

end
