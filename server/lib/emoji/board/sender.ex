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

  def handle_call({:processed, content}, _, state) do
    Enum.each(state, &clean_view(&1))
    Enum.each(state, &send_content(&1, content))
    {:reply, :ok, state}
  end

  def handle_info(_, state) do
    {:noreply, state}
  end

  defp get_ws_key(%{headers: %{"sec-websocket-key" => sec_websocket_key}}), do: sec_websocket_key
  defp clean_view(%{pid: pid}), do: send(pid, Jason.encode!(%{type: :clean}))

  defp send_content(%{pid: pid}, content) do
    Task.async(fn ->
      Logger.info("Sending content...")

      content
      |> Enum.chunk_by(fn %{height: height} -> height end)
      |> Enum.map(&send_chunk(pid, &1))

      # |> Enum.map(&Task.async(fn -> send_chunk(pid, &1) end)) # Parallelize it!
      {:ok, pid}
    end)
  end

  defp send_chunk(pid, chunk), do: send(pid, Jason.encode!(%{type: :draw, content: chunk}))
end
