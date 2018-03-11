defmodule Server.Application do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    Node.start(:"server@localhost", :shortnames)
    Node.set_cookie(:secret)

    children = [
      supervisor(ServerWeb.Endpoint, []),
      supervisor(Emoji, [])
    ]

    opts = [strategy: :one_for_one, name: Server.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    ServerWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
