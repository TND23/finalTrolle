class DropBoardColor < ActiveRecord::Migration
  def up
  	 remove_column :boards, :color
  end

  def down
  	add_column :boards, :color
  end
end
