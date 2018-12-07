defmodule Emoji.Board.Sender do
  require Logger
  use GenServer

  def start_link(_), do: GenServer.start_link(__MODULE__, [], name: __MODULE__)
  def init(_), do: {:ok, []}

  def handle_call({:joined, socket}, _, state) do
    Logger.info("Client joined! #{inspect(socket)}")
    clients = Enum.uniq_by(state ++ [socket], &uniq_socket/1)
    {:reply, :ok, clients}
  end

  def handle_call({:processed, content}, _, state) do
    Enum.each(state, &clean_view(&1))
    Enum.each(state, &send_content(&1, content))
    {:reply, :ok, state}
  end

  def handle_info(_, state) do
    {:noreply, state}
  end

  def uniq_socket(%{headers: %{"sec-websocket-key" => sec_websocket_key}}), do: sec_websocket_key
  defp clean_view(%{pid: pid}), do: send(pid, Poison.encode!(%{type: :clean}))

  defp send_content(%{pid: pid}, content) do
    Task.async(fn ->
      Logger.info("Sending content...")

      content
      |> Enum.chunk_by(fn %{height: height} -> height end)
      |> Enum.map(fn c ->
        Task.async(fn ->
          send(pid, Poison.encode!(%{type: :draw, content: c}))
        end)
      end)

      {:ok, pid}
    end)
  end
end
