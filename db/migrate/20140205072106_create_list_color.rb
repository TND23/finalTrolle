class CreateListColor < ActiveRecord::Migration
  def change
    add_column :lists, :color, :string
  end
end
