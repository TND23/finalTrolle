class List < ActiveRecord::Base
  attr_accessible :listtitle, :board_id, :id, :boardtitle, :color
  belongs_to :board
  has_many :cards

end
