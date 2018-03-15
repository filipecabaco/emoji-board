defmodule Emoji do
  use Application
  require Logger

  def start(_type, _args) do
    port = Application.get_env(:emoji, :cowboy_port, 8080)

    children = [
      Plug.Adapters.Cowboy.child_spec(:http, Emoji.Web, [], port: port),
      Supervisor.child_spec(Emoji.Board.Supervisor, [])
    ]

    Supervisor.start_link(children, strategy: :one_for_one)
  end
end
