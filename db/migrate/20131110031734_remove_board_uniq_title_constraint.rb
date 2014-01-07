class RemoveBoardUniqTitleConstraint < ActiveRecord::Migration
  def up
   # remove_index :boards, :name => :index_boards_on_boardtitle
  end
end
