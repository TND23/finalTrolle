class Card < ActiveRecord::Base
  attr_accessible :cardtitle, :cardbody, :list_id, :id
  belongs_to :list

  def self.list
    list = List.find(self["list_id"])
    return list
  end
end
