class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.string :boardtitle
      t.integer  :user_id
      t.timestamps
    end
    add_index :boards, :boardtitle, :unique => true
  end
end
