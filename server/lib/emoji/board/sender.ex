defmodule Emoji.Board.Sender do
  require Logger
  use GenServer

  def start_link(_), do: GenServer.start_link(__MODULE__, [], name: __MODULE__)
  def init(_), do: {:ok, []}

  def handle_call({:joined, socket}, _, state) do
    Logger.info("Client joined! #{get_ws_key(socket)}")
    state = Enum.uniq_by(state ++ [socket], &get_ws_key/1)
    {:reply, :ok, state}
  end

  def handle_call({:left, socket}, _, state) do
    Logger.info("Client left! #{get_ws_key(socket)}")
    state = Enum.reject(state, &(get_ws_key(&1) == get_ws_key(socket)))
    {:reply, :ok, state}
  end

  def handle_cast({:processed, content}, state) do
    state
    |> Task.async_stream(
      fn client ->
        clean_view(client)
        send_content(client, content)
      end,
      timeout: 100_000
    )
    |> Stream.run()

    {:noreply, state}
  end

  def handle_info(_, state) do
    {:noreply, state}
  end

  defp get_ws_key(%{headers: %{"sec-websocket-key" => sec_websocket_key}}), do: sec_websocket_key
  defp clean_view(%{pid: pid}), do: send(pid, Jason.encode!(%{type: :clean}))

  defp send_content(%{pid: pid}, content) do
    Logger.info("Sending content...")

    content
    |> Stream.chunk_every(5_000)
    |> Task.async_stream(&send_chunk(pid, &1))
    |> Stream.run()

    {:ok, pid}
  end

  defp send_chunk(pid, chunk), do: send(pid, Jason.encode!(%{type: :draw, content: chunk}))
end
