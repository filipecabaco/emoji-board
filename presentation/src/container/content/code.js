export const epmd = `\`\`\` shell 
epmd -d
\`\`\``;

export const projectCreate = `\`\`\` shell 
mix new hello_world
\`\`\``;

export const supervisor0 = `\`\`\` elixir
defmodule Emoji.Board.Supervisor do
  use Supervisor

  def start_link(arg), do: 
    Supervisor.start_link(__MODULE__, arg, name: __MODULE__)

  def init(_arg) do
    children = []

    Supervisor.init(children, strategy: :one_for_one)
  end
end 
\`\`\``;

export const supervisor1 = `\`\`\` elixir
defmodule Emoji.Board.Supervisor do
  use Supervisor

#  def start_link(arg), do: 
#    Supervisor.start_link(__MODULE__, arg, name: __MODULE__)

  def init(_arg) do
#    children = []

    Supervisor.init(children, strategy: :one_for_one)
  end
end 
\`\`\``;

export const supervisor2 = `\`\`\` elixir
defmodule Emoji.Board.Supervisor do
  use Supervisor

  def start_link(arg), do: 
    Supervisor.start_link(__MODULE__, arg, name: __MODULE__)

  def init(_arg) do
    children = [
      {Emoji.Board.Process, []}
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end
end 
\`\`\``;

export const supervisor3 = `\`\`\` elixir
defmodule Emoji.Board.Supervisor do
  use Supervisor

  def start_link(arg), do: 
    Supervisor.start_link(__MODULE__, arg, name: __MODULE__)

  def init(_arg) do
#    children = [
#      {Emoji.Board.Process, []}
#    ]

#   Connect to the Erlang Node created by the JVM side    
    Node.start(:server@localhost, :shortnames)
    Node.set_cookie(:secret)

#    Supervisor.init(children, strategy: :one_for_one)
  end
end
\`\`\``;

export const supervisor4 = `\`\`\` elixir
defmodule Emoji.Board.Supervisor do
  use Supervisor

  def start_link(arg), do: 
    Supervisor.start_link(__MODULE__, arg, name: __MODULE__)

  def init(_arg) do
    children = [
      {Emoji.Board.Process, []},
      {Emoji.Board.Server, []}
    ]

    Node.start(:server@localhost, :shortnames)
    Node.set_cookie(:secret)

    Supervisor.init(children, strategy: :one_for_one)
  end
end
\`\`\``;

export const processorGenserver0 = `\`\`\` elixir
defmodule Emoji.Board.Sender do
  require Logger
  use GenServer

  def start_link(_), do
#   Starts process with:
#   1. Module type (__MODULE__ aka self)
#   2. Initial state
#   3. Options (in this example, name is the same as the module)
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end
  def init(_) do
#   This is ran by start_link which is blocked by this
#   Used if some processing is required 
#   e.g. fetching data from DB
    {:ok, []}
  end
end 
\`\`\``;

export const processorGenserver1 = `\`\`\` elixir

defmodule Emoji.Board.Sender do
# ...
# Receives a message with a tuple of :image and a filepath and...
# 1. Reads file
# 2. Connects to Kotlin worker
# 3. Sends message to Kotlin worker
# 4. Returns :ok to the original caller
  def handle_call({:image, filepath}, _sender, _state) do
    {:ok, content} = File.read(filepath)
    {:ok, node} = connect_to_worker()
    message = {:image, self(), content}
    send({:mailbox, node}, message)
    {:reply, :ok, []}
  end
  # ...
end 
\`\`\``;

export const processorGenserver2 = `\`\`\` elixir
defmodule Emoji.Web.Upload do
  import Plug.Conn
# Welcome to some hardcore pattern matching!
  def upload(
    %{body_params: %{"file" => %{path: path, content_type: content_type}}} = conn
  ) do
#   Find and call our processor with the :image and
#   the path created by our webserver to receive upload
    :ok = GenServer.call(Process.whereis(Emoji.Board.Process), {type(:image), path})
    send_resp(conn, 200, "")
  end
end
\`\`\``;

export const processorGenserver3 = `\`\`\` elixir
defmodule Emoji.Board.Process do
# Connect to our node and pings it 
  defp connect_to_worker() do
    node = :worker@localhost
    true = Node.connect(node)
    :pong = Node.ping(node)
    {:ok, node}
  end

# Receives message from worker
  def handle_info(content, _) do
    {:noreply, []}
  end
end
\`\`\``;

export const worker0 = ` \`\`\` kotlin

fun main(args: Array<String>) {
//Create the equivalent to an Erlang Node
  val conn = OtpNode("worker@localhost")
  conn.setCookie("secret")
//Create a mailbox for said Node
  val mailbox = conn.createMbox("mailbox")
//Start receiving messages
  receive(mailbox)
}
\`\`\``;
export const worker1 = ` \`\`\` kotlin
private tailrec fun receive(mailbox: OtpMbox) {
  println("Worker is ready and awaiting for messages")
//Blocking call to receive
  val msg = mailbox.receive() as OtpErlangTuple
//Parse and use message
  val type = msg.elementAt(0) as OtpErlangAtom
  thread(start = true) {
    when (type) {
      OtpErlangAtom("image") -> processImageMsg(msg, mailbox)
      else -> println("I don't know this message...")
    }
  }
//Repeat until the end of time
  receive(mailbox)
}
\`\`\``;

export const processorGenserver4 = `\`\`\` elixir
defmodule Emoji.Board.Process do
#  defp connect_to_worker() do
#    node = :worker@localhost
#    true = Node.connect(node)
#    :pong = Node.ping(node)
#    {:ok, node}
#  end

  def handle_info(content, _) do
#   Find and call our sender
    :ok = GenServer.call(
      Process.whereis(Emoji.Board.Sender), 
      {:processed, content})
    {:noreply, []}
  end
end
\`\`\``;

export const websocket0 = `\`\`\` elixir
defmodule Emoji.Web.Websocket do
  @behaviour :cowboy_websocket
  @timeout 10_000

  def init(req, _) do
    GenServer.call(
      Process.whereis(Emoji.Board.Sender), 
      {:joined, req})
    {:cowboy_websocket, req, @timeout}
  end

  def websocket_handle({:text, _message}, state) do
    {:ok, state}
  end

  def websocket_info(message, state) do
    {:reply, {:text, message}, state}
  end
end
\`\`\``;
export const sender0 = `\`\`\` elixir
defmodule Emoji.Board.Sender do
  require Logger
  use GenServer

  def start_link(_), do: 
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  def init(_), do: {:ok, []}

  def handle_call({:joined, socket}, _, state) do
    Logger.info("Client joined! #{inspect(socket)}")
    clients = Enum.uniq_by(state ++ [socket], &uniq_socket/1)
#   State is updated! Next call will have new state
#   Updates happen in sequence with each received message
    {:reply, :ok, clients}
  end

end
\`\`\``;
export const sender1 = `\`\`\` elixir
defmodule Emoji.Board.Sender do
# ...
  def handle_call({:processed, content}, _, state) do
#   For each websocket connection, send a clean message
    Enum.each(state, &clean_view(&1))
#   For each websocket connection, send the pixel content
    Enum.each(state, &send_content(&1, content))
    {:reply, :ok, state}
  end
# ...
end
\`\`\``;
