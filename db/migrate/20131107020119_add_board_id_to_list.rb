class AddBoardIdToList < ActiveRecord::Migration
  def change
    add_column :lists, :board_id, :integer
    add_index :lists, :board_id
  end
end
