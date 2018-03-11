defmodule Emoji.Sender do
  # 1 - Create GenServer
  use GenServer

  def start_link(_), do: GenServer.start_link(__MODULE__, %{sockets: []}, name: __MODULE__)
  def init(state), do: {:ok, state}

  # 2 - Receive content
  def handle_cast({:processed, content}, %{sockets: sockets} = state) do
    # IO.inspect content, label: "Received in sender"
    Enum.each(sockets, &(send_content(&1, content)))
    {:noreply, state}
  end

  # 3 - Handle clients connections
  require Logger
  def handle_call({:joined, socket}, _, %{sockets: sockets} = state) do
   Logger.info("#{socket.id} joined!")
   clients = Enum.uniq_by(sockets ++ [socket], fn %{assigns: %{id: id}} -> id end)
   {:reply, :ok, %{state | sockets: clients}}
  end

  # 4 - Send to socket
  import Phoenix.Channel
  defp send_content(socket, content) do
    Task.async(fn ->
      broadcast!(socket, "emoji:start", %{})
      broadcast!(socket, "emoji:draw", content)
    end)
  end

  def handle_info(_, state), do: {:noreply, state}
end