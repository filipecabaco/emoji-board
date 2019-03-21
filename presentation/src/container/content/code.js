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
Supervisor.init(children, strategy: :one_for_one)
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

export const supervisor3 = `
> in Emoji.Board.Supervisor
\`\`\` elixir
# Connect to the Erlang Port Mapper (epmd)
Node.start(:server@localhost, :shortnames)
Node.set_cookie(:secret)
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
defmodule Emoji.Board.Process do
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
#   This is ran by start_link and blocks it until done
#   Used if some processing is required e.g. fetching data from DB
    {:ok, []}
  end
end 
\`\`\``;

export const processorGenserver1 = `
> in Emoji.Board.Process
\`\`\` elixir
# Receives a message with a tuple of :image and a filepath and...
# 1. Reads file
# 2. Connects to Kotlin worker
# 3. Sends message to Kotlin worker
# 4. Returns :ok to the original caller
def handle_call({:process, filepath}, _sender, _state) do
  {:ok, content} = File.read(filepath)
  {:ok, node} = connect_to_worker()
  message = {:image, self(), content}
  send({:mailbox, node}, message)
  {:reply, :ok, []}
end
\`\`\``;

export const processorGenserver2 = `\`\`\` elixir
defmodule Emoji.Web.Upload do
  import Plug.Conn
# Welcome to some hardcore pattern matching!
  def upload(
    %{body_params: %{"file" => %{path: path}}} = conn) do
#   Find and call our processor with the :image and
#   the path created by our webserver to receive upload
    :ok = GenServer.call(Process.whereis(Emoji.Board.Process), {:process, path})
    send_resp(conn, 200, "")
  end
end
\`\`\``;

export const processorGenserver3 = `
> in Emoji.Board.Process
\`\`\` elixir
# Connects to our node; pings it and if responds, returns address
defp connect_to_worker() do
  node = :worker@localhost
  true = Node.connect(node)
  :pong = Node.ping(node)
  {:ok, node}
end

# Handle "generic" messages from worker
def handle_info(content, _) do
  {:noreply, []}
end
\`\`\``;

export const worker0 = `
> in Kotlin
\`\`\` kotlin
fun main(args: Array<String>) {
// Create the equivalent to an Erlang Node
  val conn = OtpNode("worker@localhost")
  conn.setCookie("secret")
// Create a mailbox for said Node
  val mailbox = conn.createMbox("mailbox")
// Start receiving messages
  receive(mailbox)
}
\`\`\``;
export const worker1 = `
> in Kotlin
\`\`\` kotlin
private tailrec fun receive(mailbox: OtpMbox) {
  println("Worker is ready and awaiting for messages")
// Blocking call to receive
  val msg = mailbox.receive() as OtpErlangTuple
// Parse and use message
  val type = msg.elementAt(0) as OtpErlangAtom
  thread(start = true) {
    when (type) {
      OtpErlangAtom("image") -> processImageMsg(msg, mailbox)
      else -> println("I don't know this message...")
    }
  }
// Repeat until the end of time
  receive(mailbox)
}
\`\`\``;

export const worker2 = `
> in Kotlin
\`\`\` kotlin
private fun processImageMsg(msg: OtpErlangTuple, mailbox: OtpMbox) {
  println("Processing Image...")
  val sender = msg.elementAt(1) as OtpErlangPid
  val content = msg.elementAt(2) as OtpErlangBinary
  val pixels = ImageProcessor.process(content = content.binaryValue())
  mailbox.send(sender, pixels.typify())
  println("I'm done!")
}
\`\`\``;

export const processorGenserver4 = `
> in Emoji.Board.Process
\`\`\` elixir
def handle_info(content, _) do
# Find and call our sender
  :ok = GenServer.cast(
    Process.whereis(Emoji.Board.Sender), {:processed, content}
  )
  {:noreply, []}
end
\`\`\``;

export const websocket0 = `\`\`\` elixir
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
\`\`\``;
export const sender0 = `\`\`\` elixir
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

  defp get_ws_key(%{headers: %{"sec-websocket-key" => sec_websocket_key}}) do
    sec_websocket_key
  end
end
\`\`\``;
export const sender1 = `
> in Emoji.Board.Sender
\`\`\` elixir
def handle_cast({:processed, content}, state) do
  Enum.each(state, &clean_view(&1))
  Enum.each(state, &send_content(&1, content))
  {:noreply, state}
end
\`\`\``;
export const sender2 = `
> in Emoji.Board.Sender
\`\`\` elixir
defp send_content(%{pid: pid}, content) do
  Logger.info("Sending content...")
  content
  |> Enum.chunk_by(fn %{height: height} -> height end)
  |> Enum.map(&send_chunk(pid, &1))
  {:ok, pid}
end

defp send_chunk(pid, chunk) do
 send(pid, Jason.encode!(%{type: :draw, content: chunk}))
end
\`\`\``;
