defmodule Emoji.Web.Websocket do
  import Plug.Conn
  @behaviour :cowboy_websocket
  @timeout 10_000

  # Called on websocket connection initialization.
  def init(req, _opts) do
    IO.inspect(req)
    {:cowboy_websocket, req, @timeout}
  end

  # Handle 'ping' messages from the browser - reply
  def websocket_handle({:text, "ping"}, state) do
    {:reply, {:text, "pong"}, state}
  end

  # Handle other messages from the browser - don't reply
  def websocket_handle({:text, message}, state) do
    IO.inspect(message)
    {:ok, state}
  end

  # Format and forward elixir messages to client
  def websocket_info(message, state) do
    {:reply, {:text, message}, state}
  end
end
