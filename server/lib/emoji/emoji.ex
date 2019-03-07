defmodule Emoji do
  use Application
  require Logger

  def start(_type, _args) do
    port = Application.get_env(:emoji, :cowboy_port, 8080)

    cowboy_opts = [
      port: port,
      dispatch: [
        {:_, [],
         [
           {["/ws"], [], Emoji.Web.Websocket, []},
           {:_, [], Plug.Cowboy.Handler, {Emoji.Web, []}}
         ]}
      ]
    ]

    children = [
      {Plug.Cowboy, scheme: :http, plug: nil, options: cowboy_opts},
      Supervisor.child_spec(Emoji.Board.Supervisor, [])
    ]

    Supervisor.start_link(children, strategy: :one_for_one)
  end
end
