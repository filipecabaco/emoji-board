defmodule Emoji.Process do
  # 1 - Create GenServer and handlers
  use GenServer
  def start_link(_), do: GenServer.start_link(__MODULE__, [], name: __MODULE__)

  def init(_), do: {:ok, []}

  def handle_call({:image, filepath }, _sender, _state) do
    process_file(:image, filepath)
    {:reply, :ok, []}
  end

  def handle_call({:video, filepath }, _sender, _state) do
    process_file(:video, filepath)
    {:reply, :ok, []}
  end

  # defp process_file(type, filepath), do: {type, File.read(filepath)} |> IO.inspect(label: "File content")

  # 2 - Send messages
  defp process_file(type, filepath) do
    {:ok, content} = File.read(filepath)
    {:ok, node} = connect_to_work()
    message = {type, self(), {String.to_charlist(filepath), content}}
    send({:mailbox, node}, message)
  end

  defp connect_to_work() do
    node = :"worker@localhost"
    true = Node.connect(node)
    :pong = Node.ping(node)
    {:ok, node}
  end

  # 3 - Receive Messages
  def handle_info({type, content}, _) do
    # IO.inspect content, label: "Content received"
    GenServer.cast(Process.whereis(Emoji.Sender), {:processed, %{type: type, content: content}})
    {:noreply, []}
  end
end