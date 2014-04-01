class AddOrder < ActiveRecord::Migration
  def change
  	add_column :cards, :order, :integer
  	add_column :lists, :order, :integer
  	add_column :boards, :order, :integer
  	
  end
end
