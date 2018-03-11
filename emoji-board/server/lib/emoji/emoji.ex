defmodule Emoji do
  use Supervisor

  def start_link() do
    Supervisor.start_link(__MODULE__, [], name: __MODULE__)
  end

  def init(_arg) do
    children = [
      {Emoji.Process, []},
      {Emoji.Sender, []}
    ]
    Supervisor.init(children, strategy: :one_for_one)
  end
end