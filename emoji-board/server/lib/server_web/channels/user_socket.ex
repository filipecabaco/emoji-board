defmodule ServerWeb.UserSocket do
  use Phoenix.Socket

  ## Channels
  channel "emoji:*", ServerWeb.EmojiChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket
  def connect(%{"id" => id}, socket) do
    socket = assign(socket, :id, id)
    {:ok, socket}
  end

  def id(%{assigns: %{id: id}}), do: id
end