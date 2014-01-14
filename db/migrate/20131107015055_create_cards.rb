class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :cardtitle
      t.string :cardbody
      t.timestamps
    end
  end
end
