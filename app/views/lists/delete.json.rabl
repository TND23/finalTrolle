object @list
attributes :listtitle, :id
child(:cards) do
  attribute :cardtitle
end
