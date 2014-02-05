class AddBoardColor < ActiveRecord::Migration
   def change
    add_column :boards, :color, :string
  end
end
