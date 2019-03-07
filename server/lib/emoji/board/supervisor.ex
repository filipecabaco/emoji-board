defmodule Emoji.Board.Supervisor do
  use Supervisor

  def start_link(arg), do: Supervisor.start_link(__MODULE__, arg, name: __MODULE__)

  def init(_arg) do
    children = [
      {Emoji.Board.Process, []},
      {Emoji.Board.Sender, []}
    ]

    Node.start(:server@localhost, :shortnames)
    Node.set_cookie(:secret)

    Supervisor.init(children, strategy: :one_for_one)
  end
end
