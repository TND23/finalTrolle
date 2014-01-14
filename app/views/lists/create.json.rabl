object @list
attributes :listtitle, :id, :board_id
child(:cards) do
  attribute :cardtitle
end
