class AddCardConstraintsAndIndex < ActiveRecord::Migration
  def up
    add_column :cards, :list_id, :integer
    add_index :cards, :list_id
  end

  def down
  end
end
