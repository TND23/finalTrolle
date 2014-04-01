class Board < ActiveRecord::Base
  attr_accessible :boardtitle
  attr_accessor :max_list_order
  belongs_to :user
  has_many :lists, :dependent => :destroy
  validates :user_id, :presence => true
  before_save :set_list_order

  private
  
  def set_list_order
  	self.max_list_order = 0
  end

end
