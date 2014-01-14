object @user
attributes :id, :username
child(:boards) do
  attribute :boardtitle, :board_id
  child(:lists) do
    attribute :listtitle, :list_id
    child(:cards) do
      attribute :cardtitle
    end
  end
end