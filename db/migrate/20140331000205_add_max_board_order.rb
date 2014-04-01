class AddMaxBoardOrder < ActiveRecord::Migration
  def change
  	add_column :boards, :max_list_order, :integer
  end
end
