class UpdateUserBoards < ActiveRecord::Migration
  def up
    remove_column :users, :board_title
    add_column :users, :boards_id, :integer
  end
end
