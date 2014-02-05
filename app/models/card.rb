class Card < ActiveRecord::Base
  attr_accessible :cardtitle, :cardbody, :list_id, :id
  belongs_to :list
end
