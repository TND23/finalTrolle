object @board
attribute :boardtitle, :id, :user_id
child(:lists) do
  attribute :listtitle, :id
  child(:cards) do
    attribute :cardtitle, :cardbody, :id
  end
end