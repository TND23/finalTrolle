class List < ActiveRecord::Base
  attr_accessible :listtitle, :id, :color
  belongs_to :board
  has_many :cards, :dependent => :destroy

  def calculate_list_pos(board)
   if board.max_list_order.nil?
   		puts "HELLO LDKSJFKSJF LKJF LS JFLKDS JFLKDS JFLKDS JFLKDS JFLKDS JFLKDS JFLKDS JFLKDSJFLKDS JFLKSJFLKS JF" 	 	
      self.order = 1
      board.max_list_order = self.order
      board.save!
      puts board.max_list_order
    else
      self.order = board.max_list_order + 1
      board.max_list_order = self.order
    end
    
  end

end
