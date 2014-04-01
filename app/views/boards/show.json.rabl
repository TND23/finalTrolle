object @board
attribute :boardtitle, :id, :user_id, :max_list_order
child(:lists) do
  attribute :listtitle, :id
  child(:cards) do
    attribute :cardtitle, :cardbody, :id
  end
end