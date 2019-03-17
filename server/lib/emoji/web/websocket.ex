defmodule Emoji.Web.Websocket do
  @behaviour :cowboy_websocket
  @timeout 500

  def init(req, _) do
    GenServer.call(Process.whereis(Emoji.Board.Sender), {:joined, req})
    {:cowboy_websocket, req, req, %{timeout: @timeout}}
  end

  def websocket_handle(_, state), do: {:ok, state}
  def websocket_info(message, state), do: {:reply, {:text, message}, state}

  def terminate({:remote, _, _}, _, state) do
    GenServer.call(Process.whereis(Emoji.Board.Sender), {:left, state})
  end

  def terminate(_, _, _), do: :ok
end
