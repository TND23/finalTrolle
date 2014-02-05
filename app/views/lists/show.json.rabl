object @list
attributes :listtitle, :id, :board_id
child(:cards) do
	attributes :cardtitle, :cardbody, :id
end
