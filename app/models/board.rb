class Board < ActiveRecord::Base
  attr_accessible :boardtitle
  belongs_to :user
  has_many :lists
  validates :user_id, :presence => true

end
