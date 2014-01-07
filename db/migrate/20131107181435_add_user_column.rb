class AddUserColumn < ActiveRecord::Migration
  def change
    add_column :boards, :user_id, :integer
  end
end
