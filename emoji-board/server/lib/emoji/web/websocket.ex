defmodule Emoji.Web.Websocket do
  import Plug.Conn
  @behaviour :cowboy_websocket
  @timeout 10_000

  def init(req, _) do
    GenServer.call(Process.whereis(Emoji.Board.Sender), {:joined, req})
    {:cowboy_websocket, req, @timeout}
  end

  def websocket_handle({:text, message}, state) do
    {:ok, state}
  end

  def websocket_info(message, state) do
    {:reply, {:text, message}, state}
  end
end
