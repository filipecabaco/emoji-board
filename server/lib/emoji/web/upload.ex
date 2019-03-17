defmodule Emoji.Web.Upload do
  import Plug.Conn

  def upload(%{body_params: %{"file" => %{path: path}}} = conn) do
    :ok = GenServer.call(Process.whereis(Emoji.Board.Process), {:process, path})
    send_resp(conn, 200, "")
  end
end
