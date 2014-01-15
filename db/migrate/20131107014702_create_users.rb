class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, :null => false
      t.string :password_digest, :null => false
      t.timestamps
      t.string :session_token
      t.integer :boards_id
    end
    add_index :users, :username, :unique => true
    add_index :users, :session_token, :unique => true
  end
end
