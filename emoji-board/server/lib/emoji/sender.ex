defmodule Emoji.Sender do
  require Logger
  import Phoenix.Channel

  # 1 - Create GenServer
  use GenServer

  def start_link(_), do: GenServer.start_link(__MODULE__, %{sockets: []}, name: __MODULE__)
  def init(state), do: {:ok, state}

  # 2 - Receive content
  def handle_cast({:processed, content}, %{sockets: sockets} = state) do
    Enum.each(sockets, &(send_content(&1, content)))
    {:noreply, state}
  end

  # 3 - Handle clients connections
  def handle_call({:joined, socket}, _, %{sockets: sockets} = state) do
   Logger.info("#{socket.id} joined!")
   clients = Enum.uniq_by(sockets ++ [socket], &uniq_socket/1)
   {:reply, :ok, %{state | sockets: clients}}
  end

  def uniq_socket(%{assigns: %{id: id}}), do: id

  # 4 - Send to socket
  defp send_content(socket, content) do
    Task.async(fn ->
      Logger.info("Sent content to #{socket.id}!")
      broadcast!(socket, "emoji:start", %{})
      broadcast!(socket, "emoji:draw", %{content: content})
    end)
  end

  def handle_info(_, state), do: {:noreply, state}
end