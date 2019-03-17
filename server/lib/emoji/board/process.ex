defmodule Emoji.Board.Process do
  # 1 - Create GenServer and handlers
  use GenServer

  def start_link(_), do: GenServer.start_link(__MODULE__, [], name: __MODULE__)
  def init(_), do: {:ok, []}

  def handle_call({:process, filepath}, _sender, _state) do
    {:ok, content} = File.read(filepath)
    {:ok, node} = connect_to_worker()
    message = {:image, self(), content}
    send({:mailbox, node}, message)
    {:reply, :ok, []}
  end

  defp connect_to_worker() do
    node = :worker@localhost
    true = Node.connect(node)
    :pong = Node.ping(node)
    {:ok, node}
  end

  def handle_info(content, _) do
    :ok = GenServer.call(Process.whereis(Emoji.Board.Sender), {:processed, content})
    {:noreply, []}
  end
end
